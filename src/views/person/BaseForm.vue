<template>
  <el-dialog width="1095px" class="baseform-dialog"
    :visible.sync="visible"
    :append-to-body="true">
    <div class="person-container">
      <Pcensus ref="Pcensus" :out="out"></Pcensus>
      <Pbasic></Pbasic>
      <Pjob></Pjob>
      <Psocial></Psocial>
      <Ptrain></Ptrain>
      <Psystem v-if="!out"></Psystem>
    </div>
    <div class="footer">
      <el-button @click="saveInfo()" type="primary">保 存</el-button>
      <el-button @click="close()" plain>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Pcensus from '@/components/person/Census'
import Pbasic from '@/components/person/Basic'
import Pjob from '@/components/person/Job'
import Ptrain from '@/components/person/Train'
import Psocial from '@/components/person/Social'
import Psystem from '@/components/person/System'
import Approve from '@/common/approve'
export default {
  name: "baseform",
  data() {
    return {
      visible: false,
      out: false
    };
  },
  created() {
    this.categoryList()
  },
  methods: {
    // 保存信息
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
      if(body.work.work_status == '自主创业'){
        body.work.work_configs = body.work.accord
      }

      // 计算劳动合同时间
      if(body.work.start_end_time.length >= 2){
        body.work.start_time = body.work.start_end_time[0]
        body.work.end_time = body.work.start_end_time[1]
      }
      delete body.work.start_end_time
      
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
    show(out){
      if(out) this.out = true
      this.visible = true
      // Object.assign(this.$root.user, Approve)
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