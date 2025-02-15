import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword, // Función para iniciar sesión
  createUserWithEmailAndPassword, // Función para registrar usuarios
  signOut, // Función para cerrar sesión
  onAuthStateChanged, // Función para escuchar cambios en la autenticación
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; // Importaciones para Firestore

const firebaseConfig = {
  apiKey: "AIzaSyDL6jlm-Fc_We4T3Au4mmjK1Du1Vaej2_M",
  authDomain: "genins-fdfba.firebaseapp.com",
  databaseURL: "https://genins-fdfba-default-rtdb.firebaseio.com",
  projectId: "genins-fdfba",
  storageBucket: "genins-fdfba.firebasestorage.app",
  messagingSenderId: "225545331636",
  appId: "1:225545331636:web:6a1ebc2ad4c7f9b07308e1"
};


// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la instancia de autenticación
const auth = getAuth(app);

// Obtiene la instancia de Firestore
const db = getFirestore(app);

// Función para iniciar sesión
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // Devuelve el usuario autenticado
  } catch (error) {
    throw new Error("Error al iniciar sesión: " + error.message);
  }
};

// Función para registrar un usuario con un rol específico
export const registerWithRole = async (email: string, password: string, role: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Guardar el rol del usuario en Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      role: role,
    });

    return user;
  } catch (error) {
    throw new Error("Error al registrarse: " + error.message);
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error("Error al cerrar sesión: " + error.message);
  }
};

// Función para obtener el rol de un usuario
export const getUserRole = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data().role; // Devuelve el rol del usuario
  } else {
    throw new Error("Usuario no encontrado");
  }
};

// Exporta la instancia de auth y db para usarlas en otros archivos
export { auth, db };