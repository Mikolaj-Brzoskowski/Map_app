import React, { useEffect, useState } from 'react'
import { Container, Row, InputGroup, Form, Col } from 'react-bootstrap'
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import PdfGenerator from './PDFGen'
import { useSelector, useDispatch } from 'react-redux'
import { decode } from '../flexible-polyline/index'
import { useNavigate } from 'react-router-dom'
import { SAVE_TO_HISTORY } from '../features/HistorySlice'


function MapPlaceholder() {
  return (
    <p>
      Map of London.{' '}
      <noscript>You need to enable JavaScript to see this map.</noscript>
    </p>
  )
}

const RouteCalculation = () => {

  const sourcePosition = useSelector(state => state.heredata.sourcePosition)
  const targetPosition = useSelector(state => state.heredata.targetPosition)
  const sourceAddress = useSelector(state => state.heredata.sourceAddress)
  const targetAddress = useSelector(state => state.heredata.targetAddress)
  const summary = useSelector(state => state.heredata.summary)
  const polyline = useSelector(state => state.heredata.encoded_polyline)
  const state = useSelector(state => state.heredata)

  const [isFirstRender, setFirstRender] = useState(true);
  const [stateLoaded, setStateLoaded] = useState();
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (summary === "") {
      setStateLoaded(false)
    }
    else setStateLoaded(true)
  }, [])

  useEffect(() => {
    if (isFirstRender) {
      setFirstRender(false);
      return;
    }
    setStateLoaded(true);
    dispatch(SAVE_TO_HISTORY(state))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summary])

  const [cost, setCost ] = useState(0)

  const handleDownload = (e) => {
    //generate pdf
  }

  const handleChange = (e) => {
    setCost(e.target.value);
  }

  if(stateLoaded) {
    return (
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
  } else if (sourcePosition && Object.keys(sourcePosition).length === 0 && Object.getPrototypeOf(sourcePosition) === Object.prototype) {
    navigate("/")
  }
  }
 

export default RouteCalculation