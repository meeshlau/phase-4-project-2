import React from 'react'
import { useState, useEffect } from "react";
import BooksList from './BooksList'


function Home({ books }) {

    
    return(
        <div>
            <BooksList books={books}/>
        </div>
    )
}

export default Home