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
} from '@coreui/react'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { jwtRecoilState, severURLRecoilState } from 'src/recoil'

const MealTable = () => {
  const now = new Date()
  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)

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
  const [lunchNoodleMenu, setLunchNoodleMenu] = useState('')
  const [ramenMenu, setRamenMenu] = useState('')
  const [kimbabMenu, setKimbabMenu] = useState('')
  const [hotdogMenu, setHotdogMenu] = useState('')
  const [chickenMenu, setChickenMenu] = useState('')
  const [isMenu, setIsMenu] = useState(false)
  const [dateClick, setDateClick] = useState(false)

  const [breakfastMenuIdx, setBreakfastMenuIdx] = useState(0)
  const [lunchMenuIdx, setLunchMenuIdx] = useState(0)
  const [lunchKoreaMenuIdx, setLunchKoreaMenuIdx] = useState(0)
  const [dinnerMenuIdx, setDinnerMenuIdx] = useState(0)
  const [lunchNoodleMenuIdx, setLunchNoodleMenuIdx] = useState(0)
  const [ramenMenuIdx, setRamenMenuIdx] = useState(0)
  const [kimbabMenuIdx, setKimbabMenuIdx] = useState(0)
  const [hotdogMenuIdx, setHotdogMenuIdx] = useState(0)
  const [chickenMenuIdx, setChickenMenuIdx] = useState(0)

  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
    setDate(today)
  }, [])

  const today =
    String(koreaNow.getFullYear()) +
    '-' +
    String(koreaNow.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(koreaNow.getDate()).padStart(2, '0')

  const setDateMealTable = async () => {
    setBreakfastMenu('')
    setLunchMenu('')
    setLunchKoreaMenu('')
    setDinnerMenu('')
    setLunchNoodleMenu('')
    setRamenMenu('')
    setKimbabMenu('')
    setHotdogMenu('')
    setChickenMenu('')
    setLoading(true)

    if (date != '') {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null)
        // loading 상태를 true 로 바꿉니다.
        setLoading(true)

        const response = await axios
          .get(`${IP}/menus?date=${date}`, {
            headers: {
              'x-access-token': jwt,
            },
          })
          .then((response) => {
            if (response.data.code === 1000) {
              if (response.data.result.menus.length == 0) {
                setIsMenu(false)
                setBreakfastMenuIdx(0)
                setLunchMenuIdx(0)
                setLunchKoreaMenuIdx(0)
                setDinnerMenuIdx(0)
                setLunchNoodleMenuIdx(0)
                setRamenMenuIdx(0)
                setKimbabMenuIdx(0)
                setHotdogMenuIdx(0)
                setChickenMenuIdx(0)
              } else {
                setIsMenu(true)
                for (let i = 0; i < response.data.result.menus.length; i++) {
                  if (response.data.result.menus[i].mealTypeIdx === 1) {
                    setBreakfastMenu(response.data.result.menus[i].name)
                    setBreakfastMenuIdx(response.data.result.menus[i].menuIdx)
                  } else if (response.data.result.menus[i].mealTypeIdx === 2) {
                    setLunchMenu(response.data.result.menus[i].name)
                    setLunchMenuIdx(response.data.result.menus[i].menuIdx)
                  } else if (response.data.result.menus[i].mealTypeIdx === 3) {
                    setLunchKoreaMenu(response.data.result.menus[i].name)
                    setLunchKoreaMenuIdx(response.data.result.menus[i].menuIdx)
                  } else if (response.data.result.menus[i].mealTypeIdx === 5) {
                    setDinnerMenu(response.data.result.menus[i].name)
                    setDinnerMenuIdx(response.data.result.menus[i].menuIdx)
                  } else if (response.data.result.menus[i].mealTypeIdx === 4) {
                    setLunchNoodleMenu(response.data.result.menus[i].name)
                    setLunchNoodleMenuIdx(response.data.result.menus[i].menuIdx)
                  } else if (response.data.result.menus[i].mealTypeIdx === 6) {
                    setRamenMenu(response.data.result.menus[i].name)
                    setRamenMenuIdx(response.data.result.menus[i].menuIdx)
                  } else if (response.data.result.menus[i].mealTypeIdx === 7) {
                    setKimbabMenu(response.data.result.menus[i].name)
                    setKimbabMenuIdx(response.data.result.menus[i].menuIdx)
                  } else if (response.data.result.menus[i].mealTypeIdx === 8) {
                    setHotdogMenu(response.data.result.menus[i].name)
                    setHotdogMenuIdx(response.data.result.menus[i].menuIdx)
                  } else if (response.data.result.menus[i].mealTypeIdx === 9) {
                    setChickenMenu(response.data.result.menus[i].name)
                    setChickenMenuIdx(response.data.result.menus[i].menuIdx)
                  }
                }
              }
            } else {
              alert(response.data.message)
            }
          })
          .catch((error) => {})
      } catch (e) {
        setError(e)
      }
    }
    setLoading(false)
    // loading 끄기
  }

  const mealTableRegistration = async () => {
    setLoading(true)

    let registrationList = []
    if (date != '') {
      if (breakfastMenu !== null) {
        registrationList.push({ mealTypeIdx: 1, name: breakfastMenu })
      }
      if (lunchMenu !== null) {
        registrationList.push({ mealTypeIdx: 2, name: lunchMenu })
      }
      if (lunchKoreaMenu !== null) {
        registrationList.push({ mealTypeIdx: 3, name: lunchKoreaMenu })
      }
      if (dinnerMenu !== null) {
        registrationList.push({ mealTypeIdx: 5, name: dinnerMenu })
      }
      if (lunchNoodleMenu !== null) {
        registrationList.push({ mealTypeIdx: 4, name: lunchNoodleMenu })
      }
      if (ramenMenu !== null) {
        registrationList.push({ mealTypeIdx: 6, name: ramenMenu })
      }
      if (kimbabMenu !== null) {
        registrationList.push({ mealTypeIdx: 7, name: kimbabMenu })
      }
      if (hotdogMenu !== null) {
        registrationList.push({ mealTypeIdx: 8, name: hotdogMenu })
      }
      if (chickenMenu !== null) {
        registrationList.push({ mealTypeIdx: 9, name: chickenMenu })
      }
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null)
        // loading 상태를 true 로 바꿉니다.
        setLoading(true)

        // axios     .defaults     .headers     .common['x-access-token'] = jwt

        const response = await axios
          .post(
            `${IP}/menus`,
            {
              availableAt: date,
              menus: registrationList,
            },
            {
              headers: {
                'x-access-token': jwt,
              },
            },
          )
          .then((response) => {
            if (response.data.code === 1000) {
              alert(`${date} 식단이 등록 되었습니다.`)
            } else {
              alert(response.data.message)
            }
          })
          .catch((error) => {})
      } catch (e) {
        setError(e)
      }
    }
    setLoading(false)
    // loading 끄기
  }

  return (
    <div>
      <CForm>
        <CCardHeader>
          <strong>날짜 등록하기</strong>
        </CCardHeader>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputDate" className="col-sm-2 col-form-label">
            날짜
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={date}
              type="text"
              id="inputDate"
              placeholder="날짜를 2022-09-15 형식으로 입력해주세요."
              onChange={(e) => {
                setDate(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CButton type="button" onClick={setDateMealTable} color="dark">
          날짜 조회하기
        </CButton>
        <CCardHeader>
          <strong>메뉴 등록하기</strong>{' '}
        </CCardHeader>
        <small>밥, 스파게티, 국, 김치 형식으로 입력해주세요.</small>
        <small>운영을 하지 않을때는 빈칸으로 입력해주세요.</small>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            조식
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={breakfastMenu}
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
              value={lunchMenu}
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
              value={lunchKoreaMenu}
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
            중식(면)
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={lunchNoodleMenu}
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setLunchNoodleMenu(e.target.value)
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
              value={dinnerMenu}
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setDinnerMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            라면
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={ramenMenu}
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setRamenMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            김밥
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={kimbabMenu}
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setKimbabMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            핫도그
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={hotdogMenu}
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setHotdogMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            치킨
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={chickenMenu}
              type="text"
              id="inputMenu"
              onChange={(e) => {
                setChickenMenu(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        {isMenu ? (
          <CButton type="button" onClick={mealTableRegistration}>
            수정하기
          </CButton>
        ) : (
          <CButton type="button" onClick={mealTableRegistration}>
            등록하기
          </CButton>
        )}
      </CForm>
    </div>
  )
}

export default MealTable
