import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import {
  isLoginRecoilState,
  severURLRecoilState,
  jwtRecoilState,
  userIdxRecoilState,
} from 'src/recoil'

const Login = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [IP, setIP] = useRecoilState(severURLRecoilState)

  const [isLogin, setIsLogin] = useRecoilState(isLoginRecoilState)
  const [jwt, setJwt] = useRecoilState(jwtRecoilState)
  const [userIdx, setUserIdx] = useRecoilState(userIdxRecoilState)

  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const postLoginAdmin = async () => {
    setLoading(true)

    if (id !== '' && password !== '') {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null)
        // loading 상태를 true 로 바꿉니다.
        setLoading(true)

        const response = await axios
          .post(`${IP}/auth/login`, {
            id: id,
            password: password,
          })
          .then((response) => {
            if (response.data.code === 1000) {
              setIsLogin(true)
              setJwt(response.data.result.jwt)
              setUserIdx(response.data.result.userIdx)
              localStorage.setItem('jwt-token', response.data.result.jwt)
              localStorage.setItem('userIdx', response.data.result.userIdx)
              navigate('/')
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
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>관리자 로그인</h1>
                    <p className="text-medium-emphasis">항식당 관리자 로그인입니다.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="아이디"
                        autoComplete="username"
                        onChange={(e) => {
                          setId(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="비밀번호"
                        autoComplete="current-password"
                        onChange={(e) => {
                          setPassword(e.target.value)
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={postLoginAdmin}>
                          로그인
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>관리자 회원가입</h2>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        관리자 회원가입하기
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
