import React, { useEffect, useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import {login} from "../../services";
import { loginSuccess } from '../../redux/slices/authSlice';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
		e.preventDefault();

		// console.log('User data form',email, password)

    // Permet de garantir que les adresses email saisies sont valides et conformes au format standard.
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validation champs vide
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

      // Validation de l'email échouée
    if (!emailRegex.test(email)) {
      setErrorMessage("L'adresse e-mail est invalide")
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    // Validation du mot de passe échouée
    if (password.length < 6) {
      setErrorMessage("Le mot de passe doit contenir au moins 6 caractères")
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    try {
      // Appelle de la fonction de connexion en passant l'email et le password
      const response = await login(email, password);

      // Extraction du token de la réponse
      const token  = response.data.body.token;
      
      // console.log('Login response',response)
      
      if(response.status === 200) {
        // Enregistrement du token dans le stockage local
        localStorage.setItem('authToken', token);

        // Dispatch l'action de connexion : Met à a jour le champ token du state auth 
        dispatch(
          loginSuccess({ 
            token 
          })
        );
        navigate("/user");
      }
    } catch (error) {
      // Dispatch l'action "LOGIN_FAIL" avec le message d'erreur
      dispatch({
        type: "LOGIN_FAIL",
        payload: error.message,
      });
      console.log(error)
      
      if(error.response && error.response.status === 400) {
        setErrorMessage("Échec de l'authentification. Veuillez vérifier vos identifiants.")
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
      }
	};

  return (
    <div className='container'>
      <main className='main bg-dark'>
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleForm}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input 
              type="text"
              name="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              id="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" /><label htmlFor="remember-me"
              >Remember me</label>
          </div>
            <button type="submit" className="sign-in-button">Sign In</button> 
            {errorMessage && <p className="sign-in-error-message">{errorMessage}</p>}       
        </form>
      </section>
    </main>
    </div>
  )
}

export default Login