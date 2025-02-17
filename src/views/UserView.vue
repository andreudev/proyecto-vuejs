<template>
  <div class="task-container">
    <h2>Bienvenido, Usuario</h2>
    <p>Aquí puedes gestionar tus tareas.</p>

    <!-- Botón para agregar una tarea -->
    <button class="add-task-btn" @click="showAddTaskModal = true">+ Agregar una tarea</button>

    <!-- Lista de tareas -->
    <div class="task-list">
      <div class="task-item" v-for="task in tasks" :key="task.id" :class="{
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

    <!-- Modal para agregar/editar tarea -->
    <div v-if="showAddTaskModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingTask ? 'Editar Tarea' : 'Agregar Tarea' }}</h3>
        <input v-model="taskText" type="text" placeholder="Nueva tarea" />
        <div class="modal-actions">
          <button @click="saveTask">{{ editingTask ? 'Guardar' : 'Agregar' }}</button>
          <button @click="closeModal">Cancelar</button>
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
const tasks = computed(() => taskStore.tasks);
const showAddTaskModal = ref(false);
const taskText = ref('');
const editingTask = ref(null);

const formatDate = (date) => {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const saveTask = () => {
  if (editingTask.value) {
    taskStore.editTask(editingTask.value.id, taskText.value);
  } else {
    taskStore.addTask(taskText.value);
  }
  closeModal();
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
  editingTask.value = task;
  taskText.value = task.text;
  showAddTaskModal.value = true;
};

const closeModal = () => {
  showAddTaskModal.value = false;
  taskText.value = '';
  editingTask.value = null;
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