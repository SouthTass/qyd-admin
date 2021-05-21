<template>
  <el-form ref="census" 
    :inline="true"
    :model="$root.user.domicile"
    :rules="rules" label-width="120px" class="form-container">
    <div class="form-item">
      <h3 class="form-item-title">{{out ? '房主信息' : '户主信息'}}</h3>
      <div class="container">
        <el-form-item label="身份证号" prop="identity_number">
          <el-input v-model="$root.user.domicile.identity_number" maxlength="18"
            placeholder="请输入18位身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="户主姓名" prop="domicile_name">
          <el-input v-model="$root.user.domicile.domicile_name" placeholder="请输入户主姓名"></el-input>
        </el-form-item>
        <el-form-item label="户主电话" prop="domicile_number" v-if="out">
          <el-input v-model="$root.user.domicile.domicile_number" maxlength="18" placeholder="请输入户主电话"></el-input>
        </el-form-item>
        <el-form-item label="户籍性质" prop="domicile_type" v-else>
          <el-select v-model="$root.user.domicile.domicile_type" placeholder="请选择户籍性质" class="from-width-l1">
            <el-option v-for="item in $option.domicileType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住址" prop="domicile_address">
          <el-input v-model="$root.user.domicile.domicile_address" class="from-width-l2"
            placeholder="请输入住址"></el-input>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  props: ['out'],
  data() {
    let checkDomicileNumber = (rule, value, callback) => {
      if(!this.out) callback()
      if(this.$root.user.domicile.domicile_number.length == 8 || this.$root.user.domicile.domicile_number.length == 11){
        callback()
      }else{
        callback(new Error('电话号码只能为8位或11位'))
      }
    }
    let checkDomiciletype = (rule, value, callback) => {
      if(this.out) callback()
      if(this.$root.user.domicile.domicile_type){
        callback()
      }else{
        callback(new Error('请选择户籍性质'))
      }
    }
    return {
      rules: {
        'identity_number': [
          { required: true, message: '请输入18位身份证号码', trigger: 'blur' },
          { min: 18, max: 18, message: '身份证号码不能少于18位', trigger: 'blur' }
        ],
        'domicile_name': [
          { required: true, message: '请输入户主姓名', trigger: 'blur' }
        ],
        'domicile_number': [
          { required: this.out ? true : false, message: '请输入户主电话', trigger: 'blur' },
          { validator: checkDomicileNumber, trigger: 'change' }
        ],
        'domicile_type': [
          { required: this.out ? false : true, message: '请选择户籍性质', trigger: 'blur' },
          { validator: checkDomiciletype, trigger: 'change' }
        ],
        'domicile_address': [
          { required: true, message: '请输入户籍住址', trigger: 'blur' }
        ]
      }
    };
  }
};
</script> 

<style lang="scss" scoped>
.container{
  padding-bottom: 12px;
}
</style>