import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Post(props) {

  const params = useParams()
  const baseURL = `https://kn8a-blog-api.herokuapp.com/api/posts/${params.postId}`

  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);

    });
  }, []);

  if (!post) return <Spinner/>
  console.log(post)

  return (
    <div>Post</div>
  )
}

export default Post