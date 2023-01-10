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
import ReviewForm from './ReviewForm'
import BookForm from './BookForm'

function App() {
  const [books, setBooks] = useState([])
  const [errors, setErrors] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    fetch("/auth").then((response) => {
      if (response.ok) {
        response.json().then((currentUser) => setCurrentUser(currentUser))
      }
    })
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

    const fetchReviews = () => {
      fetch('/reviews')
      .then(res => {
        if(res.ok){
          res.json().then(setReviews)
        } else {
          res.json().then(data => setErrors(data.error))
        }
      })
    }

    const handleLogOut = () => {
      setCurrentUser(null)
    }

    const handleLogin = (user) => {
      setCurrentUser(user)
    }

    const updateUser = (user) => setCurrentUser(user)

    console.log(currentUser)

  return (
    <>
    <Container>
    <NaviBar currentUser={currentUser} updateUser={updateUser} onLogOut={handleLogOut} handleLogin={handleLogin}/>
    {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqmM7wDJ4cVPhbm3ggdlB3q-bXIFKOz_bfAg&usqp=CAU'className="center"></img> */}
    </Container>
    <Container>
    <h3>Welcome to Keiki Books!</h3>
    Browse through children's books, and add your review.<br></br><br></br>
    </Container>
    <BrowserRouter>
      <Switch>
          <Route path="/users/new">
            <SignUpForm updateUser={updateUser}/>
          </Route>
  
          <Route path="/books">
            <BooksList books={books} />
          </Route>

          <Route path="/login">
            <LoginForm  updateUser={updateUser}/>
          </Route>

          <Route path="/">
            <Home books={books} currentUser={currentUser} updateUser={updateUser} reviews={reviews} setCurrentUser={setCurrentUser}/>
          </Route>

          <Route path="/reviews/new">
            <ReviewForm />
          </Route>

          <Route path="/books/new">
            <BookForm />
          </Route>

      </Switch>
      </BrowserRouter>

      </>
  )
}

export default App;
