import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ReviewForm from './ReviewForm'
import { useHistory } from 'react-router-dom'
import BookForm from './BookForm'


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
              
              {currentUser ? <Nav.Link href="/books/new">Add a Book</Nav.Link> : null }
               {currentUser ?  null : <Nav.Link href="/users/new">Sign Up</Nav.Link> } 

            </Nav>
            
            {currentUser ? <Nav.Link href="/home" onClick={handleLogOut}>Logout</Nav.Link>: <Nav.Link href="/login">Login</Nav.Link> }
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}

export default NaviBar