<template>
  <div class="left">
    <div class="slider-container">  <!-- 图片轮播器的容器 -->
      <div class="slider">  <!-- 存放图片的容器 -->
        <div class="slide">  <!-- 单张图片和标题的容器 -->
          <img src="../assets/library01.png" alt="标题一">  <!-- 图片路径和标题 -->
          <div class="caption">馆内采景一</div>  <!-- 标题 -->
        </div>
        <div class="slide">
          <img src="../assets/library02.png" alt="标题二">
          <div class="caption">馆内采景二</div>
        </div>
        <div class="slide">
          <img src="../assets/library03.png" alt="标题三">
          <div class="caption">馆内采景三</div>
        </div>
      </div>
      <div class="arrows">  <!-- 存放左、右箭头的容器 -->
        <div class="arrow prev">&lt;</div>  <!-- 左箭头 -->
        <div class="arrow next">&gt;</div>  <!-- 右箭头 -->
      </div>

    </div>

    <div class="seat-position-top">
      <br>
      <h2 style="text-align: center">校区图书馆座位列表</h2><hr>
      <div class="seat-position-middle">
        <div class="one item">
          <img src="../assets/library01.png" style="width: 150px;height: 100px;" alt="01图书馆">
          <br>01校区图书馆<br>
          <button class="button" @click="handleButtonClick()">座位查看</button>
        </div>
        <div class="two item">
          <img src="../assets/library02.png" style="width: 150px;height: 100px" alt="02图书馆">
          <br>02校区图书馆<br>
          <button class="button" @click="handleButtonClick()">座位查看</button>
        </div>
        <div class="three item">
          <img src="../assets/library03.png" style="width: 150px;height: 100px" alt="03图书馆">
          <br>03校区图书馆<br>
          <button class="button" @click="handleButtonClick()">座位查看</button>
        </div>
        <div class="four item">
          <img src="../assets/library04.png" style="width: 150px;height: 100px" alt="04图书馆">
          <br>04校区图书馆<br>
          <button class="button" @click="handleButtonClick()">座位查看</button>
        </div>
        <div class="five item">
          <img src="../assets/library02.png" style="width: 150px;height: 100px" alt="05图书馆">
          <br>05校区图书馆<br>
          <button class="button" @click="handleButtonClick()">座位查看</button>
        </div>
        <div class="six item">
          <img src="../assets/library03.png" style="width: 150px;height: 100px" alt="06图书馆">
          <br>06校区图书馆<br>
          <button class="button" @click="handleButtonClick()">座位查看</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
// 获取轮播图容器和轮播图中的每个轮播项，以及左右箭头按钮
import {inject, onMounted} from "vue";
import {useRouter} from "vue-router";



const router=useRouter()

const isLoggedIn=inject('message')
const eventBus=inject('eventBus')


console.log("left："+isLoggedIn.value)
function handleButtonClick(){
  if(isLoggedIn.value===true)
    router.push("/Student")
  else
  {
    alert("你还没有进行登录！请登录后再进入后台！")
  }

}



let slider=null;
let slides=null;
let prevArrow=null;
let nextArrow=null;
onMounted(()=>{
  slider = document.querySelector(".slider");
  slides = slider.querySelectorAll(".slide");
  prevArrow = document.querySelector(".arrow.prev");
  nextArrow = document.querySelector(".arrow.next");
})

// 当前轮播项的索引，以及最大索引
let currentIndex = 0;
let maxIndex ;
onMounted(()=>{
  maxIndex = slides.length - 1
  // 点击左右箭头按钮更新当前轮播项索引，并更新轮播图显示
  prevArrow.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
    } else { currentIndex = maxIndex; }
    updateSlider();
  });
  nextArrow.addEventListener("click", () => {
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {  currentIndex = 0; }
    updateSlider();
  });
})

// 更新轮播图显示
function updateSlider() {
  const offset = (0 - currentIndex) * 100;// 计算需要偏移的距离
  slider.style.transform = `translateX(${offset}%)`; // 设置轮播图容器的偏移
}
// 定义自动切换轮播图函数
function autoUpdateSlider() {
  if (currentIndex < maxIndex) {
    currentIndex++;
  } else {    currentIndex = 0;  }
  updateSlider();
}
// 每隔一定时间自动切换轮播图
let slideInterval = setInterval(autoUpdateSlider, 1000);
// 鼠标移到轮播图上时停止自动切换

