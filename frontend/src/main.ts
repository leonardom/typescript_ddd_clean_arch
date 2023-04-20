import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { AxiosAdapter } from './infra/http/AxiosAdapter';
import { CheckoutGatewayHttp } from './gateway/CheckoutGatewayHttp';

const httpClient = new AxiosAdapter();
const checkoutGateway = new CheckoutGatewayHttp(httpClient, "http://localhost:3000");

const app = createApp(App)
app.provide('checkoutGateway', checkoutGateway); 
app.mount('#app')
