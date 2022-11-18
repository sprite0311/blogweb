import React, { useState } from 'react'
import RemoveIcon from '@material-ui/icons/Delete'
import img from './../../images/banner.jpg'
import { deleteBlog, likeBlog } from '../../actions/blogs'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const BlogPost = ({ title, desc, date, name, selectedFile, likeCount, id, author }) => {
    const user = JSON.parse(localStorage.getItem('profile'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const descA = desc.split(" ")
    const [likes] = useState(likeCount);
    const openPost = () => { 
        navigate(`/blogs/${id}`)
    }
    const Likes = () => {
        if (likes.length > 0) {
          return likes.find((like) => like === (user?.result?._id))
            ? (
              <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
            ) : (
              <><ThumbUpAltOutlined fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
            );
        }
    
        return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
      };
    return (
        <div className='shadow m-4 rounded-lg relative cursor-pointer' onClick={openPost}>
            <img src={selectedFile || img} className="max-w-full rounded-t-lg c-blur" alt="" />
            <div className="overlay absolute top-5 left-5 font-bold text-white">
                <h1>{title}</h1>
                <p>Published on <span>{date}</span></p>
            </div>
            <div className="info__div p-4">
                <div className="flex items-center">
                    <div className="rounded-full bg-green-400 w-6 h-6 flex items-center justify-center text-xs text-white">{name.charAt(0)}</div>
                    <p className='text-xs ml-2'>{name}</p>
                </div>
                <p className='text-sm mt-4'>
                    {desc.slice(0, 88)}<span className={`cursor-pointer text-blue-300 ${descA.length >= 88 ? 'block' : 'hidden'}`}>{" "}Read more</span>
                </p>
            </div>
            <div className="flex justify-between items-center mb-2 px-6">
                <span>
                    {console.log(author)}
                    {(user?.result?._id ===author) &&
                        <RemoveIcon fontSize='small' onClick={()=> {dispatch(deleteBlog(id)); console.log('deleted')}}/>
                    }
                </span>
                <span>
                    <button disabled={!user?.result} className={`${!user?.result ? 'hidden': 'block'}`} onClick={()=>{dispatch(likeBlog(id)); window.location.reload(false)}}><Likes/></button>
                </span>
            </div>
        </div>
    )
}

export default BlogPost