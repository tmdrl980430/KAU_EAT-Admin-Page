import React, { useEffect, useState } from 'react'
import { CButton, CCol, CForm, CFormCheck, CFormInput, CFormLabel, CRow } from '@coreui/react'
import { useRecoilState } from 'recoil'
import { jwtRecoilState, severURLRecoilState } from 'src/recoil'
import axios from 'axios'

const SoldOutManagement = () => {
  const now = new Date()

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [IP, setIP] = useRecoilState(severURLRecoilState)

  const [jwt, setJwt] = useRecoilState(jwtRecoilState)
  const today =
    String(koreaNow.getFullYear()) +
    '-' +
    String(koreaNow.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(koreaNow.getDate()).padStart(2, '0')

  const patchSoldOut = async () => {
    console.log('autoLogin')

    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      console.log('autoLogin_try')
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .patch(
          `${IP}/menus/status`,
          {
            mealTypeIds: '',
            date: today,
          },
          {
            headers: {
              'x-access-token': jwt,
            },
          },
        )
        .then((response) => {
          console.log(`response code확인`, response)

          if (response.data.code === 1001) {
            console.log('자동 로그인 완료')
            setJwt(jwt)
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
