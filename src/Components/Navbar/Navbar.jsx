import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icone from '../../assets/more.png'
import notification_icone from '../../assets/notification.png'
import profile_icone from '../../assets/jack.png'
import { Link } from 'react-router-dom'

const Navbar = ({setSidebar}) => {
  return (
   <nav className='flex-div'>
    <div className='nav-left flex-div'>
        <img  className='menu-icon' 
         onClick={()=>setSidebar(prev=>prev===false?true:false)}src={menu_icon} alt="" />
        
        <Link to='./'><img className='logo' src={logo} alt=""/></Link>
        </div>

<div className='nav-middle flex-div'>
    <div className='search-box flex-div'>
    <input type='text' placeholder='Search'/>
    <img src={search_icon} alt=""/>
    </div>
</div>


<div className='nav-right flex-div cursor-pointer'>
    <img src={upload_icon} className='cursor-pointer' alt=""/>
    <img src={more_icone} className='cursor-pointer' alt=""/>
    <img src={notification_icone} className='cursor-pointer' alt=""/>
    <img src={profile_icone} className='user-icon cursor-pointer' alt=""/>



</div>
   </nav>
  )
}

export default Navbar
