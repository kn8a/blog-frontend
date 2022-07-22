import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { DateTime } from 'luxon';

function Post(props) {

  const params = useParams()
  const postURL = `https://kn8a-blog-api.herokuapp.com/api/posts/${params.postId}`
  const commentsURL = `https://kn8a-blog-api.herokuapp.com/api/posts/${params.postId}/comments`

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null)


  useEffect(() => {
    axios.get(`${postURL}`).then((response) => {
      setPost(response.data);
    });
    axios.get(`${commentsURL}`).then((response) => {
        setComments(response.data);
      });
  }, []);


  if (!post || !comments) return <Spinner/>
  console.log(post, comments)


  return (
    <div>
        <h1>{post.title}</h1>
        <p>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
        <p>{post.content}</p>
        <p>Likes: {post.likes} Comments: {post.comments}</p>
        
    </div>

  )
}

export default Post


