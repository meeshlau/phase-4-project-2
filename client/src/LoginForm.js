import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm() {
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })

    const {username, password} = formData
    
    function onSubmit(e){
        e.preventDefault()
        const user = {
            username,
            password
        }

        fetch(`/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(user => setFormData(user))
    }

    const handleChange =(e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return(
        <Form onSubmit={onSubmit}>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" name='username' value={username} onChange={handleChange} placeholder="Enter desired username" />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' value={password} onChange={handleChange} placeholder="Password" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Log in!
        </Button>
        </Form>
    )

}

export default LoginForm