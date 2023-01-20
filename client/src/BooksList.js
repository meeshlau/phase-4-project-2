import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import { useHistory, Route, Switch } from 'react-router-dom'
import ReviewList from './ReviewList'

function BooksList({ books, setSelectedBook, selectedBook }) {

    const history = useHistory() 

    function handleViewReviewsClick(b) {
        setSelectedBook([b])
        // console.log(selectedBook)
        history.push(`/books/${b.id}/reviews`)
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
                <Card.Link href={`/books/${book.id}/reviews/new`}>Review this book</Card.Link>
                <Card.Link onClick={() => handleViewReviewsClick(book)} >View Reviews</Card.Link>

            </Card.Body>
            </Card>
            )}
            </Container>
            
        </div>
    )
}

export default BooksList