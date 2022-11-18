import Close from '@material-ui/icons/Close'
import React, { useState } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../actions/blogs'

const CreateForm = ({ setCreate, edit }) => {
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'));
    const [blogData, setBlogData] = useState({
        title: '',
        description: '',
        selectedFile: '',
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBlog({ ...blogData, name: user?.result?.name }))
    }
    if (!user?.result?.name) {
        return (
            <div className='text-2xl'>Can't create blog unless you are logged in</div>
        )
    }
    const closeForm = () => {
        window.location.reload(false)
    }
    return (
        <div className='w-screen min-h-screen flex items-center backdrop-blur-lg justify-center absolute top-0'>
            <div className="absolute top-4 left-8 hover:text-black hover:bg-white hover:border-black bg-black text-white cursor-pointer border-2 border-transparent h-10 w-10 flex items-center justify-center rounded-full" >
                <Close onClick={closeForm} />
            </div>
            <form action="" className='bg-white rounded-lg p-6 shadow m-12 w-full lg:max-w-lg max-h-full overflow-y-auto' onSubmit={handleSubmit} >
                <h1 className='font-bold text-xl mb-4'>Creating a blog</h1>
                {/* <Input label="Title" labelId="title" value={blogData.title} setValue={setBlogData} state={blogData}/> */}
                <div className='flex flex-col'>
                    <label htmlFor="title text-xl">Title</label>
                    <input type="text" id="title" placeholder='Give a suitable title' className='w-full lg:max-w-md h-10 mt-3 border-2 border-black rounded outline-none px-2 text-black' value={blogData.title} onChange={(e) => setBlogData({ ...blogData, title: e.target.value })} required />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="description" className='mt-6'>Description</label>
                    <textarea rows={8} type="textarea" id="description" placeholder='Express your blog in explanatory form....' className='w-full lg:max-w-md h-10 mt-3 border-2 border-black rounded outline-none px-2 text-black' required value={blogData.description} onChange={(e) => setBlogData({ ...blogData, description: e.target.value })} />
                </div>
                <div className="mt-6">
                    <FileBase multiple={false} type="file" onDone={({ base64 }) => setBlogData({ ...blogData, selectedFile: base64 })} />
                </div>
                <input type="submit" value="Create" className='border-2 border-transparent bg-black text-white hover:text-black hover:bg-white hover:border-black cursor-pointer p-2 w-full lg:max-w-md mt-4' />
            </form>
        </div>
    )
}

export default CreateForm