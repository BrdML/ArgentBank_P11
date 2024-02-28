import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import ArgentbankLogo from "../../assets/images/argentBankLogo.png"
import './index.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { userLogOut } from '../../redux/slices/userSlice';

function Navbar() {
  const dispatch = useDispatch();
	const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const { userName } = useSelector((state) => state.user);

  // Gestion déconnexion de l'utilisateur l'ors de la soumission du form
  const handleClick = async (e) => {
		e.preventDefault();
    
    // Dispatch l'action de déconnexion :  reset le state du champ token stocker dans le store
    dispatch(
      logout()
    )

    // reset le state des champs des données de l'utilisateur stocker dans le store
    dispatch(
      userLogOut()
    )

    // Suppréssion du token d'autentification du local stockage
    localStorage.removeItem("authToken");

    navigate('/');
  }

  return (
    <div>
      <nav className="main-nav">
        <NavLink  className='main-nav-logo' to="/">
          <img className='main-nav-logo-image' src={ArgentbankLogo} alt='Argent Bank logo'/>
          <h1 className="sr-only">Argent Bank</h1>
        </NavLink>
        <div className='userLog'>
          <NavLink to="/user">
            {!isAuthenticated ? "" : <i className="fa fa-user-circle"></i>}
          </NavLink>
          <p>{userName}</p>
          <NavLink className='main-nav-item' to={!isAuthenticated ? "/log-in" : "/log-out"} onClick={isAuthenticated ? handleClick : ""}>
            {!isAuthenticated ? "Sign in" : <span><i className="fa fa-sign-out"></i>Sign Out</span>}
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

export default Navbar