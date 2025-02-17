import { defineStore } from "pinia";
import { onAuthStateChanged } from "firebase/auth"; // Importa onAuthStateChanged desde firebase/auth
import { auth } from "../backend/firebase"; // Importa la instancia de autenticación de Firebase
import type { User } from "firebase/auth"; // Importa el tipo User desde firebase/auth

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null, // Almacena el usuario autenticado
  }),
  actions: {
    // Establece el usuario autenticado
    setUser(user: User | null) {
      this.user = user;
    },
    // Cierra la sesión del usuario
    logout() {
      this.user = null;
    },
    // Escucha el estado de autenticación
    listenAuthState() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.setUser(user); // Actualiza el estado del usuario si está autenticado
        } else {
          this.setUser(null); // Limpia el estado del usuario si no está autenticado
        }
      });
    },
  },
  getters: {
    // Verifica si el usuario está autenticado
    isAuthenticated: (state) => !!state.user,
    // Obtiene el rol del usuario (si está disponible)
    userRole: (state) => state.user?.role || "user", // Asume un rol predeterminado si no está definido
  },
});