<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg rounded" style="width: 350px;">
      <div class="card-body">
        <h2 class="text-center mb-4">Registro</h2>
        <form @submit.prevent="handleRegister">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Contraseña</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Ingresa una contraseña (mínimo 6 caracteres)"
              required
              minlength="6"
            />
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
import { registerWithRole } from "../backend/firebase";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/authStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const handleRegister = async () => {
  try {
    const user = await registerWithRole(email.value, password.value, "user");
    authStore.setUser(user);
    router.push("/user"); // Redirige al dashboard del usuario
  } catch (error) {
    alert("Error al registrarse: " + error.message);
  }
};
</script>
<style scoped>
.btn-primary {
  background-color: #007bff;
  border: none;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.form-control {
  border-radius: 5px;
}

.router-link {
  color: #007bff;
  text-decoration: none;
}

.router-link:hover {
  text-decoration: underline;
}
</style>