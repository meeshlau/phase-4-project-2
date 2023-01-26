import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

function BookForm() {
    const [formData, setFormData] = useState({
        title:'',
        author:'',
        illustrator: '',
        genre: '',
        image_url: '',
    })


    const {title, author, illustrator, genre, image_url} = formData

    function onSubmit(e) {
        e.preventDefault()
        const newBook = {
            title,
            author,
            illustrator,
            genre,
            image_url
        }

        fetch(`/books/new`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBook)
        })
        .then(res => res.json())
        .then(newBook => {
            setFormData(newBook)
        })
        setFormData({
            title: "",
            author: "",
            illustrator: "",
            genre: "",
            image_url: ""
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({ ...formData, [name]: value})
    }

    return (
        <div>
            <Container>
            <h2>Add a new book to our Keiki Library</h2>
                <Form onSubmit={onSubmit}>

                <Form.Group className="mb-3" controlId="loginFormTitle">
                <Form.Control type="text" name='title' value={title} onChange={handleChange} placeholder="Title" />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="loginFormAuthor">
                <Form.Control type="text" name='author' value={author} onChange={handleChange} placeholder="Author" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginFormIllustrator">
                <Form.Control type="text" name='illustrator' value={illustrator} onChange={handleChange} placeholder="Illustrator" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginFormGenre">
                <Form.Control type="text" name='genre' value={genre} onChange={handleChange} placeholder="Genre" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginFormImageUrl">
                <Form.Control type="url" name='image_url' value={image_url} onChange={handleChange} placeholder="Image URL" />
                </Form.Group>

                <Button variant="primary" type="submit">
                Submit
                </Button>
                </Form>
            </Container>
        </div>
    )

}

export default BookForm;