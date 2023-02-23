import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import { HashLink } from 'react-router-hash-link'

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
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/form">Route Calculation</Nav.Link>
            <Nav.Link as="div"><HashLink to="/#history" className="text-decoration-none text-reset">History</HashLink></Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavBar