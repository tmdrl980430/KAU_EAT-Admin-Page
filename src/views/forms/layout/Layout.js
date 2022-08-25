import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const Layout = () => {
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Layout</strong> <small>Horizontal form</small>
          </CCardHeader>
          <CCardBody>
            <p className="text-medium-emphasis small">
              Create horizontal forms with the grid by adding the <code>.row</code> class to form
              groups and using the <code>.col-*-*</code> classes to specify the width of your labels
              and controls. Be sure to add <code>.col-form-label</code> to your{' '}
              <code>&lt;CFormLabel&gt;</code>s as well so they&#39;re vertically centered with their
              associated form controls.
            </p>
            <p className="text-medium-emphasis small">
              At times, you maybe need to use margin or padding utilities to create that perfect
              alignment you need. For example, we&#39;ve removed the <code>padding-top</code> on our
              stacked radio inputs label to better align the text baseline.
            </p>
            <DocsExample href="forms/layout#horizontal-form">
              <CForm>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputEmail3" className="col-sm-2 col-form-label">
                    Email
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="email" id="inputEmail3" />
                  </CCol>
                </CRow>
                <CRow className="mb-3">
                  <CFormLabel htmlFor="inputPassword3" className="col-sm-2 col-form-label">
                    Password
                  </CFormLabel>
                  <CCol sm={10}>
                    <CFormInput type="password" id="inputPassword3" />
                  </CCol>
                </CRow>
                <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">Radios</legend>
                  <CCol sm={10}>
                    <CFormCheck
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="option1"
                      label="First radio"
                      defaultChecked
                    />
                    <CFormCheck
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="option2"
                      label="Second radio"
                    />
                    <CFormCheck
                      type="radio"
                      name="gridRadios"
                      id="gridRadios3"
                      value="option3"
                      label="Third disabled radio"
                      disabled
                    />
                  </CCol>
                </fieldset>
                <CRow className="mb-3">
                  <div className="col-sm-10 offset-sm-2">
                    <CFormCheck type="checkbox" id="gridCheck1" label="Example checkbox" />
                  </div>
                </CRow>
                <CButton type="submit">Sign in</CButton>
              </CForm>
            </DocsExample>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Layout
