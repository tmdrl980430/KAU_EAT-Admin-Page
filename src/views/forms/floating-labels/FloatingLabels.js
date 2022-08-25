import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CFormLabel,
  CFormFloating,
  CFormSelect,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const FloatingLabels = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>React Floating labels (Login)</strong>
          </CCardHeader>
          <CCardBody>
            <DocsExample href="forms/floating-labels">
              <CFormFloating className="mb-3">
                <CFormInput type="email" id="floatingInput" placeholder="name@example.com" />
                <CFormLabel htmlFor="floatingInput">Email address</CFormLabel>
              </CFormFloating>
              <CFormFloating>
                <CFormInput type="password" id="floatingPassword" placeholder="Password" />
                <CFormLabel htmlFor="floatingPassword">Password</CFormLabel>
              </CFormFloating>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FloatingLabels
