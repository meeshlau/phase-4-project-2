import React from 'react'
// import SignUpForm from './SignUpForm'
// import LoginForm from './LoginForm'
import Container from 'react-bootstrap/Container';
import BooksList from './BooksList'


function Home({ books, reviews, selectedBook, setSelectedBook, users }) {


    
    return(
        <div>
            <Container>
                <BooksList books={books} reviews={reviews} selectedBook={selectedBook} setSelectedBook={setSelectedBook} />
            </Container>
        </div>
    )
}

export default Home