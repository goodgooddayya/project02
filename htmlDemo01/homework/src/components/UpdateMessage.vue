<template>
  <el-form :model="form" label-width="120px">
  <el-form-item label="编号">
    <el-input v-model="form.id" disabled/>
  </el-form-item>
  <el-form-item label="标题">
    <el-input v-model="form.title" />
  </el-form-item>
  <el-form-item label="是否发布">
    <el-switch v-model="form.state"/>
  </el-form-item>
  <el-form-item label="发布问题内容">
    <el-input v-model="form.content" type="textarea" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="updateMessage">确认</el-button>
    <el-button @click="prev">取消</el-button>
  </el-form-item>
</el-form>
</template>

<script setup>
import {onMounted, reactive, ref} from 'vue'
import axios from "../axiosInstance.js";
import router from "../router.js";
import {useRoute} from "vue-router";


const route=useRoute()
let form = reactive({
  id:route.params.id,
  title: route.params.title,
  content:route.params.content,
  state:Boolean(route.params.state),
  createTime:route.params.createtime,
})
onMounted(()=>{
  console.log("来自route："+route.params.state)
  form.state=Number(route.params.state)
  form.state=Boolean(form.state)
  console.log("赋值改变以后form.state:"+form.state)
})
function putData(){
  axios.put(`/notice/updateNotice/${form.id}`,form)
      .then(response=>{
        alert("修改成功！")
      })
      .catch(error=>{
        console.log(error)
      })
}

function updateMessage(){
  form.state = form.state ? 1 : 0;
  putData()
}

function prev(){
  router.back()
}


</script>

