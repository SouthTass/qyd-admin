<template>
  <el-dialog title="个人信息" :visible.sync="visiable" width="830px" center>
    <!-- 户籍信息 -->
    <div class="dialog" v-if="info.domicile_res">
      <h3 class="dialog-title">户籍信息</h3>
      <table class="dialog-table" border="1">
        <tr>
          <td class="table-label">身份证号</td>
          <td class="table-text">{{info.domicile_res.identity_number}}</td>
          <td class="table-label">户主姓名</td>
          <td class="table-text">{{info.domicile_res.domicile_name}}</td>
          <td class="table-label">户籍性质</td>
          <td class="table-text">{{info.domicile_res.domicile_type}}</td>
        </tr>
        <tr>
          <td>住址</td><td colspan="5">{{info.domicile_res.domicile_address}}</td>
        </tr>
      </table>
    </div>

    <!-- 基本信息 -->
    <div class="dialog" v-if="info.census_res">
      <h3 class="dialog-title">基本信息</h3>
      <table class="dialog-table" border="1">
        <tr>
          <td>与户主关系</td><td colspan="5">{{info.census_res.rapport}}</td>
        </tr>
        <tr>
          <td class="table-label">身份证号</td>
          <td class="table-text">{{info.census_res.card_number}}</td>
          <td class="table-label">姓名</td>
          <td class="table-text">{{info.census_res.census_name}}</td>
          <td class="table-label">性别</td>
          <td class="table-text">{{info.census_res.sex}}</td>
        </tr>
        <tr>
          <td class="table-label">出生日期</td>
          <td class="table-text">{{computedDate()}}</td>
          <td class="table-label">年龄</td>
          <td class="table-text">{{computedAge()}}</td>
          <td class="table-label">户籍性质</td>
          <td class="table-text">{{info.census_res.census_domicile_type}}</td>
        </tr>
        <tr>
          <td class="table-label">是否就业登记</td>
          <td class="table-text">{{info.census_res.work_register}}</td>
          <td class="table-label">电话</td>
          <td class="table-text">{{info.census_res.phone_number}}</td>
          <td class="table-label">特殊身份</td>
          <td class="table-text">{{info.census_res.census_identity}}</td>
        </tr>
        <tr>
          <td class="table-label">学历</td>
          <td class="table-text">{{info.census_res.education}}</td>
          <td class="table-label">专业</td>
          <td class="table-text" colspan="3">{{info.census_res.profession}}</td>
        </tr>
        <tr>
          <td class="table-label">民族</td>
          <td class="table-text">{{info.census_res.nation}}</td>
          <td class="table-label">政治面貌</td>
          <td class="table-text">{{info.census_res.political_status}}</td>
          <td class="table-label">婚姻状况</td>
          <td class="table-text">{{info.census_res.marriage_status}}</td>
        </tr>
        <tr>
          <td class="table-label">健康状况</td>
          <td class="table-text">{{info.census_res.health_status}}</td>
          <td class="table-label">残疾等级</td>
          <td class="table-text">{{info.census_res.handicap_level}}</td>
          <td class="table-label">是否低保</td>
          <td class="table-text">{{info.census_res.allowance_status}}</td>
        </tr>
        <tr>
          <td class="table-label">户口地址</td>
          <td class="table-text" colspan="5">
            {{info.census_res.domicile_city}}
            {{info.census_res.domicile_area}}
            {{info.census_res.domicile_town}}
            {{info.census_res.domicile_village}}
          </td>
        </tr>
        <tr>
          <td class="table-label">居住地址</td>
          <td class="table-text" colspan="5">
            {{info.census_res.census_city}}
            {{info.census_res.census_area}}
            {{info.census_res.census_town}}
            {{info.census_res.census_village}}
            {{info.census_res.house_number}}
          </td>
        </tr>
      </table>
    </div>

    <!-- 社会保险信息 -->
    <div class="dialog" v-if="info.social_res">
      <h3 class="dialog-title">社会保险信息</h3>
      <table class="dialog-table" border="1">
        <tr>
          <td class="table-label">人员身份</td>
          <td class="table-text">{{info.social_res.identity_type}}</td>
          <td class="table-label">社保信息1</td>
          <td class="table-text">{{info.social_res.social_one}}</td>
          <td class="table-label">社保信息2</td>
          <td class="table-text">{{info.social_res.social_two}}</td>
        </tr>
        <tr v-if="info.social_res.is_rest == '是'">
          <td class="table-label">是否退休</td>
          <td class="table-text">是</td>
          <td class="table-label">说明</td>
          <td class="table-text" colspan="3">{{item.social_desc}}</td>
        </tr>
        <tr v-else>
          <td>是否退休</td><td colspan="5">否</td>
        </tr>
      </table>
    </div>

    <!-- 就业信息 -->
    <div class="dialog" v-if="info.work_res">
      <h3 class="dialog-title">就业信息</h3>
      <table class="dialog-table" border="1">
        <tr>
          <td class="table-label">就业状态</td>
          <td class="table-text" colspan="5" style="width: 700px">{{info.work_res.work_status}}</td>
        </tr>
        <tr v-if="info.work_res.work_status == '无就业需求'">
          <td class="table-label">说明</td>
          <td class="table-text" style="width: 700px">{{info.work_res.work_desc}}</td>
        </tr>
        <template v-if="info.work_res.work_status == '单位就业'">
          <tr>
            <td class="table-label">职业工种</td>
            <td class="table-text">{{info.work_res.work_type}}</td>
            <td class="table-label">用工形式</td>
            <td class="table-text">{{info.work_res.work_shape}}</td>
            <td class="table-label">单位性质</td>
            <td class="table-text">{{info.work_res.company_type}}</td>
          </tr>
          <tr>
            <td class="table-label">单位产业</td>
            <td class="table-text">{{info.work_res.company_industry}}</td>
            <td class="table-label">劳动合同时间</td>
            <td class="table-text" colspan="3">{{info.work_res.start_time}} - {{info.work_res.end_time}}</td>
          </tr>
          <tr>
            <td class="table-label">单位联系人</td>
            <td class="table-text">{{info.work_res.contact_person}}</td>
            <td class="table-label">单位电话</td>
            <td class="table-text">{{info.work_res.company_number}}</td>
            <td class="table-label">公益性就业</td>
            <td class="table-text">{{info.work_res.is_charitable}}</td>
          </tr>
          <tr>
            <td>就业单位全称</td><td colspan="5">{{info.work_res.company_name}}</td>
          </tr>
          <tr>
            <td>就业单位地址</td><td colspan="5">{{info.work_res.company_address}}</td>
          </tr>
        </template>
        <template v-if="info.work_res.work_status == '灵活就业'">
          <tr>
            <td class="table-label">工作地点</td>
            <td class="table-text" style="width: 700px">{{info.work_res.company_address}}</td>
          </tr>
          <tr>
            <td class="table-label">工作内容</td>
            <td class="table-text" style="width: 700px">{{info.work_res.work_desc}}</td>
          </tr>
        </template>
        <template v-if="info.work_res.work_status == '自主创业'">
          <tr>
            <td class="table-label">创业项目名称</td>
            <td class="table-text"  colspan="5">{{info.work_res.accord.name}}</td>
          </tr>
          <tr>
            <td class="table-label">创业项目地址</td>
            <td class="table-text"  colspan="5">{{info.work_res.accord.address}}{{info.work_res.accord.address_desc}}</td>
          </tr>
          <tr>
            <td class="table-label">创业项目性质</td>
            <td class="table-text">{{info.work_res.accord.type}}</td>
            <td class="table-label">带动就业人数</td>
            <td class="table-text"  colspan="3">{{info.work_res.accord.number}}</td>
          </tr>
          <tr>
            <td class="table-label">创业项目内容</td>
            <td class="table-text"  colspan="5">{{info.work_res.work_desc}}</td>
          </tr>
        </template>
      </table>
    </div>

    <!-- 培训求职信息 -->
    <div class="dialog" v-if="info.job">
      <h3 class="dialog-title">培训信息</h3>
      <table class="dialog-table" border="1">
        <tr><td colspan="6" style="text-align: center">求职信息</td></tr>
        <template v-for="(item, index) in info.job.hunting_list">
          <tr :key="`q${index}`">
            <td class="table-label">求职岗位</td>
            <td class="table-text">{{item.job_position}}</td>
            <td class="table-label">薪资要求</td>
            <td class="table-text">{{item.job_salary}}</td>
            <td class="table-label">就业区域</td>
            <td class="table-text">{{item.job_area}}</td>
          </tr>
        </template>
        <tr><td colspan="6" style="text-align: center">培训信息</td></tr>
        <template v-for="(item, index) in info.job.skill_list">
          <tr :key="`p${index}`">
            <td class="table-label">技能名称</td>
            <td class="table-text">{{item.skill_name}}</td>
            <td class="table-label">技能等级</td>
            <td class="table-text" colspan="3">{{item.skill_level}}</td>
          </tr>
        </template>
      </table>
    </div>

    <!-- 系统信息 -->
    <div class="dialog" v-if="info.record_res">
      <h3 class="dialog-title">系统信息</h3>
      <table class="dialog-table" border="1">
        <tr>
          <td class="table-label">转移就业证号</td>
          <td class="table-text">{{info.record_res.employment_number}}</td>
          <td class="table-label">系统状态</td>
          <td class="table-text">{{info.record_res.employment_status}}</td>
          <td class="table-label">查询时间</td>
          <td class="table-text">{{info.record_res.employment_time}}</td>
        </tr>
        <tr>
          <td class="table-label" style="width: 120px">就失业等级证号</td>
          <td class="table-text">{{info.record_res.unemployment_number}}</td>
          <td class="table-label">系统状态</td>
          <td class="table-text">{{info.record_res.unemployment_status}}</td>
          <td class="table-label">查询时间</td>
          <td class="table-text">{{info.record_res.unemployment_time}}</td>
        </tr>
      </table>
    </div>

    <!-- 按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button @click="visiable = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visiable: false,
      info: {},
      user: {
        text: '',
        desc: ''
      }
    };
  },
  methods: {
    // 打开弹窗
    show(item){
      // item.accord = {
      //   name: "",
      //   address: "",
      //   address_desc: "",
      //   desc: "",
      //   type: "",
      //   number: ""
      // }
      // let config = {}
      // if(item.work_status == '自主创业' && item.work_configs){
      //   config = JSON.parse(item.work_configs)
      //   Object.assign(item.accord, config)
      // }
      this.censusGet(item)
    },

    // 查询个人信息
    async censusGet(item){
      let res = await this.$api.censusGet(item.id)
      if(res.status != 0) return

      // 将培训信息分类整理
      let job = {
        hunting: "是",
        hunting_list: [],
        skill: '是',
        skill_list: []
      }
      res.data.job_res.map((e) => {
        if(e.job_hunting == '是'){
          job.hunting_list.push(e)
        }else{
          job.skill_list.push(e)
        }
      })
      res.data.job = job

      // 如果为自由创业，则格式化数据
      res.data.work_res.accord = {
        name: "",
        address: "",
        address_desc: "",
        desc: "",
        type: "",
        number: ""
      }
      let config = {}
      if(res.data.work_res.work_status && res.data.work_res.work_configs.length > 10){
        config = JSON.parse(res.data.work_res.work_configs)
        Object.assign(res.data.work_res.accord, config)
      }

      this.info = res.data
      this.visiable = true
    },

    // 格式化出生日期
    computedDate(){
      let str = this.info.census_res.birthday + ''
      return `${str.slice(0, 4)}-${str.slice(4, 6)}-${str.slice(6, 8)}`
    },

    // 计算年龄
    computedAge(){
      return this.$dayjs().format('YYYY') - ('' + this.info.census_res.birthday).slice(0, 4)
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container{
  width: 750px
}
.dialog-table{
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15);
  td{
    padding: 5px;
  }
}
.table-label{
  width: 100px
}
.table-text{
  width: 160px;
}
.dialog{
  margin-bottom: 30px;
  .dialog-title{
    text-align: center;
    margin-bottom: 15px;
  }
}
</style>
