<template>
<div class="container">
  <div class="change-form">
    <div class="topTool">
      <el-input v-model="sname" placeholder="请输入姓名搜索"
                @input="handleSearchName" :prefix-icon="Search" >
      </el-input>

      <el-button type="primary" :icon="Plus" @click="handleAdd"
                 style="" >添加数据</el-button>
      <el-button type="danger" :icon="Delete" @click="handleDelList"
                 v-if="multipleSelection.length>0">删除多行数据</el-button>
    </div>

  <hr>
  <div class="table">

    <!--el-table数据表格组件-->
    <el-table
        :data="displayedItems"
        :header-cell-style="{ background: '#f6f9fa'}" style="width: 100%"
        @sort-change="handleSortChange"
        empty-text="暂无数据"
        @selection-change="handleSelectionChange"
    >
      <!--el-table-column列-->
      <el-table-column type="selection" /><!--多加一行使之能够被选中-->
      <el-table-column prop="orderID" label="预订编号" sortable/>
      <el-table-column prop="id" label="学号" sortable/>
      <el-table-column prop="name" label="姓名" sortable/>
      <el-table-column prop="startime" label="开始时间" width="200" sortable/>
      <el-table-column prop="endtime" label="结束时间" width="200" sortable/>
      <el-table-column prop="seat" label="座位号" />
      <el-table-column label="操作" min-width="180" >
        <template #default="{ row }">
          <el-button type="primary" icon="Edit"
                     @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" :icon="Delete"
                     @click="handleDel(row)">删除</el-button>
        </template>


      </el-table-column>
    </el-table>

  </div>
    <!--分页-->
    <el-pagination
        background
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
    />
  </div>
  <!--对话框-->
  <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
    <el-form :model="tableform">
      <el-form-item label="学号" :label-width="100">
        <el-input v-model="tableform.id" autocomplete="off" placeholder="请输入预订信息学生的学号" style="width: 250px"/>
      </el-form-item>
      <el-form-item label="姓名" :label-width="100" >
        <el-input v-model="tableform.name" autocomplete="off" placeholder="请输入预订信息学生的姓名" style="width: 250px"/>
      </el-form-item>
      <el-form-item label="学院" :label-width="100">
        <el-select v-model="tableform.college" placeholder="请输入预定信息学生的学院" style="width: 250px">
          <el-option
              v-for="item in colleges"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
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
                  placeholder="请输入预订的座位" style="width: 250px"  @change="checkValue"/>
        <span v-if="showError" class="error-message">请输入正确的座位号</span>
      </el-form-item>
    </el-form>
    <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">确定</el-button>
    </span>
    </template>
  </el-dialog>

</div>
</template>


<script setup>
import {ref, reactive, computed} from "vue";//响应式
import { ElMessageBox, ElMessage } from 'element-plus'
import {Edit,Delete,Search,Plus} from "@element-plus/icons-vue";

//新增弹窗
const dialogFormVisible = ref(false)//初始化弹窗不显示
let tableform = ref({id:'',name:'',startime:'',endtime:'',seat:''})//初始化弹窗表单数据
let dialogType = ref('add')//初始化弹窗类型为增加弹窗
const dialogTitle = computed(() => {//设置弹窗的标题
  return dialogType.value === 'add' ? '新增数据' : '编辑数据'
})

//数据
const orderInfo=reactive([
  {orderID:100001,id:20210001,name:'张三',startime:'2023-06-01 08:00:00',endtime:'2023-06-01 10:00:00',seat: '01'},
  {orderID:100002,id:20210002,name:'李四',startime:'2023-06-02 08:00:00',endtime:'2023-06-02 10:00:00',seat: '02'},
  {orderID:100003,id:20210003,name:'王五',startime:'2023-06-03 08:00:00',endtime:'2023-06-03 10:00:00',seat: '03'},
  {orderID:100004,id:20210003,name:'王五',startime:'2023-06-03 14:00:00',endtime:'2023-06-03 18:00:00',seat: '04'},
  {orderID:100005,id:20210003,name:'王五',startime:'2023-06-03 19:00:00',endtime:'2023-06-03 22:00:00',seat: '05'},
  {orderID:100006,id:20210003,name:'牛牛',startime:'2023-06-04 08:00:00',endtime:'2023-06-03 10:00:00',seat: '06'},
  {orderID:100007,id:20210003,name:'张三',startime:'2023-06-03 08:00:00',endtime:'2023-06-03 10:00:00',seat: '07'},
  {orderID:100008,id:20210003,name:'王五',startime:'2023-06-05 08:00:00',endtime:'2023-06-05 10:00:00',seat: '08'},
  {orderID:100009,id:20210003,name:'王五',startime:'2023-06-06 08:00:00',endtime:'2023-06-06 10:00:00',seat: '08'},
  {orderID:100010,id:20210003,name:'王五',startime:'2023-06-07 08:00:00',endtime:'2023-06-07 10:00:00',seat: '08'},
  {orderID:100011,id:20210003,name:'王五',startime:'2023-06-08 08:00:00',endtime:'2023-06-08 10:00:00',seat: '08'},
  {orderID:100012,id:20210003,name:'王五',startime:'2023-06-09 08:00:00',endtime:'2023-06-09 10:00:00',seat: '08'},
  {orderID:100013,id:20210003,name:'王五',startime:'2023-06-10 08:00:00',endtime:'2023-06-10 10:00:00',seat: '08'},
])
//分页
let currentPage = 1;// 定义当前页码初始值为1
const pageSize = 10;// 定义每页显示的数据条数为10
let total = ref(orderInfo.length);// 初始化数据总条数
let displayedItems = ref(orderInfo.slice(0, pageSize));//初始化当前页显示数据

