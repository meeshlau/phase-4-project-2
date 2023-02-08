import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import { useParams, useHistory } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup';


function ReviewList({ books, users, currentUser, setDeletedReviewId, reviews }) {
    const params = useParams()
    const [errors, setErrors] = useState((false))

    const history = useHistory()

    const handleDeleteReviewClick = (e) => {
        fetch(`/books/${params.book_id}/reviews/${e.target.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(() => {
            setDeletedReviewId(e.target.id)
            alert('Your review has been deleted.')
        })
    }

    return (
        <div>
        { currentUser ? 
        <Container>

                {books.filter(book =>
                        (params.book_id == book.id)).map (book => (
                            <h3 key={book.id}>{book.title} reviews</h3>
                        )
                    )}
                {reviews.filter(review => 
                    (review.book_id == params.book_id)).map (r => (
                        <div>
                            {/* <ListGroup key={r.updated_at}> */}
                                <ListGroup.Item key={r.updated_at} id={r.id}>{r.review_comment} </ListGroup.Item>
                                    
                                <div className="star-rating" >
                                <ListGroup.Item key={r.rating}>
                                    {[...Array(r.rating)].map((star) => {        
                                    return (         
                                        <span className="star">&#9733;</span>        
                                    );
                                    })}
                                </ListGroup.Item>
                                </div>
                                <ListGroup.Item key={r.user_id}>-{users.filter(user => user.id === r.user_id).map(u => u.username)}</ListGroup.Item>

                                {currentUser.id === r.user_id ? <ListGroup.Item id={r.id} onClick={() => history.push(`/books/${params.book_id}/reviews/${r.id}/update`)}>Update your review</ListGroup.Item> : null }
                                {currentUser.id === r.user_id ? <ListGroup.Item action="true" href={`/books/${params.book_id}/reviews`} id={r.id} value={r.id} onClick={(e) => handleDeleteReviewClick(e)}>Delete your review</ListGroup.Item> : null }
                                <hr />
                            {/* </ListGroup> */}
                        </div>
                    )
                )}
        </Container> : <Container><h2>Want to view reviews? <br></br><a href="/users/new">Sign Up!</a></h2></Container>}
        </div>

    )
}


export default ReviewList