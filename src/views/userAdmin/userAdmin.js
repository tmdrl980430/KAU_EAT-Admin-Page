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
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { jwtRecoilState, severURLRecoilState } from 'src/recoil'
import * as FileSaver from 'file-saver'
import * as XLSX from 'xlsx'
import { number, string } from 'prop-types'

const userAdmin = () => {
  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [userData, setUserData] = useState(null)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [sortString, setSortString] = useState('DESC')

  const [phoneNumber, setPhoneNumber] = useState('')

  const [userIdx, setUserIdx] = useState('')
  const [userId, setUserId] = useState('')
  const [userPhoneNum, setUserPhoneNum] = useState('')
  const [userName, setUserName] = useState('')
  const [userPoint, setUserPoint] = useState('')
  const [userTiketBreakfast, setUserTiketBreakfast] = useState('')
  const [userTiketLunch, setUserTiketLunch] = useState('')
  const [userTiketLunchKorea, setUserLunchKorea] = useState('')
  const [userTiketLunchNoodle, setUserTiketLunchNoodle] = useState('')
  const [userTiketDinner, setUserTiketDinner] = useState('')

  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
  }, [])

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    getUsers()
  }, [page])

  useEffect(() => {
    setPage(1)
    getUsers()
  }, [sortString])

  useEffect(() => {
    if (phoneNumber == '' || phoneNumber == null) {
      setPage(1)
      getUsers()
    } else if (phoneNumber.length > 7) {
      searchUsers()
    }
  }, [phoneNumber])

  useEffect(() => {
    if (userData != null && phoneNumber.length > 7) {
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

  useEffect(() => {
    if (userData != null) {
      getUserInfo()
    } else {
      setUserTiketBreakfast('')
      setUserTiketLunch('')
      setUserLunchKorea('')
      setUserTiketLunchNoodle('')
      setUserTiketDinner('')
    }
  }, [userIdx])

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
          } else if (response.data.code === 2047) {
            alert('존재하지 않는 유저입니다.')
            setPhoneNumber('')
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
            mealTickets: [
              {
                mealTypeIdx: 1,
                mealTicketCount: userTiketBreakfast,
              },
              {
                mealTypeIdx: 2,
                mealTicketCount: userTiketLunch,
              },
              {
                mealTypeIdx: 3,
                mealTicketCount: userTiketLunchKorea,
              },
              {
                mealTypeIdx: 4,
                mealTicketCount: userTiketLunchNoodle,
              },
              {
                mealTypeIdx: 5,
                mealTicketCount: userTiketDinner,
              },
            ],
          },
          {
            headers: {
              'x-access-token': jwt,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 1000) {
            alert('수정되었습니다.')
            setUserIdx(null)
            setUserId('')
            setUserPhoneNum(null)
            setUserName('')
            setUserPoint('')
            setUserData(null)
            setUserTiketBreakfast('')
            setUserTiketLunch('')
            setUserLunchKorea('')
            setUserTiketLunchNoodle('')
            setUserTiketDinner('')
            setPhoneNumber('')
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }

    setLoading(false)
    // loading 끄기
  }

  const getUserInfo = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/users/${userIdx}`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            if (response.data.result.user.mealTickets.length != 0) {
              for (let i = 0; i < response.data.result.user.mealTickets.length; i++) {
                if (response.data.result.user.mealTickets[i].mealTypeIdx === 1) {
                  setUserTiketBreakfast(response.data.result.user.mealTickets[i].mealTicketCount)
                } else if (response.data.result.user.mealTickets[i].mealTypeIdx === 2) {
                  setUserTiketLunch(response.data.result.user.mealTickets[i].mealTicketCount)
                } else if (response.data.result.user.mealTickets[i].mealTypeIdx === 3) {
                  setUserLunchKorea(response.data.result.user.mealTickets[i].mealTicketCount)
                } else if (response.data.result.user.mealTickets[i].mealTypeIdx === 4) {
                  setUserTiketLunchNoodle(response.data.result.user.mealTickets[i].mealTicketCount)
                } else if (response.data.result.user.mealTickets[i].mealTypeIdx === 5) {
                  setUserTiketDinner(response.data.result.user.mealTickets[i].mealTicketCount)
                }
              }
            }
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }

  const getUsers = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/users?orderType=${sortString}&page=${page}`, {
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
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }
  const pagePlus = () => {
    if (page + 1 > maxPage) {
      alert('마지막 페이지 입니다.')
    } else {
      setPage(page + 1)
    }
  }

  const pageMinus = () => {
    if (page - 1 === 0) {
      alert('첫 페이지 입니다.')
    } else {
      setPage(page - 1)
    }
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
      label: '이름',
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

  let tempData = [
    {
      idx: null,
      id: '',
      phoneNumber: '',
      name: '',
      point: null,
      createdAt: '',
    },
  ]

  let idx = 0
  let id = ''
  let userphoneNumber = ''
  let name = ''
  let point = 0
  let createdAt = ''

  const getAllUsers = async (page1) => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/users?orderType=ASC&page=${page1}`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          tempData = [
            {
              idx: null,
              id: '',
              phoneNumber: '',
              name: '',
              point: null,
              createdAt: '',
            },
          ]
          if (response.data.code === 1000) {
            for (let j = 0; j < response.data.result.users.length; j++) {
              // eslint-disable-next-line no-unused-vars
              idx = response.data.result.users[j].idx
              id = response.data.result.users[j].id
              userphoneNumber = response.data.result.users[j].phoneNumber
              name = response.data.result.users[j].name
              point = response.data.result.users[j].point
              createdAt = response.data.result.users[j].createdAt
              tempData.push({
                idx: idx,
                id: id,
                phoneNumber: userphoneNumber,
                name: name,
                point: point,
                createdAt: createdAt,
              })
            }
            excelDownload(tempData, page1)
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }

  const excelFileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const excelFileExtension = '.xlsx'
  const excelFileName = '항식당유저리스트'
  const ws = XLSX.utils.aoa_to_sheet([
    ['유저번호', '아이디', '전화번호', '이름', '포인트', '가입날짜'],
    [],
  ])

  const excelDownload = (excelData, sheet) => {
    excelData.map((user) => {
      XLSX.utils.sheet_add_aoa(
        ws,
        [[user.idx, user.id, user.phoneNumber, user.name, user.point, user.createdAt]],
        { origin: -1 },
      )
      ws['!cols'] = [
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
        { wpx: 100 },
      ]
    })
    if (sheet === maxPage) {
      const wb = { Sheets: { data: ws }, SheetNames: [`data`] }
      const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
      const excelFile = new Blob([excelButter], { type: excelFileType })
      FileSaver.saveAs(excelFile, excelFileName + excelFileExtension)
    }
  }

  return (
    <div>
      <CButton
        type="button"
        color="secondary"
        onClick={() => {
          for (let z = 0; z <= maxPage; z++) {
            getAllUsers(z)
          }
        }}
      >
        엑셀 다운로드
      </CButton>
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
              value={phoneNumber}
              placeholder="찾으시는 유저의 전화번호를 입력해주세요."
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <div>
          <CButton
            type="button"
            color="secondary"
            onClick={() => {
              setSortString('DESC')
            }}
          >
            최신 순
          </CButton>
          <span> </span>
          <CButton
            type="button"
            color="secondary"
            onClick={() => {
              setSortString('ASC')
            }}
          >
            오래된 순
          </CButton>
        </div>
        <CRow>
          <CTable columns={columns} items={userData} striped hover></CTable>
        </CRow>
        {maxPage > 1 && (
          <div>
            <CButton type="button" onClick={pageMinus}>
              이전
            </CButton>
            <span> </span>
            <CButton type="button" onClick={pagePlus}>
              다음
            </CButton>
          </div>
        )}
        {phoneNumber.length > 7 ? (
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
                  placeholder="수정하실 이름을 적어주세요."
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
                  placeholder="수정하실 전화번호를 적어주세요."
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
                  placeholder="수정하실 포인트를 적어주세요."
                  onChange={(e) => {
                    setUserPoint(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                조식
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userTiketBreakfast}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 조식의 개수를 적어주세요."
                  onChange={(e) => {
                    setUserTiketBreakfast(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                중식|일품
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userTiketLunch}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 일품의 개수를 적어주세요."
                  onChange={(e) => {
                    setUserTiketLunch(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                중식|한식
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userTiketLunchKorea}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 한식의 개수를 적어주세요."
                  onChange={(e) => {
                    setUserLunchKorea(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                중식(면)
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userTiketLunchNoodle}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 면의 개수를 적어주세요."
                  onChange={(e) => {
                    setUserTiketLunchNoodle(e.target.value)
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
                석식
              </CFormLabel>
              <CCol sm={10}>
                <CFormInput
                  value={userTiketDinner}
                  type="text"
                  id="inputMenu"
                  placeholder="수정하실 석식의 개수를 적어주세요."
                  onChange={(e) => {
                    setUserTiketDinner(e.target.value)
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

export default userAdmin
