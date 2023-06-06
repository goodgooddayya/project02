import {createApp} from "vue";
import App from './App.vue'

import ElementPlus from 'element-plus'
import * as ELIcons from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import router from "./router.js";
import axios from 'axios';
import *as echarts from  'echarts';



const app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.mount('#app')



app.config.globalProperties.$axios = axios
app.config.globalProperties.$echarts=echarts



for (let iconName in ELIcons) {
    app.component(iconName, ELIcons[iconName])
}
//链式写法  上三行等同于app.use(ElementPlus).use(router).mount('#app')