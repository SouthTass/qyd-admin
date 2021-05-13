<template>
  <el-dialog title="修改成员信息" :visible.sync="visible" width="660px" center>
    <el-form ref="changeUserForm" 
      :inline="true" :model="user" :rules="addRules"
      :close="close"
      label-width="100px" class="form-container" style="width: 600px">
      <div class="form-item">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="account">
          <el-input v-model="user.account" disabled></el-input>
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
      <el-button type="danger" @click="addUser">修 改</el-button>
      <el-button @click="close">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
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
    show(item){
      this.user = {
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
      let pass = await this.$refs['changeUserForm'].validate()
      if(!pass) return
      this.user.city = this.user.address[0]
      this.user.area = this.user.address[1]
      this.user.town = this.user.address[2]
      this.user.village = this.user.address[3]
      let {id, name, city, area, town, village, phone_number} = {...this.user}
      let res = await this.$api.userSave({id, name, city, area, town, village, phone_number})
      if(res.status != 0) return
      this.$message.success('修改成功')
      setTimeout(() => {
        this.visible = false
        this.$emit('success')
      }, 500)
    },

    // 关闭弹窗
    close(){
      this.visible = false
      this.$refs['changeUserForm'].resetFields()
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
