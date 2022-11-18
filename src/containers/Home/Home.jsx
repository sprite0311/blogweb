import React, { useState } from 'react'
import {  useSelector } from 'react-redux'
import CreateIcon from '@material-ui/icons/Create'
import BlogPost from '../../components/BlogPost/BlogPost'
import CreateForm from '../../components/CreateForm/CreateForm'
import Pagination from './../../components/Pagination'
import {  useLocation } from 'react-router-dom'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
  const query = useQuery()
  const page = query.get('page') || 1
  const {blogs} =  useSelector((state)=> (state.blogs))
  const [create, setCreate] = useState(false)
  return (
    <div>
      <button className='flex p-2 border-2 border-black rounded lg:mx-40 mx-6' onClick={() => setCreate(true)}>
        <CreateIcon fontSize='medium' className='mr-2' />
        <p>Create a Blog</p>
      </button>
      <div className="grid mx-6 lg:mx-40 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog)=>(
          <BlogPost author={blog.author} id={blog._id} key={blog._id} selectedFile = {blog.selectedFile} title = {blog.title} desc={blog.description} name={blog.name} likeCount = {blog.likes} date={blog.createdAt}/>
        ))}
        <Pagination className = " mt-4 " page={page}/>
      </div>
      {create && <CreateForm />}
      {/* {edit && <CreateForm edit={edit} setEdit={toggleState}/>} */}
    </div>
  )
}

export default Home