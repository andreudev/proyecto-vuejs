<template>
  <div class="container mt-5">
    <h2>Bienvenido al Home</h2>
    <p>Has iniciado sesión correctamente.</p>
    <button @click="logout" class="btn btn-danger">Cerrar Sesión</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { auth } from "@/infrastructure/firebase/firebaseConfig";

const router = useRouter();

const logout = async () => {
  try {
    await auth.signOut();
    router.push("/login");
  } catch (error) {
    console.error("Error al cerrar sesión:", (error as any).message);
  }
};
</script>
