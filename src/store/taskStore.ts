import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref([]);
  const editingTask = ref(null);

  const addTask = (task) => {
    tasks.value.push({
      id: Date.now(),
      text: task,
      completed: false,
      createdAt: new Date(), // Agregamos la fecha de creación
    });
  };

  const toggleTask = (id) => {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.completed = !task.completed;
  };

  const deleteTask = (id) => {
    tasks.value = tasks.value.filter((t) => t.id !== id);
  };

  const editTask = (id, newText) => {
    const task = tasks.value.find((t) => t.id === id);
    if (task) task.text = newText;
  };

  return { tasks, addTask, toggleTask, deleteTask, editTask, editingTask };
});