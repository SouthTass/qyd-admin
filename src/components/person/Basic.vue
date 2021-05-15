<template>
  <el-form ref="pBasic" 
    :inline="true"
    :model="$root.user.census"
    :rules="rules" label-width="120px" class="form-container">
    <div class="form-item">
      <h3 class="form-item-title">基本信息</h3>
      <div class="container">
        <div>
          <el-form-item label="户主关系" prop="rapport">
            <el-select v-model="$root.user.census.rapport" class="from-width-l1">
              <el-option v-for="item in $option.item11" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="身份证号" prop="card_number">
            <el-input v-model="$root.user.census.card_number" maxlength="18" @blur="computedIdentity"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="census_name">
            <el-input v-model="$root.user.census.census_name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="$root.user.census.sex" class="from-width-l1" :disabled="true">
              <el-option v-for="item in $option.gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="出生日期" prop="birthday">
            <el-date-picker class="from-width-l1" v-model="$root.user.census.birthday" :disabled="true"></el-date-picker>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="$root.user.census.age" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="户籍性质" prop="census_domicile_type">
            <el-select v-model="$root.user.census.census_domicile_type"  class="from-width-l1">
              <el-option v-for="item in $option.item10" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="是否就业登记" prop="work_register">
            <el-select v-model="$root.user.census.work_register"  class="from-width-l1">
              <el-option v-for="item in $option.yesorno" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop="phone_number">
            <el-input v-model="$root.user.census.phone_number"></el-input>
          </el-form-item>
          <el-form-item label="特殊身份" prop="census_identity">
            <el-select v-model="$root.user.census.census_identity"  class="from-width-l1">
              <el-option v-for="item in $option.item12" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="学历" prop="education">
            <el-select v-model="$root.user.census.education"  class="from-width-l1">
              <el-option v-for="item in $option.item13" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业" prop="profession">
            <el-input v-model="$root.user.census.profession"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="民族" prop="nation">
            <el-select v-model="$root.user.census.nation"  class="from-width-l1">
              <el-option v-for="item in $option.item14" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political_status">
            <el-select v-model="$root.user.census.political_status"  class="from-width-l1">
              <el-option v-for="item in $option.item15" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况" prop="marriage_status">
            <el-select v-model="$root.user.census.marriage_status"  class="from-width-l1">
              <el-option v-for="item in $option.item16" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="健康状况" prop="health_status">
            <el-select v-model="$root.user.census.health_status"  class="from-width-l1">
              <el-option v-for="item in $option.item17" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="残疾等级" prop="handicap_level">
            <el-select v-model="$root.user.census.handicap_level"  class="from-width-l1">
              <el-option v-for="item in $option.item18" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否低保" prop="allowance_status">
            <el-select v-model="$root.user.census.allowance_status"  class="from-width-l1">
              <el-option v-for="item in $option.yesorno" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="户口地址" prop="domicile_address">
            <el-cascader class="from-width-l3"
              filterable
              v-model="$root.user.census.domicile_address"
              :options="$DefaultArea"
              :props="props"
              @change="computedDomicileAddress"></el-cascader>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="居住地址" prop="census_address">
            <el-cascader class="from-width-l3"
              filterable
              v-model="$root.user.census.census_address"
              :options="$DefaultArea"
              :props="props"
              @change="computedCensusAddress"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="$root.user.census.house_number" placeholder="请输入门牌号"
              style="margin-left: 120px" class="from-width-l3"></el-input>
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
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
    let checkDomicileAddress = (rule, value, callback) => {

    };
    return {
      props: {
        value: 'name',
        label: 'name',
        children: 'list',
      },
      rules: {
        'rapport': [
          { required: true, message: '请选择户主关系', trigger: 'blur' }
        ],
        'card_number': [
          { required: true, message: '请输入18位身份证号码', trigger: 'blur' },
          { min: 18, max: 18, message: '身份证号码不能少于18位', trigger: 'blur' }
        ],
        'census_name': [
          { required: true, message: '请输入户主姓名', trigger: 'blur' }
        ],
        "birthday": [
          { required: true, message: '请选择出生年月日', trigger: 'blur' }
        ],
        'census_domicile_type': [
          { required: true, message: '请选择户籍性质', trigger: 'blur' }
        ],
        'work_register': [
          { required: true, message: '请选择是否登记了就业状况', trigger: 'blur' }
        ],
        'phone_number': [
          { required: true, message: '请填写电话号码', trigger: 'blur' },
          { validator: checkPhoneNumber, trigger: 'blur' }
        ],
        'education': [
          { required: true, message: '请选择学历', trigger: 'blur' }
        ],
        'profession': [
          { required: true, message: '请输入专业信息', trigger: 'blur' }
        ],
        'nation': [
          { required: true, message: '请选择民族', trigger: 'blur' }
        ],
        'political_status': [
          { required: true, message: '请选择政治面貌', trigger: 'blur' }
        ],
        'marriage_status': [
          { required: true, message: '请选择婚姻状况', trigger: 'blur' }
        ],
        'health_status': [
          { required: true, message: '请选择健康等级', trigger: 'blur' }
        ],
        'handicap_level': [
          { required: true, message: '请选择残疾等级', trigger: 'blur' }
        ],
        'allowance_status': [
          { required: true, message: '请选择是否为低保户', trigger: 'blur' }
        ],
        'domicile_address': [
          { required: true, message: '请选择户口地址', trigger: 'blur' },
          { validator: checkDomicileAddress, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    // 处理户口地址
    computedDomicileAddress(item){
      this.$root.user.census.domicile_city = item[0]
      this.$root.user.census.domicile_area = item[1]
      this.$root.user.census.domicile_town = item[2]
      this.$root.user.census.domicile_village = item[3]
    },

    // 处理居住地址
    computedCensusAddress(item){
      this.$root.user.census.census_city = item[0]
      this.$root.user.census.census_area = item[1]
      this.$root.user.census.census_town = item[2]
      this.$root.user.census.census_village = item[3]
    },

    // 输入身份证号码之后，计算性别、出生日期、年龄
    computedIdentity(){
      if(this.$root.user.census.card_number.length < 18) return
      let str = this.$root.user.census.card_number
      this.$root.user.census.sex = str.slice(16, 17) % 2 ? '男' : '女' 
      this.$root.user.census.birthday = `${str.slice(6,10)}-${str.slice(10,12)}-${str.slice(12,14)}`
      this.$root.user.census.age = this.$dayjs().format('YYYY') - str.slice(6,10)
    }
  },
};
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 12px;
}
.form{
  width: 1000px;
  .form-item{
    padding-top: 15px;
    margin-bottom: 15px;
    .form-item-title{
      font-size: 18px;
      padding-bottom: 15px;
    }
    .form-item-hzgx{
      ::v-deep .el-form-item__content{
        width: 177px;
      }
    }
  }
}
</style>