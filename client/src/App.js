import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { useState, useEffect } from "react";
import Home from './Home'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import BooksList from './BooksList'
import NaviBar from './NaviBar'
import Container from 'react-bootstrap/Container';

function App() {
  const [books, setBooks] = useState([])
  const [errors, setErrors] = useState(false)
  const [currentUser, setCurrentUser] = useState('')

  useEffect(() => {
    fetchBooks()
  },[])

  const fetchBooks = () => {
    fetch('/books')
    .then(res => {
      if(res.ok){
        res.json().then(setBooks)
      } else {
        res.json().then(data => setErrors(data.error))
      }
    })}

    const updateUser = (user) => setCurrentUser(user)

    console.log(currentUser)

  return (
    <>
    <Container>
    <NaviBar currentUser={currentUser} updateUser={updateUser}/>
    {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqmM7wDJ4cVPhbm3ggdlB3q-bXIFKOz_bfAg&usqp=CAU'className="center"></img> */}
    </Container>
    <BrowserRouter>
      <Switch>
          <Route path="/users/new">
            <SignUpForm updateUser={updateUser}/>
          </Route>
  
          <Route path="/books">
            <BooksList />
          </Route>

          <Route path="/login">
            <LoginForm  updateUser={updateUser}/>
          </Route>

          <Route path="/">
            <Home books={books} updateUser={updateUser}/>
          </Route>
      </Switch>
      </BrowserRouter>

      </>
  )
}

export default App;
