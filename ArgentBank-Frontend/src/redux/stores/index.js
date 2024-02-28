import { configureStore } from '@reduxjs/toolkit';
import { authSlice, userSlice } from '../slices';

// Création du Redux store
const store = configureStore({
    // **Réducteur principal du store**
    reducer: {
      // **Enregistrement du slice "auth" sous la propriété "auth" du store**
      auth: authSlice,
      // **Enregistrement du slice "user" sous la propriété "user" du store**
      user: userSlice,
    },
    // **Activation de l'extension Redux DevTools (pour le débogage)**
    devTools : true,
  })
export default store