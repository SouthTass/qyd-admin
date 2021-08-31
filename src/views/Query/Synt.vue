<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：综合查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 表单 -->
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
        <!-- 是否低保 -->
        <el-form-item label="是否低保">
          <el-select v-model="query.allowance_status" class="from-width-l1" placeholder="请选择是否为低保">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 健康状况 -->
        <el-form-item label="健康状况" style="display: block">
          <el-checkbox-group v-model="query.health_status">
            <el-checkbox v-for="item in $option.item17" :key="item" :label="item" :value="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 特殊身份 -->
        <el-form-item label="特殊身份" style="display: block">
          <el-checkbox-group v-model="query.census_identity">
            <el-checkbox v-for="item in $option.item12" :key="item" :label="item" :value="item"></el-checkbox>
          </el-checkbox-group>
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
            <el-input v-model="companyAddressDesc" placeholder="请输入具体地址"
              style="width: 488px !important" clearable></el-input>
          </el-form-item>
        </div>
        <!-- 现就业状态 -->
        <el-form-item label="现就业状态" style="display: block">
          <el-checkbox-group v-model="query.work_status">
            <el-checkbox v-for="item in $option.work_status" :key="item" :label="item" :value="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 单位性质 -->
        <el-form-item label="单位性质" style="display: block">
          <el-checkbox-group v-model="query.company_type">
            <el-checkbox v-for="item in $option.item2" :key="item" :label="item" :value="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 单位产业 -->
        <el-form-item label="单位产业" style="display: block">
          <el-checkbox-group v-model="query.company_industry">
            <el-checkbox v-for="item in $option.item3" :key="item" :label="item" :value="item"></el-checkbox>
          </el-checkbox-group>
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
          <el-button type="primary" style="width: 71px; margin-left: 60px" @click="getList()">查询</el-button>
          <el-button type="primary" style="width: 71px; margin-left: 15px" @click="getData()">图表</el-button>
          <el-button type="danger" style="width: 71px; margin-left: 15px" plain @click="resetForm">重置</el-button>
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
      
      <!-- 列表 -->
      <el-table v-if="showList" border class="table" :data="list" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="card_number" label="身份证号" width="170" align="center"></el-table-column>
        <el-table-column prop="census_name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center">
          <template slot-scope="scope">{{$root.computedSex(scope.row.card_number)}}</template>
        </el-table-column>
        <el-table-column prop="census_domicile_type" label="户籍性质" width="80" align="center"></el-table-column>
        <el-table-column prop="date" label="年龄" width="50" align="center">
          <template slot-scope="scope">{{$root.computedAge(scope.row.card_number)}}</template>
        </el-table-column>
        <el-table-column prop="work_status" label="是否就业" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="居住地址">
          <template slot-scope="scope">
            {{ scope.row.census_city }}
            {{ scope.row.census_area }}
            {{ scope.row.census_town }}
            {{ scope.row.census_village }}
            {{ scope.row.house_number }}
          </template>
        </el-table-column>
        <el-table-column prop="phone_number" label="联系电话" width="120" align="center"></el-table-column>
        <!-- <el-table-column label="操作" width="310" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini"
              @click="$refs.componentsInfo.show(scope.row)">查看</el-button>
            <el-button type="warning" size="mini"
              @click="openPersonageInput(scope.row)">修改</el-button>
            <el-button type="danger" size="mini"
              @click="$refs.componentsLogout.show(scope.row)">注销</el-button>
            <el-button type="primary" size="mini"
              @click="$refs.componentsChangeRecord.show(scope.row)">变更记录</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="pagination" v-if="showList">
        <el-pagination background layout="total, prev, pager, next"
          :current-page="pageIndex"
          :page-size="pageNumber"
          :total="pageTotal"
          @current-change="getList"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: JSON.parse(JSON.stringify(this.$option.querysynt)),
      domicileAddress: [],
      censusAddress: [],
      companyAddress: [],
      companyAddressDesc: '',
      showEcharts: false,
      addressProps: { value: 'name', label: 'name', children: 'list' },
      list: [],
      showList: false,
      pageIndex: 1,
      pageNumber: 8,
      pageTotal: 0
    };
  },
  methods: {
    async getData(){
      this.showList = false
      this.pageIndex = 1
      this.pageTotal = 0
      let res = await this.$api.integratedQuery(this.computedData())
      if(res.status != 0) return
      let dataBar = []
      let dataPie = []
      if(res.data.list.length < 1) {
        this.showEcharts = false
        return this.$message.error('暂无数据')
      }
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
        grid: {left: '4%', right: '0'},
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
    },

    async resetForm(){
      let dialog = await this.$confirm('此操作将重置查询条件为初始状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      if(dialog != 'confirm') return
      this.query = JSON.parse(JSON.stringify(this.$option.querysynt))
    },
    
    computedData(){
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

      // 处理多选情况
      params.health_status = params.health_status.join(',')
      params.census_identity = params.census_identity.join(',')
      params.work_status = params.work_status.join(',')
      params.company_type = params.company_type.join(',')
      params.company_industry = params.company_industry.join(',')

      let tmp = {}
      for(let key in params){
        if(params[key]) tmp[key] = params[key]
      }
      return tmp
    },

    async getList(index){
      this.showEcharts = false
      this.pageIndex = index || 1
      let body = this.computedData()
      body.page_index = this.pageIndex
      body.page_number = this.pageNumber
      let res = await this.$api.integratedList(body, {
        page_index: this.pageIndex, 
        page_number: this.pageNumber
      })
      if(res.status != 0) return
      this.pageTotal = res.data.total_rows
      this.list = res.data.list
      this.showList = true
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
  width: 40%;
}
.chart-bar{
  width: 60%;
  margin-left: 15px;
}
.form-container ::v-deep .el-checkbox{
  width: 80px;
}
</style>