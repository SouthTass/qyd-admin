<template>
  <el-dialog width="1000px" center
    title="企业信息录入"
    :visible.sync="visible"
    :append-to-body="true">
    <div style="margin-left: 70px">
      <el-form ref="pSystem" inline :model="form" :rules="rules" label-width="155px">
        <el-form-item label="企业名称">
          <el-input v-model="form.name" class="from-width-l3" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <el-input v-model="form.number" maxlength="18" class="from-width-l3"
            placeholder="请输入18位统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="form.name1" class="from-width-l5" placeholder="请输入法定代表人姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.tel1" class="from-width-l5" placeholder="请输入法定代表人电话"></el-input>
        </el-form-item>
        <el-form-item label="人力资源负责人">
          <el-input v-model="form.name2" class="from-width-l5" placeholder="请输入人力资源负责人姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.tel2" class="from-width-l5" placeholder="请输入人力资源负责人电话"></el-input>
        </el-form-item>
        <el-form-item label="注册地址">
          <el-cascader class="from-width-l5"
            v-model="address1arr"
            placeholder="请选择"
            :options="formAddress"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.address1" class="from-width-l4" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="经营地址">
          <el-cascader class="from-width-l5"
            v-model="address2arr"
            placeholder="请选择"
            :options="formAddress"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.address2" class="from-width-l4" placeholder="请输入详细地址"></el-input>
        </el-form-item>
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
        address2arr: ''
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