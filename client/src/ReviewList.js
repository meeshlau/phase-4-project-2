import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { useParams, useHistory } from 'react-router-dom'


function ReviewList({ books, users, currentUser, deletedReviewId, setDeletedReviewId, setReviews}) {
    const params = useParams()
    const history = useHistory()
    const [errors, setErrors] = useState((false))

    useEffect(() => {
        fetch(`/books/${params.book_id}/reviews`)
        .then(res => {
            if(res.ok) {
                res.json().then(data => {
                    setReviews(data)
                })
            } else {
                console.log('error')
                res.json().then(data => setErrors(data.error))
            }
        })
    }, [])

    function handleUpdateReviewClick(e) {
        history.push(`/books/${params.book_id}/reviews/${e.target.id}/update`)
    }

    const handleDeleteReviewClick = (e) => {
        fetch(`/books/${params.book_id}/reviews/${e.target.id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(() => {
            setDeletedReviewId(e.target.id)
            history.push(`/books/${params.book_id}/reviews/`)
        })
    }


    return (
        <Container>
        <div>
            {books.filter(book => 
            (book.id == params.book_id)).map (b => (
                <div>
                    <h2>{b.title}</h2>
                    <Alert key={b[params.book_id]} id={b[params.book_id]}>

                    {b.reviews.map(rev =>
                        <div>
                        <p id={rev.id} key={rev.id}>{rev.review_comment} </p>
                        
                        <div className="star-rating" >
                        {[...Array(rev.rating)].map((star) => {        
                        return (         
                            <span className="star">&#9733;</span>        
                        );
                        })}
                        
                        </div>
                        
                        <p>-{users.filter(user => user.id === rev.user_id).map(u => u.username)}</p>

                        {currentUser.id === rev.user_id   ? <Alert.Link id={rev.id} onClick={(e) => handleUpdateReviewClick(e)}>Update your review</Alert.Link> : null }
                        <br></br>
                        {currentUser.id === rev.user_id  ? <Alert.Link href={`/books/${params.book_id}/reviews`} id={rev.id} value={rev.id} onClick={(e) => handleDeleteReviewClick(e)}>Delete your review</Alert.Link> : null }
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