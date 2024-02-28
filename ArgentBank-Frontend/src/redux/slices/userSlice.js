import { createSlice } from "@reduxjs/toolkit";

// **Création du slice "auth"**
const userSlice = createSlice({
    // **Nom du slice**
    name:'user',

     // **État initial du slice**
    initialState : {
        firstName: "",
        lastName: "",
        userName: "",
        error: null,
    },
    // **Réducteurs(reducers) pour gérer les actions liées à l'affichage des données de l'utilisateur**
    reducers: {
        userSuccess: (state, action) => {
            // **Mise à jour de l'état suite à une connexion réussie**
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.userName = action.payload.userName;
            state.error = null;
        },
        userFail : (state, action) => {
            state.firstName = "";
            state.lastName = "";
            state.userName = "";
            state.error = action.payload;
        },
        userLogOut: (state) => {
            // **Réinitialise l'état à ses valeurs initiales lors de la déconnexion**
            state.firstName = "";
            state.lastName = "";
            state.userName = "";
            state.error = null;
        },
    },
})

export const { userSuccess, userFail, userLogOut } = userSlice.actions;

export default userSlice.reducer;