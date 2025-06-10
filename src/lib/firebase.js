// Importar Firebase y módulos necesarios desde el CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBmiK98ZTMdV3809QB5UAtKr1YayZ38Qp0",
  authDomain: "proyecto-de-grado-9d87e.firebaseapp.com",
  projectId: "proyecto-de-grado-9d87e",
  storageBucket: "proyecto-de-grado-9d87e.appspot.com",
  messagingSenderId: "59207499408",
  appId: "1:59207499408:web:e5e9e45f0840d558d56215"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar servicios
const db = getFirestore(app);
const auth = getAuth(app);

// Exportar para usar en otros archivos
export {
  db,
  auth,
  collection,
  addDoc,
  getDocs,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
};