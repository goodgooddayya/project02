<template>
<div class="chartFrame" style="display: grid">
  <div class="one item"><div id="orderChart" style="width: 350px;height: 400px"></div></div>
  <div class="two item"><div id="cancelChart" style="width: 350px;height: 400px"></div></div>
  <div class="three item"><div id="avtimeChart" style="width: 350px;height: 400px"></div></div>
  <div class="four item">
<!--    <div class="block">
      <el-date-picker
          v-model="value1"
          type="date"
          @change="handleDatePickerChange"
          placeholder="请选择要查看的时间"
          :disabled-date="disabledDate"
          :shortcuts="shortcuts"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
      />
    </div>-->

    <div id="distribution" style="width: 350px;height: 400px">

    </div></div>
</div>
</template>

<script setup>
import {onBeforeMount, onMounted, reactive} from "vue";
import * as echarts from "echarts";
import axios from '../axiosInstance.js'



const chartData =reactive({
  id: '',
  date: '',
  amount: '',
  cancel: '',
  normal: '',
  avtime: '',
  onefloor:'',
  twofloor:'',
  threefloor:'',
  fourfloor:'',
  fivefloor:'',
})
const chartDataAll =reactive({
  id: '',
  date: '',
  amount: '',
  cancel: '',
  normal: '',
  avtime: '',
  onefloor:'',
  twofloor:'',
  threefloor:'',
  fourfloor:'',
  fivefloor:'',
})
const currentDate = new Date(); // 获取当前日期
currentDate.setDate(currentDate.getDate() - 1); // 将日期减去一天
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
console.log(formattedDate)
/*const value1=ref(null);*/



function getDate(){
  console.log(chartData)
  axios.get(`/chart/getYesterChart/${formattedDate}`)
      .then(response => {
        chartData.value = response.data;
        console.log(chartData.value)
        draw4();
      })
      .catch(error => {
        console.log(error);
      });
}
function getDateAll(){
  console.log(chartDataAll)
  axios.get(`/chart/getAllCharts`)
      .then(response => {
        chartDataAll.value = response.data;
        console.log(chartDataAll.value)
        draw1()
        draw2()
        draw3()
      })
      .catch(error => {
        console.log(error);
      });
}
function draw1(){
  var orderChart=echarts.init(document.getElementById('orderChart'))
  var xDataArr1 = chartDataAll.value.map(item=>item.date)
  var yDataArr1=chartDataAll.value.map(item=>item.amount)
  var option1 = {
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
        handleIcon:
            'M10.7,1.4L9.3,0l-9,9l9,9l1.4-1.4L3.8,9L10.7,1.4z M23.8,9L14.9,0.1L13.6,1.4L22.5,10.3L13.6,19.2l1.4,1.4l9-9L23.8,9z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
    ],
    title:{
      //调整标题相对位置
      left:'30%',
      text:'每日订座量统计',
      textStyle:{
        fontsize:20,
      }
    },
    xAxis:{
      type:'category',
      data:xDataArr1,
    },
    yAxis:{
      type:'value',
      scale:true
    },
    series:[
      {
        type:'line',
        data:yDataArr1,
        label: {
          show: true,	// 是否可见y轴数字
          rotate: 0 	// 旋转角度
        }
      }
    ]
  }
  orderChart.setOption(option1)
}
function draw2(){
  var cancelChart=echarts.init(document.getElementById('cancelChart'))
  var xDataArr1 = chartDataAll.value.map(item=>item.date)
  var yDataArr1=chartDataAll.value.map(item=>item.cancel)
  var option1 = {
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
        handleIcon:
            'M10.7,1.4L9.3,0l-9,9l9,9l1.4-1.4L3.8,9L10.7,1.4z M23.8,9L14.9,0.1L13.6,1.4L22.5,10.3L13.6,19.2l1.4,1.4l9-9L23.8,9z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
    ],
    title:{
      //调整标题相对位置
      left:'30%',
      text:'每日取消量统计',
      textStyle:{
        fontsize:20,
      }
    },
    xAxis:{
      type:'category',
      data:xDataArr1,
    },
    yAxis:{
      type:'value',
      scale:true
    },
    series:[
      {
        type:'line',
        data:yDataArr1,
        label: {
          show: true,	// 是否可见y轴数字
          rotate: 0 	// 旋转角度
        }
      }
    ]
  }
  cancelChart.setOption(option1)
}
function draw3(){
  var avtimeChart=echarts.init(document.getElementById('avtimeChart'))

  var xDataArr1 = chartDataAll.value.map(item=>item.date)
  var yDataArr1=chartDataAll.value.map(item=>item.avtime)
  console.log(chartDataAll.value.map(item=>item.date))
  var option1 = {
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: 'none',
        },
        restore: {},
      },
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100,
      },
      {
        start: 0,
        end: 100,
        handleIcon:
            'M10.7,1.4L9.3,0l-9,9l9,9l1.4-1.4L3.8,9L10.7,1.4z M23.8,9L14.9,0.1L13.6,1.4L22.5,10.3L13.6,19.2l1.4,1.4l9-9L23.8,9z',
        handleSize: '80%',
        handleStyle: {
          color: '#fff',
          shadowBlur: 3,
          shadowColor: 'rgba(0, 0, 0, 0.6)',
          shadowOffsetX: 2,
          shadowOffsetY: 2,
        },
      },
    ],
    title:{
      //调整标题相对位置
      left:'30%',
      text:'每日平均订座时长统计',
      textStyle:{
        fontsize:20,
      }
    },
    xAxis:{
      type:'category',
      data:xDataArr1,
    },
    yAxis:{
      type:'value',
      scale:true
    },
    series:[
      {
        type:'bar',
        data:yDataArr1,
        label: {
          show: true,	// 是否可见y轴数字
          rotate: 0 	// 旋转角度
        }
      }
    ]
  }
  avtimeChart.setOption(option1)
}
function draw4(){
  var disChart=echarts.init(document.getElementById('distribution'))
  var option;
  option = {
    title:{
      //调整标题相对位置
      left:'30%',
      text:'昨日楼层座位预订分布图',
      textStyle:{
        fontsize:20,
      }
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: chartData.value[0].onefloor, name: '一层预定量' },
          { value: chartData.value[0].twofloor, name: '二层预定量' },
          { value: chartData.value[0].threefloor, name: '三层预订量' },
          { value: chartData.value[0].fourfloor, name: '四层预定量' },
          { value: chartData.value[0].fivefloor, name: '五层预定量' },
        ]
      }
    ]
  };
  disChart.setOption(option);
}


onMounted(()=>{
  getDate()
  getDateAll()

})



</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.chartFrame{
  display: grid;
  grid-template-columns: repeat(2, 480px);
  grid-gap: 30px;
  grid-template-rows: 400px 400px;
}
.one {
  background: white;
  padding-left: 15%;
}
.two {
  background: white;
  padding-left: 15%;
}
.three {
  background: white;
  padding-left: 15%;
}
.four {
  background: white;
  padding-left: 15%;
}

.item {
  text-align: center;
  justify-content: center;
  font-size: 200%;
  color: #fff;
}

</style>