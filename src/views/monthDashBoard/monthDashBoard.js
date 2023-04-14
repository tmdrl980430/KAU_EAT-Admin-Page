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
  CProgress,
  CProgressBar,
} from '@coreui/react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { jwtRecoilState, severURLRecoilState } from 'src/recoil'

const monthDashBoard = () => {
  const now = new Date()

  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [groupByMonthList, setGroupByMonthList] = useState([])

  const today =
    String(koreaNow.getFullYear()) +
    '-' +
    String(koreaNow.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(koreaNow.getDate()).padStart(2, '0')

  useEffect(() => {
    getYearTickets()
  }, [])

  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
  }, [])

  let basicObject = {
    title: '0월',
    value1: 0,
    value2: 0,
    value3: 0,
    value4: 0,
    value5: 0,
    value6: 0,
    value7: 0,
    value8: 0,
    value9: 0,
  }

  let temp = []

  const getYearTickets = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/mealtickets/year`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            temp = []
            for (let i = 0; i < response.data.result.usedMealTicketsByYear.length; i++) {
              basicObject.title = `${response.data.result.usedMealTicketsByYear[i].month}월`
              if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 1) {
                basicObject.value1 = response.data.result.usedMealTicketsByYear[i].count
              } else if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 2) {
                basicObject.value2 = response.data.result.usedMealTicketsByYear[i].count
              } else if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 3) {
                basicObject.value3 = response.data.result.usedMealTicketsByYear[i].count
              } else if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 4) {
                basicObject.value4 = response.data.result.usedMealTicketsByYear[i].count
              } else if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 5) {
                basicObject.value5 = response.data.result.usedMealTicketsByYear[i].count
              } else if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 6) {
                basicObject.value6 = response.data.result.usedMealTicketsByYear[i].count
              } else if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 7) {
                basicObject.value7 = response.data.result.usedMealTicketsByYear[i].count
              } else if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 8) {
                basicObject.value8 = response.data.result.usedMealTicketsByYear[i].count
              } else if (response.data.result.usedMealTicketsByYear[i].mealTypeIdx === 9) {
                basicObject.value9 = response.data.result.usedMealTicketsByYear[i].count
              }
              if (
                i < response.data.result.usedMealTicketsByYear.length - 1 &&
                response.data.result.usedMealTicketsByYear[i].month !=
                  response.data.result.usedMealTicketsByYear[i + 1].month
              ) {
                temp.push({
                  title: basicObject.title,
                  value1: basicObject.value1,
                  value2: basicObject.value2,
                  value3: basicObject.value3,
                  value4: basicObject.value4,
                  value5: basicObject.value5,
                  value6: basicObject.value6,
                  value7: basicObject.value7,
                  value8: basicObject.value8,
                  value9: basicObject.value9,
                })
                basicObject = {
                  title: '0월',
                  value1: 0,
                  value2: 0,
                  value3: 0,
                  value4: 0,
                  value5: 0,
                  value6: 0,
                  value7: 0,
                  value8: 0,
                  value9: 0,
                }
              } else if (i == response.data.result.usedMealTicketsByYear.length - 1) {
                temp.push({
                  title: basicObject.title,
                  value1: basicObject.value1,
                  value2: basicObject.value2,
                  value3: basicObject.value3,
                  value4: basicObject.value4,
                  value5: basicObject.value5,
                  value6: basicObject.value6,
                  value7: basicObject.value7,
                  value8: basicObject.value8,
                  value9: basicObject.value9,
                })
              }
            }
            setGroupByMonthList([...temp])
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }

  return (
    <div>
      <CForm>
        <CRow>
          <CCol>
            <CCard className="mb-4">
              <CCardHeader>월별 식권 사용량</CCardHeader>
              {groupByMonthList.map((item, index) => (
                <div className="progress-group mb-4" key={index}>
                  <div className="progress-group-prepend">
                    <span className="text-medium-emphasis small">{item.title}</span>
                  </div>
                  <div className="progress-group-bars">
                    <CCardBody>
                      <CRow>
                        <CCol>
                          <CRow>
                            <CCol sm={6}>
                              <div className="border-start border-start-4 border-start-success py-1 px-3">
                                <div className="text-medium-emphasis small">조식</div>
                                <div className="fs-5 fw-semibold">{item.value1}</div>
                              </div>
                            </CCol>
                            <CCol sm={6}>
                              <div className="border-start border-start-4 border-start-info py-1 px-3">
                                <div className="text-medium-emphasis small">중식 | 일품</div>
                                <div className="fs-5 fw-semibold">{item.value2}</div>
                              </div>
                            </CCol>
                            <CCol sm={6}>
                              <div className="border-start border-start-4 border-start-warning py-1 px-3">
                                <div className="text-medium-emphasis small">중식 | 한식</div>
                                <div className="fs-5 fw-semibold">{item.value3}</div>
                              </div>
                            </CCol>
                            <CCol sm={6}>
                              <div className="border-start border-start-4 border-start-danger py-1 px-3">
                                <div className="text-medium-emphasis small">중식(면)</div>
                                <div className="fs-5 fw-semibold">{item.value4}</div>
                              </div>
                            </CCol>
                            <CCol sm={6}>
                              <div className="border-start border-start-4 border-start-primary py-1 px-3">
                                <div className="text-medium-emphasis small">석식</div>
                                <div className="fs-5 fw-semibold">{item.value5}</div>
                              </div>
                            </CCol>
                          </CRow>
                        </CCol>
                        <CRow>
                          <CCol sm={6}>
                            <div className="border-start border-start-4 border-start-warning py-1 px-3">
                              <div className="text-medium-emphasis small">라면</div>
                              <div className="fs-5 fw-semibold">{item.value6}</div>
                            </div>
                          </CCol>
                          <CCol sm={6}>
                            <div className="border-start border-start-4 border-start-danger py-1 px-3">
                              <div className="text-medium-emphasis small">김밥</div>
                              <div className="fs-5 fw-semibold">{item.value7}</div>
                            </div>
                          </CCol>
                          <CCol sm={6}>
                            <div className="border-start border-start-4 border-start-primary py-1 px-3">
                              <div className="text-medium-emphasis small">핫도그</div>
                              <div className="fs-5 fw-semibold">{item.value8}</div>
                            </div>
                          </CCol>
                          <CCol sm={6}>
                            <div className="border-start border-start-4 border-start-primary py-1 px-3">
                              <div className="text-medium-emphasis small">치킨</div>
                              <div className="fs-5 fw-semibold">{item.value9}</div>
                            </div>
                          </CCol>
                        </CRow>
                      </CRow>
                    </CCardBody>
                  </div>
                </div>
              ))}
            </CCard>
          </CCol>
        </CRow>
      </CForm>
    </div>
  )
}

export default monthDashBoard