//存储当前页数据副本，方便清空搜索框还原当前页数据
let itemsCopy = displayedItems.value;
let sname = ref('')//初始化搜索框的值



//点击新一页
function handleCurrentChange(newPage) {
  currentPage = newPage
  const startIndex = (newPage - 1) * pageSize
  displayedItems.value = orderInfo.slice(startIndex, startIndex + pageSize)
  itemsCopy=displayedItems.value
}
//处理搜索事件
const handleSearchName = (val) => {
  if (val.length > 0) { // 搜索框有输入
    // 根据姓名进行过滤操作
    displayedItems.value = orderInfo.filter(item => item.name.match(val))
  } else { // 搜索框无输入
    displayedItems.value = itemsCopy //还原数据表格
  }
}

//新增
function handleAdd() {
  dialogFormVisible.value = true // 设置对话框的显示状态为 true
  dialogType.value = 'add' // 设置对话框的类型为 "add"
  tableform.value = {} // 清空表单数据
}
function handleEdit(row) { // row 为当前行的数据
  dialogFormVisible.value = true // 设置对话框显示状态为 true
  tableform.value = {...row} //表单数据设置为传入行数据
  dialogType.value = 'edit' // 设置对话框类型为 "edit"，方便修改弹窗标题
}
const dialogOk = () => { // 定义一个名为 dialogOk 的箭头函数
  dialogFormVisible.value = false // 设置对话框的显示状态为 false，将其关闭
  if (dialogType.value === 'add') { // 如果对话框的类型为 "add"
    orderInfo.push({ // 在数据数组的尾部添加一个新的数据项
      orderID: orderInfo[orderInfo.length-1].orderID + 1, // 分配新的 ID 值
      ...tableform.value // 将表单数据添加到数据项中
    })
    total.value = orderInfo.length // 更新数据总数
    displayedItems.value = orderInfo.slice(0, pageSize) // 更新显示的数据项
  }
  else { // 如果对话框的类型不是 "add"，即用户要修改数据
    // 在当前显示的数据项中查找要修改的数据的索引
    let index = displayedItems.value.findIndex(item =>
        item.orderID === tableform.value.orderID)
    displayedItems.value[index] = tableform.value // 用表单数据更新对应的数据项
  }

}

// 定义一个函数，用于删除某行数据,要保证编号的连续性
const delrow = (row) => {
  let index=null;
  if(currentPage===1)
  {
    index = displayedItems.value.findIndex(item => item.orderID === row.orderID)
    console.log(index)
  } // 找到当前行在 displayedItems 数组中的索引}
  else {
    index = displayedItems.value.findIndex(item => item.orderID === row.orderID)+(currentPage-1)*10
    console.log(index)
  }
  orderInfo.splice(index, 1) // 从 orderInfo 数组中删除当前行的数据
  total.value = total.value - 1 // 更新数据总条数
  handleCurrentChange(currentPage) //重新渲染表格数据
  console.log("当前页码为："+currentPage)
}
//单行删除
function handleDel(row) {
  ElMessageBox.confirm("此操作将彻底删除该条座位预约记录，是否继续？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    delrow(row)
    ElMessageBox.success("删除成功!")
  }).catch(() => {
    ElMessageBox.info("已取消删除");
  });
}

//多行删除
// 创建响应式变量multipleSelection，用于存储当前选中的数据行
let multipleSelection = ref([])
// 处理表格行选中状态变化的方法，val是当前选中的数据行数组
const handleSelectionChange = (val) => {
  // 清空数组，确保每次更新都是最新选中状态
  multipleSelection.value = []
  val.forEach(item => { // 遍历选中的数据行数组
    multipleSelection.value.push(item) // 将选中的每一行数据存入multipleSelection数组中
  })
}
const handleDelList = () => {
  ElMessageBox.confirm(
      '您确定要删除选择的数据吗?',
      '危险操作',
      {confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning',}
  ).then(() => {
    multipleSelection.value.forEach(item => {
      delrow(item)
    })
    ElMessage({type: 'success', message: '完成批量删除！',})
  }).catch(() => {
    ElMessage({type: 'info', message: '取消删除!',})
  })
}



//检查数值大小
function checkValue(){
  if(tableform.value.seat<=0||isNaN(this.value)){
    tableform.value.seat=null;
  }
}
const showError=computed(()=>{
  return (
      tableform.value.seat !== null &&
      (isNaN(tableform.value.seat) || tableform.value.seat <= 0)
  );
})


// 定义 handleSortChange 方法，接收 sortData 参数
const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  displayedItems.value = displayedItems.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
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


const colleges=[
  {
    value: '软件学院',
    label: '软件学院',
  },
  {
    value: '美术学院',
    label: '美术学院',
  },
  {
    value: '土木学院',
    label: '土木学院',
  },
  {
    value: '旅游管理学院',
    label: '旅游管理学院',
  },
  {
    value: '预科学院',
    label: '预科学院',
  }]




</script>

<style scoped>
template{
  text-align: center;
}
.container{
  text-align: center;
  align-content: center;
}
.table{
  width: 100%;
  text-align: center;

}
.change-form {
  width: 100%;
}

el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}

.topTool{
  display: flex;

  margin-bottom: 8px;
}
.error-message {
  color: red;
  font-size: 12px;
  margin-left: 5px;
}

</style>