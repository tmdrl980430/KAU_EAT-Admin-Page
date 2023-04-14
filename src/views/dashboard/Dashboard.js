import React, { useEffect, useState } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CProgress, CProgressBar, CRow } from '@coreui/react'
import { useRecoilState } from 'recoil'
import {
  dateRecoilState,
  jwtRecoilState,
  severURLRecoilState,
  userIdxRecoilState,
} from 'src/recoil'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [IP, setIP] = useRecoilState(severURLRecoilState)

  const [jwt, setJwt] = useRecoilState(jwtRecoilState)
  const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState)
  const [isLogin, setIsLogin] = useState(false)

  const [today, setToday] = useRecoilState(dateRecoilState)
  const [users, setUsers] = useState(0)

  const now = new Date()

  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
    autoLogin()
    getTickets()
    getTodayTickets()
    getTodayUser()
    getYearTickets()
  }, [])

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

  const getTodayUser = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/users/count`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            setUsers(response.data.result.count)
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }

  const autoLogin = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/auth/jwt`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            setUserIdx(response.data.result.userIdx)
            setIsLogin(true)
          } else {
            setIsLogin(false)
            navigate('/login')
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }

  const todayMonth =
    String(koreaNow.getFullYear()) + '-' + String(koreaNow.getMonth() + 1).padStart(2, '0')

  const [thisMonthTicketUse, setThisMonthTicketUse] = useState([])

  const [groupByMonthList, setGroupByMonthList] = useState([])

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

  const [valueDay1Sum, setValueDay1Sum] = useState(0)
  const [valueDay2Sum, setValueDay2Sum] = useState(0)
  const [valueDay3Sum, setValueDay3Sum] = useState(0)
  const [valueDay4Sum, setValueDay4Sum] = useState(0)
  const [valueDay5Sum, setValueDay5Sum] = useState(0)
  const [valueDay6Sum, setValueDay6Sum] = useState(0)
  const [valueDay7Sum, setValueDay7Sum] = useState(0)
  const [valueDay8Sum, setValueDay8Sum] = useState(0)
  const [valueDay9Sum, setValueDay9Sum] = useState(0)

  const getTodayTickets = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/mealtickets/?type=day&date=${today}`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            if (response.data.result.usedMealTickets.length != 0) {
              for (let i = 0; i < response.data.result.usedMealTickets.length; i++) {
                if (response.data.result.usedMealTickets[i].mealTypeIdx === 1) {
                  setValueDay1Sum(response.data.result.usedMealTickets[i].count)
                } else if (response.data.result.usedMealTickets[i].mealTypeIdx === 2) {
                  setValueDay2Sum(response.data.result.usedMealTickets[i].count)
                } else if (response.data.result.usedMealTickets[i].mealTypeIdx === 3) {
                  setValueDay3Sum(response.data.result.usedMealTickets[i].count)
                } else if (response.data.result.usedMealTickets[i].mealTypeIdx === 4) {
                  setValueDay4Sum(response.data.result.usedMealTickets[i].count)
                } else if (response.data.result.usedMealTickets[i].mealTypeIdx === 5) {
                  setValueDay5Sum(response.data.result.usedMealTickets[i].count)
                } else if (response.data.result.usedMealTickets[i].mealTypeIdx === 6) {
                  setValueDay6Sum(response.data.result.usedMealTickets[i].count)
                } else if (response.data.result.usedMealTickets[i].mealTypeIdx === 7) {
                  setValueDay7Sum(response.data.result.usedMealTickets[i].count)
                } else if (response.data.result.usedMealTickets[i].mealTypeIdx === 8) {
                  setValueDay8Sum(response.data.result.usedMealTickets[i].count)
                } else if (response.data.result.usedMealTickets[i].mealTypeIdx === 9) {
                  setValueDay9Sum(response.data.result.usedMealTickets[i].count)
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

  let temp = []
  const [value1Sum, setValue1Sum] = useState(0)
  const [value2Sum, setValue2Sum] = useState(0)
  const [value3Sum, setValue3Sum] = useState(0)
  const [value4Sum, setValue4Sum] = useState(0)
  const [value5Sum, setValue5Sum] = useState(0)
  const [value6Sum, setValue6Sum] = useState(0)
  const [value7Sum, setValue7Sum] = useState(0)
  const [value8Sum, setValue8Sum] = useState(0)
  const [value9Sum, setValue9Sum] = useState(0)
  const [valueMonth1Sum, setValueMonth1Sum] = useState(0)
  const [valueMonth2Sum, setValueMonth2Sum] = useState(0)
  const [valueMonth3Sum, setValueMonth3Sum] = useState(0)
  const [valueMonth4Sum, setValueMonth4Sum] = useState(0)
  const [valueMonth5Sum, setValueMonth5Sum] = useState(0)
  const [valueMonth6Sum, setValueMonth6Sum] = useState(0)
  const [valueMonth7Sum, setValueMonth7Sum] = useState(0)
  const [valueMonth8Sum, setValueMonth8Sum] = useState(0)
  const [valueMonth9Sum, setValueMonth9Sum] = useState(0)

  useEffect(() => {
    let sum1 = 0
    let sum2 = 0
    let sum3 = 0
    let sum4 = 0
    let sum5 = 0
    let sum6 = 0
    let sum7 = 0
    let sum8 = 0
    let sum9 = 0

    for (let i = 0; i < groupByMonthList.length; i++) {
      sum1 += groupByMonthList[i].value1
      sum2 += groupByMonthList[i].value2
      sum3 += groupByMonthList[i].value3
      sum4 += groupByMonthList[i].value4
      sum5 += groupByMonthList[i].value5
      sum6 += groupByMonthList[i].value6
      sum7 += groupByMonthList[i].value7
      sum8 += groupByMonthList[i].value8
      sum9 += groupByMonthList[i].value9
    }
    setValue1Sum(sum1)
    setValue2Sum(sum2)
    setValue3Sum(sum3)
    setValue4Sum(sum4)
    setValue5Sum(sum5)
    setValue6Sum(sum6)
    setValue7Sum(sum7)
    setValue8Sum(sum8)
    setValue9Sum(sum9)
  }, [groupByMonthList])

  const getTickets = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/mealtickets/?type=month&date=${today}`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            if (response.data.result.usedMealTickets.length != 0) {
              setValueMonth1Sum(response.data.result.usedMealTickets[0].count)
              setValueMonth2Sum(response.data.result.usedMealTickets[1].count)
              setValueMonth3Sum(response.data.result.usedMealTickets[2].count)
              setValueMonth4Sum(response.data.result.usedMealTickets[3].count)
              setValueMonth5Sum(response.data.result.usedMealTickets[4].count)
              setValueMonth6Sum(response.data.result.usedMealTickets[5].count)
              setValueMonth7Sum(response.data.result.usedMealTickets[6].count)
              setValueMonth8Sum(response.data.result.usedMealTickets[7].count)
              setValueMonth9Sum(response.data.result.usedMealTickets[8].count)
              setThisMonthTicketUse([
                {
                  title: '조식',
                  value1: response.data.result.usedMealTickets[0].count,
                  color: 'success',
                },
                {
                  title: '중식 | 일품',
                  value1: response.data.result.usedMealTickets[1].count,
                  color: 'info',
                },
                {
                  title: '중식 | 한식',
                  value1: response.data.result.usedMealTickets[2].count,
                  color: 'warning',
                },
                {
                  title: '중식(면)',
                  value1: response.data.result.usedMealTickets[3].count,
                  color: 'danger',
                },
                {
                  title: '석식',
                  value1: response.data.result.usedMealTickets[4].count,
                  color: 'primary',
                },
                {
                  title: '라면',
                  value1: response.data.result.usedMealTickets[5].count,
                  color: 'light-gradient',
                },
                {
                  title: '김밥',
                  value1: response.data.result.usedMealTickets[6].count,
                  color: 'dark',
                },
                {
                  title: '핫도그',
                  value1: response.data.result.usedMealTickets[7].count,
                  color: 'light',
                },
                {
                  title: '치킨',
                  value1: response.data.result.usedMealTickets[8].count,
                  color: 'secondary',
                },
              ])
            } else {
              setThisMonthTicketUse([
                { title: '조식', value1: 0, color: 'success' },
                {
                  title: '중식 | 일품',
                  value1: 0,
                  color: 'info',
                },
                {
                  title: '중식 | 한식',
                  value1: 0,
                  color: 'warning',
                },
                { title: '중식(면)', value1: 0, color: 'danger' },
                { title: '석식', value1: 0, color: 'primary' },
                { title: '라면', value1: 0, color: 'light-gradient' },
                { title: '김밥', value1: 0, color: 'dark' },
                { title: '핫도그', value1: 0, color: 'light' },
                { title: '치킨', value1: 0, color: 'secondary' },
              ])
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
    <>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>{today} 현재 회원 수</CCardHeader>
            <CCardBody>
              <span>{users}명</span>
            </CCardBody>
          </CCard>
          <CCard className="mb-4">
            <CCardHeader>{today} 식권 사용량</CCardHeader>
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
                        <div className="text-medium-emphasis small">중식(면)</div>
                        <div className="fs-5 fw-semibold">{valueDay4Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">석식</div>
                        <div className="fs-5 fw-semibold">{valueDay5Sum}</div>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-light-gradient py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">라면</div>
                        <div className="fs-5 fw-semibold">{valueDay6Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-dark py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">김밥</div>
                        <div className="fs-5 fw-semibold">{valueDay7Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-light py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">핫도그</div>
                        <div className="fs-5 fw-semibold">{valueDay8Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-secondary py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">치킨</div>
                        <div className="fs-5 fw-semibold">{valueDay9Sum}</div>
                      </div>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>
              <br />
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>{todayMonth}월 식권 사용량</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-success py-1 px-3">
                    <div className="text-medium-emphasis small">조식</div>
                    <div className="fs-5 fw-semibold">{valueMonth1Sum}</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">중식 | 일품</div>
                    <div className="fs-5 fw-semibold">{valueMonth2Sum}</div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">중식 | 한식</div>
                    <div className="fs-5 fw-semibold">{valueMonth3Sum}</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">중식(면)</div>
                    <div className="fs-5 fw-semibold">{valueMonth4Sum}</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">석식</div>
                    <div className="fs-5 fw-semibold">{valueMonth5Sum}</div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-light-gradient py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">라면</div>
                    <div className="fs-5 fw-semibold">{valueMonth6Sum}</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-dark py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">김밥</div>
                    <div className="fs-5 fw-semibold">{valueMonth7Sum}</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-ligth py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">핫도그</div>
                    <div className="fs-5 fw-semibold">{valueMonth8Sum}</div>
                  </div>
                </CCol>
                <CCol sm={6}>
                  <div className="border-start border-start-4 border-start-secondary py-1 px-3 mb-3">
                    <div className="text-medium-emphasis small">치킨</div>
                    <div className="fs-5 fw-semibold">{valueMonth9Sum}</div>
                  </div>
                </CCol>
              </CRow>
              <CRow>
                <CCol xs={12} md={100} xl={6}>
                  {thisMonthTicketUse.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress>
                          <CProgressBar color={item.color} value={item.value1}>
                            {item.value1}
                          </CProgressBar>
                        </CProgress>
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>
              <br />
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>{koreaNow.getFullYear()}년 식권 사용량</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={100} xl={6}>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3">
                        <div className="text-medium-emphasis small">조식</div>
                        <div className="fs-5 fw-semibold">{value1Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">중식 | 일품</div>
                        <div className="fs-5 fw-semibold">{value2Sum}</div>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">중식 | 한식</div>
                        <div className="fs-5 fw-semibold">{value3Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">중식(면)</div>
                        <div className="fs-5 fw-semibold">{value4Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">석식</div>
                        <div className="fs-5 fw-semibold">{value5Sum}</div>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-light-gradient py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">라면</div>
                        <div className="fs-5 fw-semibold">{value6Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-dark py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">김밥</div>
                        <div className="fs-5 fw-semibold">{value7Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-light py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">핫도그</div>
                        <div className="fs-5 fw-semibold">{value8Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-secondary py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">치킨</div>
                        <div className="fs-5 fw-semibold">{value9Sum}</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {groupByMonthList.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-medium-emphasis small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress>
                          <CProgressBar color="success" value={item.value1}>
                            {item.value1} (조식)
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="info" value={item.value2}>
                            {item.value2} (중식 | 일품)
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="warning" value={item.value3}>
                            {item.value3} (중식 | 한식)
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="danger" value={item.value4}>
                            {item.value4} (중식 | 면)
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="primary" value={item.value5}>
                            {item.value5} (석식)
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="light-gradient" value={item.value6}>
                            {item.value6} (라면)
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="dark" value={item.value7}>
                            {item.value7} (김밥)
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="light" value={item.value8}>
                            {item.value8} (핫도그)
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="secondary" value={item.value9}>
                            {item.value9} (치킨)
                          </CProgressBar>
                        </CProgress>
                      </div>
                    </div>
                  ))}
                </CCol>
              </CRow>
              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
