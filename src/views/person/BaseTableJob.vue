<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：登记管理</el-breadcrumb-item>
        <el-breadcrumb-item>就业查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.user_name" placeholder="请输入身份号或姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">检索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="card_number" label="身份证号" width="170" align="center"></el-table-column>
        <el-table-column prop="census_name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="work_status" label="就业状态" width="100" align="center"></el-table-column>
        <el-table-column prop="start_time" label="劳动合同开始时间" width="140" align="center"></el-table-column>
        <el-table-column prop="end_time" label="劳动合同结束时间" width="140" align="center"></el-table-column>
        <el-table-column label="就业单位地址">
          <template slot-scope="scope">{{computedAddress(scope.row)}}</template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next"
          :current-page="query.index"
          :page-size="query.number"
          :total="pageTotal"></el-pagination>
      </div>
    </div>

    <ComponentsLogout ref="componentsLogout"></ComponentsLogout>
    <ComponentsBaseForm ref="componentsBaseForm" @success="censusList"></ComponentsBaseForm>
  </div>
</template>

<script>
import ComponentsLogout from '@/components/person/Logout'
import ComponentsBaseForm from '@/views/person/BaseForm'
export default {
  components: {ComponentsLogout, ComponentsBaseForm},
  data() {
    return {
      query: {
        user_name: '',
        page_index: 1,
        page_number: 10
      },
      pageTotal: 0,
      tableData: [],
    };
  },
  created() {
    this.censusList()
  },
  methods: {
    // 获取信息列表
    async censusList(){
      let res = await this.$api.workList(this.query)
      if(res.status != 0) return
      this.tableData = res.data.list
      this.pageTotal = res.data.total_rows
    },

    // 计算就业单位地址
    computedAddress(item){
      if(item.work_status == '自主创业'){
        let config = JSON.parse(item.work_configs)
        return `${config.accord.address}${config.accord.address_desc}`
      }else{
        return `${item.company_address}`
      }
    },

    // 检索
    handleSearch() {
      this.query.page_index = 1
      this.censusList()
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
