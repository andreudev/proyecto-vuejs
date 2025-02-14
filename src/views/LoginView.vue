<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg rounded" style="width: 350px;">
      <div class="card-body">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        <form @submit.prevent="handleLogin"> <!-- ⚠ Cambiamos login por handleLogin -->
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
import { login as loginUser } from "../backend/firebase"; // ⚠ Renombramos la función importada
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleLogin = async () => { // ⚠ Cambiamos el nombre de la función
  try {
    await loginUser(email.value, password.value); // ⚠ Usamos loginUser en vez de login
    router.push("/home");
  } catch (error) {
    alert(error.message);
  }
};
</script>

