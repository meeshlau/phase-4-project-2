import React, { useState, useHistory } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'

function ReviewForm({ reviews }) {
    const [formData, setFormData] = useState({
        review_comment:'',
        rating:'',
    })

    const {review_comment, rating} = formData

    function onSubmit(e) {
        e.preventDefault()
        const review = {
            review_comment,
            rating
        }

        fetch(`/reviews/:id/new`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(review)
        })
        .then(res => res.json())
        .then(review => {
            setFormData(review)
            console.log(review)
        })
        setFormData({
            review_comment: "",
            rating: ""
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value})
        
    }

    return (
        <div>
            <Container>
            <h2>Write your review.</h2>
                <Form onSubmit={onSubmit}>

                <InputGroup className="mb-3">
                    <InputGroup.Text></InputGroup.Text>
                <Form.Control as="textarea" aria-label="comment" name="review_comment" value={review_comment} onChange={handleChange} placeholder="Tell us about this book." />
                </InputGroup>

                <Form.Select aria-label="Default select example" name="rating" value={rating} onChange={handleChange}>
                <option>Rating</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
                </Form.Select>
                <br></br>

                <Button variant="primary" type="submit">
                Submit
                </Button>
                </Form>
            </Container>
        </div>
    )

}

export default ReviewForm