import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { DateTime } from 'luxon';
import { toast } from 'react-toastify'
import { useNavigate} from 'react-router-dom';


function Post(props) {

  const params = useParams()
  const navigate = useNavigate()
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
      toast.success('New comment submitted')
      axios.get(`${commentsURL}`).then((response) => {
        setComments(response.data);
      });
    })
  }

  return (
    <div className='container is-max-desktop'>
      <div className='block'></div>
      <div className='block'>
          <div class="field">
                  <button type='button'  onClick={()=>navigate('/')} className="button is-info is-rounded">{'<- '}Back to all posts</button>
                </div>
          </div>
      <div className='block'></div>
        <div className='content box'>
        <h1 className='title is-3'>{post.title}</h1>
        <div className='content'>{DateTime.fromISO(post.createdAt).toLocaleString(DateTime.DATE_MED)}</div>
          <p>{post.content}</p>
          <p>Likes: {post.likes} Comments: {post.comments}</p>
        </div>
        
          <form onSubmit={commentSubmit} className="block box">
          <div className='field'>
          <label className="label">New comment:</label>
            <textarea className='textarea' required name='comment' placeholder='Enter your comment here' onChange={onFormEntry} value={newComment.comment}></textarea>
          </div>
          <div class="field is-grouped">
          <div class="control">
              <label className="label">Name (required):</label>
              
            </div>
            <div class="control">
              <input name='name' placeholder='Enter your name' required className='input' onChange={onFormEntry} value={newComment.name}></input>
            </div>
            <div class="control">
            <label className="label">Email (Optional):</label>
            </div>
            <div class="control">
            
              <input name='email' placeholder='Optional email' className='input' onChange={onFormEntry} value={newComment.email}></input>
            </div>
            <div class="control">
              
              <button className='button is-success is-rounded' type='submit'>Submit</button>
            </div>
          </div>
            
            
            
          </form>
        <div className='block box'>
          <h3 className='title is-5'>Comments:</h3>
            {comments.map(comment => {
                return (
                    <div className='notification '>
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


