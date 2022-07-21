import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

function Main() {

    const [isLoading, setIsLoading] = useState(false)

    const posts = () => {
      setIsLoading(true)
      axios.get('https://kn8a-blog-api.herokuapp.com/api/posts')
        .then(function (response) {
          
          return response;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          setIsLoading(false)
        });
        }
  
    if (isLoading) {
      return <Spinner/>
    }
    
  return (
    <div>main</div>
  )
}

export default Main