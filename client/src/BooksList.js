import React, { useState } from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import BookDetail from './BookDetail'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'
import ReviewList from './ReviewList'
import { Switch, Route } from "react-router-dom";

function BooksList({ books }) {
    const [selectedBook, setSelectedBook] = useState('')

    const history = useHistory()

    function handleViewReviewClick(id) {
        setSelectedBook(id)
        console.log(id)
        history.push(`/books/${id}/reviews`)
    }

    return(
        <div>
            <Container>
            {books.sort((a,b) => a.title.localeCompare(b.title)).map(book => 
            <Card style={{ width: '18rem' }} key={book.id}>
            <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Written By: {book.author}</Card.Subtitle>
                <Card.Text>
                Illustrated By: {book.illustrator}
                </Card.Text>
                <Card.Link href={`/books/${book.id}/reviews/new`}>Review this book</Card.Link>
                <Switch>
                    <Route path="/books/:id/reviews">
                        <ReviewList selectedBook={selectedBook}/>
                    </Route>
                </Switch>
                <Card.Link onClick={(e)=>handleViewReviewClick(book.id)} value={book.id}>View Reviews</Card.Link>
            </Card.Body>
            </Card>
            )}
            </Container>
        </div>
    )
}

export default BooksList