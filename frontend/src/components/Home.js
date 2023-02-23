import React from 'react'
import { Container, Row, Col, Card, Button, Placeholder } from 'react-bootstrap'
import { lorem_ipsum } from '../lorem_ipsum'

const Home = () => {
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
        <Col className="d-flex justify-content-center m-1" key="history-0">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>From: Starting address</Card.Title>
              <Card.Title>To: Ending address</Card.Title>
              <Card.Text>
                Cost: Here will go cost of the trip
              </Card.Text>
              <Button variant="primary">Go to the details with route</Button>
            </Card.Body>
          </Card>
        </Col>
        {Array(4).fill().map((e, idx) => (
        <Col className="d-flex justify-content-center m-1" key={`history-${idx}`}>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={3} /> <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder xs={2} /> <Placeholder xs={6} />
              </Placeholder>
              <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={3} /> <Placeholder xs={8} />
              </Placeholder>
              <Placeholder.Button variant="primary" xs={10} />
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Home