import React from 'react'
import { Form, Button, Row, Container, Col, FloatingLabel } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import countries from '../countries.json'
import { useNavigate } from 'react-router-dom'

const YupValidation = Yup.object().shape({
  start_street_name: Yup.string()
  .min(2, 'Too Short!')
  .required('Field Required!'),
  start_street_number: Yup.string()
  .min(0, 'Too Low!')
  .max(10, 'Too High!'),
  start_city: Yup.string()
  .min(1, 'Too Short!')
  .max(85, 'Too High!')
  .required('Field Required!'),
  start_zipcode: Yup.string()
  .max(10, 'Too High!')
  .matches(/^[0-9]{5}$/, 'start_zipcode must have 5 numbers'),
  start_country: Yup.string()
  .required('Field Required!'),
  end_street_name: Yup.string()
  .min(2, 'Too Short!')
  .required('Field Required!'),
  end_street_number: Yup.string()
  .min(0, 'Too Low!')
  .max(10, 'Too High!'),
  end_city: Yup.string()
  .min(1, 'Too Short!')
  .max(85, 'Too High!')
  .required('Field Required!'),
  end_zipcode: Yup.string()
  .max(10, 'Too High!')
  .matches(/^[0-9]{5}$/, 'start_zipcode must have 5 numbers'),
  end_country: Yup.string()
  .required('Field Required!')
});

const initValues = {
  start_street_name: '',
  start_street_number: '',
  start_city: '',
  start_zipcode: '',
  start_country: 'AF',
  end_street_name: '',
  end_street_number: '',
  end_city: '',
  end_zipcode: '',
  end_country: 'AF'
}

const StartingAdressForm = () => {

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    console.log(values);
    navigate('/route')
  }

  return (
    <Formik
      initialValues={initValues}
      validationSchema={YupValidation}
      onSubmit={(values) => handleSubmit(values)} 
      >
      {({
        handleSubmit,
        handleChange,
        values}) => (
          <Form onSubmit={handleSubmit}>
            <Container>
              <Form.Label className='fs-3'>Starting Point</Form.Label>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3 required" controlId="formStartStreetName" label="Street name*">
                    <Form.Control type="text" placeholder="Enter street name*" value={`${values.start_street_name}`} name="start_street_name" onChange={handleChange}/>
                    <ErrorMessage name="start_street_name">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formStartStreetNumber" label="Street number">
                    <Form.Control type="text" placeholder="Enter street number" value={values.start_street_number} name="start_street_number" onChange={handleChange}/>
                    <ErrorMessage name="start_street_number">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>  
              </Row>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formStartCity" label="City name*">
                    <Form.Control type="text" placeholder="Enter city name*" value={values.start_city} name="start_city" onChange={handleChange}/>
                    <ErrorMessage name="start_city">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel className="mb-3" controlId="formStartZipcode" label="Zipcode">
                  <Form.Control type="text" placeholder="Enter zipcode" value={values.start_zipcode} name="start_zipcode" onChange={handleChange}/>
                  <ErrorMessage name="start_zipcode">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formStartCountry" label="Country*">
                    <Form.Select value={values.start_country} name="start_country" onChange={handleChange}>
                        {countries.map((start_country) => {
                          return <option key={start_country.code} value={start_country.code}>{start_country.name}</option>
                        })}
                    </Form.Select>
                    <ErrorMessage name="start_country">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
              </Row>
              <Form.Label className='fs-3'>Ending Point</Form.Label>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3 required" controlId="formEndStreetName" label="Street name*">
                    <Form.Control type="text" placeholder="Enter street name*" value={`${values.end_street_name}`} name="end_street_name" onChange={handleChange}/>
                    <ErrorMessage name="end_street_name">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formEndStreetNumber" label="Street number">
                    <Form.Control type="text" placeholder="Enter street number" value={values.end_street_number} name="end_street_number" onChange={handleChange}/>
                    <ErrorMessage name="end_street_number">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>  
              </Row>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formEndCity" label="City name*">
                    <Form.Control type="text" placeholder="Enter city name*" value={values.end_city} name="end_city" onChange={handleChange}/>
                    <ErrorMessage name="end_city">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formEndZipcode" label="Zipcode">
                    <Form.Control type="text" placeholder="Enter zipcode" value={values.end_zipcode} name="end_zipcode" onChange={handleChange}/>
                    <ErrorMessage name="end_zipcode">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formEndCountry" label="Country*">
                    <Form.Select value={values.end_country} name="end_country" onChange={handleChange}>
                        {countries.map((end_country) => {
                          return <option key={end_country.code} value={end_country.code}>{end_country.name}</option>
                        })}
                    </Form.Select>
                    <ErrorMessage name="end_country">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row md="6" className="justify-content-center">
                <Button type="submit" className="btn btn-primary">Calculate route</Button>
              </Row>
            </Container>
          </Form>
        )}
    </Formik>
  )
}

export default StartingAdressForm