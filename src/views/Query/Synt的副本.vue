<template>
  <div>
    <table class="table" border="1">
      <tr>
        <td class="table-name" colspan="1">性别</td>
        <td class="table-cont">
          <el-checkbox-group v-model="query.sex">
            <el-checkbox v-for="item in $option.gender" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
        <td class="table-name" colspan="1">户籍性质</td>
        <td class="table-cont">
          <el-checkbox-group v-model="query.census_domicile_type">
            <el-checkbox v-for="item in $option.domicileType" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
        <td class="table-name" colspan="1">年龄</td>
        <td class="table-cont table-input">
          <el-input v-model="query.age" placeholder="请输入年龄"></el-input>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">户口地址</td>
        <td class="table-cont table-input">
          <el-cascader v-model="domicileAddress" placeholder="请选择户口地址"
            :options="$DefaultArea" :props="addressProps" clearable></el-cascader>
        </td>
        <td class="table-name" colspan="1">健康状况</td>
        <td colspan="5">
          <el-checkbox-group v-model="query.health_status">
            <el-checkbox v-for="item in $option.item17" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">是否低保</td>
        <td class="table-cont">
          <el-checkbox-group v-model="query.allowance_status">
            <el-checkbox v-for="item in $option.yesorno" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
        <td class="table-name" colspan="1">特殊身份</td>
        <td colspan="5">
          <el-checkbox-group v-model="query.census_identity">
            <el-checkbox v-for="item in $option.item12" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">公益就业</td>
        <td class="table-cont">
          <el-checkbox-group v-model="query.is_charitable">
            <el-checkbox v-for="item in $option.yesorno" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
        <td class="table-name" colspan="1">就业状态</td>
        <td colspan="5">
          <el-checkbox-group v-model="query.work_status">
            <el-checkbox v-for="item in $option.work_status" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">单位产业</td>
        <td class="table-cont">
          <el-checkbox-group v-model="query.company_industry">
            <el-checkbox v-for="item in $option.item3" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
        <td class="table-name" colspan="1">单位性质</td>
        <td colspan="5">
          <el-checkbox-group v-model="query.company_type">
            <el-checkbox v-for="item in $option.item2" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">居住地址</td>
        <td class="table-cont table-input">
          <el-cascader v-model="censusAddress" placeholder="请选择居住地址"
            :options="$DefaultArea" :props="addressProps" clearable></el-cascader>
        </td>
        <td class="table-name" colspan="1">单位地址</td>
        <td class="table-cont table-input">
          <el-cascader v-model="companyAddress" placeholder="请选择单位地址"
            :options="$DefaultArea" :props="addressProps" clearable></el-cascader>
        </td>
        <td class="table-name" colspan="1">地址详情</td>
        <td class="table-cont table-input">
          <el-input v-model="companyAddressDesc" placeholder="请输入具体地址"
            clearable></el-input>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">是否求职</td>
        <td class="table-cont">
          <el-checkbox-group v-model="query.job_qz">
            <el-checkbox v-for="item in $option.yesorno" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
        <td class="table-name" colspan="1">求职岗位</td>
        <td class="table-cont table-input" colspan="5">
          <el-input v-model="query.job_position" placeholder="请输入求职岗位"></el-input>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">是否培训</td>
        <td class="table-cont">
          <el-checkbox-group v-model="query.job_px">
            <el-checkbox v-for="item in $option.yesorno" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
        <td class="table-name" colspan="1">技能等级</td>
        <td colspan="5">
          <el-checkbox-group v-model="query.skill_level">
            <el-checkbox v-for="item in $option.item9" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">薪酬要求</td>
        <td colspan="8">
          <el-checkbox-group v-model="query.job_salary">
            <el-checkbox v-for="item in $option.item7" :label="item" :key="item">{{item}}</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
      <tr>
        <td class="table-name" colspan="1">查询纬度</td>
        <td colspan="5" class="table-check1">
          <el-checkbox-group v-model="query.field_by">
            <el-checkbox v-for="item in $option.item23" :label="item.name" :key="item.value">{{item.name}}</el-checkbox>
          </el-checkbox-group>
        </td>
      </tr>
    </table>
    <!-- 表单 -->
    <el-form ref="census" :inline="true" label-width="125px" class="form-container">
      
      <!-- 劳动合同开始时间 -->
      <el-form-item label="劳动合同开始时间">
        <el-date-picker class="from-width-l1" v-model="query.start_time" type="date"
          placeholder="请选择劳动合同开始时间"></el-date-picker>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="width: 71px;" @click="getList()">查询</el-button>
    <el-button type="primary" style="width: 71px; margin-left: 15px" @click="getData()">图表</el-button>
    <el-button type="danger" style="width: 71px; margin-left: 15px" plain @click="resetForm">重置</el-button>

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
      return params
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
.table{
  border-collapse: collapse;
  ::v-deep .el-checkbox{
    // width: 70px;
    margin-right: 20px;
  }
  .table-check1 ::v-deep .el-checkbox{
    // width: 120px;
  }
  td{
    padding: 5px;
  }
  .table-input{
    width: 100%;
    padding: 2px;
    ::v-deep .el-input__inner{
      height: 26px;
      line-height: 26px;
    }
    ::v-deep .el-cascader{
      width: 100%;
      height: 26px;
      line-height: 26px;
    }
  }
  .table-name{
    width: 131px;
    background-color: rgba(0, 145, 255, 0.1);
  }
  .table-cont{
    width: 262px;
  }
}
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
</style>