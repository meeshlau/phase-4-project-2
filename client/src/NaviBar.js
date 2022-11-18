import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NaviBar({ currentUser, updateUser }) {
    const [menu, setMenu] = useState(false)

    const handleLogOut = () => {
        fetch(`/logout`, {
            method: 'DELETE'
        })
        updateUser(false)
    }
    return(
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Keiki Books</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/users/new">Sign Up</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
                {currentUser ? <Button variant='light' className='me-2' onClick={handleLogOut}>Log Out</Button> : null }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NaviBar