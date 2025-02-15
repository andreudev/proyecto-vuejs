<template>
  <div id="app">
    <!-- Barra de navegación -->
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">Genins Proyect</router-link>
        <div>
          <!-- Mostrar enlaces según el estado de autenticación -->
          <router-link to="/login" class="btn btn-outline-light me-2" v-if="!isAuthenticated">Iniciar Sesión</router-link>
          <router-link to="/register" class="btn btn-outline-light me-2" v-if="!isAuthenticated">Registrarse</router-link>
          <button @click="handleLogout" class="btn btn-outline-danger" v-if="isAuthenticated">Cerrar Sesión</button>
        </div>
      </div>
    </nav>

    <!-- Contenedor principal -->
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "./store/authStore";

const router = useRouter();
const authStore = useAuthStore();

// Verifica si el usuario está autenticado
const isAuthenticated = authStore.isAuthenticated;

// Cierra la sesión del usuario
const handleLogout = async () => {
  try {
    await authStore.logout(); // Cierra la sesión en el store
    router.push("/login"); // Redirige al inicio de sesión
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar {
  margin-bottom: 20px;
}

.btn-outline-light {
  border-color: rgba(255, 255, 255, 0.55);
}

.btn-outline-light:hover {
  border-color: rgba(255, 255, 255, 0.75);
}
</style>