<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：登记管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="请输入身份号或姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">检索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$refs.componentsBaseForm.show()"
          style="float: right">录入信息</el-button>
        <el-button type="danger" icon="el-icon-download" @click="handleSearch" plain
          style="float: right">导出数据</el-button>
        <el-button icon="el-icon-upload2" @click="handleSearch" plain
          style="float: right">导入数据</el-button>
        
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="card_number" label="身份证号" width="170" align="center"></el-table-column>
        <el-table-column prop="census_name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center"></el-table-column>
        <el-table-column prop="census_domicile_type" label="户籍性质" width="80" align="center"></el-table-column>
        <el-table-column prop="date" label="年龄" width="50" align="center">
          <template slot-scope="scope">{{computedAge(scope.row)}}</template>
        </el-table-column>
        <el-table-column prop="work_register" label="是否就业" width="120" align="center"></el-table-column>
        <el-table-column prop="name" label="居住地址">
          <template slot-scope="scope">
            {{scope.row.census_city}}
            {{scope.row.census_area}}
            {{scope.row.census_town}}
            {{scope.row.census_village}}
            {{scope.row.house_number}}
          </template>
        </el-table-column>
        <el-table-column prop="phone_number" label="联系电话" width="100" align="center"></el-table-column>
        <el-table-column label="操作" width="210" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="checkPerson(scope.row)">查看</el-button>
            <el-button type="warning" size="mini" @click="handleDelete(scope.$index, scope.row)">修改</el-button>
            <el-button type="danger" size="mini"
              @click="$refs.componentsLogout.show(scope.row)">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="tableData.length"></el-pagination>
      </div>
    </div>
    
    <ComponentsCheck ref="componentsCheck"></ComponentsCheck>
    <ComponentsLogout ref="componentsLogout"></ComponentsLogout>
    <ComponentsBaseForm ref="componentsBaseForm" @success="censusList"></ComponentsBaseForm>
  </div>
</template>

<script>
import { fetchData } from '../../api/index'
import ComponentsCheck from '@/components/person/Check'
import ComponentsLogout from '@/components/person/Logout'
import ComponentsBaseForm from '@/views/person/BaseForm'
export default {
  components: {ComponentsCheck, ComponentsLogout, ComponentsBaseForm},
  data() {
    return {
      value: '',
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: [],
      multipleSelection: [],
      delList: [],
      editVisible: false,
      pageTotal: 0,
      form: {},
      idx: -1,
      id: -1
    };
  },
  created() {
    this.censusList()
  },
  methods: {
    // 获取信息列表
    async censusList(){
      let res = await this.$api.censusList()
      if(res.status != 0) return
      this.tableData = res.data.list
    },

    // 计算年龄
    computedAge(item){
      let birthday = item.birthday + ''
      return this.$dayjs().format('YYYY') - birthday.slice(0, 4)
    },

    // 查看个人信息
    checkPerson(item){
      this.$refs.componentsCheck.show(item)
    },

    // 获取 easy-mock 的模拟数据
    getData() {
      fetchData(this.query).then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.pageTotal = res.pageTotal || 50;
      });
    },
    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
      this.getData();
    },
    // 删除操作
    handleDelete(index, row) {
      this.editVisible = true
      // // 二次确认删除
      // this.$confirm('确定要删除吗？', '提示', {
      //   type: 'warning'
      // })
      //   .then(() => {
      //     this.$message.success('删除成功');
      //     this.tableData.splice(index, 1);
      //   })
      //   .catch(() => {});
    },
    // 多选操作
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    delAllSelection() {
      const length = this.multipleSelection.length;
      let str = '';
      this.delList = this.delList.concat(this.multipleSelection);
      for (let i = 0; i < length; i++) {
        str += this.multipleSelection[i].name + ' ';
      }
      this.$message.error(`删除了${str}`);
      this.multipleSelection = [];
    },
    // 编辑操作
    handleEdit(index, row) {
      this.idx = index;
      this.form = row;
      this.editVisible = true;
    },
    // 保存编辑
    saveEdit() {
      this.editVisible = false;
      this.$message.success(`修改第 ${this.idx + 1} 行成功`);
      this.$set(this.tableData, this.idx, this.form);
    },
    // 分页导航
    handlePageChange(val) {
      this.$set(this.query, 'pageIndex', val);
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.dialog-table{
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15);
  td{
    padding: 5px;
  }
}
</style>
