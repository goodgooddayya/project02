import {createRouter, createWebHashHistory} from 'vue-router'

import Table_Order from "./components/Table.vue"
import Hello from "./components/Hello.vue"
import Chart from "./components/Chart.vue";
import SettingProblems from './components/SettingProblems.vue'
import SettingMessages from './components/SettingsMessages.vue'
import Table_Reader from './components/Table_Reader.vue'
import Admin from './admin/Admin.vue'
import HomePage from './homePage/HomePage.vue'
import CurSeat from './components/CurSeat.vue'
import AddMessages from './components/AddMessages.vue'
import UpdateMessage from './components/UpdateMessage.vue'
import AddProblems from './components/AddProblems.vue'
import UpdateProblem from './components/UpdateProblem.vue'
import Student from './student/Student.vue'
import OrderStu from './student/OrderStu.vue'
import OrderInfoShow from './student/OrderInfoShow.vue'
import SettingStuMessages from './student/SettingStuMessages.vue'
import ShowLibrary from './student/ShowLibrary.vue'
import SendOpinion from './student/SendOpinion.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:'/',component: HomePage
        },
        {
            path: '/Admin',
            component: Admin,
            children:[
                {path: '',component: Hello },//加载为Admin的默认页面
                {path: '/Table_Order',component: Table_Order },
                {path: '/Table_Reader',component:Table_Reader},
                {path: '/SettingProblems',component:SettingProblems},
                {path: '/AddProblems',component:AddProblems},
                {path: 'UpdateProblem/:id/:title/:content/:state/:createtime',name:'UpdateProblem',component:UpdateProblem},
                {path: '/Chart',component:Chart},
                {path: '/SettingMessages',component:SettingMessages},
                {path: '/AddMessages',component:AddMessages},
                {path: '/UpdateMessage/:id/:title/:content/:state/:createtime',name:'UpdateMessage',component:UpdateMessage},
                {path: '/CurSeat',component:CurSeat}]
        },
        {
            path:'/Student',
            name:'Student',
            component:Student,
            children:[
                {path: '',component: Hello},
                {path: '/OrderStu',component: OrderStu},
                {path: '/OrderInfoShow',component: OrderInfoShow},
                {path: '/SettingStuMessages',component: SettingStuMessages},
                {path: '/ShowLibrary',component: ShowLibrary},
                {path: '/SendOpinion',component: SendOpinion}
            ]
        }
    ]
})

export default router;
