import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'

function ReviewForm({ currentUser, books, addReview }) {
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

    const {review_comment, rating, book_id, user_id} = formData

    function onSubmit(e) {
        e.preventDefault()

        const review = {
            review_comment,
            rating,
            book_id,
            user_id
        }

        fetch(`/books/${book_id}/reviews/new`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        })
        .then(res => res.json())
        .then(review => {
            addReview(review) 
        })
        setFormData({
            review_comment: "",
            rating: "",
            book_id: params.book_id,
            user_id: currentUser.id
        })
        history.push(`/books/${book_id}/reviews`)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value})
    }

    return (
        <div>
            <Container>
                {books.filter(book => 
                    (book.id == params.book_id)).map (b => (
                        <h3 >Write your review for {b.title}</h3>
                    ))
                    }
                <Form onSubmit={onSubmit}>

                <InputGroup className="mb-3" >
                <Form.Control as="textarea" aria-label="comment" name="review_comment" value={formData.review_comment} onChange={handleChange} placeholder="Tell us about this book." />
                </InputGroup>

                <Form.Select aria-label="Default select example" name="rating" value={formData.rating} onChange={handleChange}>
                <option>Rating</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
                </Form.Select>

                <br></br>


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

                <Button variant="primary" type="submit">
                Submit
                </Button>


                </Form>

            </Container>
        </div>
    )
}

export default ReviewForm