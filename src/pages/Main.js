import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { DateTime } from "luxon";
import { Link } from 'react-router-dom';


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
          <Link to={id}><h3>{post.title}</h3></Link>
          <p>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
          </div>
        )

      })}
    </div>
  )
}

export default Main