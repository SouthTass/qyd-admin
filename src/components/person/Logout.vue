<template>
  <el-dialog title="注销" :visible.sync="visiable" width="800px" center>
    <el-form label-width="80px" class="form-container" ref="personLogout"
      :model="user"
      :rules="rules">
      <table class="dialog-table" border="1">
        <tr style="text-align: center">
          <td colspan="6">个人信息</td>
        </tr>
        <tr>
          <td style="width: 70px">姓名</td>
          <td style="width: 180px">{{info.census_name}}</td>
          <td style="width: 70px">年龄</td>
          <td style="width: 180px">{{info.age}}</td>
          <td style="width: 70px">性别</td>
          <td style="width: 180px">{{info.sex}}</td>
        </tr>
        <tr>
          <td>就业状态</td>
          <td>单位就业</td>
          <td>户籍性质</td>
          <td>{{info.census_domicile_type}}</td>
          <td>身份证号</td>
          <td>{{info.card_number}}</td>
        </tr>
        <tr>
          <td>联系电话</td>
          <td colspan="5">{{info.phone_number}}</td>
        </tr>
        <tr>
          <td>居住地址</td>
          <td colspan="5">{{`${info.census_city}${info.census_area}${info.census_town}${info.census_village}${info.house_number}`}}</td>
        </tr>
      </table>
      <div class="form-item">
        <el-form-item label="注销原因" prop="text">
          <el-select v-model="user.text" placeholder="请选择注销原因" class="from-width-l1">
            <el-option v-for="item in $option.item20" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="desc">
          <el-input v-model="user.desc" type="textarea" :rows="6" placeholder="请填写备注"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" @click="logout">注 销</el-button>
      <el-button @click="visiable = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visiable: false,
      info: {},
      user: {
        text: '',
        desc: ''
      },
      rules:{
        'text': [{ required: true, message: '请选择注销原因', trigger: 'blur' }],
        'desc': [{ required: true, message: '请填写备注', trigger: 'blur' }]
      }
    };
  },
  methods: {
    // 打开弹窗
    show(item){
      item.age = this.$root.computedAge(item.card_number)
      item.sex = this.$root.computedSex(item.card_number)
      this.info = item
      this.visiable = true
    },

    // 注销
    async logout(){
      let val = await this.$refs.personLogout.validate()
      if(!val) return
      let res = await this.$api.censusDestroy({
        id: this.info.id,
        destroy_reason: this.user.text,
        destroy_desc: this.user.desc
      })
      if(res.status == 0){
        this.$message.success('注销成功')
        this.visiable = false
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container{
  width: 750px
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
