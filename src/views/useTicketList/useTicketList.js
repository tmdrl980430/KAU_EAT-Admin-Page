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

const useTicketList = () => {
  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [useData, setUseData] = useState(null)
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)

  const [phoneNumber, setPhoneNumber] = useState('')

  const [userIdx, setUserIdx] = useState('')
  const [userId, setUserId] = useState('')
  const [userName, setUserName] = useState('')
  const [userDate, setUseDate] = useState('')
  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
  }, [])

  useEffect(() => {
    getUsers()
  }, [jwt, page])

  useEffect(() => {
    if (useData != null) {
      setUserIdx(useData[0].idx)
      setUserId(useData[0].id)
      setUserName(useData[0].userName)
      setUseDate(useData[0].useDate)
    } else {
      setUserIdx()
      setUserId('')
      setUserName('')
      setUseDate('')
    }
  }, [useData])

  const getUsers = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/mealtickets/used?page=${page}`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            setUseData(response.data.result.mealTickets)
            if (response.data.result.totalCount % 20 > 0) {
              setMaxPage(parseInt(response.data.result.totalCount / 20) + 1)
            } else {
              setMaxPage(parseInt(response.data.result.totalCount / 20))
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

  const pageMinus = () => {
    if (page - 1 === 0) {
      alert('첫 페이지 입니다.')
    } else {
      setPage(page - 1)
    }
  }

  const pagePlus = () => {
    if (page + 1 > maxPage) {
      alert('마지막 페이지 입니다.')
    } else {
      setPage(page + 1)
    }
  }

  const columns = [
    {
      key: 'idx',
      label: '사용번호',
      _props: {
        scope: 'col',
      },
    },
    {
      key: 'userName',
      label: '이름',
      _props: {
        scope: 'col',
      },
    },
    {
      key: 'mealTypeName',
      label: '사용메뉴',
      _props: {
        scope: 'col',
      },
    },
    {
      key: 'usedDate',
      label: '사용날짜',
      _props: {
        scope: 'col',
      },
    },
  ]

  return (
    <div>
      <CForm>
        <CCardHeader>
          <strong>식권 사용 내역 조회하기</strong>
        </CCardHeader>
        <CRow>
          <CTable columns={columns} items={useData} striped hover></CTable>
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
      </CForm>
    </div>
  )
}

export default useTicketList
