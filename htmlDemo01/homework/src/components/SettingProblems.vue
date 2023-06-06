<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="buttons">
          <el-button type="primary">
            <router-link to="/AddProblems" style="text-decoration: none;color: white">新增常见问题</router-link>
          </el-button>
        </div>
      </el-header>
      <el-main>
        <div class="cards-container" v-if="data.length>0">
          <el-card v-for="item in data" :key="item.id" class="box-card" style="width: 100%;margin-bottom: 50px">
            <template #header>
              <div class="card-header">
                <span>{{ item.title }}</span>
                <span style="font-size: 10px">问题创建时间：{{item.createtime}}</span>
                <span style="font-size: 10px">状态：{{item.state}}</span>
                <div class="button">
                  <el-button type="danger" @click="delProblem(item.id)">删除</el-button>
                  <el-button type="info">
                    <router-link :to="{ name:'UpdateProblem',params:{id:item.id,title:item.title,content:item.content,state:item.state,createtime:item.createtime} }" style="text-decoration: none;color: white">编辑</router-link>
                  </el-button>
                </div>
              </div>
            </template>
            <div class="card-content">
              <p>{{ item.content }}</p>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>


<script setup>

import { onMounted, reactive, ref} from "vue";
import axios from "../axiosInstance.js";
import {ElMessageBox} from "element-plus";
import router from "../router.js";
/*const data=reactive([
  {
    id:'1',
    title:'如何',
    content:'你还好吗？项目做的可还成功?',
    state:'已发布',
    createtime:'2023-06-04 12：00：00'
  },
      {
        id:'2',
        title:'每日一问今天我的cp公开了吗？',
        content:'不太好，每天改bug改的我头疼欲裂',
        state:'未发布',
        createtime:'2023-06-04 12：00：00'
      },
      {
        id:'3',
        title:'今天不公开明天定公开！',
        content:'jww x jun就是坠吊的！',
        state:'已发布',
        createtime:'2023-06-04 12：00：00'
      },
      {
        id:'4',
        title:'《富士山下》',
        content:'就像车到山前云开见月，你爱上他，就不要怪蝴蝶扇动翅膀。——《富士山下》',
        state:'未发布',
        createtime:'2023-06-04 12：00：00'
      }
])*/
let data=ref([])

onMounted(()=>{
  getData(data)
})

function getData(data){
  axios.get(`/problem/getAllProblems`)
      .then(response=>{
        data.value=response.data
      })
      .catch(error=>{
        console.log(error)
      })
}

function delProblem(id) {
  console.log(id)
  ElMessageBox.confirm("此操作将彻底删除该问题信息记录，是否继续？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    del(id)
    router.go(0)
    alert("删除成功！")
  }).catch(() => {
    alert("删除失败！")
  });

}
const del = (id) => { // 定义一个函数，用于删除某行数据
  console.log(`/problem/delProblem/${id}`)
  axios.delete(`/problem/delProblem/${id}`)
      .then(response=>{
        console.log(response.data)
      })
      .catch(error=>{
        console.log(error)
      })
}
</script>

<style scoped>

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.box-card {
  width: 480px;
}
</style>