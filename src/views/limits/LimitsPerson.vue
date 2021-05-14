<template>
  <div>
    <!-- 当前位置 -->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- 用户列表 -->
    <div class="container">
      <div class="add-button" v-if="level">
        <el-button type="primary" @click="$refs.cAddUser.show()">添加成员</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="account" label="账号" width="180"></el-table-column>
        <el-table-column label="权限" width="60" align="center">
          <template slot-scope="scope">
            <el-tag>{{ scope.row.level | level }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone_number" label="联系电话" width="110" align="center"></el-table-column>
        <el-table-column prop="address" label="辖区"></el-table-column>
        <el-table-column label="操作" width="260" align="center">
          <template slot-scope="scope">
            <el-button type="danger" @click="delUser(scope.row)">删除</el-button>
            <el-button type="info" @click="$refs.cChangeUser.show(scope.row)">修改信息</el-button>
            <el-button type="warning" @click="$refs.cPwdUser.show(scope.row)">修改密码</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <AddUser ref="cAddUser" @success="userList"></AddUser>
    <ChangeUser ref="cChangeUser" @success="userList"></ChangeUser>
    <PwdUser ref="cPwdUser"></PwdUser>
  </div>
</template>

<script>
import AddUser from '@/components/limits/AddUser'
import ChangeUser from '@/components/limits/Change'
import PwdUser from '@/components/limits/Pwd'
export default {
  components: {AddUser, ChangeUser, PwdUser},
  data() {
    return {
      tableData: [],
      user: {},
    }
  },
  created() {
    this.userList()
  },
  computed: {
    level: function() {
      if(localStorage.getItem("qyd_level") == 1){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    // 获取账号列表
    async userList(){
      let res = await this.$api.userList()
      if(res.status != 0) return
      res.data.map((e) => {
        e.address = `${e.city}${e.area}${e.town}${e.village}`
      })
      this.tableData = res.data
    },

    // 删除用户
    async delUser(item){
      let box = await this.$confirm(`此操作将永久删除 “${item.name}”, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if(box != 'confirm') return
      let res = await this.$api.userSave({id: item.id, status: -1})
      if(res.status != 0) return
      this.$message.success('删除成功')
      setTimeout(() => {this.userList()}, 300);
    },
  }
};
</script>

<style lang="scss" scoped>
.add-button{
  float: right;
  margin-bottom: 15px;
}
.table {
  width: 100%;
  font-size: 14px;
  margin-top: 30px;
}
</style>
