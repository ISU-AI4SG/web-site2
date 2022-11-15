import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";

const app = createApp(App);
app.config.unwrapInjectedRef = true;
app.use(Quasar, quasarUserOptions);
app.use(router);
app.mount("body");
