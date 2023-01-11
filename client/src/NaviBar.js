import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import ReviewForm from './ReviewForm'
import { useHistory } from 'react-router-dom'
import BookForm from './BookForm'


function NaviBar({ currentUser,  onLogOut }) {

    function handleLogOut() {
        fetch('/logout', {
            method: "DELETE",
        }).then(() => onLogOut())
    }


    return(
        <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">Keiki Books</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              
              {currentUser  ? <Nav.Link href="/books/new">Add a Book</Nav.Link> : null }
                {currentUser ?  null : <Nav.Link href="/users/new">Sign Up</Nav.Link> } 

            </Nav>
            
            {currentUser ? null : <Nav.Link href="/login">Login</Nav.Link> }
          </Navbar.Collapse>
            {currentUser ? <Button onClick={handleLogOut}>Logout</Button> : null }
        </Container>
      </Navbar>
    )
}

export default NaviBar