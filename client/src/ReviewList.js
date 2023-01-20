import React from 'react'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function ReviewList({ books, selectedBook, reviews, users }) {
    // console.log(users)
    console.log(users)
    console.log(selectedBook)

    return (
        <Container>
        <div>
            {selectedBook.map(book => 
                <Alert key={book.id}>{book.reviews.map(rev =>
                    <div>
                    <Alert.Heading>{rev.review_comment}</Alert.Heading>
                    <p>{rev.user_id}</p>
                    </div>

                )}
                </Alert>

            )}
        </div>
        </Container>
    )
}

export default ReviewList