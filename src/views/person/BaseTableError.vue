<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：登记管理</el-breadcrumb-item>
        <el-breadcrumb-item>异常管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input
          v-model="query.user_name"
          placeholder="请输入身份号或姓名"
          class="handle-input mr10"></el-input>
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
        <el-table-column prop="sex" label="性别" width="50" align="center"
          ><template slot-scope="scope">{{ computedSex(scope.row) }}</template>
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
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column label="操作" width="150" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="getErrorInfo(scope.row)">查看</el-button>
            <el-button type="warning" size="mini"
              @click="$refs.componentsBaseForm.show('change', scope.row)">修改</el-button>
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
          @current-change="censusList"
        ></el-pagination>
      </div>
    </div>

    <!-- 异常信息 -->
    <el-dialog title="异常信息" :visible.sync="dialogVisible" width="830px" center class="table-from">
      <!-- 户籍信息 -->
      <div class="dialog">
        <table class="dialog-table" border="1" colspan="6">
          <tr>
            <th style="width: 200px; text-align: left; padding-left: 5px">字段</th>
            <th style="width: 600px; text-align: left; padding-left: 5px">原因</th>
          </tr>
          <tr v-for="(item, index) in errorList" :key="index">
            <td>{{item.field_name}}</td>
            <td>{{item.desc}}</td>
          </tr>
        </table>
      </div>

      <!-- 按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <ComponentsInfo ref="componentsInfo"></ComponentsInfo>
    <ComponentsCheck ref="componentsCheck"></ComponentsCheck>
    <ComponentsLogout ref="componentsLogout"></ComponentsLogout>
    <ComponentsBaseForm ref="componentsBaseForm" @success="censusList"></ComponentsBaseForm>
  </div>
</template>

<script>
import ComponentsInfo from "@/components/person/Info";
import ComponentsCheck from "@/components/person/Check";
import ComponentsLogout from "@/components/person/Logout";
import ComponentsBaseForm from "@/views/person/BaseForm";
export default {
  components: {
    ComponentsInfo,
    ComponentsCheck,
    ComponentsLogout,
    ComponentsBaseForm,
  },
  data() {
    return {
      pageTotal: 0,
      tableData: [],
      query: {
        user_name: "",
        page_index: 1,
        page_number: 10,
        census_status: 0,
      },
      dialogVisible: false,
      errorList: []
    };
  },
  created() {
    this.censusList();
  },
  methods: {
    // 获取异常信息详情
    async getErrorInfo(item){
      if(item && item.abnormal_configs){
        this.errorList = JSON.parse(item.abnormal_configs)
        this.dialogVisible = true
      }
    },

    // 获取信息列表
    async censusList(index) {
      this.query.page_index = index || 1;
      let res = await this.$api.censusList(this.query);
      if (res.status != 0) return;
      this.tableData = res.data.list;
      this.pageTotal = res.data.total_rows;
    },

    // 计算年龄
    computedAge(item) {
      let str = item.card_number;
      return this.$dayjs().format("YYYY") - str.slice(6, 10);
    },

    // 计算性别
    computedSex(item) {
      let str = item.card_number;
      return str.slice(16, 17) % 2 ? "男" : "女";
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
