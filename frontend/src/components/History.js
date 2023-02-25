import React, { useState } from 'react'
import { Container, Row, InputGroup, Form, Col } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { decode } from '../flexible-polyline/index'
import { useNavigate, useParams } from 'react-router-dom'
import PdfGenerator from './PDFGen'


function MapPlaceholder() {
  return (
    <p>
      Map of London.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const History = () => {

    const { id } = useParams()

    const sourcePosition = useSelector(state => state.history.history[id].sourcePosition)
    const targetPosition = useSelector(state => state.history.history[id].targetPosition)
    const sourceAddress = useSelector(state => state.history.history[id].sourceAddress)
    const targetAddress = useSelector(state => state.history.history[id].targetAddress)
    const summary = useSelector(state => state.history.history[id].summary)
    const polyline = useSelector(state => state.history.history[id].encoded_polyline)

    const navigate = useNavigate()

    const [cost, setCost ] = useState(0)

    const handleChange = (e) => {
        setCost(e.target.value);
    }

    if (sourcePosition === undefined) {
    navigate("/")
    }
    else return (
        <Container className="p-3" id="calculation">
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
                <Polyline pathOptions={{ color: 'red' }} positions={decode(polyline).polyline}/>
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
                <PdfGenerator 
                downloadFileName="Calculation" 
                rootElementId="calculation" 
                />
            </Col>
            </Row>
            <Row>
            <Col>
                {Object.keys(summary).map( (key) => (
                <div key={key}>
                {key}: {summary[key]}
                </div>))}
            </Col>
            <Col>
                Cost of trip: <br/>
                {Math.round(((summary.length / 1000) * cost) * 1.1 * 100) / 100}
            </Col>
            </Row>
            <Row>
            <Col>
            </Col>
            <Col>
            </Col>
            </Row>
        </Container>
        )
    }

export default History