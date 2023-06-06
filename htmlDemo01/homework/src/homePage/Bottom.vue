<template>

  <div class="bottom">
    <div class="copyright">
      Copyright © 2023 上学真难公司所有
      <span style="padding-left: 20px;color: #007bff;cursor: pointer" @click="showModal">后台管理入口</span>
    </div>
    <div class="modal" id="login-modal1">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close1" @click="closeModal">&times;</span>
          <h2>Login</h2>
        </div>
        <div class="modal-body">
          <form>
            <label for="username">账号：</label>
            <input type="text" id="username" v-model="username" placeholder="请输入账号">
            <label for="password">密码：</label>
            <input type="password" id="password" v-model="password" placeholder="请输入密码">
            <button type="button" @click.prevent="login_Admin" class="btn">登录</button>
          </form>
          <span><a href="#" style="color: blue">忘记密码？</a> </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {onMounted, provide, reactive, ref} from "vue";
import axios from "../axiosInstance.js";

const router=useRouter();
const loginAdmin=ref({
  id:'',
  name:'',
  sex:'',
  phone:'',
  email:'',
  username:'',
  password:'',
  photo:''
})

//使用dom元素要用钩子调用 否则会出问题
let modal;
let span;
onMounted(()=>{
  getData()
  modal=document.getElementById('login-modal1')
  span= document.getElementsByClassName("close1");
})

//获取账号密码

const username=ref()
const password=ref()
const admins=reactive({
  id:'',
  name:'',
  sex:'',
  phone:'',
  email:'',
  username:'',
  password:'',
  photo:''
})
function getData(){
  axios.get(`/login/loginAdmin`).then(response=>{//连上数据库了
    admins.value=response.data
  }).catch(error=>{
    console.log(error)
  })

}
function login_Admin(){
  getData()
  let isAdmin=false;
  var adminsArray=Object(admins.value)
  var usernames=adminsArray.map(item=>item.username)
  var passwords=adminsArray.map(item=>item.password)

  for (let i = 0; i < usernames.length; i++) {
    if(username.value===usernames[i]&&password.value===passwords[i]){
      loginAdmin.value=adminsArray[i]
      isAdmin=true;
    }
  }
  if(isAdmin){
    alert("登陆成功！")
    console.log(loginAdmin.value.id)
    router.push({path:'/Admin',query:{id:loginAdmin.value.id}});
    closeModal()
    username.value=''
    password.value=''
  }
  else
  {
    alert("账号或密码错误！请重新登录！")
    username.value=''
    password.value=''
  }

}
function closeModal(){
  modal.style.display='none'
}
function showModal(){
  modal.style.display='block';
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.bottom{
  height: 20px;
  width: 100%;
  background-color: #dddddd;
  text-align: center;
}
.login{
  float: right;
  margin-left: 840px;
  padding-top: 10px;

}
.login a{
  text-decoration: none;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 18px;
}
/* 遮罩层样式 */
.modal {
  display: none; /* 默认隐藏 */
  position: fixed; /* 固定定位，使其覆盖其他内容 */
  z-index: 1; /* 放在最上层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4); /* 半透明背景 */
}

/* 模态框样式 */
.modal-content {
  background-color: #fff;
  margin: 10% auto; /* 上下居中 */
  padding: 20px;
  border: 1px solid #888;
  width: 30%; /* 宽度可自行调整 */
  border-radius: 5px;
}

/* 模态框头部样式 */
.modal-header {
  margin: 10px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 关闭按钮样式 */
.close1 {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close1:hover,
.close1:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* 模态框内容样式 */
.modal-body input[type=text],
.modal-body input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
}
/* 按钮样式 */
.btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  text-align: center;
  cursor: pointer;
}
</style>