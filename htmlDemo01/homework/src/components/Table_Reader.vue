<template>
  <div class="container">
    <div class="change-form">
      <div>
        <el-input v-model="sname" placeholder="请输入姓名搜索"
                  @input="handleSearchName" :prefix-icon="Search" style="width: 70%">
        </el-input>
        <el-button type="primary" :icon="Plus" @click="handleAdd"
                   style="margin-left: 20px;">添加数据</el-button>
        <el-button type="danger" :icon="Delete" @click="handleDelList"
                   v-if="multipleSelection.length>0">删除选中数据</el-button>
      </div>

      <hr>
      <div class="table">
        <div class="tableself">
          <!--el-table数据表格组件-->
          <el-table
              :data="displayedItems"
              :header-cell-style="{ background: '#f6f9fa'}" style="width: 100%"
              @sort-change="handleSortChange"
              empty-text="暂无数据"
              @selection-change="handleSelectionChange">
            <el-table-column type="selection"/>
            <!--el-table-column列-->
            <el-table-column prop="id" label="学号"  sortable/>
            <el-table-column prop="name" label="姓名"  />
            <el-table-column prop="sex" label="性别" />
            <el-table-column prop="major" label="学院" width="250px"/>
            <el-table-column prop="password" label="密码"/>
            <el-table-column label="操作" min-width="180">
              <template #default="{ row }">
                <el-button type="primary" size="small" icon="Edit"
                           @click="handleEdit(row)">编辑</el-button>
                <el-button type="danger" size="small" :icon="Delete"
                           @click="handleDel(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <div class="page">
          <!--页码-->
          <el-pagination
              background
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="prev, pager, next"
              @current-change="handleCurrentChange"
          />
        </div>

      </div>

      <!--对话框-->
      <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
        <el-form :model="tableform">
          <el-form-item label="学号" :label-width="100">
            <el-input v-model="tableform.id" autocomplete="off" style="width: 250px"/>
          </el-form-item>
          <el-form-item label="姓名" :label-width="100" >
            <el-input v-model="tableform.name" autocomplete="off" style="width: 250px"/>
          </el-form-item>
          <el-form-item label="性别" :label-width="100" >
            <el-select v-model="tableform.sex" placeholder="请输入要添加的学生的性别" style="width: 250px">
              <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学院" :label-width="100">
            <el-select v-model="tableform.major" placeholder="请输入预定信息学生的学院" style="width: 250px">
              <el-option
                  v-for="item in colleges"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>

        </el-form>
        <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">
        确定
      </el-button>
    </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>



<script setup>
import {ref, reactive, computed, onMounted, getCurrentInstance} from "vue";//响应式
import { ElMessageBox, ElMessage } from 'element-plus'
import {Plus,Edit,Delete,Search} from "@element-plus/icons-vue";
import axios from "../axiosInstance.js";


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

const genders=[
  {
    label:'男',
    value:'男'
  },
  {
    label: '女',
    value: '女'
  }
]
const readerInfo = reactive([]);

const total = ref(0);
const displayedItems = ref([]);

onMounted(() => {
  axios.get('/student/showAllStu')
      .then((response) => {
        Object.assign(readerInfo, response.data);//赋值
        total.value = readerInfo.length;
        displayedItems.value = readerInfo.slice(0, pageSize);
      })
      .catch((error) => {
        console.log(error);
      });
});

let currentPage = 1;// 定义当前页码初始值为1
const pageSize = 10;// 定义每页显示的数据条数为5
console.log("集合长度为："+total.value)
// 存储当前页数据副本，方便清空搜索框还原当前页数据，副本哈哈
let itemsCopy = displayedItems.value;
let sname=ref('')

//初始化弹窗
const dialogFormVisible=ref(false)//初始化弹窗不可见
let tableform=ref({})//初始化弹窗表格数据
let dialogType=ref('add')//初始化弹窗类型为增加
const dialogTitle = computed(() => {//设置弹窗的标题
  return dialogType.value === 'add' ? '新增数据' : '编辑数据'
})



//页码单击事件
function handleCurrentChange(newPage) {
  currentPage = newPage
  const startIndex = (newPage - 1) * pageSize
  displayedItems.value = readerInfo.slice(startIndex, startIndex + pageSize)
  itemsCopy=displayedItems.value
}



function handleEdit(row) { // row 为当前行的数据
  dialogFormVisible.value = true // 设置对话框显示状态为 true
  tableform.value = {...row} //表单数据设置为传入行数据
  dialogType.value = 'edit' // 设置对话框类型为 "edit"，方便修改弹窗标题
}

const delrow = (row) => { // 定义一个函数，用于删除某行数据
  let index=null;
  if(currentPage===1)
  {
    index = displayedItems.value.findIndex(item => item.id === row.id)
    console.log(index)
  } // 找到当前行在 displayedItems 数组中的索引
  else{
    index = displayedItems.value.findIndex(item => item.id === row.id)+(currentPage-1)*10
    console.log(index)
  }
  readerInfo.splice(index, 1) // 从 users 数组中删除当前行的数据
  total.value = total.value - 1 // 更新数据总条数
  handleCurrentChange(currentPage) //重新渲染表格数据
}
function handleDel(row) {
  ElMessageBox.confirm("此操作将彻底删除该条学生信息记录，是否继续？", "提示", {
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

function handleAdd(){
  tableform.value= { };//清空表单数据 默认为无
  dialogFormVisible.value=true//弹窗可见
  dialogType.value='add';//为增加
}
const dialogOk=()=>{
  dialogFormVisible.value = false // 设置对话框的显示状态为 false，将其关闭
  if (dialogType.value === 'add') { // 如果对话框的类型为 "add"
    readerInfo.push({
      /*id: readerInfo[readerInfo.length - 1].id + 1, // 分配新的 ID 值*/
      password:'123456',
      ...tableform.value // 将表单数据添加到数据项中
    })
    total.value = readerInfo.length // 更新数据总数
    displayedItems.value = readerInfo.slice(0, pageSize) // 更新显示的数据项
  }
  else { // 如果对话框的类型不是 "add"，即用户要修改数据
    // 在当前显示的数据项中查找要修改的数据的索引
    let index = displayedItems.value.findIndex(item =>
        item.id === tableform.value.id)
    displayedItems.value[index] = tableform.value // 用表单数据更新对应的数据项
  }

}

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


const handleSearchName=(val)=>{
  if(val.length>0)//输入了字符
  {
    // 根据姓名进行过滤操作  filter是一个JavaScript的数组过滤函数，它会对readerInfo数组中的每个元素执行一个回调函数，返回一个新的过滤后的数组。
    displayedItems.value = readerInfo.filter(item => item.name.match(val))//判断item对象的id属性是否包含了字符串val，如果包含则返回true，否则返回false
  }
  else {//displayedItems是存储展示在表格里的数据
    displayedItems.value=itemsCopy//还原数据表格
  }
}

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






</script>

<style>
template{
  text-align: center;
}
.container{
  text-align: center;
  align-content: center;
}
.table{
  display: flex;
  width: 100%;
  text-align: center;
}
.table {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.page{
  margin-top: 20px;
  padding-left: 25%;
}
.change-form {
  width: 100%;
}
el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}
.topTool{
  display: flex;justify-content: space-between;margin-bottom: 8px;
}


</style>