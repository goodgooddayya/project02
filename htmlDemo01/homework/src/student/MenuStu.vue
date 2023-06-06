<template>
  <el-col :span="12">
    <el-menu
        router unique-opened
        :default-active="$route.path"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
    >
      <el-sub-menu>
        <template #title>
          <el-icon><location /></el-icon>
          <span>预订管理</span>
        </template>
        <el-menu-item-group title="Group One">
          <el-menu-item index="/ShowLibrary">查看阅览室分布情况</el-menu-item>
          <el-menu-item index="/OrderStu">预定座位</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
      <el-menu-item index="/SettingStuMessages">
        <el-icon><icon-menu /></el-icon>
        <span>个人信息修改</span>
      </el-menu-item>
      <el-menu-item index="/OrderInfoShow">
        <el-icon><document /></el-icon>
        <span>历史预订</span>
      </el-menu-item>
      <el-menu-item index="/SendOpinion">
        <el-icon><document /></el-icon>
        <span>反馈意见</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script setup>
import {Document, Menu as IconMenu, Location, Setting,} from '@element-plus/icons-vue'






</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 515px;
}
</style>