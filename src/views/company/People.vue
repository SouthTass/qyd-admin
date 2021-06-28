<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：企业管理</el-breadcrumb-item>
        <el-breadcrumb-item>人力资源信息</el-breadcrumb-item>
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
        <el-button type="primary" icon="el-icon-search" @click="companyMemberList()">检索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="openDialog('空')" 
          style="float: right">录入信息</el-button>
        <!-- <el-button type="danger" icon="el-icon-download" @click="censusExport" 
          plain style="float: right">导出数据</el-button>
        <el-upload class="upload-file-button" 
          action="http://47.93.185.110:7008/api/census/export?census_type=1&census_status=1">
          <el-button icon="el-icon-upload2" plain style="float: right">导入数据</el-button>
        </el-upload> -->
      </div>
      <el-table :data="tableData" border class="table" header-cell-class-name="table-header">
        <el-table-column label="身份证号码" prop="card_number" width="180"></el-table-column>
        <el-table-column label="姓名" prop="member_name" width="120"></el-table-column>
        <el-table-column label="性别" prop="sex" width="50" align="center"></el-table-column>
        <el-table-column label="年龄" prop="age" width="50" align="center"></el-table-column>
        <el-table-column label="籍贯" prop="member_domicile" width="120"></el-table-column>
        <el-table-column label="入职时间" prop="start_time" width="120"></el-table-column>
        <el-table-column label="职务" prop="member_position" width="150"></el-table-column>
        <el-table-column label="特殊身份" prop="member_identity" width="150"></el-table-column>
        <el-table-column label="现住址" prop="tmpaddress"></el-table-column>
        <el-table-column label="操作" width="210" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="openDialog(scope.row, '查看')">查看</el-button>
            <el-button type="warning" size="mini" @click="openDialog(scope.row), '修改'">修改</el-button>
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
          @current-change="companyMemberList"></el-pagination>
      </div> -->
    </div>

    <ComponentsPeople ref="componentsPeople" @success="companyMemberList"></ComponentsPeople>
  </div>
</template>

<script>
import ComponentsPeople from "@/components/company/People"
export default {
  components: { ComponentsPeople },
  data() {
    return {
      pageTotal: 0,
      tableData: [],
      query: {
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
    // 获取信息列表
    async companyMemberList(index) {
      if(!this.query.company_id){
        return this.$message.error('请选择您要查询的企业')
      }
      this.query.page_index = index || 1
      let res = await this.$api.companyMemberList(this.query)
      if (res.status != 0) return
      res.data.map((e) => {
        e.age = this.$root.computedAge(e.card_number)
        e.start_time = this.$dayjs(e.start_time).format('YYYY-MM-DD')
        e.tmpaddress = ''
        e.member_address = JSON.parse(e.member_address)
        e.member_address.map(item => e.tmpaddress += item || '')
      })
      this.tableData = res.data
      // this.tableData = res.data.list
      // this.pageTotal = res.data.total_rows
    },

    // 获取所有的公司
    async companyAll() {
      let res = await this.$api.companyAll()
      if (res.status != 0) return
      this.companyList = res.data
    },

    // 打开录入信息的弹窗
    openDialog(item, status){
      if(!this.query.company_id) return this.$message.error('请先选择公司')
      this.$refs.componentsPeople.show(item, this.query.company_id, this.query.company_name, status)
    },

    // 选中的公司处理
    changeCompany(e){
      this.query.company_id = e
      let index = this.companyList.findIndex(item => item.id == e)
      this.query.company_name = this.companyList[index].company_name
      this.companyMemberList()
    },

    // 删除数据
    async deleteData(item){
      let dialog = await this.$confirm(`此操作将永久删除《${item.member_name}》, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if(dialog != 'confirm') return
      let res = await this.$api.companyMemberRemove({member_id: item.id})
      if(res.status != 0) return
      this.$message.success('删除成功')
      this.companyMemberList()
    },

    // 计算年龄
    computedAge(item) {
      let str = item.card_number
      return this.$dayjs().format('YYYY') - str.slice(6,10)
    },

    // 计算性别
    computedSex(item){
      let str = item.card_number
      return str.slice(16, 17) % 2 ? '男' : '女' 
    },

    // 查看个人信息
    checkPerson(item) {
      this.$refs.componentsCheck.show(item);
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
