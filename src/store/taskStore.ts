import { defineStore } from "pinia";
import { ref } from "vue";
import { db } from "../backend/firebase"; // Importa la instancia de Firestore
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

// Define el tipo de una tarea
interface Task {
  id: string;
  text: string;
  completed: boolean;
  inProgress: boolean;
  createdAt: Date;
  userId: string; // ID del usuario que creó la tarea
}

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[], // Tareas del usuario actual
    allTasks: [] as Task[], // Todas las tareas (para moderadores y administradores)
  }),
  actions: {
    // Cargar tareas del usuario actual
    async loadUserTasks(userId: string) {
      const q = query(collection(db, "tasks"), where("userId", "==", userId));
      onSnapshot(q, (querySnapshot) => {
        this.tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
      });
    },

    // Cargar todas las tareas (para moderadores y administradores)
    async loadAllTasks() {
      const q = query(collection(db, "tasks"));
      onSnapshot(q, (querySnapshot) => {
        this.allTasks = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];
      });
    },

    // Agregar una nueva tarea
    async addTask(text: string, userId: string) {
      try {
        await addDoc(collection(db, "tasks"), {
          text,
          completed: false,
          inProgress: false,
          createdAt: new Date(),
          userId,
        });
      } catch (error) {
        console.error("Error al agregar tarea:", error);
      }
    },

    // Editar una tarea
    async editTask(taskId: string, newText: string) {
      try {
        await updateDoc(doc(db, "tasks", taskId), {
          text: newText,
        });
      } catch (error) {
        console.error("Error al editar tarea:", error);
      }
    },

    // Eliminar una tarea
    async deleteTask(taskId: string) {
      try {
        await deleteDoc(doc(db, "tasks", taskId));
      } catch (error) {
        console.error("Error al eliminar tarea:", error);
      }
    },

    // Marcar/desmarcar una tarea como completada
    async toggleTask(taskId: string) {
      try {
        const task = this.tasks.find((t) => t.id === taskId);
        if (task) {
          await updateDoc(doc(db, "tasks", taskId), {
            completed: !task.completed,
          });
        }
      } catch (error) {
        console.error("Error al marcar tarea como completada:", error);
      }
    },
  },
});