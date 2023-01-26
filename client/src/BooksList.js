import React from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import { useHistory } from 'react-router-dom'


function BooksList({ books, currentUser }) {

    const history = useHistory() 

    function handleViewReviewsClick(b) {
        history.push(`/books/${b.id}/reviews`)
    }

    function handleAddReviewClick(b) {
        history.push(`/books/${b.id}/reviews/new`)
    }

    function handleUpdateReviewsClick(b) {
        history.push(`/books/${b.id}/reviews/update`)
    }

    return(
        <div>
            <Container>
            {books.sort((a,b) => a.title.localeCompare(b.title)).map(book => 
            <Card style={{ width: '18rem' }} key={book.id}>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{book.genre}</Card.Subtitle>
                <Card.Text>
                Written By: {book.author} <br></br>
                Illustrated By: {book.illustrator}<br></br>
                </Card.Text>
                <Card.Link onClick={() => handleAddReviewClick(book)}>Review this book</Card.Link>
                <Card.Link onClick={() => handleViewReviewsClick(book)} >View reviews</Card.Link>
                {currentUser  ? <Card.Link onClick={() => handleUpdateReviewsClick(book)}>Update your review</Card.Link> : null }
            </Card.Body>
            </Card>
            )}
            </Container>
        </div>
    )
}

export default BooksList