onMounted(()=>{
  slider.addEventListener('mouseenter', function() {
    clearInterval(slideInterval);//清除计时器
  });
// 鼠标移开轮播图时恢复自动切换
  slider.addEventListener('mouseleave', function() {
    slideInterval = setInterval(autoUpdateSlider, 1000);//设置计时器
  });

})

//导航栏高亮效果
// 获取所有导航栏中的链接 // 获取导航栏所有菜单项 // 获取所有的导航链接
let navLinks ;
onMounted(()=>{
  navLinks  = document.querySelectorAll(".nav");
  // 为每个导航链接添加事件监听器
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      // 移除其他链接的active类
      navLinks.forEach(link => {
        link.classList.remove("active");
      });
      // 将当前链接添加active类
      link.classList.add("active");
    });
  });
})

</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
.left{
  background-color: #f3f3f3;
  width: 85%;
  height: 100%;
  border: 1px;
  margin-right: 5px;
}

.seat-position-middle{
  display: grid;
  margin: 10px;
  grid-template-columns:1fr 1fr;
  grid-gap: 20px;
}
.one{
  background-color: #dddddd;
  border: cornflowerblue;
}
.two{
  background-color: #dddddd;
}
.three{
  background-color: #dddddd;
}
.four{
  background-color: #dddddd;
}
.five{
  background-color: #dddddd;
}
.six{
  background-color: #dddddd;
}
.item{
  text-align: center;
}
.button{
  margin: 5px;
  font-size: 14px;
  color: #fff;
  height: 30px;
  padding: 0 15px;
  background-color: cornflowerblue;
  border: 1px solid cornflowerblue;
  line-height: 1.2;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
  transition: opacity 0.2s;
  outline: none;
  position: relative;
}
.button:hover,.button:focus{
  background-color: blue;
}
.slider-container {/* 定义轮播图容器的样式 */
  position: relative;
  width: 100%;
  height: 400px; /* 定义容器的高度 */
  overflow: hidden; /* 隐藏容器外的部分内容 */

}

.slider {/* 定义幻灯片容器的样式 */
  display: flex; /* 设置容器为 flex 布局 */
  width: 100%; /* 幻灯片容器的宽度为 100% */
  height: 100%; /* 幻灯片容器的高度为 100% */
  transition: transform 0.5s ease; /* 添加动画效果 */}

.slide {/* 定义幻灯片的样式 */
  position: relative; /* 设置幻灯片的位置为相对定位 */
  flex: 1 0 100%; /* 设置幻灯片的 flex 属性 */}

.slide img {/* 定义幻灯片图片的样式 */
  width: 100%; /* 图片的宽度为 100% */
  height: 100%; /* 图片的高度为 100% */
  object-fit: cover; /* 调整图片大小以适应容器 */}

.caption {/* 定义幻灯片标题的样式 */
  position: absolute; /* 设置标题的位置为绝对定位 */
  bottom: 0; /* 将标题放在幻灯片的底部 */
  left: 0; /* 将标题放在幻灯片的左侧 */
  right: 0; /* 将标题放在幻灯片的右侧 */
  padding: 16px; /* 添加一些内边距 */
  color: #fff; /* 设置标题的颜色为白色 */
  background-color: rgba(0, 0, 0, 0.7); /* 设置标题背景颜色为半透明黑色 */}

.arrows {/* 定义箭头容器的样式 */
  position: absolute; /* 设置箭头容器的位置为绝对定位 */
  top: 50%; /* 将箭头容器置于幻灯片容器的中间 */
  transform: translateY(-50%); /* 垂直居中 */
  display: flex; /* 将箭头容器设置为 flex 布局 */
  justify-content: space-between; /* 将箭头放在容器的两侧 */
  width: 100%; /* 箭头容器的宽度为 100% */
  height: 32px; /* 箭头容器的高度为 32px */}

.arrow {/* 定义箭头的样式 */
  display: flex; /* 让箭头内的内容垂直居中对齐 */
  justify-content: center; /* 让箭头内的内容水平居中对齐 */
  align-items: center; /* 让箭头内的内容垂直居中对齐 */
  width: 32px; /* 箭头按钮的宽度 */
  height: 32px; /* 箭头按钮的高度 */
  background-color: #fff; /* 箭头按钮的背景色为白色 */
  opacity: 0.7; /* 初始状态下箭头按钮的透明度为 0.7 */
  cursor: pointer; /* 鼠标悬浮在箭头按钮上时鼠标的样式为手型 */}

.arrow:hover { opacity: 1; /* 鼠标悬浮在箭头按钮上时透明度为 1 */}

</style>