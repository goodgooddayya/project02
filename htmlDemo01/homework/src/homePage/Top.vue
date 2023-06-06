<template>
  <div class="top">
    <div class="title">
      <img src="../assets/library.png" alt="图书馆">
      <span style="font-size: 30px;color: white">图书馆座位管理系统</span>
    </div>
    <div class="login">
<!--      <a href="#" @click="showModal" class="nav">登录</a>-->
      <template v-if="isLoggedIn">
        <span style="color: white">{{ stuname }}</span>
        <button @click="logout" style="margin-left: 10px">退出</button>
      </template>
      <template v-else>
        <a href="#" @click="showModal" class="nav">登录</a>
      </template>
      <img src="../assets/user-pictures.png" alt="用户">
    </div>
    <!-- 模态框 -->
    <div class="modal" id="login-modal"  >
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Login</h2>
        </div>
        <div class="modal-body">
          <form>
            <label for="username">账号：</label>
            <input type="text" id="username" v-model="username" placeholder="请输入账号">
            <label for="password">密码：</label>
            <input type="password" id="password" v-model="password" placeholder="请输入密码">
            <button type="button" @click.prevent="login_Stu" class="btn">登录</button>
          </form>
          <span><el-button text @click="dialogFormVisible = true">忘记密码</el-button> </span>
          <el-dialog v-model="dialogFormVisible" title="Shipping address">
            <el-form :model="form">
              <el-form-item label="学号" :label-width="formLabelWidth">
                <el-input v-model="form.id" autocomplete="off" />
              </el-form-item>
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off" />
              </el-form-item>
              <el-form-item label="验证码" :label-width="formLabelWidth">
                <el-input type="text" v-model="form.randomNum" autocomplete="off" />
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer"><el-button @click="dialogFormVisible = false">取消
              </el-button><el-button type="primary" @click="dialogFormVisible = false">确认
              </el-button></span>
            </template>
          </el-dialog>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {inject, onMounted, reactive, ref} from "vue";
import axios from "../axiosInstance.js";




const router=useRouter();

const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
  randomNum:''
})

let modal;
let span;
onMounted(()=>{
  getData()
  modal=document.getElementById('login-modal')
  span= document.getElementsByClassName("close");
})
function getData(){
  axios.get(`/login/loginStu`).then(response=>{//连上数据库了
    students.value=response.data
  }).catch(error=>{
    console.log(error)
  })
}

//获取账号密码
const username=ref()
const password=ref()
const students=reactive({
  id:'',
  name:'',
  sex:'',
  major:'',
  password:''
})
//退出登录
const isLoggedIn = inject('message');
const stuname=ref();//用户名


function login_Stu(){
  getData()

  let isStu=false;
  /*var IDs=students.value.map(item=>item.ID)
  var passwords=students.value.map(item=>item.password)
  var names=students.value.map(item=>item.name)*/
  var studentsArray = Object.values(students.value); // 将对象转换为数组
  var IDs = studentsArray.map(item => item.id);
  var passwords = studentsArray.map(item => item.password);
  var names = studentsArray.map(item => item.name);

  for (let i = 0; i < IDs.length; i++) {

    if(username.value===IDs[i]&&password.value===passwords[i]){
      isStu=true;
      isLoggedIn.value=true
      stuname.value=names[i]
      students.value=studentsArray[i]
    }
  }
  if(isStu){
    alert("登陆成功！")
    console.log(12111)
    console.log(students.value)
    router.push({path:'/Student',query:{id:students.value.id}});
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

function logout() {
  isLoggedIn.value = false;
  stuname.value = '';
  // 跳转到首页或其他页面
  router.push('/');
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
.top{
  display: flex;
  height: 70px;
  width: 100%;
  background-color: darkslategray;
  position: relative;
  z-index: 100;

  top: 0;
}
.top img{
  position: relative;
  top: 12px;
}

.login{
  float: right;
  margin-left: 800px;
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
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
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

.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>