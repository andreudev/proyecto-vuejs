<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-lg rounded" style="width: 350px">
      <div class="card-body">
        <h2 class="text-center mb-4">Iniciar Sesión</h2>
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
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
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100">
            Iniciar Sesión
          </button>
        </form>
        <p class="mt-3 text-center">
          ¿No tienes una cuenta?
          <router-link to="/register">Regístrate</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AuthUseCase } from "@/applications/useCases/AuthUseCase";
import { UserRepositoryImpl } from "@/infrastructure/repository/UserRepositoryImpl";
import { AuthRepositoryImpl } from "@/infrastructure/repository/AuthRepositoryImpl";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/authStore";

const email = ref("");
const password = ref("");
const router = useRouter();
const authStore = useAuthStore();

const authRepository = new AuthRepositoryImpl();
const userRepository = new UserRepositoryImpl();
const authUseCase = new AuthUseCase(authRepository, userRepository);

const login = async () => {
  try {
    const user = await authUseCase.login(email.value, password.value);
    authStore.setUser(user);
    router.push("/home");
  } catch (error) {
    console.error(error);
  }
};
</script>
