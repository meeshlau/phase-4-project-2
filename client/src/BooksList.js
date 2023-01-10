import React from 'react'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import BookDetail from './BookDetail'

function BooksList({ books, reviews }) {
    function handleClick(e) {
        console.log(e.target)
    }
    return(
        <div>
            <Container>
                <h3>Books:</h3>
                <ListGroup as="ol">
                {books.map(book => 

                <ListGroup.Item
                onClick={handleClick}
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={book.id}
                >
                <div className="ms-2 me-auto">
                <div className="fw-bold">{book.title}</div>
                Written By: {book.author} 
                <br></br>Illustrated By: {book.illustrator}
                </div>
                <Badge bg="primary" pill>
                {book.id}
                </Badge>
                </ListGroup.Item>

                )}
                </ListGroup>
            </Container>
        </div>
    )
}

export default BooksList