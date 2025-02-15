import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia"; // Importa Pinia para la gestión del estado
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap CSS
import "bootstrap"; // Importa Bootstrap JS
import { useAuthStore } from "./store/authStore"; // Importa el store de autenticación

// Crea la aplicación Vue
const app = createApp(App);

// Usa el router
app.use(router);

// Usa Pinia para la gestión del estado
const pinia = createPinia();
app.use(pinia);

// Monta la aplicación
app.mount("#app");

// Escucha el estado de autenticación al cargar la aplicación
const authStore = useAuthStore();
authStore.listenAuthState();