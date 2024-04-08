import { createApp } from 'vue'
// @ts-ignore
import Lara from './presets/lara';
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';

const app = createApp(App)
app.use(PrimeVue, {
    ripple: true,
    unstyled: true,
    pt: Lara
});
app.mount('#app')