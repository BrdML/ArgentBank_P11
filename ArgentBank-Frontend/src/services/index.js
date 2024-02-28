import axios from "axios";

// ***Service d'authentification***
// Constante d'URL de base de l'API
const API_URL = 'http://localhost:3001/api/v1';

// Fonction de connexion
export const login = async (email, password) => {
    try {
        // Envoi d'une requête POST pour la connexion
        const response = await axios.post(`${API_URL}/user/login`, {
            email,
            password,
      });
      // Retourne la réponse de la requête en cas de succès
      return response;
    } catch (error) {
      // Renvoie l'erreur pour une gestion plus uniforme
      throw error;
    }
};

// ***Service d'utilisateur***
// Fonction de récupération des données de l'utilisateur
export const getUser = async (authToken) => {
  // En-têtes de requête avec Content-Type et le jeton d'authentification
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
    };

    try {
        // Envoi d'une requête POST pour récupérer le profil de l'utilisateur
        const response = await axios.post(`${API_URL}/user/profile`, {}, {headers});
      // Retourne la réponse de la requête en cas de succès
      return response;
    } catch (error) {
      // Renvoie l'erreur pour une gestion plus uniforme
      throw error;
    }
}

// Fonction de mise à jour des informations de l'utilisateur
export const putUser = async (authToken, userNameForm) => {
  // En-têtes de requête avec Content-Type et le jeton d'authentification
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
  };

  // Données à envoyer dans la requête
  const data = {
    userName: userNameForm,
  };

  try {
    // Envoi d'une requête PUT pour mettre à jour le profil de l'utilisateur
    const response = await axios.put(`${API_URL}/user/profile`, data, {headers});
    return response;
  } catch (error) {
    console.log(error)
    throw error;
  }
}