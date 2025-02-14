// // Importa las funciones necesarias de Firebase
// import { initializeApp } from "firebase/app";
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// // Configuración de Firebase (obtén estos datos desde la consola de Firebase)
// const firebaseConfig = {
//     apiKey: "AIzaSyDL6jlm-Fc_We4T3Au4mmjK1Du1Vaej2_M",
//     authDomain: "genins-fdfba.firebaseapp.com",
//     projectId: "genins-fdfba",
//     storageBucket: "genins-fdfba.firebasestorage.app",
//     messagingSenderId: "225545331636",
//     appId: "1:225545331636:web:6a1ebc2ad4c7f9b07308e1"
// };

// // Inicializa Firebase
// const app = initializeApp(firebaseConfig);

// // Obtiene la instancia de autenticación
// const auth = getAuth(app);

// // Exporta las funciones de autenticación para usarlas en el frontend
// export const login = async (email: string, password: string) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     return userCredential.user; // Devuelve el usuario autenticado
//   } catch (error) {
//     throw new Error("Error al iniciar sesión: " + error.message);
//   }
// };

// export const register = async (email: string, password: string) => {
//   try {
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//     return userCredential.user; // Devuelve el usuario registrado
//   } catch (error) {
//     throw new Error("Error al registrarse: " + error.message);
//   }
// };

// export const logout = async () => {
//   try {
//     await signOut(auth); // Cierra la sesión
//   } catch (error) {
//     throw new Error("Error al cerrar sesión: " + error.message);
//   }
// };

// // Exporta la autenticación para usarla en el frontend
// export { auth };
