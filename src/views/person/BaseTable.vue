<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：登记管理</el-breadcrumb-item>
        <el-breadcrumb-item>个人信息注销</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-input v-model="query.name" placeholder="请输入身份号或姓名" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">检索</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="id" label="身份证号" width="170" align="center">
          <template slot-scope="scope">62272619950115261X</template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="100">
          <template slot-scope="scope">欧阳娜娜</template>
        </el-table-column>
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">男</template>
        </el-table-column>
        <el-table-column label="户籍性质" width="80" align="center">
          <template slot-scope="scope">农业</template>
        </el-table-column>
        <el-table-column prop="date" label="年龄" width="50" align="center">
          <template slot-scope="scope">60</template>
        </el-table-column>
        <el-table-column prop="date" label="就业状态" width="120">
          <template slot-scope="scope">有其他资产收入</template>
        </el-table-column>
        <el-table-column prop="name" label="居住地址"></el-table-column>
        <el-table-column prop="name" label="联系电话" width="110" align="center">
          <template slot-scope="scope">13390513859</template>
        </el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="danger" @click="handleDelete(scope.$index, scope.row)">注销</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="个人信息注销" :visible.sync="editVisible" width="800px" center>
      <table class="dialog-table" border="1">
        <tr style="text-align: center">
          <td colspan="6">个人信息</td>
        </tr>
        <tr>
          <td style="width: 70px">姓名</td>
          <td style="width: 180px">张三</td>
          <td style="width: 70px">年龄</td>
          <td style="width: 180px">20</td>
          <td style="width: 70px">性别</td>
          <td style="width: 180px">男</td>
        </tr>
        <tr>
          <td>就业状态</td>
          <td>无业</td>
          <td>户籍性质</td>
          <td>男</td>
          <td>身份证号</td>
          <td>63219783128937129803</td>
        </tr>
        <tr>
          <td>电话</td>
          <td colspan="5">1339021984201</td>
        </tr>
        <tr>
          <td>地址</td>
          <td colspan="5">北京北京北京北京北京北京北京北京北京北京北京北京</td>
        </tr>
      </table>
      <el-form ref="form" :model="form" label-width="68px" class="form-container"
        style="width: 750px">
        <div class="form-item">
          <el-form-item label="注销原因">
            <el-select v-model="value" placeholder="请选择"  class="from-width-l1">
              <el-option v-for="item in registerTypeList" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.name" type="textarea" :rows="6"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="saveEdit">注 销</el-button>
        <el-button @click="editVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
  name: 'basetable',
  data() {
    return {
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
    this.getData();
  },
  methods: {
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
