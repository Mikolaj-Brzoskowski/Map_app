import React, { useEffect, useState } from 'react'
import { Container, Row, InputGroup, Form, Col, Button } from 'react-bootstrap'
import {MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Download } from 'react-bootstrap-icons'
import { useSelector, useDispatch } from 'react-redux'


function MapPlaceholder() {
  return (
    <p>
      Map of London.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const RouteCalculation = () => {

  const sourcePosition = useSelector(state => state.geolocation.sourcePosition)
  const targetPosition = useSelector(state => state.geolocation.targetPosition)
  const sourceAddress = useSelector(state => state.geolocation.sourceAddress)
  const targetAddress = useSelector(state => state.geolocation.targetAddress)

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
        <MapContainer center={[sourcePosition.lat, sourcePosition.lng]} zoom={13} scrollWheelZoom={false} placeholder={<MapPlaceholder />}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[sourcePosition.lat, sourcePosition.lng]}>
            <Popup>
              {sourceAddress.label}
            </Popup>
          </Marker>
          <Marker position={[targetPosition.lat, targetPosition.lng]}>
            <Popup>
            {targetAddress.label}
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