<template>
    <div class="container">
      <h1>Lista de Tareas</h1>
      <div class="form">
        <input v-model="nuevaTarea" placeholder="Escribe una tarea" @keyup.enter="agregarTarea" />
        <button @click="agregarTarea">Agregar</button>
      </div>
  
      <ul>
        <li v-for="tarea in tareas" :key="tarea.id">
          <span :class="{ completada: tarea.completada }" @click="toggleCompletada(tarea.id)">
            {{ tarea.texto }}
          </span>
        </li>
      </ul>
    </div>
  </template>
<script setup>
import { ref } from 'vue';

const nuevaTarea = ref('');
const tareas = ref([]);

const agregarTarea = () => {
  if (nuevaTarea.value.trim() === '') return;
  tareas.value.push({ id: Date.now(), texto: nuevaTarea.value, completada: false });
  nuevaTarea.value = '';
};

const toggleCompletada = (id) => {
  const tarea = tareas.value.find(t => t.id === id);
  if (tarea) tarea.completada = !tarea.completada;
};
</script>

<style scoped>
.container {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 8px;
}
button {
  padding: 8px 12px;
  cursor: pointer;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  cursor: pointer;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.completada {
  text-decoration: line-through;
  color: gray;
}
</style>
