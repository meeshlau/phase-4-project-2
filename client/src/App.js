import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { useState, useEffect } from "react";
import Home from './Home'
import { Switch, Route, useHistory } from "react-router-dom";
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import BooksList from './BooksList'
import NaviBar from './NaviBar'
import Container from 'react-bootstrap/Container';
import ReviewForm from './ReviewForm'
import BookForm from './BookForm'
import ReviewList from './ReviewList'

function App() {
  const [books, setBooks] = useState([])
  const [errors, setErrors] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [reviews, setReviews] = useState([])
  const [users, setUsers] = useState([])
  const [selectedBook, setSelectedBook] = useState([])

  useEffect(() => {
    fetch("/auth").then((response) => {
      if (response.ok) {
        response.json().then((user) => setCurrentUser(user))
      }
    })
    fetchBooks()
    fetchReviews()
    fetchUsers()
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


    const fetchUsers = () => {
      fetch('/users')
      .then(res => {
        if(res.ok){
          res.json().then(setUsers)
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

    const history = useHistory()

    // console.log(selectedBook)

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
      <Switch>
          <Route exact path="/users/new">
            <SignUpForm updateUser={updateUser}/>
          </Route>

          <Route exact path="/books">
            <BooksList books={books} />
          </Route>

          <Route exact path="/books/new">
            <BookForm />
          </Route>


          <Route exact path="/books/:id/reviews/new">
            <ReviewForm reviews={reviews}/>
          </Route>

          <Route path="/books/:id/reviews">
            <ReviewList books={books} selectedBook={selectedBook} reviews={reviews} users={users} />
          </Route>


          <Route exact path="/login">
            <LoginForm updateUser={updateUser}/>
          </Route>

          <Route path="/">
            <Home books={books} currentUser={currentUser} updateUser={updateUser} reviews={reviews} setCurrentUser={setCurrentUser} selectedBook={selectedBook} setSelectedBook={setSelectedBook}/>
          </Route>


      </Switch>

      </>
  )
}

export default App;
