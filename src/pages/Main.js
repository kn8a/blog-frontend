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
    <div className='container is-max-desktop'>
      <div className='block'></div>

    <div className="box">
    {posts.map(post => {
        const id= '/posts/' + post._id
        return (
          
            <div className='box'>
            
              <h3 className='title is-4'><Link to={id}>{post.title}</Link></h3>
              <p className='block'>{post.content.substring(0, 100)}...</p>
              <footer class="card-footer">
                <p className='card-footer-item'>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
                <p className='card-footer-item'>Likes: {post.likes}</p>
                <p className='card-footer-item'>Comments: {post.comments}</p>
              </footer>
            </div>
            
          
        )

      })}
    </div>
      
    </div>
  )
}

export default Main