<template>
  <div class="admin-container">
    <h2>Panel de Administración</h2>

    <!-- Formulario para crear nuevos usuarios -->
    <div class="card p-4 shadow-lg rounded mb-4">
      <h3>Crear Nuevo Usuario</h3>
      <form @submit.prevent="createUser">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            class="form-control"
            id="email"
            v-model="newUser.email"
            placeholder="Ingresa el correo electrónico"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="newUser.password"
            placeholder="Ingresa una contraseña (mínimo 6 caracteres)"
            required
            minlength="6"
          />
        </div>
        <div class="mb-3">
          <label for="role" class="form-label">Rol</label>
          <select class="form-control" id="role" v-model="newUser.role" required>
            <option value="user">Usuario</option>
            <option value="moderator">Moderador</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary w-100">Crear Usuario</button>
      </form>
    </div>

    <!-- Lista de usuarios registrados -->
    <div class="card p-4 shadow-lg rounded">
      <h3>Usuarios Registrados</h3>
      <ul class="list-group">
        <li class="list-group-item" v-for="user in users" :key="user.uid">
          {{ user.email }} - {{ user.role }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { registerWithRole, db } from "../backend/firebase"; // Importa la función registerWithRole desde firebase.ts
import { collection, getDocs } from "firebase/firestore";

const newUser = ref({ email: "", password: "", role: "user" });
const users = ref([]);

const createUser = async () => {
  try {
    await registerWithRole(newUser.value.email, newUser.value.password, newUser.value.role);
    alert("Usuario creado exitosamente");
    newUser.value = { email: "", password: "", role: "user" };
    loadUsers();
  } catch (error) {
    alert("Error al crear el usuario: " + error.message);
  }
};

const loadUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  users.value = querySnapshot.docs.map((doc) => ({ ...doc.data(), uid: doc.id }));
};

onMounted(() => {
  loadUsers();
});
</script>

<style scoped>
.admin-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  margin-bottom: 20px;
}

.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>