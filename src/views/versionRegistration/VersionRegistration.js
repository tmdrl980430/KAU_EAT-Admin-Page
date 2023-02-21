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

const VersionRegistration = () => {
  const now = new Date()
  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)

  const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000 // 현재 시간을 utc로 변환한 밀리세컨드값
  const koreaTimeDiff = 9 * 60 * 60 * 1000 // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
  const koreaNow = new Date(utcNow + koreaTimeDiff) // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [version, setVersion] = useState('')
  const [currentVersion, setCurrentVersion] = useState('')

  useEffect(() => {
    setJwt(localStorage.getItem('jwt-token'))
    getVeriosn()
  }, [])

  const veriosnRegistration = async () => {
    setLoading(true)

    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      // axios     .defaults     .headers     .common['x-access-token'] = jwt

      const response = await axios
        .post(
          `${IP}/versions`,
          {
            version: version,
          },
          {
            headers: {
              'x-access-token': jwt,
            },
          },
        )
        .then((response) => {
          if (response.data.code === 1000) {
            alert(`버전 업데이트 완료`)
            setCurrentVersion(version)
          } else {
            alert(response.data.message)
          }
        })
        .catch((error) => {})
    } catch (e) {
      setError(e)
    }

    setLoading(false)
    // loading 끄기
  }

  const getVeriosn = async () => {
    setLoading(true)

    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      // axios     .defaults     .headers     .common['x-access-token'] = jwt

      const response = await axios
        .get(`${IP}/versions`, {
          headers: {
            'x-access-token': jwt,
          },
        })
        .then((response) => {
          if (response.data.code === 1000) {
            setVersion(response.data.result.version)
            setCurrentVersion(response.data.result.version)
          }
        })
        .catch((error) => {})
    } catch (e) {
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
          <strong>버전 관리</strong>
        </CCardHeader>
        <small>
          현재 버전은 {currentVersion}입니다. 어플의 업데이트가 완료된 후 새로운 버전을
          입력해주세요.
        </small>
        <CRow className="mb-3">
          <CFormLabel htmlFor="inputMenu" className="col-sm-2 col-form-label">
            버전
          </CFormLabel>
          <CCol sm={10}>
            <CFormInput
              value={version}
              type="text"
              id="inputMenu"
              placeholder="등록할 포인트를 입력해주세요."
              onChange={(e) => {
                setVersion(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CButton type="submit" onClick={veriosnRegistration}>
          등록하기
        </CButton>
      </CForm>
    </div>
  )
}

export default VersionRegistration
