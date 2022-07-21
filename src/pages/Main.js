import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'

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
        return (
          <div>
          <h3>{post.title}</h3>
          <p>{post.createdAt}</p>
          </div>
        )

      })}
    </div>
  )
}

export default Main