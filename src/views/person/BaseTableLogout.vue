<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：个人管理</el-breadcrumb-item>
        <el-breadcrumb-item>注销管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.user_name" placeholder="请输入身份号或姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="censusList(1)">检索</el-button>
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
        ></el-table-column>
        <el-table-column
          prop="census_domicile_type"
          label="户籍性质"
          width="80"
          align="center"
        ></el-table-column>
        <!-- <el-table-column prop="age" label="年龄" width="50" align="center"></el-table-column> -->
        <el-table-column
          prop="work_status"
          label="是否就业"
          width="120"
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
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="checkPerson(scope.row)"
              >查看</el-button
            >
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

    <ComponentsCheck ref="componentsCheck"></ComponentsCheck>
    <ComponentsLogout ref="componentsLogout"></ComponentsLogout>
    <ComponentsBaseForm ref="componentsBaseForm" @success="censusList"></ComponentsBaseForm>
  </div>
</template>

<script>
import ComponentsCheck from "@/components/person/Check";
import ComponentsLogout from "@/components/person/Logout";
import ComponentsBaseForm from "@/views/person/BaseForm";
export default {
  components: { ComponentsCheck, ComponentsLogout, ComponentsBaseForm },
  data() {
    return {
      pageTotal: 0,
      tableData: [],
      query: {
        user_name: '',
        page_index: 1,
        page_number: 10,
        census_status: '-1'
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
      res.data.list.map((e) => {
        e.age = this.$root.computedAge(e.card_number)
        e.sex = this.$root.computedSex(e.card_number)
      })
      this.tableData = res.data.list
      this.pageTotal = res.data.total_rows
    },

    // 查看个人信息
    checkPerson(item) {
      this.$refs.componentsCheck.show(item);
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
