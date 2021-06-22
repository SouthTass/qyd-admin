<template>
  <el-dialog width="1095px" class="baseform-dialog"
    :visible.sync="visible"
    :append-to-body="true">
    <div class="person-container">
      <Pcensus ref="Pcensus"></Pcensus>
      <Pbasic></Pbasic>
      <Pjob></Pjob>
      <Psocial></Psocial>
      <Ptrain></Ptrain>
      <Psystem v-if="$root.user.census.work_register == '是'" ref="Psystem"></Psystem>
    </div>
    <div class="footer">
      <el-button @click="saveInfo()" type="primary">保 存</el-button>
      <el-button @click="close()" plain>关 闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Pcensus from '@/components/personout/Census'
import Pbasic from '@/components/personout/Basic'
import Pjob from '@/components/personout/Job'
import Ptrain from '@/components/personout/Train'
import Psocial from '@/components/personout/Social'
import Psystem from '@/components/personout/System'
import baseConfig from '@/common/config'
export default {
  name: "baseform",
  data() {
    return {
      visible: false,
      out: false,
      type: ''
    };
  },
  created() {
    this.categoryList()
  },
  methods: {
    // 保存信息
    async saveInfo(){
      // 校验户主、房主信息
      let census = await this.$refs['Pcensus'].$refs['census'].validate()
      if(!census) return

      // 校验系统信息
      let system = await this.$refs['Psystem'].$refs['system'].validate()
      if(!system) {
        return
      }else{
        console.log('成功')
      }
    

      let body = JSON.parse(JSON.stringify(this.$root.user))

      // 删除无用数据
      // let keyArray = ['gender', 'domicileType','yesorno','work_status','work_none_desc']
      // keyArray.forEach(e => delete body[e])
      // for(let i = 1; i <= 18; i++){
      //   delete body[`item${i}`]
      // }

      // 整理培训求职信息
      let job = []
      if(body.job.hunting == '是'){
        body.job.hunting_list.map(e => job.push({
          job_hunting: "是",
          job_position: e.job_position,
          job_salary: e.job_salary,
          job_area: e.job_area,
          is_skill: "否",
          skill_name: "",
          skill_level: ""
        }))
      }
      if(body.job.skill == '是'){
        body.job.skill_list.map(e => job.push({
          job_hunting: "否",
          job_position: "",
          job_salary: "",
          job_area: "",
          is_skill: "是",
          skill_name: e.skill_name,
          skill_level: e.skill_level
        }))
      }
      body.job = job

      // 整理基本信息中的出生日期
      body.census.birthday = body.census.birthday.replace(/-/g, '')

      // work_status就业状态为自主创业时，将work.accord中的信息保存在work_desc中
      body.work.work_configs = body.work.accord

      // 计算劳动合同时间
      if(body.work.work_status == '单位就业' && body.work.start_end_time.length >= 2){
        body.work.start_time = body.work.start_end_time[0]
        body.work.end_time = body.work.start_end_time[1]
      }
      delete body.work.start_end_time

      if(this.type == 'change') return this.censusUpdate(body)
      
      let res = await this.$api.censusCreate(body)
      if(res.status != 0) return this.$message.error('系统错误，请稍后再试')
      if(res.data.hasOwnProperty('status')){
        this.$message.error(res.data.message)
      }else{
        this.$message.success('录入成功')
        this.$emit('success')
        this.visible = false
      }
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

    // 获取分类列表
    async categoryList(){
      let str = '与户主关系,特殊身份,学历,民族,政治面貌,婚姻状况,健康状况,残疾等级,就业状态,人员身份,社保信息,薪酬要求,就业区域,技能等级,注销原因'
      let index = ['item11', 'item12', 'item13', 'item14', 'item15', 'item16', 'item17', 'item18', 'work_status',
        'item4', 'item5', 'item7', 'item8', 'item9', 'item20']
      let res = await this.$api.categoryList(str)
      if(res.status != 0) return
      res.data.map((e, sh) => {
        let arr = []
        e.list.map(item => arr.push(item.name))
        this.$root.user[`${index[sh]}`] = arr
      })
    },

    // 打开弹窗
    show(type, item){
      console.log('type', type)
      this.type = type
      if(type == 'out') this.out = true
      if(type == 'change') {
        return this.censusGet(item.id)
      }else{
        this.$root.user = JSON.parse(JSON.stringify(baseConfig))
      }
      this.visible = true
    },

    // 查询个人信息
    async censusGet(id){
      let res = await this.$api.censusGet(id)
      if(res.status != 0) return
      this.$root.user.domicile = res.data.domicile_res

      // 处理年龄，性别，出生日期，户籍地址，居住地址
      res.data.census_res.age = this.$root.computedAge(res.data.census_res.card_number)
      res.data.census_res.sex = this.$root.computedSex(res.data.census_res.card_number)
      res.data.census_res.birthday = this.$root.computedBirthday(res.data.census_res.card_number)
      res.data.census_res.domicile_address = []
      if(res.data.census_res.domicile_city) res.data.census_res.domicile_address.push(res.data.census_res.domicile_city)
      if(res.data.census_res.domicile_area) res.data.census_res.domicile_address.push(res.data.census_res.domicile_area)
      if(res.data.census_res.domicile_town) res.data.census_res.domicile_address.push(res.data.census_res.domicile_town)
      if(res.data.census_res.domicile_village) res.data.census_res.domicile_address.push(res.data.census_res.domicile_village)
      res.data.census_res.census_address = []
      if(res.data.census_res.census_city) res.data.census_res.census_address.push(res.data.census_res.census_city)
      if(res.data.census_res.census_area) res.data.census_res.census_address.push(res.data.census_res.census_area)
      if(res.data.census_res.census_town) res.data.census_res.census_address.push(res.data.census_res.census_town)
      if(res.data.census_res.census_village) res.data.census_res.census_address.push(res.data.census_res.census_village)
      this.$root.user.census = res.data.census_res

      // 处理就业信息
      if(res.data.work_res.work_configs && res.data.work_res.work_configs.length > 20){
        res.data.work_res.accord = JSON.parse(res.data.work_res.work_configs)
      }else{
        res.data.work_res.accord = {
          name: "",
          address: "",
          address_desc: "",
          address_array: [],
          desc: "",
          type: "",
          number: ""
        }
      }
      res.data.work_res.start_end_time = [res.data.work_res.start_time || '', res.data.work_res.end_time || '']
      this.$root.user.work = res.data.work_res

      // 处理社会保险信息
      this.$root.user.social = res.data.social_res

      // 处理培训求职信息
      this.$root.user.job.hunting_list = []
      this.$root.user.job.skill_list = []
      res.data.job_res.map((e) => {
        if(e.job_hunting == '是'){
          this.$root.user.job.hunting_list.push(e)
        }else{
          this.$root.user.job.skill_list.push(e)
        }
      })

      // 处理系统信息
      this.$root.user.record = res.data.record_res
      
      this.visible = true
    },

    // 关闭弹窗
    close(){
      this.visible = false
    }
  },
  components: {
    Pcensus, Pbasic, Pjob, Ptrain, Psocial, Psystem
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