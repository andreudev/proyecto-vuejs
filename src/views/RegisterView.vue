<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg rounded" style="width: 350px;">
      <div class="card-body">
        <h2 class="text-center mb-4">Registro</h2>
        <form @submit.prevent="handleRegister"> <!-- ⚠ Cambiamos register por handleRegister -->
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
import { register as registerUser } from "../backend/firebase"; // ⚠ Renombramos la función importada
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const router = useRouter();

const handleRegister = async () => { // ⚠ Cambiamos el nombre de la función local
  try {
    await registerUser(email.value, password.value); // ⚠ Usamos registerUser en vez de register
    router.push("/home");
  } catch (error) {
    alert(error.message);
  }
};
</script>

