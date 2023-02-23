import React, { useState } from 'react'
import { Container, Row, InputGroup, Form, Col, Button } from 'react-bootstrap'
import {MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import { Download } from 'react-bootstrap-icons'


function MapPlaceholder() {
  return (
    <p>
      Map of London.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const RouteCalculation = () => {

  const [cost, setCost ] = useState(0)

  const handleDownload = (e) => {
    //generate pdf
  }

  const handleChange = (e) => {
    setCost(e.target.value);
  }
  
  return (
    <Container className="p-3">
      <Row>
        <Col>
        <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false} placeholder={<MapPlaceholder />}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        </Col>
      </Row>
      <Row className="m-3">
        <Col md="6">
          <InputGroup> {/*className="mb-3"*/}
            <InputGroup.Text>Cost per kilometer</InputGroup.Text>
            <Form.Control type="number" aria-label="Cost per kilometer" defaultValue={cost} onChange={(e) => handleChange(e)}/>
          </InputGroup>
        </Col>
        <Col className="d-flex justify-content-center">
          <Button type="button" variant="primary" className="w-50 m-4 m-md-0" onClick={(e) => handleDownload(e)}><Download size={20}/>&emsp;Download calculation</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default RouteCalculation