<template>
  <div class="menu" id="nav">
    <ul class="menu1">
      <li>
        <a href="#" target="_self" class="nav active">首页</a>
      </li>
      <li>
        <a href="#" class="nav">座位预约</a>
      </li>
      <li>
        <a href="#" class="nav">预约规则</a>
      </li>

    </ul>

  </div>
</template>

<script setup>
//导航栏下拉菜单
//点击按钮，下拉菜单在显示/隐藏之间切换
/*function menuFunc() {
  document.getElementById("myDropdown").classList.toggle("show");
}

//点击下拉菜单外区域隐藏
// 点击下拉菜单意外区域隐藏
window.onclick = function(e) {
  if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
    if (myDropdown.classList.contains('show')) {
      myDropdown.classList.remove('show');
    }
  }
}*/

</script>

<style scoped>

#nav {
  background-color: #333;
  overflow: hidden;
}

/* 设置导航栏中菜单选项的样式 */
#nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

#nav li {
  float: left;
  padding-left: 200px;
}

#nav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

/* 设置高亮效果 */
#nav li a.active {
  background-color: #4CAF50;
}

.dropdown{
  float: left;
  overflow: hidden;
}
.dropbtn {
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}
.dropbtn{
  cursor: pointer;
  font-size: 15px;
  border: none;
  outline: none;
  color: white;
  background-color: inherit;
}
.dropbtn:hover{
  color: red;
}
.dropdown-content{
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 150px;
  z-index: 1;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  text-align: left;

}
#myDropdown a{
  float: none;
  color: black;
  text-decoration: none;
  display: block;
  padding:12px 16px;
}
#myDropdown a:hover{
  color: lightblue;
}
.show{
  display: block;
}
</style>