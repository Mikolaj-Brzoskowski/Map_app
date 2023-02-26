import React from 'react'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { lorem_ipsum } from '../lorem_ipsum'
import { Link } from 'react-router-dom'

const Home = () => {

  const history = useSelector(state => state.history)

  return (
    <Container>
      <Row>
          <p className="text-center">Welcome to MapApp. Here you can check the route to the destination along with the cost of the trip.</p>
          <p className="text-center">{lorem_ipsum}</p>
      </Row>
      <Row id="history">
          <h1 className="text-center">History</h1>
      </Row>
      <Row>
        {history.history.map( (el, i) => (
          <Col className="d-flex justify-content-center m-1" key={`${i}`}>
          <Card style={{ width: '18rem' }}>
            <Card.Body className='d-flex flex-column'>
              <Card.Title>From: {el.sourceAddress.label}</Card.Title>
              <Card.Title>To: {el.targetAddress.label}</Card.Title>
              <Card.Text>
                Duration: {Math.round(el.summary.duration / 60)} min <br/>
                Distance: {Math.round((el.summary.length / 1000) * 100) / 100}km 
              </Card.Text>
              <Button variant="primary" className='mt-auto'><Link to={`/history/${i}`} className="text-decoration-none text-reset">Go to the route details</Link></Button>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Home