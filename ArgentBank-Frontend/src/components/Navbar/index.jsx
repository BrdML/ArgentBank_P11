import React from 'react';
import { NavLink } from 'react-router-dom';
import ArgentbankLogo from "../../assets/images/argentBankLogo.png"
import './index.css'

function Navbar() {
  return (
    <nav className='main-nav'>
          <NavLink  className='main-nav-logo' to="/">
            <img className='main-nav-logo-image' src={ArgentbankLogo} alt='Argent Bank logo'/>
            <h1 className="sr-only">Argent Bank</h1>
          </NavLink>
          <NavLink className='main-nav-item' to="/log-in">
            <i className="fa fa-user-circle"></i>{"Sign in"}
          </NavLink>
    </nav>
  )
}

export default Navbar