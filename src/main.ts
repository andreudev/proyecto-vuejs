import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia"; // Importa Pinia
import "bootstrap/dist/css/bootstrap.min.css"; // Importa Bootstrap CSS
import "bootstrap"; // Importa Bootstrap JS

const app = createApp(App);
const pinia = createPinia(); // Crea una instancia de Pinia

app.use(router);
app.use(pinia); // Usa Pinia en tu aplicación

app.mount("#app");
