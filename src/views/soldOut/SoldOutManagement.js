import React, { useEffect, useState } from 'react'
import { CButton, CForm, CFormLabel, CRow } from '@coreui/react'
import { useRecoilState } from 'recoil'
import { jwtRecoilState, severURLRecoilState } from 'src/recoil'
import axios from 'axios'
import Select from 'react-select'
import { configs } from 'eslint-plugin-prettier'

const SoldOutManagement = () => {
  const now = new Date()

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)

  const [choice, setChoice] = useState(0)

  const onChange = (value) => {}

  const options = [
    { value: 'ACTIVE', label: '정상 운영' },
    { value: 'SOLDOUT', label: '품절' },
  ]
  const [breakfastMenuStatus, setBreakfastMenuStatus] = useState('ACTIVE')
  const [lunchMenuStatus, setLunchMenuStatus] = useState('ACTIVE')
  const [lunchKoreaMenuStatus, setLunchKoreaMenuStatus] = useState('ACTIVE')
  const [dinnerMenuStatus, setDinnerMenuStatus] = useState('ACTIVE')
  const [lunchNoodleMenuStatus, setLunchNoodleMenuStatus] = useState('ACTIVE')
  const [ramenMenuStatus, setRamenMenuStatus] = useState('ACTIVE')
  const [kimbabMenuStatus, setkimbabMenuStatus] = useState('ACTIVE')
  const [hotdogMenuStatus, setHotdogMenuStatus] = useState('ACTIVE')
  const [chickenMenuStatus, setChickenMenuStatus] = useState('ACTIVE')

  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
    if (jwt !== '') {
      getDateMealTable()
    }
  }, [])

  const getDateMealTable = async () => {
    setLoading(true)

    if (today != '') {
      try {
        setError(null)
        setLoading(true)

        const response = await axios
          .get(`${IP}/menus?date=${today}`, {
            headers: {
              'x-access-token': jwt,
            },
          })
          .then((response) => {
            if (response.data.code === 1000) {
              for (let i = 0; i < response.data.result.menus.length; i++) {
                if (response.data.result.menus[i].mealTypeIdx === 1) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setBreakfastMenuStatus('SOLDOUT')
                  }
                } else if (response.data.result.menus[i].mealTypeIdx === 2) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setLunchMenuStatus('SOLDOUT')
                  }
                } else if (response.data.result.menus[i].mealTypeIdx === 3) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setLunchKoreaMenuStatus('SOLDOUT')
                  }
                } else if (response.data.result.menus[i].mealTypeIdx === 4) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setLunchNoodleMenuStatus('SOLDOUT')
                  }
                } else if (response.data.result.menus[i].mealTypeIdx === 5) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setDinnerMenuStatus('SOLDOUT')
                  }
                } else if (response.data.result.menus[i].mealTypeIdx === 6) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setRamenMenuStatus('SOLDOUT')
                  }
                } else if (response.data.result.menus[i].mealTypeIdx === 7) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setkimbabMenuStatus('SOLDOUT')
                  }
                } else if (response.data.result.menus[i].mealTypeIdx === 8) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setHotdogMenuStatus('SOLDOUT')
                  }
                } else if (response.data.result.menus[i].mealTypeIdx === 9) {
                  if (response.data.result.menus[i].menuStatus === '품절') {
                    setChickenMenuStatus('SOLDOUT')
                  }
                }
              }
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

  const today =
    String(koreaNow.getFullYear()) +
    '-' +
    String(koreaNow.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(koreaNow.getDate()).padStart(2, '0')

  const patchSoldOut = async () => {
    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .patch(
          `${IP}/menus/menu-status`,
          {
            date: today,
            mealTypeAndStatus: [
              {
                mealTypeIdx: 1,
                menuStatus: breakfastMenuStatus,
              },
              {
                mealTypeIdx: 2,
                menuStatus: lunchMenuStatus,
              },
              {
                mealTypeIdx: 3,
                menuStatus: lunchKoreaMenuStatus,
              },
              {
                mealTypeIdx: 4,
                menuStatus: lunchNoodleMenuStatus,
              },
              {
                mealTypeIdx: 5,
                menuStatus: dinnerMenuStatus,
              },
              {
                mealTypeIdx: 6,
                menuStatus: ramenMenuStatus,
              },
              {
                mealTypeIdx: 7,
                menuStatus: kimbabMenuStatus,
              },
              {
                mealTypeIdx: 8,
                menuStatus: hotdogMenuStatus,
              },
              {
                mealTypeIdx: 9,
                menuStatus: chickenMenuStatus,
              },
            ],
          },
          {
            headers: {
              'x-access-token': jwt,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 1000) {
            alert('등록되었습니다.')
          }
          getDateMealTable()
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
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === breakfastMenuStatus
            })}
            defaultValue={breakfastMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setBreakfastMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            중식 | 일품
          </CFormLabel>
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === lunchMenuStatus
            })}
            defaultValue={lunchMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setLunchMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            중식 | 한식
          </CFormLabel>
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === lunchKoreaMenuStatus
            })}
            defaultValue={lunchKoreaMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setLunchKoreaMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            중식(면)
          </CFormLabel>
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === lunchNoodleMenuStatus
            })}
            defaultValue={lunchNoodleMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setLunchNoodleMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            석식
          </CFormLabel>
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === dinnerMenuStatus
            })}
            defaultValue={dinnerMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setDinnerMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            라면
          </CFormLabel>
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === ramenMenuStatus
            })}
            defaultValue={ramenMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setRamenMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            김밥
          </CFormLabel>
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === kimbabMenuStatus
            })}
            defaultValue={kimbabMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setkimbabMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            핫도그
          </CFormLabel>
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === hotdogMenuStatus
            })}
            defaultValue={hotdogMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setHotdogMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            치킨
          </CFormLabel>
          <Select
            styles={{
              // zIndex
              menu: (provided) => ({ ...provided, zIndex: 999 }),
            }}
            value={options.find((op) => {
              // choice state에 따라 디폴트 option 세팅
              return op.value === chickenMenuStatus
            })}
            defaultValue={chickenMenuStatus}
            onChange={(value) => {
              onChange(value.value)
              setChickenMenuStatus(value.value)
            }}
            options={options}
          />
        </CRow>
        <CButton type="submit" onClick={patchSoldOut}>
          등록하기
        </CButton>
      </CForm>
    </>
  )
}

export default SoldOutManagement
