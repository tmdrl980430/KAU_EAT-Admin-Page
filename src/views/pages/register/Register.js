import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [id, setId] = useState('')
  const [idValidationCheck, setIdValidationCheck] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [adminKey, setAdminKey] = useState('')

  useEffect(() => {
    console.log('id', id)
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
          .post(`http://3.38.35.114/admin/users`, {
            id: id,
            password: password,
            approveNumber: adminKey,
          })
          .then((response) => {
            console.log(`response 확인 : ${response.data.code}`)
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
                  <div className="d-grid">
                    <CButton color="success" onClick={postSignUpAdmin}>
                      회원가입
                    </CButton>
                  </div>
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
