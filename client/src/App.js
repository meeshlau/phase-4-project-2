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

function App() {
  const [books, setBooks] = useState([])
  const [errors, setErrors] = useState(false)

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

  return (
    <>
    <NaviBar />
    <BrowserRouter>
      <Switch>
          <Route path="/users/new">
            < SignUpForm />
          </Route>
  
          <Route path="/books">
            <BooksList />
          </Route>

          <Route path="/login">
            <LoginForm />
          </Route>

          <Route path="/">
            <Home books={books}/>
          </Route>
      </Switch>
      </BrowserRouter>
      </>
  )
}

export default App;
