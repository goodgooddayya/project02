<template>
  <div class="sidebar">
    <div class="right">
      <div>
        <div class="inform-box1-title">
          <img src="../assets/inform.png" alt="常见问题">
          <span style="color: white;font-size: 15px;">常见问题</span>
        </div>
        <div class="inform-box1-next">
          <table>
            <tr v-for="problem in problems" :key="problem.id">
              <template v-if="problem.state===1">
                <el-button text @click="showDialog(problem.id)" size="default" style="background-color: transparent;color: cornflowerblue;text-align: center">{{ problem.title }}</el-button>
                <el-dialog
                    :model-value="result[problem.id]"
                    :key="problem.id"
                    title="常见问题"
                    width="40%"
                    @close="closeDialog(problem.id)"
                >
                  <span>{{ problem.content }}</span>
                  <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="closeDialog(problem.id)">确认</el-button>
              </span>
                  </template>
                </el-dialog>
              </template>
            </tr>
          </table>
        </div>
      </div>

      <div>
        <div class="inform-box1-title">
          <img src="../assets/questions.png" alt="最新通知">
          <span style="color: white;font-size: 15px;">最新通知</span>
        </div>
        <div class="inform-box1-next">
          <table>
            <tr v-for="data in datas" :key="data.id">
              <template v-if="data.state===1">
                <el-button text @click="showDialog2(data.id)" size="default" style="background-color: transparent;color: cornflowerblue;">{{ data.title }}</el-button>
                <el-dialog
                    :model-value="result2[data.id]"
                    :key="data.id"
                    title="通知"
                    width="40%"
                    @close="closeDialog(data.id)"
                    modal
                >
                  <span>{{ data.content }}</span>
                  <template #footer>
              <span class="dialog-footer">
                <el-button type="primary" @click="closeDialog2(data.id)">确认</el-button>
              </span>
                  </template>
                </el-dialog>
              </template>
            </tr>
          </table>
        </div>
      </div>


    </div>
  </div>

</template>

<script setup>
//侧边固定栏
//

import {onMounted, reactive, ref} from "vue";
import axios from "../axiosInstance.js";
import {ElMessageBox} from "element-plus";


let sidebar ;
let sidebarTop ;

let datas=ref([])
let problems=ref([])
let result=ref({})
let result2=ref({})
function sideFixed(){
  sidebar=document.querySelector('.sidebar');
  sidebarTop=sidebar.offsetTop;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > sidebarTop) {

      sidebar.classList.add('fixed');
    } else {
      sidebar.classList.remove('fixed');
    }
  });
}
function getData(){
  axios.get(`/notice/getAllNotices`)
      .then(response=>{
        datas.value=response.data
        initializeDialogVisible()
      })
      .catch(error=>{
        console.log(error)
      })
  axios.get('/problem/getAllProblems')
      .then(response=>{
        problems.value=response.data
        initializeDialogVisible2()
      })
      .catch(error=>{
        console.log(error)
      })
}

function initializeDialogVisible() {
  problems.value.forEach(problem => {
    result.value[problem.id] = false; // 初始化对话框可见状态为false
  });
}
function initializeDialogVisible2() {

  datas.value.forEach(data => {
    result2.value[data.id] = false; // 初始化对话框可见状态为false
  });
}

function showDialog(id) {
  result.value[id] = true; // 显示对应id的对话框
}
function showDialog2(id) {
  result2.value[id] = true; // 显示对应id的对话框
}
function closeDialog(id) {
  result.value[id] = false; // 显示对应id的对话框
}
function closeDialog2(id) {
  result2.value[id] = false; // 显示对应id的对话框
}



onMounted(()=>{
  sideFixed()
  getData()
})
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.sidebar{
  display: flex;
}
.right{
  display: block;
  background-color: white;
  width: calc(100% - 85%);
  height:100%;
  float: right;
  position: fixed;
  box-sizing: border-box;

}
.inform-box1-title{
  margin-top: 10px;
  padding-bottom: 15px;
  background-color: cadetblue;
  text-align: center;

}
.inform-box1-next{
  margin-top: 3px;

  text-align: center;
  background-color: lightgoldenrodyellow;
}
.inform-box1-next a{
  text-decoration: underline;
  font-size: 7px;
  color: #000;
  text-align: left;
}
.inform-box1-title img{
  position: relative;
  top: 10px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>