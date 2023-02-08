import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom'

function LoginForm({ setCurrentUser }) {
    const [formData, setFormData] = useState({
        username:'',
        password:''
    })

    const history = useHistory()

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
        .then(user => {
            history.push(`/home`)
            setCurrentUser(user)
            if (user.errors) {
                history.push('/login')
            } else {
                // setCurrentUser(user)
                history.push('/home')
            }
        setFormData({
            username: "",
            password: ""
        })
    })}

    const handleChange =(e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return(
        <div>
            <Container>
            <h3>Login:</h3>
                <Form onSubmit={onSubmit}>

                <Form.Group className="mb-3" controlId="loginFormUsername">
                <Form.Control type="username" name='username' value={username} onChange={handleChange} placeholder="Username" />
                </Form.Group>
        
                <Form.Group className="mb-3" controlId="loginFormPassword">
                <Form.Control type="password" name='password' value={password} onChange={handleChange} placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                Log in!
                </Button>
                </Form>
            </Container>
        </div>
    )

}

export default LoginForm