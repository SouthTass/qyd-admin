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
          <el-select v-model="query.sex" class="from-width-l1">
            <el-option v-for="item in $option.gender" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 户籍性质 -->
        <el-form-item label="户籍性质">
          <el-select v-model="query.domicile_type" class="from-width-l1">
            <el-option v-for="item in $option.domicileType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 年龄 -->
        <el-form-item label="年龄">
          <el-input-number v-model="query.age" :min="1" :max="1000" class="from-width-l1"></el-input-number>
        </el-form-item>
        <!-- 健康状况 -->
        <el-form-item label="健康状况">
          <el-select v-model="query.health_status" class="from-width-l1">
            <el-option v-for="item in $option.item17" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否低保 -->
        <el-form-item label="是否低保">
          <el-select v-model="query.allowance_status" class="from-width-l1">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 特殊身份 -->
        <el-form-item label="特殊身份">
          <el-select v-model="query.census_identity" class="from-width-l1">
            <el-option v-for="item in $option.item12" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <!-- 户口地址 -->
          <el-form-item label="户口地址">
            <el-cascader class="from-width-l4"
              v-model="query.hukoudizhi"
              placeholder="请选择"
              :options="formAddress"
              clearable></el-cascader>
          </el-form-item>
        </div>
        <div>
          <!-- 居住地址 -->
          <el-form-item label="居住地址">
            <el-cascader class="from-width-l4"
              v-model="query.juzhudizhi"
              placeholder="请选择"
              :options="formAddress"
              clearable></el-cascader>
          </el-form-item>
        </div>
        <!-- 现就业状态 -->
        <el-form-item label="现就业状态">
          <el-select v-model="query.work_status" class="from-width-l1">
            <el-option v-for="item in $option.work_status" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 单位性质 -->
        <el-form-item label="单位性质">
          <el-select v-model="query.company_type" class="from-width-l1">
            <el-option v-for="item in $option.item2" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 单位地址 -->
        <el-form-item label="单位地址">
          <el-cascader class="from-width-l1"
            v-model="query.juzhudizhi"
            placeholder="请选择"
            :options="addresslevel2"
            :props="{ value: 'label', label: 'label' }"
            clearable></el-cascader>
        </el-form-item>
        <!-- 单位产业 -->
        <el-form-item label="单位产业">
          <el-select v-model="query.company_industry" class="from-width-l1">
            <el-option v-for="item in $option.item3" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 劳动合同开始时间 -->
        <el-form-item label="劳动合同开始时间">
          <el-date-picker class="from-width-l1" v-model="query.work_start_time" type="date"></el-date-picker>
        </el-form-item>
        <!-- 是否公益性就业 -->
        <el-form-item label="是否公益性就业">
          <el-select v-model="query.is_charitable" class="from-width-l1">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否求职 -->
        <el-form-item label="是否求职">
          <el-select v-model="query.job" class="from-width-l1">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 求职岗位 -->
        <el-form-item label="求职岗位">
          <el-input v-model="query.gangwei" class="from-width-l1"></el-input>
        </el-form-item>
        <!-- 薪酬要求 -->
        <el-form-item label="薪酬要求">
          <el-select v-model="query.job_salary" class="from-width-l1">
            <el-option v-for="item in $option.item7" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否培训 -->
        <el-form-item label="是否培训">
          <el-select v-model="query.peixun" class="from-width-l1">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 技能等级 -->
        <el-form-item label="技能等级">
          <el-select v-model="query.skill_level" class="from-width-l1">
            <el-option v-for="item in $option.item9" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 操作按钮 -->
        <div style="padding-left: 125px">
          <el-button type="primary">查询</el-button>
          <el-button type="primary">数据图表</el-button>
          <el-button type="primary">Excel下载</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import level2 from '@/common/level2.js'
import addressDefault from '@/common/country-level3-data.js'
export default {
  data() {
    return {
      query: {
        sex: '',
        domicile_type: '',
        age: '',
        health_status: '',
        allowance_status: '',
        census_identity: '',
        work_status: '',
        company_type: '',
        company_industry: '',
        work_start_time: '',
        is_charitable: '',
        job: '',
        gangwei: '',
        job_salary: '',
        peixun: '',
        skill_level: '',
        hukoudizhi: '',
        juzhudizhi: ''
      },
      formAddress: addressDefault,
      addresslevel2: level2
    };
  },
  created() {
    this.censusList();
  },
  methods: {
    // 获取信息列表
    async censusList(index) {
      this.query.page_index = index || 1
      let res = await this.$api.censusList(this.query)
      if (res.status != 0) return
      this.tableData = res.data.list
      this.pageTotal = res.data.total_rows
    },

    // 计算年龄
    computedAge(item) {
      let str = item.card_number
      return this.$dayjs().format('YYYY') - str.slice(6,10)
    },

    // 计算性别
    computedSex(item){
      let str = item.card_number
      return str.slice(16, 17) % 2 ? '男' : '女' 
    },

    // 查看个人信息
    checkPerson(item) {
      this.$refs.componentsCheck.show(item);
    },

    // 导出数据
    censusExport(){
      location.href = `http://47.93.185.110:7008/api/census/export?census_type=1&census_status=1`
    }
  },
};
</script>

<style lang="scss" scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
.dialog-table {
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15);
  td {
    padding: 5px;
  }
}
</style>
