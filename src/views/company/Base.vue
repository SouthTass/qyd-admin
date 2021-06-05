<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>企业基本信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.company_name" placeholder="请输入企业名称" 
          class="mr10 from-width-l4"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="companyList()">检索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$refs.componentsBase.show()" 
          style="float: right">录入信息</el-button>
        <!-- <el-button type="danger" icon="el-icon-download" @click="censusExport" 
          plain style="float: right">导出数据</el-button>
        <el-upload class="upload-file-button" 
          action="http://47.93.185.110:7008/api/census/export?census_type=1&census_status=1">
          <el-button icon="el-icon-upload2" plain style="float: right">导入数据</el-button>
        </el-upload> -->
      </div>
      <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
        <el-table-column label="企业名称" prop="company_name"></el-table-column>
        <el-table-column label="统一社会信用代码" prop="credit_code" width="175"></el-table-column>
        <el-table-column label="法定代表人" prop="business_entity"></el-table-column>
        <el-table-column label="联系电话" prop="entity_phone" width="115"></el-table-column>
        <el-table-column label="人力资源负责人" prop="resource_name"></el-table-column>
        <el-table-column label="联系电话" prop="resource_phone" width="115"></el-table-column>
        <el-table-column label="操作" width="210" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" 
              @click="$refs.componentsBase.show(scope.row, '查看')">查看</el-button>
            <el-button type="warning" size="mini" 
              @click="$refs.componentsBase.show(scope.row, '修改')">修改</el-button>
            <el-button type="danger" size="mini" 
              @click="$refs.componentsBase.show(scope.row, '修改')">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page_index"
          :page-size="query.page_number"
          :total="pageTotal"
          @current-change="companyList"></el-pagination>
      </div>
    </div>

    <ComponentsBase ref="componentsBase" @success="companyList()"></ComponentsBase>
  </div>
</template>

<script>
import ComponentsBase from "@/components/company/Base"
export default {
  components: { ComponentsBase },
  data() {
    return {
      pageTotal: 0,
      tableData: [],
      query: {
        page_index: 1,
        page_number: 7,
        company_name: ''
      }
    };
  },
  created() {
    this.companyList();
  },
  methods: {
    // 获取信息列表
    async companyList(index) {
      this.query.page_index = index || 1
      let res = await this.$api.companyList(this.query)
      if (res.status != 0) return
      this.tableData = res.data.list
      this.pageTotal = res.data.total_rows
    },

    // 导出数据
    censusExport(){
      location.href = `http://47.93.185.110:7008/api/census/export?census_type=1&census_status=1`
    }
  },
};
</script>

<style lang="scss" scoped>
.handle-box {
  margin-bottom: 20px;
}
.mr10 {
  margin-right: 10px;
}
.table {
  width: 100%;
  font-size: 14px;
}
</style>
