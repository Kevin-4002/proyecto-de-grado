
// Este archivo se llenará con tu configuración de Firebase
// cuando me la proporciones.
// Por ahora, lo dejo preparado.

// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "TU_API_KEY",
//   authDomain: "TU_AUTH_DOMAIN",
//   projectId: "TU_PROJECT_ID",
//   storageBucket: "TU_STORAGE_BUCKET",
//   messagingSenderId: "TU_MESSAGING_SENDER_ID",
//   appId: "TU_APP_ID"
// };

// let app;
// let auth;

// try {
//   app = initializeApp(firebaseConfig);
//   auth = getAuth(app);
// } catch (error) {
//   console.error("Error initializing Firebase:", error);
//   // Considera mostrar un mensaje al usuario si Firebase no se inicializa
//   // Esto podría ser un problema con la configuración o las reglas de Firebase.
//   // Por ejemplo:
//   // alert("No se pudo conectar a los servicios de la aplicación. Por favor, inténtalo más tarde.");
// }

// export { auth, app };
// TEMPORAL: Mock de auth hasta que se configure Firebase
export const auth = {
  onAuthStateChanged: (callback) => {
    // Simula un usuario no logueado inicialmente
    setTimeout(() => callback(null), 100); 
    return () => {}; // Devuelve una función de desuscripción vacía
  },
  // Añade mocks para otras funciones de auth que uses si es necesario
  // createUserWithEmailAndPassword: async (email, password) => { /* ... */ },
  // signInWithEmailAndPassword: async (email, password) => { /* ... */ },
  // signOut: async () => { /* ... */ },
};

// Elimina o comenta este mock una vez que firebaseConfig esté completo.
