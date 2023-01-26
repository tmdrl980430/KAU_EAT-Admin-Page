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

const TicketRegistration = () => {
  const now = new Date()
  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [name, setName] = useState('')
  const [userId, setUserId] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [point, setPoint] = useState('')

  useEffect(() => {
    console.log(jwt)
  }, [])

  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
    console.log(jwt)
  }, [])

  const pointRegistration = async () => {
    console.log('pointRegistration')
    setLoading(true)

    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      console.log('pointRegistration_try')
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      // axios     .defaults     .headers     .common['x-access-token'] = jwt

      const response = await axios
        .patch(
          `${IP}/users/point`,
          {
            name: name,
            phoneNumber: phoneNum,
            point: point,
            id: userId,
          },
          {
            headers: {
              'x-access-token': jwt,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 1000) {
            alert(`${name} 포인트 등록 완료`)
            setName('')
            setUserId('')
            setPhoneNum('')
            setPoint('')
          } else if (response.data.code === 2023) {
            alert(`존재하지 않는 유저입니다.`)
            setName('')
            setUserId('')
            setPhoneNum('')
            setPoint('')
          } else if (response.data.code === 2002) {
            alert(`아이디의 길이를 확인해주세요.`)
            setUserId('')
          } else if (response.data.code === 2022) {
            alert(`포인트는 0보다 큰 값을 입력해주세요.`)
            setPoint('')
          } else if (response.data.code === 2021) {
            alert(`포인트를 입력해주세요.`)
            setPoint('')
          }
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

    setLoading(false)
    // loading 끄기
  }

  const handleKeyPress = (e) => {
    if (e.key !== 'Enter') {
    }
  }

  return (
    <div>
      <CForm>
        <CCardHeader>
          <strong>포인트 등록 및 수정</strong>
        </CCardHeader>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputDate" className="col-sm-2 col-form-label">
            이름
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={name}
              type="text"
              id="inputDate"
              placeholder="가입한 이름을 입력해주세요."
              onChange={(e) => {
                setName(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputDate" className="col-sm-2 col-form-label">
            아이디
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={userId}
              type="text"
              id="inputDate"
              placeholder="가입한 아이디를 입력해주세요."
              onChange={(e) => {
                setUserId(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputDate" className="col-sm-2 col-form-label">
            전화번호
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={phoneNum}
              type="text"
              id="inputDate"
              placeholder="전화번호를 010xxxxxxxx 형식으로 입력해주세요."
              onChange={(e) => {
                setPhoneNum(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            포인트
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={point}
              type="text"
              id="inputMenu"
              placeholder="등록할 포인트를 입력해주세요."
              onChange={(e) => {
                setPoint(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CButton type="submit" onClick={pointRegistration}>
          등록하기
        </CButton>
      </CForm>
    </div>
  )
}

export default TicketRegistration
