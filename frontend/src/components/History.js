import React, { useState } from 'react'
import { Container, Row, InputGroup, Form, Col, Button } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons'
import { MapContainer, TileLayer, Marker, Popup, Polyline, FeatureGroup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { decode } from '../flexible-polyline/index.js'
import { useNavigate, useParams } from 'react-router-dom'
import PDF from 'react-to-pdf'

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

    const ref = React.createRef();

    const handleChange = (e) => {
        setCost(e.target.value);
    }

    if (sourcePosition === undefined) {
    navigate("/")
    }
    else return (
            <Container className="p-3">
            <div ref={ref}>
            <Row>
            <Col>
            <MapContainer center={[sourcePosition.lat, sourcePosition.lng]} scrollWheelZoom={true} placeholder={<MapPlaceholder/>} bounds={[[sourcePosition.lat, sourcePosition.lng],[targetPosition.lat, targetPosition.lng]]}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FeatureGroup>
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
                </FeatureGroup>
                <Polyline pathOptions={{ color: 'red' }} positions={decode(polyline).polyline}/>
            </MapContainer>
            </Col>
            </Row>
            <br/>
            <Row className="m-3">
                <InputGroup>
                <InputGroup.Text>Cost per kilometer</InputGroup.Text>
                <Form.Control type="number" aria-label="Cost per kilometer" defaultValue={cost} onChange={(e) => handleChange(e)}/>
                </InputGroup>
            </Row>
            <Row>
            <Col>
                Duration: {Math.round(summary.duration / 60)} min
            </Col>
            <Col>
                Distance: {summary.length / 1000}km
            </Col>
            <Col>
                Cost of trip: {Math.round(((summary.length / 1000) * cost) * 1.1 * 100) / 100}
            </Col>
            </Row>
            </div>
            <Row className="d-flex justify-content-center m-3">
            <PDF targetRef={ref} filename="calculation.pdf" scale={0.85}>
                {({toPdf}) => (
                    <Button type="button" variant="primary" className="w-50 m-4 m-md-0" onClick={toPdf}><Download size={20}/>&emsp;Download calculation</Button>
                )}
            </PDF>
            </Row>
        </Container>
        )
    }

export default History