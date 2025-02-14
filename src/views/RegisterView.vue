<template>
    <div class="container mt-5">
      <h2>Registro</h2>
      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" id="email" v-model="email" required />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input type="password" class="form-control" id="password" v-model="password" required />
        </div>
        <button type="submit" class="btn btn-primary">Registrarse</button>
      </form>
      <p class="mt-3">
        ¿Ya tienes una cuenta? <router-link to="/login">Inicia Sesión</router-link>
      </p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { register } from "../../backend/firebase"; // Importa la función de registro desde el backend
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const router = useRouter();
  
  const register = async () => {
    try {
      await register(email.value, password.value); // Llama a la función de registro del backend
      router.push("/home"); // Redirige al Home
    } catch (error) {
      alert(error.message); // Muestra un mensaje de error
    }
  };
  </script>