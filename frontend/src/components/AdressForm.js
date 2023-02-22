import React from 'react'
import { Form, Button, Row, Container, Col } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import countries from '../countries.json'

const YupValidation = Yup.object().shape({
  street_name: Yup.string()
  .min(2, 'Too Short!')
  .required('Field Required!'),
  street_number: Yup.string()
  .min(0, 'Too Low!')
  .max(10, 'Too High!'),
  city: Yup.string()
  .min(1, 'Too Short!')
  .max(85, 'Too High!')
  .required('Field Required!'),
  zipcode: Yup.string()
  .max(10, 'Too High!')
  .matches(/^[0-9]{5}$/, 'Zipcode must have 5 numbers'),
  country: Yup.string()
  .required('Field Required!')
});

const initValues = {
  street_name: '',
  street_number: '',
  city: '',
  zipcode: '',
  country: 'AF'
}

const handleSubmit = (values) => {
  console.log(values);
}

const AdressForm = () => {
  return (
    <Formik
      initialValues={initValues}
      validationSchema={YupValidation}
      onSubmit={(values, err, touched) => handleSubmit(values)} 
    >
      {({
        handleSubmit,
        handleChange,
        errors,
        touched,
        values}) => (
          <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
            <Form.Label>Street address</Form.Label>
            <Col>
              <Form.Group className="mb-3 required" controlId="formStreetName">
                <Form.Control type="text" placeholder="Enter street name*" value={`${values.street_name}`} name="street_name" onChange={handleChange}/>
                <ErrorMessage name="street_name">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formStreetNumber">
              <Form.Control type="text" placeholder="Enter street number" value={values.street_number} name="street_number" onChange={handleChange}/>
              <ErrorMessage name="street_number">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
              </Form.Group>
            </Col>  
            </Row>
            <Row>
              <Form.Label>City</Form.Label>
              <Col>
                <Form.Group className="mb-3 required" controlId="formCity">
                  <Form.Control type="text" placeholder="Enter city name*" value={values.city} name="city" onChange={handleChange}/>
                  <ErrorMessage name="city">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group className="mb-3" controlId="formZipcode">
                <Form.Control type="text" placeholder="Enter zipcode" value={values.zipcode} name="zipcode" onChange={handleChange}/>
                <ErrorMessage name="zipcode">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
              </Form.Group>
              </Col>
            </Row>
            <Row>
            <Form.Label>Country*</Form.Label>
              <Col>
              <Form.Group className="mb-3 required" controlId="formCountry">
                <Form.Select value={values.country} name="country" onChange={handleChange}>
                    {countries.map((country) => {
                      return <option key={country.code} value={country.code}>{country.name}</option>
                    })}
                </Form.Select>
                <ErrorMessage name="country">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                </Form.Group>
              </Col>
              <Col>
              <Button variant="primary" type="submit">Submit</Button>
              </Col>
            </Row>
            <Row>
            <Form.Text className="text-muted">
              *Field is required.
            </Form.Text>
            </Row>
          </Container>
        </Form>
        )}
    </Formik>
  )
}

export default AdressForm