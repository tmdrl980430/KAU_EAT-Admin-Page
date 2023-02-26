/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CTable,
} from '@coreui/react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { jwtRecoilState, severURLRecoilState } from 'src/recoil'

const userSearch = () => {
  const now = new Date()

  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [phoneNumber, setPhoneNumber] = useState('')

  const [userData, setUserData] = useState(null)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [sortString, setSortString] = useState('DESC')

  const [userIdx, setUserIdx] = useState('')
  const [userId, setUserId] = useState('')
  const [userPhoneNum, setUserPhoneNum] = useState('')
  const [userName, setUserName] = useState('')
  const [userPoint, setUserPoint] = useState('')

  useEffect(() => {
    searchUsers()
  }, [phoneNumber])

  useEffect(() => {
    if (userData != null) {
      setUserIdx(userData[0].idx)
      setUserId(userData[0].id)
      setUserPhoneNum(userData[0].phoneNumber)
      setUserName(userData[0].name)
      setUserPoint(userData[0].point)
    } else {
      setUserIdx()
      setUserId('')
      setUserPhoneNum('')
      setUserName('')
      setUserPoint()
    }
  }, [userData])

  const searchUsers = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/users/search?orderType=DESC&page=${page}&phoneNumber=${phoneNumber}`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            setUserData(response.data.result.users)
            if (response.data.result.usersCount % 20 > 0) {
              setMaxPage(parseInt(response.data.result.usersCount / 20) + 1)
            } else {
              setMaxPage(parseInt(response.data.result.usersCount / 20))
            }
          } else {
            setUserData(null)
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }

  const userModify = async () => {
    setLoading(true)

    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      // axios     .defaults     .headers     .common['x-access-token'] = jwt

      const response = await axios
        .patch(
          `${IP}/users`,
          {
            userIdx: userIdx,
            name: userName,
            phoneNumber: userPhoneNum,
            id: userId,
            point: userPoint,
          },
          {
            headers: {
              'x-access-token': jwt,
            },
          },
        )
        .then((response) => {
          console.log(response.data.code)
          if (response.data.code === 1000) {
            alert('수정되었습니다.')
            setUserIdx()
            setUserId('')
            setUserPhoneNum('')
            setUserName('')
            setUserPoint()
            setUserData(null)
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }

    setLoading(false)
    // loading 끄기
  }

  const columns = [
    {
      key: 'idx',
      label: '유저번호',
      _props: {
        scope: 'col',
      },
    },
    {
      key: 'name',
      _props: {
        scope: 'col',
      },
    },
    {
      key: 'phoneNumber',
      label: '전화번호',
      _props: {
        scope: 'col',
      },
    },
    {
      key: 'id',
      label: '아이디',
      _props: {
        scope: 'col',
      },
    },
    {
      key: 'createdAt',
      label: '가입날짜',
      _props: {
        scope: 'col',
      },
    },
    {
      key: 'point',
      label: '포인트',
      _props: {
        scope: 'col',
      },
    },
  ]

  return (
    <div>
      <CForm>
        <CCardHeader>
          <strong>유저 조회하기</strong>
        </CCardHeader>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputDate" className="col-sm-2 col-form-label">
            전화번호
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputDate"
              placeholder="찾으시는 유저의 전화번호를 입력해주세요."
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow>
          <CTable columns={columns} items={userData} striped hover />
        </CRow>
        {userData ? (
          <CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                아이디
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userId}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 아이디를 적어주세요."
                  onChange={(e) => {
                    setUserId(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                이름
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userName}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 아이디를 적어주세요."
                  onChange={(e) => {
                    setUserName(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                전화번호
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userPhoneNum}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 아이디를 적어주세요."
                  onChange={(e) => {
                    setUserPhoneNum(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                포인트
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userPoint}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 아이디를 적어주세요."
                  onChange={(e) => {
                    setUserPoint(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CButton type="button" onClick={userModify}>
              수정하기
            </CButton>
          </CRow>
        ) : (
          <div></div>
        )}
      </CForm>
    </div>
  )
}

export default userSearch
