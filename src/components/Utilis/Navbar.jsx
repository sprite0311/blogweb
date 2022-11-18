import React, { useState, useEffect } from 'react'
import logo from './../../images/logo.png'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { brand_name } from '../../constants/staticText';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';

const Navbar = ({ isLogin }) => {
  const [user] = useState(JSON.parse(localStorage.getItem('profile')))

  const dispatch = useDispatch()
  const logout = () => {
    dispatch({type: LOGOUT})
    window.location.reload(false)
  } 
  const navigate = useNavigate()
  const profileLetter = user?.result.name.charAt(0)
  console.log(user);
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    if (window.innerWidth >= 768) {
      setMenu(true)
    }
  }, [])

  return (
    <>
      <nav className={` grid grid-cols-2 lg:grid-rows-1 shadow-sm  ${menu ? 'pb-6 backdrop-blur-sm' : ''} lg:pb-0`}>
        <div className="logo-group flex items-center cursor-pointer" onClick={()=> navigate('/')}>
          <img src={logo} className="h-24 w-24" alt="" />
          <h1 className='text-lg'>{brand_name}</h1>
        </div>
        <div className="menu flex items-center justify-end lg:hidden mr-4 lg:mr-0" onClick={() => setMenu(current => !current)}>
          {!menu ? <MenuIcon fontSize='large' /> : <CloseIcon fontSize='large' />}
        </div>
        <div className={`profile-sec ${menu ? 'grid' : 'hidden'} lg:col-span-1 px-8 place-items-center w-full justify-items-end`}>
          {isLogin ? 
            <div className='flex justify-between items-center'>
              <p className='mt-4 mr-4 lg:w-14 w-10 h-10 lg:h-14 rounded-full bg-green-400 flex items-center justify-center text-base lg:text-lg justify-self-end'>{profileLetter}</p>
              <button className='bg-black border-2 border-transparent hover:border-black hover:text-black hover:bg-transparent p-3 lg:p-0 text-white rounded-lg text-lg mt-8 lg:m-0 lg:w-28 lg:h-10 justify-self-end' onClick={logout}>Log out</button>
            </div> 
            :
            <button className='bg-black border-2 border-transparent hover:border-black hover:text-black hover:bg-transparent w-full py-3 lg:p-0 text-white rounded-lg text-lg mt-8 lg:m-0 lg:w-28 lg:h-10 justify-self-end' onClick={() => navigate('/auth')}>Sign Up</button>}
        </div>
      </nav>
    </>
  )
}

export default Navbar