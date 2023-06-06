<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="标题">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="是否发布">
      <el-switch v-model="form.state" @click="state"/>
    </el-form-item>
    <el-form-item label="发布内容">
      <el-input v-model="form.content" type="textarea" @click="state"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addMessage">发布</el-button>
      <el-button @click="prev">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {onMounted, reactive} from 'vue'
import axios from "../axiosInstance.js";
import router from "../router.js";

const form = reactive({
  id:'',
  title: '',
  content:'',
  state:'',
  createTime:'',
})


function state(){
  console.log(form.state)
}

function getData(){
  if (form.state) form.state=1
  else form.state=0
  // 示例使用
  form.createtime = Date.now();
  form.createtime=formatDateTime(form.createtime)
  axios.post("/notice/addNotice",form)
      .then(response=>{
        console.log(response.data)
        alert("新增成功！")
        form.title=''
        form.content=''
      })
      .catch(error=>{
        console.log(error)
        alert("新增失败！")
      })
}

function addMessage(){
  console.log(form)
  getData()
}

function formatDateTime(timestamp) {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
function prev(){
  router.back()
}

</script>
