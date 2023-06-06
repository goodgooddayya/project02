<script setup>
import Menu from '../components/Menu.vue'
import Title from '../components/Title.vue'
import Photo from "../components/Photo.vue";
import {useRoute} from "vue-router";
import {onMounted, provide, ref} from "vue";

const route=useRoute()

let loginAdmin=ref('')
onMounted(()=>{
  loginAdmin=route.query.id
  console.log(loginAdmin)
})
//传给子组件的登录id，这个id又由首页的登录传来，通过使用query传递
provide('message',loginAdmin)
</script>

<template>
  <el-container class="container">
    <el-aside className="sidebar">
      <div class="photo">
        <Photo/>
      </div>
      <div class="menu">
        <Menu/>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <Title/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>


</template>

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
  margin: 15px 12px 0 0;
}
</style>
