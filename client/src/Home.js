import React from 'react'
// import { useState, useEffect } from "react";
// import SignUpForm from './SignUpForm'
// import LoginForm from './LoginForm'
import Container from 'react-bootstrap/Container';
import BooksList from './BooksList'
import BookForm from './BookForm'


function Home({ currentUser, updateUser, books, reviews }) {

    
    return(
        <div>
            <Container>
                <BooksList books={books} reviews={reviews} />
                
            </Container>
        </div>
    )
}

export default Home