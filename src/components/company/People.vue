<template>
  <el-dialog width="1000px" center
    title="企业人力资源信息录入"
    :visible.sync="visible"
    :append-to-body="true">
    <div>
      <el-form inline :model="form" :rules="rules" label-width="100px">
        <el-form-item label="姓名">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="form.number" maxlength="18"
            placeholder="请输入18位身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age"></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="form.from" placeholder="请输入籍贯"></el-input>
        </el-form-item>
        
        <el-form-item label="入职时间">
          <el-date-picker class="from-width-l1" v-model="form.time" type="date"></el-date-picker>
        </el-form-item>
        <el-form-item label="职务(工种)">
          <el-input v-model="form.address2arr" class="from-width-l1" placeholder="请输入职务(工种)"></el-input>
        </el-form-item>
        <el-form-item label="特殊身份">
          <el-select v-model="form.address2" class="from-width-l1">
            <el-option v-for="item in $option.item12" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="现住址">
            <el-cascader style="width: 277px" v-model="form.address1arr" :options="formAddress" clearable></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.address1" class="from-width-l4" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="footer">
      <el-button @click="saveInfo()" type="primary">保 存</el-button>
      <el-button @click="visible = false" plain>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import addressDefault from '@/common/country-level3-data.js'
export default {
  data() {
    return {
      visible: false,
      form: {
        name: '',
        number: '',
        name1: '',
        tel1: '',
        name2: '',
        tel2: '',
        address1: '',
        address1arr: '',
        address2: '',
        address2arr: '',
        sex: '',
        age: '',
        from: '',
        time: ''
      },
      formAddress: addressDefault,
      rules: {
        
      }
    };
  },
  created() {
    
  },
  methods: {
    show(){
      this.visible = true
    },
    // 修改信息
    async censusUpdate(body){
      let res = await this.$api.censusUpdate(body)
      if(res.status != 0) return this.$message.error('系统错误，请稍后再试')
      if(res.data.hasOwnProperty('status')){
        this.$message.error(res.data.message)
      }else{
        this.$message.success('修改成功')
        this.$emit('success')
        this.visible = false
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.baseform-dialog{
  ::v-deep .el-dialog{
    margin-top: 5vh !important;
  }
  ::v-deep .el-dialog__header{
    padding: 0;
  }
  ::v-deep .el-dialog__body{
    padding: 0 5px 0 20px;
  }
}
.container{
  padding-bottom: 12px;
}
.person-container{
  height: calc(85vh - 96px);
  overflow-x: hidden;
  overflow-y: scroll;
}
.form{
  width: 1075px;
  .form-item{
    padding-top: 15px;
    margin-bottom: 15px;
    .form-item-title{
      font-size: 18px;
      padding-bottom: 15px;
    }
  }
}
.footer{
  text-align: center;
  margin-top: 32px;
  padding-bottom: 32px;
}
</style>