<template>
  <div class="task-container">
    <h2>Bienvenido, Moderador</h2>
    <p>Aquí puedes gestionar las tareas de todos los usuarios.</p>

    <!-- Lista de tareas -->
    <div class="task-list">
      <div class="task-item" v-for="task in allTasks" :key="task.id" :class="{
        completed: task.completed,
        pending: !task.completed && !task.inProgress,
        inProgress: task.inProgress,
      }">
        <div class="task-header">
          <h3>{{ task.text }}</h3>
          <span class="creation-date">{{ formatDate(task.createdAt) }}</span>
        </div>
        <div class="task-actions">
          <button @click="toggleTaskCompletion(task.id)">
            {{ task.completed ? 'Desmarcar' : 'Completar' }}
          </button>
          <button class="delete-btn" @click="confirmDelete(task.id)">Eliminar</button>
          <button @click="startEditing(task)">Editar</button>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-5">
    <button @click="logout" class="btn btn-danger">Cerrar Sesión</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { auth } from "../backend/firebase";
import { ref, computed } from 'vue';
import { useTaskStore } from '../store/taskStore';

const taskStore = useTaskStore();
const allTasks = computed(() => taskStore.allTasks);

const formatDate = (date) => {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const confirmDelete = (id) => {
  if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
    taskStore.deleteTask(id);
  }
};

const toggleTaskCompletion = (id) => {
  taskStore.toggleTask(id);
};

const startEditing = (task) => {
  // Lógica para editar tareas
};

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

<style scoped>
/* Estilos omitidos por brevedad */
</style>