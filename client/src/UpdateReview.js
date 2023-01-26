import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'

function UpdateReview({ books, reviews, currentUser, users, setReviews }) {
    const [starRating, setStarRating] = useState(0);
    const [hover, setHover] = useState(0);

    const history = useHistory()
    const params = useParams()

    const [formData, setFormData] = useState({
        review_comment:'',
        rating:'',
        book_id: params.book_id,
        user_id: currentUser.id
    })

    // console.log(selectedBook[0].id)



    const {review_comment, rating, book_id, user_id} = formData

    function handleSubmit(e) {
        e.preventDefault()

        const review = {
            review_comment,
            rating,
            book_id,
            user_id
        }

        console.log(review)

        fetch(`/books/${book_id}/reviews/update`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        })
        .then(res => res.json())
        .then(review => {
            setFormData(review)
            history.push(`/books/${book_id}/reviews`)
        })
        setFormData({
            review_comment: "",
            rating: "",
            book_id: params.book_id,
            user_id: currentUser.id
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value})
    }

    const handleDeleteClick = (e) => {
        fetch(`/reviews/${e.target.value}/delete`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }})
        .then(r => r.json())
        .then(r => setReviews(
            reviews.filter(rev => rev.id !== e.target.value)
        ))
    }


    return (
        <div>
            <Container>
                {users.filter(user => 
                    (currentUser.id == user.id)).map (review => (
                        <div>
                        {/* <h3>Write your review for {b.title}</h3> */}
                        <Form onSubmit={handleSubmit}>
                        {review.reviews.map(rev =>
                            <div>
                            <InputGroup className="mb-3">
                            <Form.Control as="textarea" aria-label="comment" name="review_comment" value={rev.review_comment} onChange={handleChange} />
                            </InputGroup>

                            <Form.Select aria-label="Default select example" name="rating" value={rev.rating} onChange={handleChange}>
                            <option>Rating</option>
                            <option value="5">5</option>
                            <option value="4">4</option>
                            <option value="3">3</option>
                            <option value="2">2</option>
                            <option value="1">1</option>
                            </Form.Select>

                            <br></br>
                            <Button variant="primary" type="submit">
                            Re-Submit
                            </Button>
                            <Button variant="primary" value={rev.id} onClick={handleDeleteClick}>
                                Delete
                            </Button>
                            </div>
                        )}
                        
                        </Form>

                        </div>
                    ))
                }

                {/* {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                    <button
                    type="button"
                    key={index}
                    value={starRating}
                    onChange={handleChange}
                    className={index <= (hover || starRating) ? "on" : "off"}
                    onClick={() => setStarRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(starRating)}
                    >
                    <span className="star">&#9733;</span>
                    </button>
                );
                })} */}



            </Container>
        </div>
    )

}

export default UpdateReview