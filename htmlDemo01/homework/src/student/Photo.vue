<template>
  <div class="block">
    <el-avatar :size="50" :src="circleUrl" @click="open" />
  </div>
  <div>
    <span>{{username}}</span>
  </div>
</template>

<script setup>

import {reactive, ref, toRefs} from "vue";
import {ElMessage} from "element-plus";

const username=ref('')
//响应式数据对象
const state = reactive({
  circleUrl: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
})

const { circleUrl } = toRefs(state)
const open = () => {
  ElMessage('很抱歉我们无法为您送上更改头像的服务哦！')
}
</script>

<style scoped>

</style>