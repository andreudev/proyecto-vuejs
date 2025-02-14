<template>
    <div class="container mt-5">
      <h2>Bienvenido al Home</h2>
      <p>Has iniciado sesión correctamente.</p>
      <button @click="logout" class="btn btn-danger">Cerrar Sesión</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { logout } from "../backend/firebase"; // Importa la función de logout desde el backend
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const logout = async () => {
    try {
      await logout(); // Llama a la función de logout del backend
      router.push("/login"); // Redirige al Login
    } catch (error) {
      alert(error.message); // Muestra un mensaje de error
    }
  };
  </script>