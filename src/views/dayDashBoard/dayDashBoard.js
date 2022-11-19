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
  CFormText,
  CCard,
  CCardBody,
} from '@coreui/react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { jwtRecoilState, severURLRecoilState } from 'src/recoil'

const dayDashBoard = () => {
  const now = new Date()

  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const today =
    String(koreaNow.getFullYear()) +
    '-' +
    String(koreaNow.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(koreaNow.getDate()).padStart(2, '0')

  const [date, setDate] = useState(today)

  useEffect(() => {
    getTodayTickets()
  }, [date])

  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
  }, [])
  const [valueDay1Sum, setValueDay1Sum] = useState(0)
  const [valueDay2Sum, setValueDay2Sum] = useState(0)
  const [valueDay3Sum, setValueDay3Sum] = useState(0)
  const [valueDay4Sum, setValueDay4Sum] = useState(0)
  const [valueDay5Sum, setValueDay5Sum] = useState(0)

  const getTodayTickets = async () => {
    console.log('getTodayTickets')
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/mealtickets/day?date=${date}`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            if (response.data.result.byDay.length != 0) {
              for (let i = 0; i < response.data.result.byDay.length; i++) {
                if (response.data.result.byDay[i].mealTypeIdx === 1) {
                  setValueDay1Sum(response.data.result.byDay[i].count)
                } else if (response.data.result.byDay[i].mealTypeIdx === 2) {
                  setValueDay2Sum(response.data.result.byDay[i].count)
                } else if (response.data.result.byDay[i].mealTypeIdx === 3) {
                  setValueDay3Sum(response.data.result.byDay[i].count)
                } else if (response.data.result.byDay[i].mealTypeIdx === 4) {
                  setValueDay4Sum(response.data.result.byDay[i].count)
                } else if (response.data.result.byDay[i].mealTypeIdx === 5) {
                  setValueDay5Sum(response.data.result.byDay[i].count)
                }
              }
            } else {
              setValueDay1Sum(0)
              setValueDay2Sum(0)
              setValueDay3Sum(0)
              setValueDay4Sum(0)
              setValueDay5Sum(0)
            }
          }
        })
        .catch((error) => {})
      // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }

  return (
    <div>
      <CForm>
        <CCardHeader>
          <strong>날짜 조회하기</strong>
        </CCardHeader>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputDate" className="col-sm-2 col-form-label">
            날짜
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputDate"
              placeholder="날짜를 2022-09-15 형식으로 입력해주세요."
              onChange={(e) => {
                setDate(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol>
            <CCard className="mb-4">
              <CCardHeader>{date} 식권 사용량</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs={12} md={100} xl={6}>
                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-success py-1 px-3">
                          <div className="text-medium-emphasis small">조식</div>
                          <div className="fs-5 fw-semibold">{valueDay1Sum}</div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">중식 | 일품</div>
                          <div className="fs-5 fw-semibold">{valueDay2Sum}</div>
                        </div>
                      </CCol>
                    </CRow>
                    <CRow>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">중식 | 한식</div>
                          <div className="fs-5 fw-semibold">{valueDay3Sum}</div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">석식</div>
                          <div className="fs-5 fw-semibold">{valueDay4Sum}</div>
                        </div>
                      </CCol>
                      <CCol sm={6}>
                        <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                          <div className="text-medium-emphasis small">중식(면)</div>
                          <div className="fs-5 fw-semibold">{valueDay5Sum}</div>
                        </div>
                      </CCol>
                    </CRow>
                  </CCol>
                </CRow>
                <br />
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CForm>
    </div>
  )
}

export default dayDashBoard
