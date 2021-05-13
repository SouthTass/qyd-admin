<template>
  <div class="person-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          当前位置：登记管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>信息登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <Pcensus ref="Pcensus"></Pcensus>
    <Pbasic></Pbasic>
    <Pjob></Pjob>
    <Psocial></Psocial>
    <Ptrain></Ptrain>
    <Psystem></Psystem>
    <div class="footer">
      <el-button @click="saveInfo()" type="primary">保 存</el-button>
    </div>
  </div>
</template>

<script>
import Pcensus from '@/components/person/Census'
import Pbasic from '@/components/person/Basic'
import Pjob from '@/components/person/Job'
import Ptrain from '@/components/person/Train'
import Psocial from '@/components/person/Social'
import Psystem from '@/components/person/System'
export default {
  name: "baseform",
  data() {
    return {
      
    };
  },
  methods: {
    async saveInfo(){
      let body = JSON.parse(JSON.stringify(this.$root.user))

      // 删除无用数据
      let keyArray = ['gender', 'domicileType','yesorno','work_status','work_none_desc']
      keyArray.forEach(e => delete body[e])
      for(let i = 1; i <= 18; i++){
        delete body[`item${i}`]
      }

      // 整理培训求职信息
      let job = []
      if(body.job.hunting == '是'){
        body.job.hunting_list.map(e => job.push({job_hunting: '是', ...e}))
      }
      if(body.job.skill == '是'){
        body.job.skill_list.map(e => job.push({job_hunting: '是', ...e}))
      }
      body.job = job

      // 整理基本信息中的出生日期
      body.census.birthday = body.census.birthday.replace(/-/g, '')

      // work_status就业状态为自主创业时，将work.accord中的信息保存在work_desc中
      if(body.work_status == '自主创业'){
        body.work_desc = JSON.stringify(body.work.accord)
      }

      // 计算劳动合同时间
      if(body.work.start_end_time.length >= 2){
        body.work.start_time = body.work.start_end_time[0]
        body.work.end_time = body.work.start_end_time[1]
      }
      delete body.work.start_end_time
      
      console.log(body)
      
      let res = await this.$api.censusCreate(body)
      if(res.status != 0) return
      if(res.data.status == 0) return this.$message.success('保存成功')
      this.$message.error(res.data.message)
    }
  },
  components: {
    Pcensus, Pbasic, Pjob, Ptrain, Psocial, Psystem
  }
};
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 12px;
}
.person-container{
  width: 1205px;
  margin: 0 auto;
}
.form{
  width: 1205px;
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
  margin-top: 40px;
}
</style>