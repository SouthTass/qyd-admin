<template>
  <el-dialog width="800px" center
    title="员工培训需求"
    :visible.sync="visible"
    :append-to-body="true">
    <div style="padding: 0 60px">
      <el-form ref="form" :model="form" :rules="rules" label-width="90px" :disabled="status == '查看'">
        <div><el-form-item label="公司名称：">{{company_name}}</el-form-item></div>
        <el-form-item label="培训岗位" prop="recruit_position">
          <el-input v-model="form.recruit_position" placeholder="请输入培训岗位名称" class="from-width-l1"></el-input>
        </el-form-item>
        <el-form-item label="培训等级" prop="recruit_level">
          <el-select v-model="form.recruit_level" class="from-width-l1">
            <el-option v-for="item in $option.item9" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="培训人数" prop="recruit_number">
          <el-input type="number" v-model="form.recruit_number" placeholder="请输入培训人数" class="from-width-l1"></el-input>
        </el-form-item>
        <el-form-item label="培训内容" prop="recruit_desc">
          <el-input v-model="form.recruit_desc" placeholder="请输入培训内容" type="textarea" :autosize="{ minRows: 8 }"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button @click="companyRecruitSave()" type="primary">保 存</el-button>
      <el-button @click="visible = false" plain>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
const DFORM = {
  type: 1,
  recruit_position: "",
  recruit_desc: "",
  recruit_level: "",
  recruit_number: ""
}
import addressDefault from '@/common/country-level3-data.js'
export default {
  data() {
    return {
      status: '',
      visible: false,
      company_id: '',
      company_name: '',
      form: JSON.parse(JSON.stringify(DFORM)),
      formAddress: addressDefault,
      rules: {
        recruit_position: [
          { required: true, message: '请输入培训岗位名称', trigger: 'blur' }
        ],
        recruit_level: [
          { required: true, message: '请选择培训等级', trigger: 'blur' }
        ],
        recruit_number: [
          { required: true, message: '请输入培训人数', trigger: 'blur' }
        ],
        recruit_desc: [
          { required: true, message: '请输入培训内容', trigger: 'blur' }
        ],
      }
    };
  },
  created() {
    
  },
  methods: {
    // 打开弹窗
    show(item, cid, cname, status){
      this.status = status
      if(item && item.id){
        let tmpitem = JSON.parse(JSON.stringify(item))
        tmpitem.configs = JSON.parse(tmpitem.configs)
        this.form = tmpitem
      }else{
        this.form = JSON.parse(JSON.stringify(DFORM))
      }
      if(cid){
        this.company_id = cid
        this.company_name = cname
      }else{
        this.$message.error('请先选择企业')
      }
      this.visible = true
      this.$refs.form.resetFields()
    },
    
    // 保存/修改
    async companyRecruitSave(){
      let validate = await this.$refs.form.validate()
      if(!validate) return
      if(this.form.id) this.form.recruit_id = this.form.id
      if(!this.form.company_id) this.form.company_id = this.company_id
      let res = await this.$api.companyRecruitSave(this.form)
      if(res.status != 0) return
      this.$emit('success')
      this.$message.success('保存成功')
      this.visible = false
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