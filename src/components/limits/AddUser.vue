<template>
  <el-dialog title="新增成员" :visible.sync="visible" width="660px" center>
    <el-form ref="addUserForm" 
      :inline="true" :model="user" :rules="addRules"
      :close="close"
      label-width="100px" class="form-container" style="width: 600px">
      <div class="form-item">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="account">
          <el-input v-model="user.account"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="pwd1">
          <el-input v-model="user.pwd1" show-password class="from-width-l1"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <el-input v-model="user.pwd2" show-password class="from-width-l1"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="phone_number">
          <el-input v-model="user.phone_number" class="from-width-l1"></el-input>
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
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    let changePwd2 = (rule, value, callback) => {
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
      visible: false, 
      user: {},
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
          { required: true, message: '请输入用户密码', trigger: 'blur' },
        ],
        pwd2: [
          { required: true, message: '请再次输入用户密码', trigger: 'blur' },
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
    }
  },
  created() {
    let tmp = JSON.parse(JSON.stringify(this.$DefaultArea))
    this.areaJson.push(tmp[0])
  },
  methods: {
    show(){
      this.user = {
        name: "",
        phone_number: "",
        account: "",
        city: "",
        area: "",
        town: "",
        village: "",
        address: [],
        pwd1: '',
        pwd2: '',
        password: ''
      },
      this.visible = true
    },

    // 添加用户
    async addUser(){
      let pass = await this.$refs['addUserForm'].validate()
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
        this.visible = false
        this.$emit('success')
      }, 500)
    },

    // 关闭弹窗
    close(){
      this.$refs['addUserForm'].resetFields()
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
