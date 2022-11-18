import React from 'react'
import { useState, useEffect } from "react";
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import Container from 'react-bootstrap/Container';

function Home({ currentUser, updateUser }) {

    
    return(
        <div>
            <Container>
                {currentUser ? <LoginForm updateUser={updateUser}/> : <SignUpForm updateUser={updateUser}/>}
            </Container>
        </div>
    )
}

export default Home