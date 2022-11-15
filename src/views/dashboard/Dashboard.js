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
    console.log('jwt : ', localStorage.getItem('jwt-token'))
    autoLogin()
    getTickets()
    getTodayTickets()
    getTodayUser()
  }, [])

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

  const getTodayUser = async () => {
    console.log('getTodayUser')
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      console.log('getTodayUser_try')
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/users`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          console.log(`response 확인 : ${response.data.result.count}`)
          if (response.data.code === 1000) {
            setUsers(response.data.result.count)
          }
        })
        .catch((error) => {
          console.log(`error : `, error)
        })
      // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
    } catch (e) {
      console.log('getTodayUser_catch')
      console.log(e)
      setError(e)
    }
    setLoading(false)
    // loading 끄기
  }

  const autoLogin = async () => {
    console.log('autoLogin')

    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      console.log('autoLogin_try')
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/auth/jwt`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          console.log(`response code확인`, response)

          if (response.data.code === 1001) {
            console.log('자동 로그인 완료')
            setUserIdx(response.data.result.userIdx)
            setIsLogin(true)
          } else {
            setIsLogin(false)
            navigate('/login')
          }
        })
        .catch((error) => {
          console.log(`error : `, error)
        })
      // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
    } catch (e) {
      console.log('autoLogin_catch')
      console.log(e)
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
  }
  let tempMonth = '0'

  const [valueDay1Sum, setValueDay1Sum] = useState(0)
  const [valueDay2Sum, setValueDay2Sum] = useState(0)
  const [valueDay3Sum, setValueDay3Sum] = useState(0)
  const [valueDay4Sum, setValueDay4Sum] = useState(0)
  const [valueDay5Sum, setValueDay5Sum] = useState(0)

  useEffect(() => {
    console.log('valueDay1Sum : ', valueDay1Sum)
    console.log('valueDay2Sum : ', valueDay2Sum)
    console.log('valueDay3Sum : ', valueDay3Sum)
    console.log('valueDay4Sum : ', valueDay4Sum)
    console.log('valueDay5Sum : ', valueDay5Sum)
  }, [valueDay1Sum, valueDay2Sum, valueDay3Sum, valueDay4Sum, valueDay5Sum])

  const getTodayTickets = async () => {
    console.log('getTodayTickets')
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      console.log('getTodayTickets_try')
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/mealtickets/day?date=${today}`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            console.log('사용량 가져오기 완료')
            console.log('response.data byDay', response.data.result)
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
        .catch((error) => {
          console.log(`error : `, error)
        })
      // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
    } catch (e) {
      console.log('getTodayTickets_catch')
      console.log(e)
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

  const getTickets = async () => {
    console.log('getTickets')
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      console.log('getTickets_try')
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/mealtickets`, {
          headers: {
            'x-access-token': localStorage.getItem('jwt-token'),
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            console.log('사용량 가져오기 완료')
            console.log('response.data.code', response.data.result)
            if (response.data.result.byMonth.length != 0) {
              setThisMonthTicketUse([
                { title: '조식', value1: response.data.result.byMonth[0].count, color: 'success' },
                {
                  title: '중식 | 일품',
                  value1: response.data.result.byMonth[1].count,
                  color: 'info',
                },
                {
                  title: '중식 | 한식',
                  value1: response.data.result.byMonth[2].count,
                  color: 'warning',
                },
                { title: '석식', value1: response.data.result.byMonth[3].count, color: 'danger' },
                {
                  title: '중식(면)',
                  value1: response.data.result.byMonth[4].count,
                  color: 'primary',
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
                { title: '석식', value1: 0, color: 'danger' },
                { title: '중식(면)', value1: 0, color: 'primary' },
              ])
            }
            temp = []
            setValue1Sum(0)
            setValue2Sum(0)
            setValue3Sum(0)
            setValue4Sum(0)
            setValue5Sum(0)
            for (let i = 0; i < response.data.result.groupByMonth.length; i++) {
              basicObject.title = `${response.data.result.groupByMonth[i].month}월`
              if (response.data.result.groupByMonth[i].mealTypeIdx === 1) {
                basicObject.value1 = response.data.result.groupByMonth[i].count
                setValue1Sum(value1Sum + basicObject.value1)
              } else if (response.data.result.groupByMonth[i].mealTypeIdx === 2) {
                basicObject.value2 = response.data.result.groupByMonth[i].count
                setValue2Sum(value2Sum + basicObject.value2)
              } else if (response.data.result.groupByMonth[i].mealTypeIdx === 3) {
                basicObject.value3 = response.data.result.groupByMonth[i].count
                setValue3Sum(value3Sum + basicObject.value3)
              } else if (response.data.result.groupByMonth[i].mealTypeIdx === 4) {
                basicObject.value4 = response.data.result.groupByMonth[i].count
                setValue4Sum(value4Sum + basicObject.value4)
              } else if (response.data.result.groupByMonth[i].mealTypeIdx === 5) {
                basicObject.value5 = response.data.result.groupByMonth[i].count
                setValue5Sum(value5Sum + basicObject.value5)
              }
              if (
                i < response.data.result.groupByMonth.length - 1 &&
                response.data.result.groupByMonth[i].month !=
                  response.data.result.groupByMonth[i + 1].month
              ) {
                temp.push({
                  title: basicObject.title,
                  value1: basicObject.value1,
                  value2: basicObject.value2,
                  value3: basicObject.value3,
                  value4: basicObject.value4,
                  value5: basicObject.value5,
                })
              } else if (i == response.data.result.groupByMonth.length - 1) {
                temp.push({
                  title: basicObject.title,
                  value1: basicObject.value1,
                  value2: basicObject.value2,
                  value3: basicObject.value3,
                  value4: basicObject.value4,
                  value5: basicObject.value5,
                })
              } else {
              }
            }
            setGroupByMonthList([...temp])
          }
        })
        .catch((error) => {
          console.log(`error : `, error)
        })
      // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
    } catch (e) {
      console.log('getTickets_catch')
      console.log(e)
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
              <spam>{users}</spam>
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

          <CCard className="mb-4">
            <CCardHeader>{todayMonth}월 식권 사용량</CCardHeader>
            <CCardBody>
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
                        <div className="text-medium-emphasis small">석식</div>
                        <div className="fs-5 fw-semibold">{value4Sum}</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-primary py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">중식(면)</div>
                        <div className="fs-5 fw-semibold">{value5Sum}</div>
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
                            {item.value1}
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="info" value={item.value2}>
                            {item.value2}
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="warning" value={item.value3}>
                            {item.value3}
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="danger" value={item.value4}>
                            {item.value4}
                          </CProgressBar>
                        </CProgress>
                        <CProgress>
                          <CProgressBar color="primary" value={item.value5}>
                            {item.value4}
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
