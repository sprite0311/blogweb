import React from 'react'
import Hero from '../../components/Hero/Hero'

const Landing = ({isLogin}) => {
  return (
    <div className='h-screen flex flex-col main'>
      <Hero/>
    </div>
  )
}

export default Landing