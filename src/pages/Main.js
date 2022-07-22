import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
const { DateTime } = require("luxon");


function Main() {

  const baseURL = 'https://kn8a-blog-api.herokuapp.com/api/posts'

  const [posts, setPosts] = useState(null);


  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPosts(response.data);

    });
  }, []);

  if (!posts) return <Spinner/>
  console.log(posts)

    
  return (
    <div>
      {posts.map(post => {
        const id= '/posts/' + post._id
        return (
          <div>
          <h3><a href={id}>{post.title}</a></h3>
          <p>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
          </div>
        )

      })}
    </div>
  )
}

export default Main