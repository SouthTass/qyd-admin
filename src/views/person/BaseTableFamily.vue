<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：登记管理</el-breadcrumb-item>
        <el-breadcrumb-item>家庭查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="请输入户主身份证号或姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">检索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="rapport" label="与户主关系" width="100" align="center"></el-table-column>
        <el-table-column prop="card_number" label="身份证号" width="170" align="center"></el-table-column>
        <el-table-column prop="census_name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center"></el-table-column>
        <el-table-column prop="date" label="年龄" width="50" align="center">
          <template slot-scope="scope">{{computedAge(scope.row)}}</template>
        </el-table-column>
        <el-table-column prop="work_register" label="是否就业" width="80" align="center"></el-table-column>
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
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="handleDelete(scope.$index, scope.row)">查看</el-button>
            <el-button type="danger" size="mini"
              @click="$refs.componentsLogout.show(scope.row)">家庭关联</el-button>
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
      value: '',
      query: {
        address: '',
        name: '',
        pageIndex: 1,
        pageSize: 10
      },
      tableData: []
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

    // 触发搜索按钮
    handleSearch() {
      this.$set(this.query, 'pageIndex', 1);
    },
    // 删除操作
    handleDelete(index, row) {
      
    },
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
