/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useStyles } from 'react'
import { CButton, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import { ko } from 'date-fns/esm/locale'

const DatePickerComponent = () => {
  const now = new Date()

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
  const [startDate, setStartDate] = useState(koreaNow)

  return (
    <DatePicker
      locale={ko}
      placeholderText="날짜 검색"
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      dateFormat="yyyy-MM-dd (eee)" // 시간 포맷 변경
      showPopperArrow={false} // 화살표 변경
    />
  )
}

export default DatePickerComponent
