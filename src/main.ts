import { createApp } from "vue";
import { store, key } from "./store/index";
import App from "./App.vue";
import "./assets/css/App.scss";

createApp(App).use(store, key).mount("#app");
