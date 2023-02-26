import React, { useEffect, useState } from 'react'
import { Container, Row, InputGroup, Form, Col, Button } from 'react-bootstrap'
import { Download } from 'react-bootstrap-icons'
import { MapContainer, TileLayer, Marker, Popup, Polyline, FeatureGroup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { decode } from '../flexible-polyline/index'
import { useNavigate } from 'react-router-dom'
import { SAVE_TO_HISTORY } from '../features/HistorySlice'
import PDF from 'react-to-pdf'


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

  const ref = React.createRef();

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

  const [cost, setCost] = useState(0)

  const handleChange = (e) => {
    setCost(e.target.value);
  }

  if(stateLoaded) {
    return (
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
  } else if (sourcePosition && Object.keys(sourcePosition).length === 0 && Object.getPrototypeOf(sourcePosition) === Object.prototype) {
    navigate("/")
  }
  }
 

export default RouteCalculation