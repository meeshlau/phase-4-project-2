import React from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import { useHistory, useLocation } from 'react-router-dom'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReviewForm from './ReviewForm';

function BooksList({ books }) {

    const history = useHistory() 

    function handleViewReviewsClick(b) {
        history.push(`/books/${b.id}/reviews`)
    }

    function handleAddReviewClick(b) {
        history.push(`/books/${b.id}/reviews/new`)
    }

    return(
        <div>
            <Container>
                <Row>
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
                        </Card.Body>
                        </Card>
                    )}
                </Row>
            </Container>
        </div>
    )
}

export default BooksList