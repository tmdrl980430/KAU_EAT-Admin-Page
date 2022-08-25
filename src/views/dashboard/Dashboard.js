import React from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CProgress, CProgressBar, CRow } from '@coreui/react'

const Dashboard = () => {
  const now = new Date()

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

  const todayMonth =
    String(koreaNow.getFullYear()) + '-' + String(koreaNow.getMonth() + 1).padStart(2, '0')
  const thisWeekTicketUse = [
    { title: '월요일', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '화요일', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '수요일', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '목요일', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '금요일', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '토요일', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '일요일', value1: 34, value2: 100, value3: 30, value4: 100 },
  ]

  const thisMonthTicketUse = [
    { title: '조식', value1: 34, color: 'success' },
    { title: '중식 | 일품', value1: 34, color: 'info' },
    { title: '중식 | 한식', value1: 34, color: 'warning' },
    { title: '석식', value1: 34, color: 'danger' },
  ]

  const thisYearTicketUse = [
    { title: '1월', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '2월', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '3월', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '4월', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '5월', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '6월', value1: 34, value2: 78, value3: 30, value4: 40 },
    { title: '7월', value1: 34, value2: 100, value3: 30, value4: 100 },
    { title: '8월', value1: 34, value2: 100, value3: 30, value4: 100 },
    { title: '9월', value1: 34, value2: 100, value3: 30, value4: 100 },
    { title: '10월', value1: 34, value2: 100, value3: 30, value4: 100 },
    { title: '11월', value1: 34, value2: 100, value3: 30, value4: 100 },
    { title: '12월', value1: 34, value2: 100, value3: 30, value4: 100 },
  ]

  return (
    <>
      <CRow>
        <CCol xs>
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
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">중식 | 일품</div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">중식 | 한식</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol sm={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-medium-emphasis small">석식</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {thisYearTicketUse.map((item, index) => (
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
