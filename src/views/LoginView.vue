<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg rounded" style="width: 350px;">
      <div class="card-body">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
        <p class="mt-3 text-center">
          ¿No tienes una cuenta? <router-link to="/register">Regístrate</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { login } from "../backend/firebase"; // Importa la función de login desde el backend
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const login = async () => {
  try {
    await login(email.value, password.value); // Llama a la función de login del backend
    router.push("/home"); // Redirige al Home
  } catch (error) {
    alert(error.message); // Muestra un mensaje de error
  }
};
</script>
