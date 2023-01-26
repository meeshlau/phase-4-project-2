import React from 'react'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom'

function ReviewList({ books, users }) {
    const params = useParams()

    return (
        <Container>
        <div>
            {books.filter(book => 
            (book.id == params.book_id)).map (b => (
                <div>
                    <h2>{b.title} </h2>
                    <Alert key={b[params.book_id]}>

                    {b.reviews.map(rev =>
                        <div>
                        <p>{rev.review_comment} </p>
                        <div className="star-rating" >
                        {[...Array(rev.rating)].map((star) => {        
                        return (         
                            <span className="star">&#9733;</span>        
                        );
                        })}
                        </div>
                        
                        <p>-{users.filter(user => user.id === rev.user_id).map(u => u.username)}</p>
                        <hr />
                        </div>

                    )}
                    </Alert>
                </div>
            ))}

        </div>
        </Container>
    )
}

export default ReviewList