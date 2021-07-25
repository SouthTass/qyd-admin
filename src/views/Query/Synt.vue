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
          <el-select v-model="query.domicile_type" class="from-width-l1" placeholder="请选择户籍性质">
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
        <div>
          <el-form-item label="户口地址">
            <el-cascader class="from-width-l8"
              v-model="query.hukoudizhi"
              placeholder="请选择户口地址"
              :options="formAddress"
              clearable></el-cascader>
          </el-form-item>
        </div>
        <!-- 居住地址 -->
        <div>
          <el-form-item label="居住地址">
            <el-cascader class="from-width-l8"
              v-model="query.juzhudizhi"
              placeholder="请选择居住地址"
              :options="formAddress"
              clearable></el-cascader>
          </el-form-item>
        </div>
        <!-- 单位地址 -->
        <div>
          <el-form-item label="单位地址">
            <el-cascader class="from-width-l8"
              v-model="query.juzhudizhi"
              placeholder="请选择单位地址"
              :options="$DefaultArea"
              :props="{ value: 'name', label: 'name', children: 'list' }"
              clearable></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="text" placeholder="请输入具体地址" style="width: 488px!important"
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
          <el-date-picker class="from-width-l1" v-model="query.work_start_time" type="date"
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
          <el-select v-model="query.job" class="from-width-l1" placeholder="请选择是否求职">
            <el-option v-for="item in $option.yesorno" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 求职岗位 -->
        <el-form-item label="求职岗位">
          <el-input v-model="query.gangwei" class="from-width-l1" placeholder="请输入求职岗位"></el-input>
        </el-form-item>
        <!-- 薪酬要求 -->
        <el-form-item label="薪酬要求">
          <el-select v-model="query.job_salary" class="from-width-l1" placeholder="请选择薪酬要求">
            <el-option v-for="item in $option.item7" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否培训 -->
        <el-form-item label="是否培训">
          <el-select v-model="query.peixun" class="from-width-l1" placeholder="请选择是否培训">
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
          <el-select v-model="query.weidu" class="from-width-l1" placeholder="请选择查询纬度">
            <el-option v-for="item in $option.item23" :key="item" :label="item" :value="item"></el-option>
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
        juzhudizhi: '',
        weidu: ''
      },
      formAddress: addressDefault,
      text: ''
    };
  },
  methods: {
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
