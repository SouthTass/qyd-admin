<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>用工招聘需求</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select v-model="query.company_id" filterable 
          placeholder="请选择/搜索您要查询的企业" class="table-search-select"
          @change="changeCompany">
          <el-option v-for="item in companyList" :key="item.id"
            :label="item.company_name"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="companyRecruitList()">检索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="openDialog" style="float: right">录入信息</el-button>
        <!-- <el-button type="danger" icon="el-icon-download" @click="censusExport" 
          plain style="float: right">导出数据</el-button>
        <el-upload class="upload-file-button" 
          action="http://47.93.185.110:7008/api/census/export?census_type=1&census_status=1">
          <el-button icon="el-icon-upload2" plain style="float: right">导入数据</el-button>
        </el-upload> -->
      </div>
      <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
        <el-table-column label="企业名称" prop="company_name" width="180"></el-table-column>
        <el-table-column label="岗位名称" prop="recruit_position" width="180"></el-table-column>
        <el-table-column label="岗位待遇" prop="recruit_level" width="180"></el-table-column>
        <el-table-column label="岗位要求" prop="recruit_desc"></el-table-column>
        <el-table-column label="操作" width="210" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="openDialog(scope.row, '查看')">查看</el-button>
            <el-button type="warning" size="mini" @click="openDialog(scope.row, '修改')">修改</el-button>
            <el-button type="danger"  size="mini" @click="deleteData(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.page_index"
          :page-size="query.page_number"
          :total="pageTotal"
          @current-change="censusList"></el-pagination>
      </div> -->
    </div>

    <ComponentsRecrult ref="componentsRecrult" @success="companyRecruitList"></ComponentsRecrult>
  </div>
</template>

<script>
import ComponentsRecrult from "@/components/company/Recrult"
export default {
  components: { ComponentsRecrult },
  data() {
    return {
      pageTotal: 0,
      tableData: [],
      query: {
        type: 2,
        company_id: '',
        company_name: '',
        page_index: 1,
        page_number: 7
      },
      companyList: []
    };
  },
  created() {
    this.companyAll();
  },
  methods: {
    // 获取所有的公司
    async companyAll() {
      let res = await this.$api.companyAll()
      if (res.status != 0) return
      this.companyList = res.data
    },

    // 选中的公司处理
    changeCompany(e){
      this.query.company_id = e
      let index = this.companyList.findIndex(item => item.id == e)
      this.query.company_name = this.companyList[index].company_name
      this.companyRecruitList()
    },

    // 获取信息列表
    async companyRecruitList(index) {
      if(!this.query.company_id){
        return this.$message.error('请选择您要查询的企业')
      }
      this.query.page_index = index || 1
      let res = await this.$api.companyRecruitList(this.query)
      if (res.status != 0) return
      res.data.map(e => e.company_name = this.query.company_name)
      this.tableData = res.data
      // this.tableData = res.data.list
      // this.pageTotal = res.data.total_rows
    },

    // 打开录入信息的弹窗
    openDialog(item, status){
      if(!this.query.company_id) return this.$message.error('请先选择公司')
      this.$refs.componentsRecrult.show(item || '空', this.query.company_id, this.query.company_name, status)
    },

    // 删除数据
    async deleteData(item){
      let dialog = await this.$confirm(`此操作将永久删除《${item.recruit_position}》, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if(dialog != 'confirm') return
      let res = await this.$api.companyRecruitRemove({recruit_id: item.id})
      if(res.status != 0) return
      this.$message.success('删除成功')
      this.companyRecruitList()
    },
  },
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
.dialog-table {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15);
  td {
    padding: 5px;
  }
}
</style>
