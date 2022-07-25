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
  const [newComment, setNewComment] = useState({
    comment: '',
    name: '',
    email: '',
    submitted:'false'
  })

  useEffect(() => {
    axios.get(`${postURL}`).then((response) => {
      setPost(response.data);
    });
  },[]);

  useEffect(()=>{
    axios.get(`${commentsURL}`).then((response) => {
      setComments(response.data);
    });
  },[])

  if (!post || !comments) return <Spinner/>

  const onFormEntry = (e) => {
    const value = e.target.value
    setNewComment({
      ...newComment,
      [e.target.name]: value
  });
  }

  const commentSubmit = (e) => {
    e.preventDefault()
    axios.post(`${commentsURL}`, newComment)
    .then(()=>{
      setNewComment({
        comment: '',
        name: '',
        email: '',
      })
      axios.get(`${commentsURL}`).then((response) => {
        setComments(response.data);
      });
    })
  }

  return (
    <div>
        <h1>{post.title}</h1>
        <p>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED)}</p>
        <p>{post.content}</p>
        <p>Likes: {post.likes} Comments: {post.comments}</p>
          <form onSubmit={commentSubmit}>
            <textarea name='comment' onChange={onFormEntry} value={newComment.comment}></textarea>
            <input name='name' onChange={onFormEntry} value={newComment.name}></input>
            <input name='email' onChange={onFormEntry} value={newComment.email}></input>
            <button type='submit'>Submit</button>
          </form>
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


