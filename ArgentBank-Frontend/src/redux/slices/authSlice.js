import { createSlice } from "@reduxjs/toolkit";

// **Création du slice "auth"**
const authSlice = createSlice({
    // **Nom du slice**
    name:'auth',

    // **État initial du slice**
    initialState : {
        isAuthenticated : false,
        token : "",
        error : null,
    },
    // **Réducteurs(reducers) pour gérer les actions liées à l'authentification**
    reducers: {
          loginSuccess: (state, action) => {
            // **Mise à jour de l'état suite à une connexion réussie**
            state.isAuthenticated = true;
            state.token = action.payload.token;
            state.error = null;
          },
          loginFail: (state, action) => {
            // **Mise à jour de l'état suite à une connexion échouée**
            state.isAuthenticated = false;
            state.token = null;
            state.error = action.payload;
          },
          logout: (state) => {
            // **Réinitialise l'état à ses valeurs initiales lors de la déconnexion**
            state.isAuthenticated = false;
            state.token = null;
            state.error = null;
          },
    },
})

export const { loginSuccess, loginFail, logout } = authSlice.actions;

export default authSlice.reducer;