console.log("输出一条日志");
console.info("输出一条信息");
console.warn("输出一条警告");
console.error("输出一条错误");
//声明对象
var person={
    name:"zhangsan",
    age:18
}
for (var personKey in person) {
    var personVal = person[personKey];
    console.log(personKey+"："+personVal);
}

//声明函数
var fun1=function (){
    console.log("Haha");
}
function fun2(){
    console.log("haha2");
}
fun1();fun2();
//创建一个全局变量name
var name = "全局变量name";

//创建一个函数
function fun() {
    console.log(this.name);
}
fun();
//创建一个对象
var obj = {
    name: "孙悟空",
    sayName: fun
};

//我们希望调用obj.sayName()时可以输出obj的名字而不是全局变量name的名字
obj.sayName();

// 使用构造函数来创建对象
function Person(name, age) {
    // 设置对象的属性
    this.name = name;
    this.age = age;
}

//创建对象的一个实例对象
var p = new Person("张三", 20);
console.log(p.toString());
