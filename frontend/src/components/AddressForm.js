import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Container, Col, FloatingLabel } from 'react-bootstrap'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import countries from '../countries.json'
import { useNavigate } from 'react-router-dom'
import { GetHereData, GetSummaryAndPolyline } from '../features/HereDataSlice'
import { useDispatch, useSelector } from 'react-redux'

const YupValidation = Yup.object().shape({
  start: Yup.object().shape({
    street: Yup.string()
    .min(2, 'Too Short!')
    .required('Field Required!'),
    number: Yup.string()
    .min(0, 'Too Low!')
    .max(10, 'Too High!'),
    city: Yup.string()
    .min(1, 'Too Short!')
    .max(85, 'Too High!')
    .required('Field Required!'),
    zipcode: Yup.string()
    .max(10, 'Too High!')
    .matches(/^[0-9]{5}$/, 'start_zipcode must have 5 numbers'),
    country: Yup.string()
    .required('Field Required!'),
  }),
  end: Yup.object().shape({
    street: Yup.string()
    .min(2, 'Too Short!')
    .required('Field Required!'),
    number: Yup.string()
    .min(0, 'Too Low!')
    .max(10, 'Too High!'),
    city: Yup.string()
    .min(1, 'Too Short!')
    .max(85, 'Too High!')
    .required('Field Required!'),
    zipcode: Yup.string()
    .max(10, 'Too High!')
    .matches(/^[0-9]{5}$/, 'start_zipcode must have 5 numbers'),
    country: Yup.string()
    .required('Field Required!'),
  })
});

const initValues = {
  start: {
    street: '',
    number: '',
    city: '',
    zipcode: '',
    country: 'AF',
  },
  end: {
    street: '',
    number: '',
    city: '',
    zipcode: '',
    country: 'AF'
  }
}

const StartingAdressForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const sourcePosition = useSelector(state => state.heredata.sourcePosition)
  const targetPosition = useSelector(state => state.heredata.targetPosition)

  const [isFirstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    else if (Object.keys(targetPosition).length !== 0){
      const fetchData = async () => {
        await dispatch(GetSummaryAndPolyline(sourcePosition, targetPosition))
      }
      fetchData().then(navigate('/route'));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetPosition])


  const handleSubmit = async (values) => {
    await dispatch(GetHereData(values));
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
                    <Form.Control type="text" placeholder="Enter street name*" value={`${values.start.street}`} name="start.street" onChange={handleChange}/>
                    <ErrorMessage name="start.street">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formStartStreetNumber" label="Street number">
                    <Form.Control type="text" placeholder="Enter street number" value={values.start.number} name="start.number" onChange={handleChange}/>
                    <ErrorMessage name="start.number">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>  
              </Row>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3 required" controlId="formStartCity" label="City name*">
                    <Form.Control type="text" placeholder="Enter city name*" value={values.start.city} name="start.city" onChange={handleChange}/>
                    <ErrorMessage name="start.city">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
                <Col>
                <FloatingLabel className="mb-3" controlId="formStartZipcode" label="Zipcode">
                  <Form.Control type="text" placeholder="Enter zipcode" value={values.start.zipcode} name="start.zipcode" onChange={handleChange}/>
                  <ErrorMessage name="start.zipcode">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3 required" controlId="formStartCountry" label="Country*">
                    <Form.Select value={values.start.country} name="start.country" onChange={handleChange}>
                        {countries.map((start_country) => {
                          return <option key={start_country.code} value={start_country.name}>{start_country.name}</option>
                        })}
                    </Form.Select>
                    <ErrorMessage name="start.country">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
              </Row>
              <Form.Label className='fs-3'>Destination Point</Form.Label>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3 required" controlId="formEndStreetName" label="Street name*">
                    <Form.Control type="text" placeholder="Enter street name*" value={`${values.end.street}`} name="end.street" onChange={handleChange}/>
                    <ErrorMessage name="end.street">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formEndStreetNumber" label="Street number">
                    <Form.Control type="text" placeholder="Enter street number" value={values.end.number} name="end.number" onChange={handleChange}/>
                    <ErrorMessage name="end.number">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>  
              </Row>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3 required" controlId="formEndCity" label="City name*">
                    <Form.Control type="text" placeholder="Enter city name*" value={values.end.city} name="end.city" onChange={handleChange}/>
                    <ErrorMessage name="end.city">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
                <Col>
                  <FloatingLabel className="mb-3" controlId="formEndZipcode" label="Zipcode">
                    <Form.Control type="text" placeholder="Enter zipcode" value={values.end.zipcode} name="end.zipcode" onChange={handleChange}/>
                    <ErrorMessage name="end.zipcode">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
                  </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FloatingLabel className="mb-3 required" controlId="formEndCountry" label="Country*">
                    <Form.Select value={values.end.country} name="end.country" onChange={handleChange}>
                        {countries.map((end_country) => {
                          return <option key={end_country.code} value={end_country.name}>{end_country.name}</option>
                        })}
                    </Form.Select>
                    <ErrorMessage name="end.country">{msg => <div className="alert alert-danger" role="alert">{msg}</div>}</ErrorMessage>
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