<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
      <div class="card p-4 shadow-lg rounded" style="width: 350px;">
        <div class="card-body">
          <h2 class="text-center mb-4">Registro</h2>
          <form @submit.prevent="handleRegister">
            <!-- Campo de Email -->
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
            <!-- Campo de Contraseña -->
            <div class="mb-3">
              <label for="password" class="form-label">Contraseña</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="password"
                placeholder="Ingresa una contraseña 6 digitos"
                required
                minlength="6"
              />
            </div>
            <!-- Botón de Registro -->
            <button type="submit" class="btn btn-primary w-100">Registrarse</button>
          </form>
          <!-- Enlace para Iniciar Sesión -->
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
  
  const handleRegister = async () => {
    try {
      // Validar que la contraseña tenga más de 6 caracteres
      if (password.value.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return;
      }
  
      // Crear usuario en Firebase
      await registerUser(email.value, password.value); // ⚠ Usamos registerUser en vez de register
      router.push("/home"); // Redirigir al Home después del registro
    } catch (error) {
      alert("Error al registrarse: " + error.message); // Mostrar mensaje de error
    }
  };
  </script>
  
  <style scoped>
  /* Estilos opcionales para mejorar la apariencia */
  .card {
    background-color: #ffffff;
    border: none;
  }
  
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