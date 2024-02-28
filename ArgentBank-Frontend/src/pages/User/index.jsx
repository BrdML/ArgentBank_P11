import React, { useEffect, useState } from 'react'
import "./index.css";
import Account from '../../components/Account'
import { useSelector, useDispatch } from 'react-redux';
import {getUser, putUser} from  "../../services";
import { userFail, userSuccess } from '../../redux/slices/userSlice';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function User() {
    const [data, setData] = useState([]);
    const authToken = useSelector((state) => state.auth.token);
    const { firstName, lastName, userName } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const navigate = useNavigate();
    // Gestion de l'affichage du formulaire
    const [showEditUserName, setEditUserName] = useState(true);
    // Valeur saisie dans le dormulaire
    const [userNameForm, setUserNameForm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Gestion du clic sur le bouton "Modifier"
    const handleEditButtonClick = (e) => {
        e.preventDefault();
        setEditUserName(false)
    };

    // Gestion du clic sur le bouton "Annuler"
    const handleCancelButtonClick = (e) => {
        e.preventDefault();
        setEditUserName(true)
    };

    // Gestion de la soumission du formulaire de modification du nom d'utilisateur
    const handleFormUserName = async (e) => {
		e.preventDefault();

        if (!userNameForm) {
            setErrorMessage("Veuillez remplir le champ User name");
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
            return;
          }
        try {
            // Envoi de la requête de mise à jour des informations de l'utilisateur
            const response = await putUser(authToken, userNameForm)
            
            // Récupération des nouvelles informations de l'utilisateur depuis la réponse
            const firstName = response.data.body.firstName;
            const lastName = response.data.body.lastName;
            const userName = response.data.body.userName;

            if(response.status === 200) {
                // Dispatch de l'action "userSuccess" pour mettre à jour le store Redux
                dispatch(
                    userSuccess({
                        firstName,
                        lastName,
                        userName,
                    })
                )
                // Masque le formulaire
                setEditUserName(true)
            }
        } catch ( error) {
            if(error){
                console.log(error)
            }
        }
    }

    // Vérification de l'authentification au chargement du composant
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/error');
        }
    }, [isAuthenticated, navigate]);

    // Récupération des données de l'utilisateur au chargement du composant
    useEffect(() => {
        const userData = async () => {
            try {
                // Envoi de la requête pour récupérer les informations de l'utilisateur
                const response = await getUser(authToken);

                // Récupération des informations depuis la réponse
                const firstName = response.data.body.firstName;
                const lastName = response.data.body.lastName;
                const userName = response.data.body.userName;
            
                if(response.status === 200) {
                    // Dispatch de l'action "userSuccess" pour mettre à jour le store Redux
                    dispatch(
                        userSuccess({
                            firstName,
                            lastName,
                            userName,
                        })
                    )
                }
            } catch(error)  {
                dispatch(
                    userFail({
                        payload: error.message,
                    })
                )
            }
        };   
        // Appel de la fonction pour récupérer les données
        userData();
    }, []);

    // Récupération des données du compte à partir du fichier accountData.json
    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get('/data/accountData.json');
          // Stocke les données récupérées dans l'état
          setData(response.data);
        };
      
        fetchData();
      }, []);
    return (
        <div className='container'>
            <main className={showEditUserName ? "main bg-dark" : "hide"}>
                <div className="header">
                    <h1>Welcome back<br />{firstName} {lastName}!</h1>
                    <button className="edit-button" onClick={handleEditButtonClick}>Edit Name</button>
                </div>
                <h2 className="sr-only">Accounts</h2>
                    {data.map((item) => (
                        <Account 
                        key={item.id}
                            title={item.title}
                            amount={item.amount}
                            description={item.description}
                        />
                    ))}
            </main>
            <div className={showEditUserName ? "hide" : "visible editUsername"}>
                <h2>Edit user info</h2>
                <form className='formEditName' onSubmit={handleFormUserName}>
                    <div className="input-wrappers">
                        <label htmlFor="userName">User name:</label>
                        <input 
                            type="text" 
                            id="userName" 
                            name="userName" 
                            value={userNameForm} 
                            placeholder={userName}
                            onChange={(e) => setUserNameForm(e.target.value)}
                        />
                    </div>
                    <div className="input-wrappers">
                        <label htmlFor="firstName">First name:</label>
                        <input type="text" id="firstName" name="firstName" value="" placeholder={firstName} disabled/>
                    </div>
                    <div className="input-wrappers">
                        <label htmlFor="lastName">Last name:</label>
                        <input type="text" id="lastName" name="lastName" value="" placeholder={lastName} disabled/>
                    </div>
                    <div className='editButton'>
                        <button type="submit" className="save-button">Save</button> 
                        <button type="submit" className="cancel-button" onClick={handleCancelButtonClick}>Cancel</button>
                    </div>
                    {errorMessage && <p className="sign-in-error-message">{errorMessage}</p>}
                </form>
                <div className='accountEdit'>
                    {data.map((item) => (
                        <section className="account" id={item.id} key={item.id}>
                            <div className="account-content-wrapper">
                                <h3 className="account-title">{item.title}</h3>
                                <p className="account-amount">{item.amount}</p>
                                <p className="account-amount-description">{item.description}</p>
                            </div>
                            <div className="account-content-wrapper cta">
                                <Link className='transactionEdit'>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </Link>
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default User