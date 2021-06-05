<template>
  <el-dialog width="1000px" center
    title="企业人力资源信息"
    :visible.sync="visible"
    :append-to-body="true">
    <div>
      <el-form ref="form" inline :model="form" :rules="rules" label-width="100px" :disabled="status == '查看'">
        <div><el-form-item label="公司名称：">{{company_name}}</el-form-item></div>
        <el-form-item label="姓名" prop="member_name">
          <el-input v-model="form.member_name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="card_number">
          <el-input v-model="form.card_number" maxlength="18" @blur="computedData"
            placeholder="请输入18位身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="form.sex" disabled></el-input>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input v-model="form.age" disabled></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="member_domicile">
          <el-input v-model="form.member_domicile" placeholder="请输入籍贯"></el-input>
        </el-form-item>
        
        <el-form-item label="入职时间" prop="start_time">
          <el-date-picker class="from-width-l1" v-model="form.start_time" type="date" value-format="yyyy-MM-dd"></el-date-picker>
        </el-form-item>
        <el-form-item label="职务(工种)" prop="member_position">
          <el-input v-model="form.member_position" class="from-width-l1" placeholder="请输入职务(工种)"></el-input>
        </el-form-item>
        <el-form-item label="特殊身份" prop="member_identity">
          <el-select v-model="form.member_identity" class="from-width-l1">
            <el-option v-for="item in $option.item12" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="现住址" prop="configs.member_address">
            <el-cascader style="width: 277px" v-model="form.configs.member_address" :options="formAddress" clearable></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.configs.member_address_desc" class="from-width-l4" placeholder="请输入详细地址"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="footer">
      <el-button @click="saveUpdate()" type="primary" v-if="status != '查看'">保 存</el-button>
      <el-button @click="visible = false" plain>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
const DFORM = {
  // member_name: "张三",
  // card_number: "110110198901012221",
  // sex: "男",
  // age: 0,
  // birthday: "19890101",
  // member_domicile: "北京",
  // member_address: ['', '', '', '', ''],
  // start_time: "2021-01-01",
  // member_position: "程序员",
  // member_identity: "无",
  member_name: "",
  card_number: "",
  sex: "",
  age: 0,
  birthday: "",
  member_domicile: "",
  member_address: ['', '', '', '', ''],
  start_time: "",
  member_position: "",
  member_identity: "",
  configs: {
    member_address: '',
    member_address_desc: ''
  }
}
import addressDefault from '@/common/country-level3-data.js'
export default {
  data() {
    return {
      status: '',
      visible: false,
      form: JSON.parse(JSON.stringify(DFORM)),
      formAddress: addressDefault,
      company_id: '',
      company_name: '',
      rules: {
        member_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        card_number: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { min: 18, message: '请输入18位的身份证号码', trigger: 'blur' }
        ],
        member_domicile: [
          { required: true, message: '请输入籍贯', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '请选择入职时间', trigger: 'blur' }
        ],
        member_position: [
          { required: true, message: '请选择职务', trigger: 'blur' }
        ],
        member_identity: [
          { required: true, message: '请选择特殊身份', trigger: 'blur' }
        ],
        'configs.member_address': [
          { required: true, message: '请选择现住址', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    
  },
  methods: {
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

    // 保存或修改
    async saveUpdate(){
      let validate = await this.$refs.form.validate()
      if(!validate) return
      let tmpform = JSON.parse(JSON.stringify(this.form))
      if(tmpform.id) tmpform.member_id = tmpform.id
      tmpform.birthday = tmpform.card_number.slice(6,14)
      tmpform.configs.member_address.map((e, index) => {
        if(e) tmpform.member_address[index] = e
      })
      tmpform.member_address[4] = tmpform.configs.member_address_desc
      tmpform.member_address = JSON.stringify(tmpform.member_address)
      console.log({...tmpform, company_id: this.company_id})
      let res = await this.$api.companyMemberSave({...tmpform, company_id: this.company_id})
      if(res.status != 0) return
      this.$emit('success')
      this.$message.success('保存成功')
      this.visible = false
    },

    computedData(){
      if(this.form.card_number.length != 18) return
      this.form.age = this.$root.computedAge(this.form.card_number)
      this.form.sex = this.$root.computedSex(this.form.card_number)
    }
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