import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useRecoilState } from 'recoil'
import { severURLRecoilState } from 'src/recoil'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [IP, setIP] = useRecoilState(severURLRecoilState)
  const [id, setId] = useState('')
  const [idValidationCheck, setIdValidationCheck] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [adminKey, setAdminKey] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [passwordVaild, setPasswordVaild] = useState(false)
  const [passwordCheckVaild, setPasswordCheckVaild] = useState(false)

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/

  useEffect(() => {
    console.log('id', password)
    console.log(passwordVaild)

    if (passwordRegex.test(password) === true) {
      setPasswordVaild(true)
    } else {
      setPasswordVaild(false)
    }
  }, [password])

  useEffect(() => {
    console.log('id', passwordCheck)
    console.log(passwordCheckVaild)

    if (password === passwordCheck) {
      setPasswordCheckVaild(true)
    } else {
      setPasswordCheckVaild(false)
    }
  }, [passwordCheck])

  useEffect(() => {
    console.log('id', id)
    console.log(passwordVaild)

    if (id.length > 5) {
      setIdValidationCheck(true)
    } else {
      setIdValidationCheck(false)
    }
  }, [id])

  const postSignUpAdmin = async () => {
    console.log('postSignUpAdmin')
    setLoading(true)

    if (id !== '' && password !== '' && passwordCheck === password && idValidationCheck) {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null)
        console.log('postSignUpAdmin_try')
        // loading 상태를 true 로 바꿉니다.
        setLoading(true)
        const response = await axios
          .post(`${IP}/users`, {
            id: id,
            password: password,
            approveNumber: adminKey,
          })
          .then((response) => {
            console.log(`response 확인 : ${response.data.code}`)
            if (response.data.code === 1000) {
              alert('회원가입 성공!')
              navigate('/login')
            } else if (response.data.code === 3031) {
              alert('관리자 비밀번호가 틀렸습니다.')
            }
          })
          .catch((error) => {
            console.log('in error')
            console.log(error)
          })
        // 데이터는 response.data.code 안에 들어있다. console.log(response.data.result);
      } catch (e) {
        console.log('postSignUpAdmin_catch')
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
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>관리자 회원가입</h1>
                  <p className="text-medium-emphasis">회원가입</p>
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
                  {idValidationCheck != true && (
                    <div style={{ color: 'red' }}>아이디는 6글자 이상으로 설정해주세요.</div>
                  )}
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="비밀번호"
                      autoComplete="new-password"
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                    />
                  </CInputGroup>
                  {passwordVaild != true && (
                    <div style={{ color: 'red' }}>
                      비밀번호는 영문/숫자를 혼용 8~20자리 이내로 입력해주세요.
                    </div>
                  )}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="비밀번호 확인"
                      autoComplete="new-password"
                      onChange={(e) => {
                        setPasswordCheck(e.target.value)
                      }}
                    />
                  </CInputGroup>
                  {passwordCheckVaild != true && (
                    <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>
                  )}
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="관리자 비밀번호"
                      autoComplete="admin-password"
                      onChange={(e) => {
                        setAdminKey(e.target.value)
                      }}
                    />
                  </CInputGroup>
                  <CButton
                    color="success"
                    className="mt-3"
                    active
                    tabIndex={-1}
                    onClick={postSignUpAdmin}
                  >
                    회원가입
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
