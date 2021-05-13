<template>
  <div>
    <!-- 当前位置 -->
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：权限管理</el-breadcrumb-item>
        <el-breadcrumb-item>账号管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="add-button">
      <el-button type="primary" @click="openAddUserDialog('add')">添加成员</el-button>
    </div>

    <!-- 用户列表 -->
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
          <el-button type="info" @click="openAddUserDialog('changeInfo', scope.row)">修改信息</el-button>
          <el-button type="warning" @click="handleDelete('changepWD', scope.row)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加用户 -->
    <el-dialog :title="dialogTitle" :visible.sync="addUserVisible" width="660px" center>
      <el-form ref="addUser" 
        :inline="true" :model="user" :rules="addRules" 
        label-width="100px" class="form-container" style="width: 600px">
        <div class="form-item">
          <el-form-item label="用户姓名" prop="name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="用户账号" prop="account">
            <el-input v-model="user.account"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="pwd1">
            <el-input v-model="user.pwd1" show-password class="from-width-l1"
               :disabled="dialogTitle == '编辑信息'"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="pwd2">
            <el-input v-model="user.pwd2" show-password class="from-width-l1"
               :disabled="dialogTitle == '编辑信息'"></el-input>
          </el-form-item>
          <el-form-item label="用户电话" prop="phone_number">
            <el-input v-model="user.phone_number" class="from-width-l1"></el-input>
          </el-form-item>
          <el-form-item label="用户权限" prop="level" required>
            <el-select v-model="user.level" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in $root.user.item19" 
                :key="item.level" :label="item.name" :value="item.level"></el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-form-item label="辖区范围" prop="address">
              <el-cascader class="from-width-l3" filterable v-model="user.address"
                :options="areaJson" :props="props"></el-cascader>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addUser">创 建</el-button>
        <el-button @click="addUserVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
  data() {
    let changePwd1 = (rule, value, callback) => {
      if(this.dialogTitle == '编辑信息'){
        callback()
      }
      if(this.user.pwd1.length < 1){
        callback(new Error('请您输入密码'))
      }
    };
    let changePwd2 = (rule, value, callback) => {
      if(this.dialogTitle == '编辑信息'){
        callback()
      }
      if(this.user.pwd2.length < 1){
        callback(new Error('请您输入密码'))
      }
      if(this.user.pwd1 == this.user.pwd2){
        callback()
      }else{
        callback(new Error('您两次输入的密码不一致，请确认'))
      }
    };
    let checkPhoneNumber = (rule, value, callback) => {
      if(this.$root.user.census.phone_number.length == 8 || this.$root.user.census.phone_number.length == 11){
        callback()
      }else{
        callback(new Error('电话号码只能为8位或11位'))
      }
    };
    return {
      tableData: [],
      addUserVisible: false,
      user: {
        name: "",
        phone_number: "",
        account: "",
        city: "",
        area: "",
        town: "",
        village: "",
        level: 1,
        address: [],
        addressArray: [],
        pwd1: '',
        pwd2: '',
        password: ''
      },
      areaJson: [],
      props: {
        value: 'name',
        label: 'name',
        children: 'list',
      },
      addRules: {
        name: [
          { required: true, message: '请填写用户姓名', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请填写用户账号', trigger: 'blur' }
        ],
        pwd1: [
          { validator: changePwd1, trigger: 'change' }
        ],
        pwd2: [
          { validator: changePwd2, trigger: 'change' }
        ],
        phone_number: [
          { required: true, message: '请填写电话号码', trigger: 'blur' },
          { validator: checkPhoneNumber, trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请选择辖区范围', trigger: 'blur' }
        ]
      },
      dialogTitle: ''
    }
  },
  created() {
    this.userList()
    let tmp = JSON.parse(JSON.stringify(this.$DefaultArea))
    this.areaJson.push(tmp[0])
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

    // 修改密码
    changePwd(){

    },

    // 打开添加用户的窗口
    openAddUserDialog(type, item){
      console.log(item)
      if(type == 'add'){
        this.dialogTitle = '增加成员'
        this.user = {
          name: "",
          phone_number: "",
          account: "",
          city: "",
          area: "",
          town: "",
          village: "",
          level: 1,
          address: [],
          addressArray: [],
          pwd1: '',
          pwd2: '',
          password: ''
        }
      }
      if(type == 'changeInfo'){
        this.dialogTitle = '编辑信息'
        Object.assign(this.user, item)
        this.user.address = []
        this.user.address.push(this.user.city)
        this.user.address.push(this.user.area)
        this.user.address.push(this.user.town)
        this.user.address.push(this.user.village)
      }
      this.addUserVisible = true
    },

    // 添加用户
    async addUser(){
      let pass = await this.$refs.addUser.validate()
      if(!pass) return
      this.user.city = this.user.address[0]
      this.user.area = this.user.address[1]
      this.user.town = this.user.address[2]
      this.user.village = this.user.address[3]
      this.user.password = this.user.pwd1
      let {name, account, city, area, town, village, level, password, phone_number} = {...this.user}
      let res = await this.$api.userSave({name, account, city, area, town, village, level, password, phone_number})
      if(res.status != 0) return
      this.$message.success('创建成功')
      setTimeout(() => {
        this.addUserVisible = false
        this.userList()
      }, 300)
    }
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
