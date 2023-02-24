import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { HashLink } from 'react-router-hash-link'
import { Link } from 'react-router-dom'

const NavBar = () => {

  return (
    <Navbar bg="dark" variant="dark" sticky="top">
        <Container className={"m-0"}>
          <Navbar.Brand>
          <img
              src="map.png"
              width="40"
              height="40"
              className="d-inline-block align-top"
              alt="Map Marker icon by Icons8"
            />
            </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as="div"><Link to="/" className="text-decoration-none text-reset">Home</Link></Nav.Link>
            <Nav.Link as="div"><Link to="/form" className="text-decoration-none text-reset">Route Calculation</Link></Nav.Link>
            <Nav.Link as="div"><HashLink to="/#history" className="text-decoration-none text-reset">History</HashLink></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar