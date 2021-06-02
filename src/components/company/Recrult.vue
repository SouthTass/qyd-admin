<template>
  <el-dialog width="800px" center
    title="企业用工(招聘)信息录入"
    :visible.sync="visible"
    :append-to-body="true">
    <div style="padding: 0 60px">
      <el-form :model="form" :rules="rules" label-width="80px">
        <el-form-item label="需求岗位">
          <el-input v-model="form.name" placeholder="请输入岗位名称"></el-input>
        </el-form-item>
        <el-form-item label="岗位要求">
          <el-input v-model="form.name" placeholder="请输入岗位要求" type="textarea" :autosize="{ minRows: 8 }"></el-input>
        </el-form-item>
        <el-form-item label="福利待遇">
          <el-input v-model="form.name" placeholder="请输入岗位福利待遇" type="textarea" :autosize="{ minRows: 8 }"></el-input>
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