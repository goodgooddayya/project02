// 获取轮播图容器和轮播图中的每个轮播项，以及左右箭头按钮
const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll(".slide");
const prevArrow = document.querySelector(".arrow.prev");
const nextArrow = document.querySelector(".arrow.next");
// 当前轮播项的索引，以及最大索引
let currentIndex = 0;
const maxIndex = slides.length - 1;
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
slider.addEventListener('mouseenter', function() {
    clearInterval(slideInterval);//清除计时器
});
// 鼠标移开轮播图时恢复自动切换
slider.addEventListener('mouseleave', function() {
    slideInterval = setInterval(autoUpdateSlider, 1000);//设置计时器
});


//导航栏下拉菜单
//点击按钮，下拉菜单在显示/隐藏之间切换
function menuFunc() {
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
}

//吸顶效果
// 获取导航栏元素和内容区域元素
/*const nav = document.querySelector("#na");
const content = document.querySelector(".middle");

// 获取内容区域顶部距离窗口顶部的距离
const contentTop = content.offsetTop;

// 监听滚动事件，保持导航栏固定
window.addEventListener("scroll", function() {
    // 如果滚动距离大于或等于内容区域顶部距离窗口顶部的距离
    if (window.pageYOffset >= contentTop) {
        // 设置导航栏的 position 为 fixed，并设置 top 为 0
        nav.style.position = "fixed";
        nav.style.top = "0";
    } else {
        // 否则恢复导航栏的 position 和 top 样式
        nav.style.position = "";
        nav.style.top = "";
    }
});*/


// 获取模态框元素
var modal = document.getElementById("login-modal");

// 获取关闭模态框的 <span> 元素
var span = document.getElementsByClassName("close");

// 当用户点击超链接时，显示模态框
function showModal() {
    modal.style.display = "block";
}

// 当用户点击关闭模态框的 <span> 元素时，关闭模态框
function closeModal() {
    modal.style.display = "none";
}


//导航栏高亮效果
// 获取所有导航栏中的链接
// 获取导航栏所有菜单项
// 获取所有的导航链接
const navLinks = document.querySelectorAll(".nav");

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


//侧边固定栏
//
var sidebar = document.querySelector('.sidebar');
var sidebarTop = sidebar.offsetTop;


window.addEventListener('scroll', function() {
    if (window.pageYOffset > sidebarTop) {

        sidebar.classList.add('fixed');
    } else {
        sidebar.classList.remove('fixed');
    }
});



