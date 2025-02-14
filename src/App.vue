<template>
  <div id="app">
    <!-- Barra de navegación -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">Genins</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <!-- Mostrar "Iniciar Sesión" y "Registrarse" si el usuario no está autenticado -->
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <router-link to="/register" class="nav-link">Registrarse</router-link>
            </li>
            <!-- Mostrar "Cerrar Sesión" si el usuario está autenticado -->
            <li class="nav-item" v-if="isAuthenticated">
              <button @click="logout" class="nav-link btn btn-link">Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Contenedor principal para las vistas -->
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { auth } from "./backend/firebase"; // Importa la autenticación de Firebase
import { useRouter } from "vue-router";

const router = useRouter();
const isAuthenticated = ref(false); // Estado para verificar si el usuario está autenticado

// Verifica el estado de autenticación del usuario
const checkAuth = () => {
  isAuthenticated.value = !!auth.currentUser; // Actualiza el estado de autenticación
};

// Cierra la sesión del usuario
const logout = async () => {
  try {
    await auth.signOut(); // Cierra la sesión en Firebase
    router.push("/login"); // Redirige al usuario a la página de inicio de sesión
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};

// Escucha cambios en el estado de autenticación
onMounted(() => {
  checkAuth(); // Verifica el estado de autenticación al cargar la aplicación
  auth.onAuthStateChanged(() => checkAuth()); // Escucha cambios en el estado de autenticación
});

// Limpia el listener al desmontar el componente
onUnmounted(() => {
  auth.onAuthStateChanged(() => {}); // Limpia el listener
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  margin-bottom: 20px;
}

.navbar-brand {
  font-weight: bold;
}

.nav-link {
  cursor: pointer;
}

.btn-link {
  color: rgba(255, 255, 255, 0.55);
  text-decoration: none;
  background: none;
  border: none;
  padding: 0;
}

.btn-link:hover {
  color: rgba(255, 255, 255, 0.75);
}
</style>