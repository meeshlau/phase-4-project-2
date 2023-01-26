import React from 'react'
// import SignUpForm from './SignUpForm'
// import LoginForm from './LoginForm'
import Container from 'react-bootstrap/Container';
import BooksList from './BooksList'


function Home({ books, reviews, currentUser }) {


    
    return(
        <div>
            <Container>
                <BooksList books={books} reviews={reviews} currentUser={currentUser} />
            </Container>
        </div>
    )
}

export default Home