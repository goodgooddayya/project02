<template>
  <el-container class="container">
    <el-aside className="sidebar">
      <div class="photo" >
        <Photo/>
        <span style="text-decoration-color: white">{{name}}</span>
      </div>
      <div class="menu">
        <MenuStu/>
      </div>
    </el-aside>
    <el-container>
      <el-header>

      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script setup>
import Photo from './Photo.vue'
import {onMounted, reactive, ref} from "vue";
import { StarFilled } from '@element-plus/icons-vue'
import Menu from "../components/Menu.vue";
import MenuStu from './MenuStu.vue'
import {useRoute, useRouter} from "vue-router";
import axios from "../axiosInstance.js";


const route=useRoute()

let name=ref('学生01')
let studentData=ref({
  id:'',
  name:'',
  sex:'',
  major:'',
  password:''
})
function getData(){
  console.log(1234)
  studentData.value.id=route.query.id
  console.log(route.query.id)
}
onMounted(()=>{
  getData()

})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  /*background-color: pink;*/
  /*flex-direction: row;*/
  height: 100vh;
}

.photo {
  width: 179px;
  padding: 10px 0 0 20px;
  background-color: #545c64;
}
</style>