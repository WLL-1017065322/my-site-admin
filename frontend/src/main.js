import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

// import { Button, message } from 'ant-design-vue';
// import Button from 'ant-design-vue/lib/button';
// import 'ant-design-vue/lib/button/style/css'; // 或者 ant-design-vue/lib/button/style/css 加载 css 文件
import 'ant-design-vue/es/message/style/css';
const app = createApp(App)

app.use(router)

app.config.productionTip = false;
// app.use(Button)
// app.use(message)

// app.config.globalProperties.$message = message;
app.mount('#app')