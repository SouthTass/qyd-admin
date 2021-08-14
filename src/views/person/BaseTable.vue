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
        <el-input v-model="query.user_name" placeholder="请输入身份号或姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="censusList(1)">检索</el-button>
        <el-button type="primary" icon="el-icon-plus"
          @click="openPersonageInput()"
          style="float: right"
          >录入信息</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-download"
          plain
          style="float: right"
          @click="censusExport">导出数据</el-button
        >
        <el-upload action="/api/census/import?census_type=1&census_status=1" 
          class="upload-file-button"
          :show-file-list="false">
          <el-button icon="el-icon-upload2" plain style="float: right">导入数据</el-button>
        </el-upload>
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >
        <el-table-column
          prop="card_number"
          label="身份证号"
          width="170"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="census_name"
          label="姓名"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          width="50"
          align="center"
        ><template slot-scope="scope">{{computedSex(scope.row)}}</template>
        </el-table-column>
        <el-table-column
          prop="census_domicile_type"
          label="户籍性质"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column prop="date" label="年龄" width="50" align="center">
          <template slot-scope="scope">{{ computedAge(scope.row) }}</template>
        </el-table-column>
        <el-table-column
          prop="work_status"
          label="是否就业"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" label="居住地址">
          <template slot-scope="scope">
            {{ scope.row.census_city }}
            {{ scope.row.census_area }}
            {{ scope.row.census_town }}
            {{ scope.row.census_village }}
            {{ scope.row.house_number }}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone_number"
          label="联系电话"
          width="120"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="310" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="$refs.componentsInfo.show(scope.row)"
              >查看</el-button
            >
            <el-button
              type="warning"
              size="mini"
              @click="openPersonageInput(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="$refs.componentsLogout.show(scope.row)"
              >注销</el-button
            >
            <el-button type="primary" size="mini"
              @click="$refs.componentsChangeRecord.show(scope.row)">变更记录</el-button>
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
          @current-change="censusList"></el-pagination>
      </div>
    </div>

    <ComponentsInfo ref="componentsInfo"></ComponentsInfo>
    <ComponentsCheck ref="componentsCheck"></ComponentsCheck>
    <ComponentsLogout ref="componentsLogout"></ComponentsLogout>
    <ComponentsBaseForm ref="componentsBaseForm" @success="censusList"></ComponentsBaseForm>
    <ComponentsChangeRecord ref="componentsChangeRecord"></ComponentsChangeRecord>
  </div>
</template>

<script>
import ComponentsInfo from '@/components/person/Info'
import ComponentsCheck from "@/components/person/Check";
import ComponentsLogout from "@/components/person/Logout";
import ComponentsBaseForm from "@/views/person/BaseForm";
import ComponentsChangeRecord from "@/components/person/ChangeRecord";
export default {
  components: { ComponentsChangeRecord, ComponentsInfo, ComponentsCheck, ComponentsLogout, ComponentsBaseForm },
  data() {
    return {
      pageTotal: 0,
      tableData: [],
      query: {
        user_name: '',
        page_index: 1,
        page_number: 7
      },
    };
  },
  created() {
    this.censusList();
  },
  methods: {
    // 获取信息列表
    async censusList(index) {
      this.query.page_index = index || 1
      let res = await this.$api.censusList(this.query)
      if (res.status != 0) return
      this.tableData = res.data.list
      this.pageTotal = res.data.total_rows
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
    },

    // 打开信息录入的新页面
    openPersonageInput(item){
      let query = {type: 'PersonageInput'}
      if(item) query.id = item.id
      let routeUrl = this.$router.resolve({
        path: "/personageinput",
        query: query
      });
      window.open(routeUrl .href, '_blank');
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
