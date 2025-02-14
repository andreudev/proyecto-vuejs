import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap CSS
import "bootstrap"; // Importa Bootstrap JS

createApp(App).use(router).mount("#app");