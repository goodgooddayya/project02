<template>
<!--  <span style="font-size: 20px">{{message}}</span>-->

  <div style="display: flex;justify-content: center">
    <el-form-item label="开始时间" :label-width="100">
    <el-date-picker
        v-model="startime"
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        :disabled-date="disabledDate"
        placeholder="请输入想要预约的开始时间"
        style="width: 250px"
    />
    </el-form-item>
    <el-form-item label="结束时间" :label-width="100">
    <el-date-picker
        v-model="endtime"
        type="datetime"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        :disabled-date="disabledEndData_show"
        placeholder="请输入想要预约的结束时间"
        style="width: 250px"
    />
  </el-form-item>
  </div>



  <table style="height: 500px;width: 1000px">
    <tr v-for="(row, rowIndex) in seatInfoChunks" :key="rowIndex">
      <td v-for="(seat, seatIndex) in row" :key="seatIndex"  @click="handleAddReservation(seat)">
        <i class="icon-seat"  style="color: black;cursor: pointer" :class="{'occupied': seat.isOccupied}">{{   seat.seatNumber }}</i>
      </td>
    </tr>
  </table>

  <!--对话框-->
  <el-dialog v-model="dialogFormVisible" >
    <h2>新增预定</h2>
    <div style="padding-left: 20%">
      <el-form :model="tableform" >
        <el-form-item label="学号" :label-width="100">
          <el-input v-model="tableform.id" autocomplete="off" placeholder="请输入预订信息学生的学号" style="width: 250px"/>
        </el-form-item>
        <el-form-item label="姓名" :label-width="100" >
          <el-input v-model="tableform.name" autocomplete="off" placeholder="请输入预订信息学生的姓名" style="width: 250px"/>
        </el-form-item>
        <el-form-item label="开始时间" :label-width="100">
          <el-date-picker
              v-model="tableform.startime"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              :disabled-date="disabledDate"
              placeholder="请输入开始时间"
              style="width: 250px"
          />
        </el-form-item>
        <el-form-item label="结束时间" :label-width="100">
          <el-date-picker
              v-model="tableform.endtime"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              :disabled-date="disabledEndData"
              placeholder="请输入结束时间"
              style="width: 250px"
          />
        </el-form-item>
        <el-form-item label="座位" :label-width="100" >
          <el-input v-model="tableform.seat" type="number" autocomplete="off"
                    placeholder="请输入预订的座位" style="width: 250px"  disabled/>
        </el-form-item>
      </el-form>
    </div>

    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">确定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script setup>
import {computed, reactive, ref} from "vue";
import Table from './Table.vue'

const message=ref("当前阅览室入座情况座位表");

const seatInfo=reactive([
  { seatNumber: "01",floor:"一层", isOccupied: false },
  { seatNumber: "02",floor:"一层", isOccupied: true },
  { seatNumber: "03",floor:"一层", isOccupied: true },
  { seatNumber: "04",floor:"一层", isOccupied: false },
  { seatNumber: "05",floor:"一层", isOccupied: true },
  { seatNumber: "06",floor:"一层", isOccupied: false },
  { seatNumber: "07",floor:"一层", isOccupied: false },
  { seatNumber: "08",floor:"一层", isOccupied: true },
  { seatNumber: "09",floor:"一层", isOccupied: false },
  { seatNumber: "10",floor:"一层", isOccupied: true },
  { seatNumber: "11",floor:"一层", isOccupied: false },
  { seatNumber: "12",floor:"一层", isOccupied: false },
  { seatNumber: "13",floor:"一层", isOccupied: true },
  { seatNumber: "14",floor:"一层", isOccupied: false },
  { seatNumber: "15",floor:"一层", isOccupied: true },
  { seatNumber: "16",floor:"一层", isOccupied: true },
  { seatNumber: "17",floor:"一层", isOccupied: false },
  { seatNumber: "18",floor:"一层", isOccupied: true },
  { seatNumber: "19",floor:"一层", isOccupied: false },
  { seatNumber: "20",floor:"一层", isOccupied: true },
  { seatNumber: "21",floor:"一层", isOccupied: false },
  { seatNumber: "22",floor:"一层", isOccupied: false },
  { seatNumber: "23",floor:"一层", isOccupied: true },
  { seatNumber: "24",floor:"一层", isOccupied: false },
  { seatNumber: "25",floor:"一层", isOccupied: true },
  { seatNumber: "26",floor:"一层", isOccupied: true },
  { seatNumber: "27",floor:"一层", isOccupied: false },
  { seatNumber: "28",floor:"一层", isOccupied: true },
  { seatNumber: "29",floor:"一层", isOccupied: false },
  { seatNumber: "30",floor:"一层", isOccupied: true },
  { seatNumber: "31",floor:"一层", isOccupied: true },
  { seatNumber: "32",floor:"一层", isOccupied: false },
  { seatNumber: "33",floor:"一层", isOccupied: true },
  { seatNumber: "34",floor:"一层", isOccupied: true },
  { seatNumber: "35",floor:"一层", isOccupied: true },
  { seatNumber: "36",floor:"一层", isOccupied: true },
  { seatNumber: "37",floor:"一层", isOccupied: false },
  { seatNumber: "38",floor:"一层", isOccupied: true },
  { seatNumber: "39",floor:"一层", isOccupied: true },
  { seatNumber: "40",floor:"一层", isOccupied: true },
  { seatNumber: "41",floor:"一层", isOccupied: true },
  { seatNumber: "42",floor:"一层", isOccupied: false },
  { seatNumber: "43",floor:"一层", isOccupied: true },
  { seatNumber: "44",floor:"一层", isOccupied: false },
  { seatNumber: "45",floor:"一层", isOccupied: false },
  { seatNumber: "46",floor:"一层", isOccupied: true },
  { seatNumber: "47",floor:"一层", isOccupied: true },
  { seatNumber: "48",floor:"一层", isOccupied: true },
  { seatNumber: "49",floor:"一层", isOccupied: false },
  { seatNumber: "50",floor:"一层", isOccupied: true },
])


