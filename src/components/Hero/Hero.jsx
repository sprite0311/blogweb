import React from 'react'
import './hero.css'

const Hero = () => {
    return (
        <div className='hero__maindiv h-full flex items-center justify-center'>
            <div className='  flex items-center justify-center flex-col backdrop-blur-sm p-8 border-2 border-gray-200 rounded'>
                <h1 className='w-50 p-3 text-xl font-bold'>A good title for this blog</h1>
                <p className=' max-w-md text-center text-sm'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi ducimus 
                    eligendi placeat alias eos, enim ex labore et cumque, dolore quaerat reiciendis 
                    culpa in quos consectetur ratione esse blanditiis necessitatibus, voluptas quia.
                </p>
                <button className=' bg-black border-2 border-transparent hover:border-black hover:text-black hover:bg-transparent w-full py-3 lg:p-0 text-white rounded-lg text-lg mt-8 lg:w-28 lg:h-10'>Signup</button>
            </div>
        </div>
    )
}

export default Hero