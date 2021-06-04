<template>
  <el-dialog width="1000px" center
    title="企业信息"
    :visible.sync="visible"
    :append-to-body="true">
    <div style="margin-left: 70px">
      <el-form inline :model="form" :rules="rules" label-width="155px" :disabled="status == '查看'">
        <el-form-item label="企业名称" prop="company_name">
          <el-input v-model="form.company_name" class="from-width-l3" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="统一社会信用代码" prop="credit_code">
          <el-input v-model="form.credit_code" maxlength="18" class="from-width-l3"
            placeholder="请输入18位统一社会信用代码"></el-input>
        </el-form-item>
        <el-form-item label="法定代表人" prop="business_entity">
          <el-input v-model="form.business_entity" class="from-width-l5" placeholder="请输入法定代表人姓名"></el-input>
        </el-form-item>
        <el-form-item prop="entity_phone">
          <el-input v-model="form.entity_phone" class="from-width-l5" placeholder="请输入法定代表人电话"></el-input>
        </el-form-item>
        <el-form-item label="人力资源负责人" prop="resource_name">
          <el-input v-model="form.resource_name" class="from-width-l5" placeholder="请输入人力资源负责人姓名"></el-input>
        </el-form-item>
        <el-form-item prop="resource_phone">
          <el-input v-model="form.resource_phone" class="from-width-l5" placeholder="请输入人力资源负责人电话"></el-input>
        </el-form-item>
        <el-form-item label="注册地址" prop="configs.register_address">
          <el-cascader class="from-width-l5"
            v-model="form.configs.register_address"
            placeholder="请选择"
            :options="formAddress"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.configs.register_address_desc" class="from-width-l4" placeholder="请输入详细地址"></el-input>
        </el-form-item>
        <el-form-item label="经营地址" prop="configs.work_address">
          <el-cascader class="from-width-l5"
            v-model="form.configs.work_address"
            placeholder="请选择"
            :options="formAddress"
            clearable></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.configs.work_address_desc" class="from-width-l4" placeholder="请输入详细地址"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footer">
      <el-button @click="saveUpdate()" type="primary">保 存</el-button>
      <el-button @click="visible = false" plain>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
const DFORM = {
  // company_name: "",
  // credit_code: "",
  // business_entity: "",
  // entity_phone: "",
  // resource_name: "",
  // resource_phone: "",
  // register_address: ['', '', '', '', ''],
  // work_address: ['', '', '', '', ''],
  company_name: "公司名称",
  credit_code: "11100011100001002",
  business_entity: "企业法人",
  entity_phone: "18810080001",
  resource_name: "人力资源负责人",
  resource_phone: "18810086002",
  register_address: ['', '', '', '', ''],
  work_address: ['', '', '', '', ''],
  configs: {
    register_address: ['', '', ''],
    register_address_desc: '',
    work_address: ['', '', ''],
    work_address_desc: ''
  }
}
import addressDefault from '@/common/country-level3-data.js'
export default {
  data() {
    return {
      status: '创建',
      visible: false,
      form: JSON.parse(JSON.stringify(DFORM)),
      formAddress: addressDefault,
      rules: {
        company_name: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        credit_code: [
          { required: true, message: '请输入企业统一社会信用代码', trigger: 'blur' }
        ],
        business_entity: [
          { required: true, message: '请输入法定代表人姓名', trigger: 'blur' }
        ],
        entity_phone: [
          { required: true, message: '请输入法定代表人电话', trigger: 'blur' }
        ],
        resource_name: [
          { required: true, message: '请输入人力资源负责人姓名', trigger: 'blur' }
        ],
        resource_phone: [
          { required: true, message: '请输入人力资源负责人电话', trigger: 'blur' }
        ],
        'configs.register_address': [
          { required: true, message: '请选择企业注册地址', trigger: 'blur' }
        ],
        'configs.work_address': [
          { required: true, message: '请选择企业经营地址', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 打开弹窗、处理信息
    show(item, status){
      this.status = status
      if(item && item.id){
        let tmpitem = JSON.parse(JSON.stringify(item))
        tmpitem.register_address = JSON.parse(tmpitem.register_address)
        tmpitem.work_address = JSON.parse(tmpitem.work_address)
        if(tmpitem.configs && tmpitem.configs.length > 10){
          tmpitem.configs = JSON.parse(tmpitem.configs)
        }else{
          tmpitem.configs = JSON.parse(JSON.stringify(DFORM.configs))
        }
        this.form = tmpitem
      }else{
        this.form = JSON.parse(JSON.stringify(DFORM))
      }
      this.visible = true
    },

    // 保存或修改
    async saveUpdate(){
      let tmpform = JSON.parse(JSON.stringify(this.form))
      if(tmpform.id) tmpform.company_id = tmpform.id
      delete tmpform.id
      tmpform.configs.register_address.map((e, index) => {
        if(e) tmpform.register_address[index] = e
      })
      tmpform.register_address[4] = tmpform.configs.register_address_desc
      tmpform.register_address = JSON.stringify(tmpform.register_address)
      tmpform.configs.work_address.map((e, index) => {
        if(e) tmpform.work_address[index] = e
      })
      tmpform.work_address[4] = tmpform.configs.work_address_desc
      tmpform.work_address = JSON.stringify(tmpform.work_address)
      let res = await this.$api.companySave(tmpform)
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