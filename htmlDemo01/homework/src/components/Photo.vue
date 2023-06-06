<template>
  <div class="block">
    <el-avatar :size="50" :src="circleUrl" @click="changeAvatar" />
  </div>
  <div>
    <span>{{username}}</span>
  </div>
  <hr/>
</template>

<script setup>
import {inject, onMounted, reactive, ref, toRefs} from "vue";

const username=ref('Admin01')
//响应式数据对象
const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
})

const { circleUrl } = toRefs(state)

function changeAvatar() {
  // 弹出上传图片的窗口
  const input = document.createElement('input')//创建一个input元素，用于上传图片
  input.type = 'file'
  input.accept = 'image/*'
  //通过调用addEvenListener监听input元素的change事件
  input.addEventListener('change', () => {
    const file = input.files[0]
    const reader = new FileReader()//创建一个FileReader对象用于读取图片文件
    reader.readAsDataURL(file)//调用reader.readAsDataURL方法读取图片文件
    reader.onload = () => {
      // 上传成功后更新头像
      state.circleUrl = reader.result
    }
  })
  input.click()//input.click方法打开文件选择框
}

//由父组件传来的登录的管理员id
let loginAdmin=inject('message')




</script>

<style scoped>
</style>
