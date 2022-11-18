import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

function SignUpForm({ updateUser }){
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })

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
        })
    }
        
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div>
        <Container>
        <h3>Sign up for access to Keiki Books</h3>

        <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="signUpFormEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' value={email} onChange={handleChange} placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="signUpFormUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" name='username' value={username} onChange={handleChange} placeholder="Enter desired username" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="signUpFormPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={password} onChange={handleChange} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign Up!
        </Button>
        </Form>
        </Container>
        </div>
    )
}

export default SignUpForm