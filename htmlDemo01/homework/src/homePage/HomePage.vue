<template>
  <div class="container">
    <Top/>
    <Menu/>
    <Middle/>
    <Bottom/>
  </div>
</template>

<script setup>
import Top from './Top.vue'
import Menu from './Menu.vue'
import Middle from './Middle.vue'
import Bottom from './Bottom.vue'
import {createApp, provide, reactive, ref} from "vue";


const isLoggedIn=ref(false)
provide('message',isLoggedIn)



</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.container{
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-grow: 1;
  height: 100%;
  width: 100%;
}
</style>