<template>
  <el-dialog title="修改密码" :visible.sync="visible" width="660px" center>
    <el-form ref="pwdUserForm" 
      :inline="true" :model="user" :rules="addRules"
      @close="close"
      label-width="100px" class="form-container" style="width: 600px">
      <div class="form-item">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="user.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="account">
          <el-input v-model="user.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="pwd1">
          <el-input v-model="user.pwd1" show-password class="from-width-l1"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pwd2">
          <el-input v-model="user.pwd2" show-password class="from-width-l1"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="phone_number">
          <el-input v-model="user.phone_number" disabled class="from-width-l1"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="辖区范围" prop="address">
            <el-input v-model="user.address" disabled class="from-width-l3"></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="addUser">修 改</el-button>
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
    return {
      visible: false, 
      user: {},
      addRules: {
        pwd1: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
        ],
        pwd2: [
          { required: true, message: '请再次输入用户密码', trigger: 'blur' },
          { validator: changePwd2, trigger: 'change' }
        ],
      }
    }
  },
  methods: {
    show(item){
      this.user = {
        pwd1: '',
        pwd2: '',
        password: '',
        id: item.id,
        name: item.name,
        phone_number: item.phone_number,
        account: item.account,
        city: item.city,
        area: item.area,
        town: item.town,
        village: item.village,
        address: [item.city, item.area, item.town, item.village]
      },
      this.visible = true
    },

    // 添加用户
    async addUser(){
      let pass = await this.$refs['pwdUserForm'].validate()
      if(!pass) return
      this.user.password = this.user.pwd1
      let res = await this.$api.userSave({
        id: this.user.id,
        password: this.user.password
      })
      if(res.status != 0) return
      this.$message.success('修改成功')
      setTimeout(() => {
        this.visible = false
      }, 500)
    },

    // 关闭弹窗
    close(){
      this.$refs['pwdUserForm'].resetFields()
      this.visible = false
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
