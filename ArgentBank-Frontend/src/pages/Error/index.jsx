import React from 'react';
import { Link } from 'react-router-dom';
import "./index.css";
import { useSelector } from 'react-redux';

function Error() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
  return (
    <div>
        <div className="error main bg-dark">
            <p className="error-404">404</p>
            <p className="error-text">Oups ! Une erreur est survenue veuillez cliquer sur le lien ci dessous !</p>
            {/* <Link to='/' className="error-text">Retourner sur la page d'Accueil</Link> */}
            {isAuthenticated ? (
              <Link to='/user' className="error-text">Retourner sur la page d'utilisateur</Link>
            ) : (
              <Link to='/' className="error-text">Retourner sur la page d'Accueil</Link>
            )}
        </div>
    </div>
  )
}

export default Error