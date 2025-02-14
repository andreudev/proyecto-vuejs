<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg rounded" style="width: 350px;">
      <div class="card-body">
        <h2 class="text-center mb-4">Registro</h2>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input type="email" class="form-control" id="email" v-model="email" required />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="password" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Registrarse</button>
        </form>
        <p class="mt-3 text-center">
          ¿Ya tienes una cuenta? <router-link to="/login">Inicia Sesión</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { register } from "../backend/firebase"; // Importa la función de registro desde el backend
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
