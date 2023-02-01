import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'

function UpdateReview({ books, reviews, currentUser, users }) {
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

    console.log(params)

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

        fetch(`/books/${book_id}/reviews/${params.review_id}/update`, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        })
        .then(res => res.json())
        .then(review => {
            setFormData(review)
            // console.log(review)
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

    return (
        <div>
            <Container>
                {books.filter(book =>
                    (params.book_id == book.id)).map (book => (
                        <h3>Your review for {book.title}</h3>
                    ))
                }

                {users.filter(user => 
                    (currentUser.id == user.id)).map (review => (
                        <div>
                            {review.reviews.filter(rev =>
                                (params.review_id == rev.id)).map(r => (
                                
                                <div>
                                <Form onSubmit={handleSubmit} id={r.id}>
                                <InputGroup className="mb-3">
                                <Form.Control as="textarea" aria-label="comment" name="review_comment" value={formData.review_comment} placeholder={r.review_comment} onChange={handleChange} />
                                </InputGroup>

                                <Form.Select aria-label="Default select example" name="rating" value={formData.rating} placeholder={r.rating} onChange={handleChange}>
                                <option>Rating</option>
                                <option value="5">5</option>
                                <option value="4">4</option>
                                <option value="3">3</option>
                                <option value="2">2</option>
                                <option value="1">1</option>
                                </Form.Select>

                                <br></br>
                                <Button variant="primary" type="submit" >
                                Re-Submit
                                </Button>
                                </Form>
                                </div>
                                ))


                            }

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