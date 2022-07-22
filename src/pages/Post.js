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
        
        <textarea name='comment'></textarea>
        <input name='author'></input>
        <input name='email'></input>
        <button>Submit</button>

        <div>
            {comments.map(comment => {
                return (
                    <div>
                    <p>{comment.comment}</p>
                    <p>Posted by {comment.author} on {DateTime.fromISO(comment.createdAt).toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS)}</p>
                    
                    </div>
                )
            })}
        </div>
    </div>

  )
}

export default Post


