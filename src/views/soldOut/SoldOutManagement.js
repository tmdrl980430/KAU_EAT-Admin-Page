import React from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react'

const SoldOutManagement = () => {
  const now = new Date()

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

  const today =
    String(koreaNow.getFullYear()) +
    '-' +
    String(koreaNow.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(koreaNow.getDate()).padStart(2, '0')

  return (
    <>
      <CForm>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            {today}
          </CFormLabel>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            조식
          </CFormLabel>
          <CFormCheck
            type="radio"
            name="Breakfast"
            id="Breakfast"
            label="정상 운영"
            defaultChecked
          />
          <CFormCheck type="radio" name="Breakfast" id="BreakfastSoldout" label="품절" />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            중식 | 일품
          </CFormLabel>
          <CFormCheck type="radio" name="Lunch" id="Lunch" label="정상 운영" defaultChecked />
          <CFormCheck type="radio" name="Lunch" id="LunchSoldout" label="품절" />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            중식 | 한식
          </CFormLabel>
          <CFormCheck
            type="radio"
            name="LunchKorea"
            id="LunchKorea"
            label="정상 운영"
            defaultChecked
          />
          <CFormCheck type="radio" name="LunchKorea" id="LunchKoreaSoldout" label="품절" />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            석식
          </CFormLabel>
          <CFormCheck type="radio" name="Dinner" id="Dinner" label="정상 운영" defaultChecked />
          <CFormCheck type="radio" name="Dinner" id="DinnerSoldout" label="품절" />
        </CRow>
        <CButton type="submit">등록하기</CButton>
      </CForm>
    </>
  )
}

export default SoldOutManagement
