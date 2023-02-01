import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useParams, useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container';

function DeleteReview({ reviews, setDeletedReviewId, handleDeleteReview, deletedReviewId }) {

    const params = useParams()
    const history = useHistory()

    const handleDeleteReviewClick = () => {
        fetch(`/books/${params.book_id}/reviews/${params.review_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            // body: JSON.stringify(deletedReviewId)
        })
        .then(resp => resp.json())
        .then(rev => {
          console.log(rev)
          // setDeletedReviewId(params.review_id)
          // handleDeleteReview(params.review_id)
        })
        // history.push(`/books/${params.book_id}/reviews`)
    }

    return (
      <>
      <Container>
        {reviews.filter(r => 
            (r.id == params.review_id)).map (rev => (

            <div>
        <Alert variant="danger">
          <Alert.Heading>You are about to delete your rating:</Alert.Heading>
          <p key={rev.id}>
            {rev.review_comment}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button value={rev.id} onClick={handleDeleteReviewClick} variant="outline-success">
              Yes, DELETE
            </Button>
            {/* <Button onClick={() => setShow(false)} variant="outline-success">
              Go Back
            </Button> */}
          </div>
        </Alert>
        </div>
        ))}
        
        </Container>
      </>
    );
}

export default DeleteReview