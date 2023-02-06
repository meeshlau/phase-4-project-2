import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom'

function SignUpForm({ updateUser }){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

    const history = useHistory()

    const {username, email, password} = formData
    
    function onSubmit(e) {
        e.preventDefault()
        const user = {
            username,
            email,
            password
        }

        fetch (`/users`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(user => {
            setFormData(user)
            updateUser(user)
            history.push(`/books`)
        })
        setFormData({
            username: "",
            email: "",
            password: ""
        })
    }
        
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div>
        <Container>
        <h5>Sign up to add a book that's missing from our library, or to add your own review to Keiki Books</h5>

        <Form onSubmit={onSubmit}>

          <Row>
            <Form.Group as={Col} className="mb-3" controlId="signUpFormUsername">
              <Form.Control type="username" name='username' value={username} onChange={handleChange} placeholder="Enter desired username" />
            </Form.Group>
      
            <Form.Group as={Col} className="mb-3" controlId="signUpFormPassword">
              <Form.Control type="password" name='password' value={password} onChange={handleChange} placeholder="Password" />
            </Form.Group>
          </Row>

          <Row>
              <Form.Group className="mb-3" controlId="signUpFormEmail">
              <Form.Control type="email" name='email' value={email} onChange={handleChange} placeholder="Enter email address" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              </Form.Group>
          </Row>

        <Button variant="primary" type="submit">
          Sign Up!
        </Button>
        </Form>
        </Container>
        </div>
    )
}

export default SignUpForm