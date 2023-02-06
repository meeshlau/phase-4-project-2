import React from 'react'
import Container from 'react-bootstrap/Container';
import BooksList from './BooksList'



function Home({ books }) {

    return(
        <div>
            <Container>
                <h3>Browse through children's books, and add your review.</h3>
                <BooksList books={books} />
            </Container>
        </div>
    )
}

export default Home