const slider=document.querySelector(".slider");
const slides=slider.querySelectorAll(".slide");
const prevArrow=document.querySelector(".arrow.prev");
const nextArrow=document.querySelector(".arrow.next");

let currentIndex=0;
const maxIndex=slides.length-1;

prevArrow.addEventListener("click",()=>{
    if(currentIndex>0){
        currentIndex--;
    }
    else {
        currentIndex=maxIndex;
    }
    updateSlider();
})

prevArrow.addEventListener("click",()=>{
    if(currentIndex<maxIndex){
        currentIndex++;
    }
    else {
        currentIndex=0;
    }
    updateSlider();
})

//更新轮播图片显示
function updataSlider(){
    const offset=(0 -  currentIndex)*100;
    slider.style.transform = 'translateX(${offset)%';
}
//自动
function autoUpdateSlider(){
    if(currentIndex<maxIndex)
        currentIndex;
    else {
        currentIndex=0;
    }
    updateSlider();
}

let slideInterval=setInterval(autoUpdateSlider,2000);

slider.addEventListener('mouseenter',function (){
    clearInterval(slideInterval);
})
slider.addEventListener('mouseleave',function (){
    slideInterval = setInterval(autoUpdateSlider,2000);
})
//下拉菜单
function menuFunc(){
    document.getElementById("myDropdown").classList.toggle("show");
}


window.onclick = function (e){
    if(!e.target.matches('.dropbtn')){
        var myDropdown=document.getElementById("myDropdown");
        if(myDropdown.classList.contains('show')){
            myDropdown.classList.remove('show');
        }
    }
}

//模态框
var modal=document.getElementById("login-modal");
var span=document.getElementById("close");

function showModal() {
    modal.style.display="block";
}
function closeModal() {
    modal.style.display="none";
}

//高亮
const navLinks=document.querySelector(".nav");

navLinks.forEach(link=>{
    link.addEventListener("click",()=>{
        navLinks.forEach(link=>{
            link.classList.remove("active");
        })
        link.classList.add("avtive");
    })
})

//
var sidebar=document.querySelector('.sidebar');
var sidebarTop=sidebar.offsetTop;

window.addEventListener('scroll',function (){
    if(window.pageXOffset>sidebarTop)
    {
        sidebar.classList.add('fixed');
    }
    else {
        sidebar.classList.remove('fixed')
    }
} )