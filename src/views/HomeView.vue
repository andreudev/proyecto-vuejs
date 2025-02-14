<template>
    <div class="container mt-5">
      <h2>Bienvenido al Home</h2>
      <p>Has iniciado sesión correctamente.</p>
      <button @click="handleLogout" class="btn btn-danger">Cerrar Sesión</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { logout as firebaseLogout } from "../backend/firebase"; 
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const handleLogout = async () => { 
    try {
      await firebaseLogout(); 
      router.push("/login"); // Redirige al Login
    } catch (error) {
      alert("Error al cerrar sesión: " + error.message); // Muestra un mensaje de error
    }
  };
  </script>