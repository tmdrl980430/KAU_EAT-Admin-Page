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

  useEffect(() => {
    console.log(`localStorage.getItem('jwt-token')`, localStorage.getItem('jwt-token'))
    setJwt(localStorage.getItem('jwt-token'))
    if (jwt === '' || jwt === null) {
      navigate('/login')
      return
    } else {
      autoLogin()
      console.log('jwt', jwt)
    }
  }, [])

  useEffect(() => {
    console.log('id', id)
    console.log('password', password)
  }, [id, password])

  const autoLogin = async () => {
    console.log('autoLogin')

    setLoading(true)
    try {
      // 요청이 시작 할 때에는 error 와 users 를 초기화하고
      setError(null)
      console.log('autoLogin_try')
      // loading 상태를 true 로 바꿉니다.
      setLoading(true)

      const response = await axios
        .get(`${IP}/auth/jwt`, {
          headers: {
            'x-access-token': jwt,
          },
        })
        .then((response) => {
          console.log(`response code확인`, response)

          if (response.data.code === 1001) {
            console.log('자동 로그인 완료')
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

  const postLoginAdmin = async () => {
    console.log('postLoginAdmin')
    setLoading(true)

    if (id !== '' && password !== '') {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null)
        console.log('postLoginAdmin_try')
        // loading 상태를 true 로 바꿉니다.
        setLoading(true)

        const response = await axios
          .post(`${IP}/auth/login`, {
            id: id,
            password: password,
          })
          .then((response) => {
            console.log(`response 확인 : ${response.data.code}`)
            if (response.data.code === 1000) {
              setIsLogin(true)
              setJwt(response.data.result.jwt)
              setUserIdx(response.data.result.userIdx)
              localStorage.setItem('jwt-token', jwt)
              localStorage.setItem('userIdx', userIdx)
              alert('로그인 성공!')
              navigate('/')
            }
          })
          .catch((error) => {
            console.log(error)
          })
        // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
      } catch (e) {
        console.log('postLoginAdmin_catch')
        console.log(e)
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
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          비밀번호 찾기
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
