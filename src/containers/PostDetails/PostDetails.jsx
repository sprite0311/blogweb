import React from 'react'
import { Paper, Typography,  Divider } from '@material-ui/core/';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import {getBlog } from '../../actions/blogs'
import { useParams, Link } from 'react-router-dom';
import useStyles from './styles'
import { useEffect } from 'react';

const PostDetails = () => {
    const {blog} = useSelector((state) => state.blogs)
    const classes = useStyles()
    const dispatch = useDispatch()
    const {id} = useParams()
    
    useEffect(()=>{
      dispatch(getBlog(id))
    }, [id, dispatch])


    if(!blog) return null


  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} className="m-8" elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{blog.title}</Typography>
          <Typography gutterBottom variant="body1" component="p">{blog.description}</Typography>
          <Typography variant="h6">
            Created by:
            <Link to={`/creators/${blog.name}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
              {` ${blog.name}`}
            </Link>
          </Typography>
          <Typography variant="body1">{moment(blog.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comment Section - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={`${classes.media} lg:max-w-md`} src={blog.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={blog.title} />
        </div>
      </div>
    </Paper>
  )
}

export default PostDetails