//新增弹窗
const dialogFormVisible = ref(false)//初始化弹窗不显示
let tableform = ref({id:'',name:'',startime:'',endtime:'',seat:''})//初始化弹窗表单数据
let dialogType = ref('add')//初始化弹窗类型为增加弹窗
const startime = ref('');
const endtime=ref('');

function handleAddReservation(seat){
  if(seat.isOccupied){
    alert("该座位已被占用！请选择其他的座位。")
    return null;
  }
  else {
    tableform.value = {} // 清空表单数据

    tableform.value.seat = seat.seatNumber;
    dialogFormVisible.value = true // 设置对话框的显示状态为 true
  }
}
const dialogOk = () => { // 定义一个名为 dialogOk 的箭头函数

  for (let i = 0; i < seatInfo.length; i++) {
    if(tableform.value.seat===seatInfo[i].seatNumber)
    {
      seatInfo[i].isOccupied=true;
    }
  }

  dialogFormVisible.value = false // 设置对话框的显示状态为 false，将其关闭
  /*orderInfo.push({ // 在数据数组的尾部添加一个新的数据项
    orderID: orderInfo[orderInfo.length-1].orderID + 1, // 分配新的 ID 值
    ...tableform.value // 将表单数据添加到数据项中
  })
  total.value = orderInfo.length // 更新数据总数
  displayedItems.value = orderInfo.slice(0, pageSize) // 更新显示的数据项*/
}

//只能选择今天和明天的时间 仅限这两天进行预约
function disabledDate (time) {
  const currentTime = Date.now();
  const today = new Date(currentTime);
  const tomorrow = new Date(currentTime + 8.64e7*2);
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()); // 今天的 0 点
  const maxDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate()); // 后天的 0 点
  return time.getTime() < minDate.getTime() || time.getTime() >= maxDate.getTime();
}
function disabledEndData(date){
  if(!tableform.value.startime){
    return false;
  }
  const isSelected=new Date(tableform.value.startime);
  const isBeforeSelected=date.getTime()<isSelected - 8.64e7 ;
  const isAfterToday=date.getTime()>isSelected ;
  return isBeforeSelected||isAfterToday //按照惯例来讲应该是只能选选择当天的时间
}
function disabledEndData_show(date){
  if(!startime.value){
    return false;
  }
  const isSelected=new Date(startime.value);
  const isBeforeSelected=date.getTime()<isSelected - 8.64e7 ;
  const isAfterToday=date.getTime()>isSelected ;
  return isBeforeSelected||isAfterToday //按照惯例来讲应该是只能选选择当天的时间
}

const seatInfoChunks=computed(()=>{
  const chunkSize = 10; // 每行的座位数量
  const chunks = [];
  for (let i = 0; i < seatInfo.length; i += chunkSize) {
    chunks.push(seatInfo.slice(i, i + chunkSize));
  }
  return chunks;
})
</script>

<style scoped>
.icon-seat {
  display: inline-block;
  width: 48px;
  height: 48px;
  background: url('src/assets/可选座位.png') no-repeat;
  background-size: 48px 48px;
}
.icon-seat.occupied {
  background: url('src/assets/已选座位.png') no-repeat;
}
el-dialog{
  justify-content: center;
}

</style>