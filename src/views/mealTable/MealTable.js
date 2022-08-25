import React, { useEffect, useState } from 'react'
import { CButton, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CRow } from '@coreui/react'
import axios from 'axios'

const MealTable = () => {
  const now = new Date()

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [date, setDate] = useState('')
  const [breakfastMenu, setBreakfastMenu] = useState('')
  const [lunchMenu, setLunchMenu] = useState('')
  const [lunchKoreaMenu, setLunchKoreaMenu] = useState('')
  const [dinnerMenu, setDinnerMenu] = useState('')

  useEffect(() => {
    console.log('date : ', date)
    console.log('breakfastMenu : ', breakfastMenu)
    console.log('lunchKoreaMenu : ', lunchKoreaMenu)
    console.log('lunchMenu : ', lunchMenu)
    console.log('dinnerMenu : ', dinnerMenu)
  }, [date, breakfastMenu, lunchKoreaMenu, lunchMenu, dinnerMenu])

  const today =
    String(koreaNow.getFullYear()) +
    '-' +
    String(koreaNow.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(koreaNow.getDate()).padStart(2, '0')

  const mealTableRegistration = async () => {
    console.log('postMealTableRegist')
    setLoading(true)

    if (date != '') {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null)
        console.log('postMealTableRegist_try')
        // loading 상태를 true 로 바꿉니다.
        setLoading(true)

        // axios     .defaults     .headers     .common['x-access-token'] = jwt

        const response = await axios
          .post(`http://3.38.35.114/admin/menus`, {
            menus: [
              { mealTypeIdx: 1, name: breakfastMenu, availableAt: date },
              { mealTypeIdx: 2, name: lunchMenu, availableAt: date },
              { mealTypeIdx: 3, name: lunchKoreaMenu, availableAt: date },
              { mealTypeIdx: 4, name: dinnerMenu, availableAt: date },
            ],
          })
          .then((response) => {
            console.log(`response 확인 : ${response.data.code}`)
          })
          .catch((error) => {
            console.log(error)
          })
        // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
      } catch (e) {
        console.log('postMealTableRegist_catch')
        console.log(e)
        setError(e)
      }
    }
    setLoading(false)
    // loading 끄기
  }
  return (
    <>
      <CForm>
        <CCardHeader>
          <strong>날짜 등록하기</strong>
        </CCardHeader>
        <small>{today} 형식으로 입력해주세요.</small>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputDate" className="col-sm-2 col-form-label">
            날짜
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputDate"
              onChange={(e) => {
                setDate(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CButton type="submit">날짜 조회하기</CButton>
        <CCardHeader>
          <strong>메뉴 등록하기</strong>{' '}
          <small>밥, 스파게티, 국, 김치 형식으로 입력해주세요.</small>
        </CCardHeader>
        <small>운영을 하지 않을때는 빈칸으로 입력해주세요.</small>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            조식
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setBreakfastMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            중식 | 일품
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setLunchMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            중식 | 한식
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setLunchKoreaMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            석식
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setDinnerMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CButton type="submit" onClick={mealTableRegistration}>
          등록하기
        </CButton>
        <CButton type="submit">수정하기</CButton>
      </CForm>
    </>
  )
}

export default MealTable
