import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { useState, useEffect } from "react";
import Home from './Home'
import { Switch, Route, useParams, useHistory } from "react-router-dom";
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'
import BooksList from './BooksList'
import NaviBar from './NaviBar'
import Container from 'react-bootstrap/Container';
import ReviewForm from './ReviewForm'
import BookForm from './BookForm'
import ReviewList from './ReviewList'
import UpdateReview from './UpdateReview'
import "./App.css"

function App() {
  const [books, setBooks] = useState([])
  const [errors, setErrors] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [reviews, setReviews] = useState([])
  const [users, setUsers] = useState([])
  const [deletedReviewId, setDeletedReviewId] = useState()

  const history = useHistory()

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

  console.log(currentUser)

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
      setCurrentUser('')
      history.push(`/login`)
    }

    const updateUser = (user) => {
      setCurrentUser(user)
      setUsers([...users, user])
    }

    const editReview = (review) => {
      setReviews(current => {
        return current.map(r => {
          if(r.id === review.id) {
            return review
          } else {
            return r
          }
        })
      })

    }

    const addReview = (review) => {
      setReviews(current => [...reviews, review])
    }

    const addBook = (book) => {
      setBooks(current => [...books, book])
    }


  return (
    <>
    <Container>
    <NaviBar currentUser={currentUser} onLogOut={handleLogOut} />
    {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqmM7wDJ4cVPhbm3ggdlB3q-bXIFKOz_bfAg&usqp=CAU'className="center"></img> */}
    </Container>
    <Container>
    <h3>Welcome to Keiki Books!</h3>
    <br></br><br></br>
    </Container>
      <Switch>
          <Route exact path="/users/new">
            <SignUpForm updateUser={updateUser}/>
          </Route>

          <Route exact path="/books">
            <BooksList />
          </Route>

          <Route exact path="/books/new">
            <BookForm addBook={addBook}/>
          </Route>

          <Route exact path="/books/:book_id/reviews/:review_id/update">
            <UpdateReview currentUser={currentUser} books={books} users={users} editReview={editReview} setReviews={setReviews} reviews={reviews}/>
          </Route>

          <Route exact path="/books/:book_id/reviews/new">
            <ReviewForm books={books} currentUser={currentUser} addReview={addReview}/>
          </Route>

          <Route exact path="/books/:book_id/reviews">
            <ReviewList books={books} users={users} currentUser={currentUser} setDeletedReviewId={setDeletedReviewId} reviews={reviews} setReviews={setReviews}/>
          </Route>

          {/* <Route exact path="/books/:book_id/reviews/:review_id/delete">
            <DeleteReview reviews={reviews} deletedReviewId={deletedReviewId} setDeletedReviewId={setDeletedReviewId} handleDeleteReview={handleDeleteReview}/>
          </Route> */}

          <Route exact path="/login">
            <LoginForm setCurrentUser={setCurrentUser}/>
          </Route>

          <Route path="/">
            <Home books={books} users={users} currentUser={currentUser} setDeletedReviewId={setDeletedReviewId}/>
          </Route>


      </Switch>

      </>
  )
}

export default App;
