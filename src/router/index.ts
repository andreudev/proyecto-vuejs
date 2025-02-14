import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import { auth } from "@/infrastructure/firebase/firebaseConfig"; // Importa la autenticación desde el backend

// Define las rutas de la aplicación
const routes = [
  {
    path: "/",
    redirect: "/login", // Redirige a /login por defecto
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
  },
  {
    path: "/home",
    name: "Home",
    component: HomeView,
    meta: { requiresAuth: true }, // Protege esta ruta
  },
];

// Crea el router con el historial de navegación
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guardia de navegación: verifica si el usuario está autenticado
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth); // Verifica si la ruta requiere autenticación
  const isAuthenticated = auth.currentUser; // Verifica si el usuario está autenticado

  if (requiresAuth && !isAuthenticated) {
    next("/login"); // Redirige a /login si no está autenticado
  } else {
    next(); // Permite el acceso a la ruta
  }
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth); // Verifica si la ruta requiere autenticación
  const isAuthenticated = auth.currentUser; // Verifica si el usuario está autenticado

  if (requiresAuth && !isAuthenticated) {
    next("/login"); // Redirige a /login si no está autenticado
  } else if (
    !requiresAuth &&
    isAuthenticated &&
    (to.path === "/login" || to.path === "/register")
  ) {
    next("/home"); // Redirige a /home si el usuario está autenticado y trata de acceder a /login o /register
  } else {
    next(); // Permite el acceso a la ruta
  }
});

export default router;
