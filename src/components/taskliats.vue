<template>
    <div class="task-container">
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
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue';
  import { useTaskStore } from '../stores/taskStore';
  
  // Acceder al store de tareas
  const taskStore = useTaskStore();
  
  // Obtener la lista de tareas desde el store
  const tasks = computed(() => taskStore.tasks);
  
  // Estado para controlar la visibilidad del modal
  const showAddTaskModal = ref(false);
  
  // Texto de la tarea que se está agregando o editando
  const taskText = ref('');
  
  // Tarea que se está editando (si es null, se está agregando una nueva tarea)
  const editingTask = ref(null);
  
  // Formatear la fecha de creación
  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Agregar o editar una tarea
  const saveTask = () => {
    if (editingTask.value) {
      // Si hay una tarea en edición, actualizarla
      taskStore.editTask(editingTask.value.id, taskText.value);
    } else {
      // Si no, agregar una nueva tarea
      taskStore.addTask(taskText.value);
    }
    closeModal();
  };
  
  // Eliminar una tarea con confirmación
  const confirmDelete = (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      taskStore.deleteTask(id);
    }
  };
  
  // Marcar/desmarcar tarea como completada
  const toggleTaskCompletion = (id) => {
    taskStore.toggleTask(id);
  };
  
  // Iniciar la edición de una tarea
  const startEditing = (task) => {
    editingTask.value = task;
    taskText.value = task.text;
    showAddTaskModal.value = true;
  };
  
  // Cerrar el modal y limpiar el estado
  const closeModal = () => {
    showAddTaskModal.value = false;
    taskText.value = '';
    editingTask.value = null;
  };
  </script>
  
  <style scoped>
  .task-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .add-task-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 20px;
  }
  
  .add-task-btn:hover {
    background-color: #0056b3;
  }
  
  .task-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .task-item {
    padding: 15px;
    border-radius: 4px;
    border: 1px solid #ddd;
  }
  
  /* Estilos para tareas completadas */
  .task-item.completed {
    background-color: #d4edda;
    /* Verde claro */
  }
  
  /* Estilos para tareas pendientes */
  .task-item.pending {
    background-color: #fff3cd;
    /* Amarillo claro */
  }
  
  /* Estilos para tareas en progreso */
  .task-item.inProgress {
    background-color: #f8d7da;
    /* Rojo claro */
  }
  
  .task-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .task-header h3 {
    margin: 0;
    font-size: 18px;
    color: #213547;
  }
  
  .creation-date {
    font-size: 12px;
    color: #666;
  }
  
  .task-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .task-actions button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .task-actions button:first-child {
    background-color: #28a745;
    /* Verde */
    color: white;
  }
  
  .task-actions button:first-child:hover {
    background-color: #218838;
    /* Verde oscuro */
  }
  
  .delete-btn {
    background-color: #dc3545;
    /* Rojo */
    color: white;
  }
  
  .delete-btn:hover {
    background-color: #c82333;
    /* Rojo oscuro */
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
  }
  
  .modal-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }
  
  .modal-actions button {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .modal-actions button:first-child {
    background-color: #007bff;
    /* Azul */
    color: white;
  }
  
  .modal-actions button:first-child:hover {
    background-color: #0056b3;
    /* Azul oscuro */
  }
  
  .modal-actions button:last-child {
    background-color: #6c757d;
    /* Gris */
    color: white;
  }
  
  .modal-actions button:last-child:hover {
    background-color: #5a6268;
    /* Gris oscuro */
  }
  </style>