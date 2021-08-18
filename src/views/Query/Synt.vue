<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：综合查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-form ref="census" :inline="true" label-width="125px" class="form-container">
        <!-- 性别 -->
        <el-form-item label="性别">
          <el-select v-model="query.sex" class="from-width-l1" placeholder="请选择性别">
            <el-option v-for="item in $option.gender" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 户籍性质 -->
        <el-form-item label="户籍性质">
          <el-select v-model="query.census_domicile_type" class="from-width-l1" placeholder="请选择户籍性质">
            <el-option v-for="item in $option.domicileType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item label="年龄">
          <el-input-number v-model="query.age" :min="1" :max="1000" class="from-width-l1"
            placeholder="请输入年龄"></el-input-number>
        </el-form-item>
        <!-- 健康状况 -->
        <el-form-item label="健康状况">
          <el-select v-model="query.health_status" class="from-width-l1" placeholder="请选择健康状况">
            <el-option v-for="item in $option.item17" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否低保 -->
        <el-form-item label="是否低保">
          <el-select v-model="query.allowance_status" class="from-width-l1" placeholder="请选择是否为低保">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 特殊身份 -->
        <el-form-item label="特殊身份">
          <el-select v-model="query.census_identity" class="from-width-l1" placeholder="请选择特殊身份">
            <el-option v-for="item in $option.item12" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 户口地址 -->
        <el-form-item label="户口地址" style="display: block">
          <el-cascader class="from-width-l8" v-model="domicileAddress" placeholder="请选择户口地址"
            :options="$DefaultArea" :props="addressProps" clearable></el-cascader>
        </el-form-item>
        <!-- 居住地址 -->
        <el-form-item label="居住地址" style="display: block">
          <el-cascader class="from-width-l8" v-model="censusAddress" placeholder="请选择居住地址"
            :options="$DefaultArea" :props="addressProps" clearable></el-cascader>
        </el-form-item>
        <!-- 单位地址 -->
        <div>
          <el-form-item label="单位地址">
            <el-cascader class="from-width-l8" v-model="companyAddress" placeholder="请选择单位地址"
              :options="$DefaultArea" :props="addressProps" clearable></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="companyAddressDesc" placeholder="请输入具体地址" style="width: 488px!important"
              class="from-width-l3 from-width-l7"></el-input>
          </el-form-item>
        </div>
        <!-- 现就业状态 -->
        <el-form-item label="现就业状态">
          <el-select v-model="query.work_status" class="from-width-l1" placeholder="请选择现就业状态">
            <el-option v-for="item in $option.work_status" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 单位性质 -->
        <el-form-item label="单位性质">
          <el-select v-model="query.company_type" class="from-width-l1" placeholder="请选择单位性质">
            <el-option v-for="item in $option.item2" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 单位产业 -->
        <el-form-item label="单位产业">
          <el-select v-model="query.company_industry" class="from-width-l1" placeholder="请选择单位产业">
            <el-option v-for="item in $option.item3" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 劳动合同开始时间 -->
        <el-form-item label="劳动合同开始时间">
          <el-date-picker class="from-width-l1" v-model="query.start_time" type="date"
            placeholder="请选择劳动合同开始时间"></el-date-picker>
        </el-form-item>
        <!-- 是否公益性就业 -->
        <el-form-item label="是否公益性就业">
          <el-select v-model="query.is_charitable" class="from-width-l1" placeholder="请选择是否为公益性就业">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否求职 -->
        <el-form-item label="是否求职">
          <el-select v-model="query.job_qz" class="from-width-l1" placeholder="请选择是否求职">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 求职岗位 -->
        <el-form-item label="求职岗位">
          <el-input v-model="query.job_position" class="from-width-l1" placeholder="请输入求职岗位"></el-input>
        </el-form-item>
        <!-- 薪酬要求 -->
        <el-form-item label="薪酬要求">
          <el-select v-model="query.job_salary" class="from-width-l1" placeholder="请选择薪酬要求">
            <el-option v-for="item in $option.item7" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否培训 -->
        <el-form-item label="是否培训">
          <el-select v-model="query.job_px" class="from-width-l1" placeholder="请选择是否培训">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 技能等级 -->
        <el-form-item label="技能等级">
          <el-select v-model="query.skill_level" class="from-width-l1" placeholder="请选择技能等级">
            <el-option v-for="item in $option.item9" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 查询纬度 -->
        <el-form-item label="查询纬度">
          <el-select v-model="query.field_by" class="from-width-l1" placeholder="请选择查询纬度">
            <el-option v-for="item in $option.item23" :key="item.name" 
              :label="item.name" :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" style="width: 100px; margin-left: 125px" @click="getData">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 图表 -->
      <div class="echarts-container" v-if="showEcharts">
        <div class="charts chart-pie">
          <div id="chart-pie" class="chart-bar-canvas"></div>
        </div>
        <div class="charts chart-bar">
          <div id="chart-bar" class="chart-bar-canvas"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: {
        sex: '',
        census_domicile_type: '',
        age: '',
        health_status: '',
        allowance_status: '',
        census_identity: '',
        domicile_address: ['', '', '', ''],
        census_address: ['', '', '', '', ''],
        company_address: ['', '', '', '', ''],
        work_status: '',
        company_type: '',
        company_industry: '',
        start_time: '',
        is_charitable: '',
        job_qz: '',
        job_position: '',
        job_salary: '',
        job_px: '',
        skill_level: '',
        field_by: '健康状况'
      },
      domicileAddress: [],
      censusAddress: [],
      companyAddress: [],
      companyAddressDesc: '',
      showEcharts: false,
      addressProps: { value: 'name', label: 'name', children: 'list' }
    };
  },
  methods: {
    async getData(){
      let params = {}
      for(let key in this.query){
        if(this.query[key]) params[key] = this.query[key]
      }
      this.domicileAddress.map((e, index) => {
        params.domicile_address[index] = e
      })
      this.censusAddress.map((e, index) => {
        params.census_address[index] = e
      })
      this.companyAddress.map((e, index) => {
        params.company_address[index] = e
      })
      if(!this.domicileAddress[0]) delete params.domicile_address
      if(!this.censusAddress[0]) delete params.census_address
      params.company_address[4] = this.companyAddressDesc
      if(!this.companyAddress[0]) delete params.company_address
      let res = await this.$api.integratedQuery(params)
      if(res.status != 0) return
      let dataBar = []
      let dataPie = []
      if(res.data.list.length < 1) return this.$message.error('暂无数据')
      res.data.list.map((e) => {
        dataBar.push([e[res.data.field] || '其他', e.count])
        dataPie.push({value: e.count, name: e[res.data.field] || '其他'})
      })
      this.showEcharts = true
      this.$nextTick(() => {
        this.getBar(dataBar)
        this.getPie(dataPie)
      })
    },

    getBar(data){
      let option = {
        title: {text: '综合查询', left: 'center'},
        tooltip: {
          trigger: 'axis',
          axisPointer: {type: 'shadow'}
        },
        grid: {left: '4%', right: '4%'},
        xAxis: {type: 'category'},
        yAxis: {type: 'value'},
        series: [{
          name: '纬度',
          type: 'bar',
          barWidth: '10%',
          itemStyle: {normal: {color: '#1a9afd', label: {show: true, position: 'top'}}},
          data: data
        }]
      };
      option.dataZoom = [{xAxisIndex: [0], start: 0, end: 100}]
      let myChart = this.$allecharts.init(document.getElementById('chart-bar'))
      myChart.setOption(option)
    },

    getPie(dataPie){
      let option = {
        title: {text: '综合查询', left: 'center'},
        color: ['#37a2da','#32c5e9','#9fe6b8','#ffdb5c','#ff9f7f','#fb7293','#e7bcf3','#8378ea'],
        tooltip : {trigger: 'item',formatter: "{a} <br/>{b} : {c} ({d}%)"},
        series : [{
          name: this.query.field_by,
          type:'pie',
          radius : [0, 130],
          data: dataPie,
          label: {normal: {formatter: '{b}({d}%)'}}
        }]
      };
      let myChart = this.$allecharts.init(document.getElementById('chart-pie'))
      myChart.setOption(option)
    }
  },
};
</script>

<style lang="scss" scoped>
.echarts-container{
  display: flex;
  margin-top: 30px;
}
.charts{
  height: 500px;
  padding: 30px;
  margin-bottom: 15px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  .chart-bar-canvas{
    width: 100%;
    height: 100%;
  }
}
.chart-pie{
  width: calc(40% - 60px);
}
.chart-bar{
  width: calc(60% - 120px);
  margin-left: 30px;
}
</style>