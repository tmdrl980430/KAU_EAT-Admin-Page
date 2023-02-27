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

const userAdmin = () => {
  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [userData, setUserData] = useState(null)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [sortString, setSortString] = useState('DESC')

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
          <CTable columns={columns} items={userData} striped hover />
        </CRow>
        <div>
          <CButton type="button" onClick={pageMinus}>
            이전
          </CButton>
          <span> </span>
          <CButton type="button" onClick={pagePlus}>
            다음
          </CButton>
        </div>
      </CForm>
    </div>
  )
}

export default userAdmin
