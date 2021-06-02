<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：综合查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.user_name" placeholder="请输入身份号或姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="censusList(1)">检索</el-button>
        <el-button type="primary" icon="el-icon-plus" @click="$refs.componentsBaseForm.show()" 
          style="float: right">录入信息</el-button>
        <el-button type="danger" icon="el-icon-download" @click="censusExport" 
          plain style="float: right">导出数据</el-button>
        <el-upload class="upload-file-button" 
          action="http://47.93.185.110:7008/api/census/export?census_type=1&census_status=1">
          <el-button icon="el-icon-upload2" plain style="float: right">导入数据</el-button>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
