import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import AdminView from "../views/AdminView.vue";
import UserView from "../views/UserView.vue";
import ModeratorView from "../views/ModeratorView.vue";
import { auth } from "../backend/firebase";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/user", component: UserView, meta: { requiresAuth: true } },
  { path: "/moderator", component: ModeratorView, meta: { requiresAuth: false, requiresModerator: true } },
  { path: "/admin", component: AdminView, meta: { requiresAuth: false, requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;