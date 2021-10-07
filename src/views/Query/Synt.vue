<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：综合查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 表单 -->
      <el-form ref="census" :inline="true" label-width="125px" class="form-container" :class="{'form-hidden': !fromShow}">
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
          <el-input v-model="query.age1" style="width: 60px" 
            @input="query.age1 = query.age1.replace(/[^\d]/g, '')"></el-input>
            --
          <el-input v-model="query.age2" style="width: 60px"
            @input="query.age2 = query.age2.replace(/[^\d]/g, '')"></el-input>
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
        <div v-if="!fromShow">
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
          <el-button type="primary" plain @click="fromShow = true">展开查询</el-button>
        </div>
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
        <!-- 现就业状态 -->
        <el-form-item label="现就业状态" style="display: block">
          <el-checkbox-group v-model="query.work_status">
            <el-checkbox v-for="item in $option.work_status" :key="item" :label="item" :value="item"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 单位地址 -->
        <el-form-item label="单位地址" style="display: block">
          <el-cascader class="from-width-l8" v-model="companyAddress" placeholder="请选择单位地址"
            :options="$DefaultArea" :props="addressProps" clearable></el-cascader>
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
        <div>
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
        </div>
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
        <el-table-column prop="census_name" label="姓名" width="100">
          <template slot-scope="scope">
            <span @click="openDialog(scope.row)" style="color: #0091ff; cursor: pointer">{{scope.row.census_name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center">
          <template slot-scope="scope">{{$root.computedSex(scope.row.card_number)}}</template>
        </el-table-column>
        <el-table-column prop="census_domicile_type" label="户籍性质" width="80" align="center"></el-table-column>
        <el-table-column prop="date" label="年龄" width="50" align="center">
          <template slot-scope="scope">{{$root.computedAge(scope.row.card_number)}}</template>
        </el-table-column>
        <el-table-column prop="work_status" label="是否就业" width="100" align="center"></el-table-column>
        <el-table-column prop="phone_number" label="联系电话" width="120" align="center"></el-table-column>
        <el-table-column prop="name" label="居住地址">
          <template slot-scope="scope">
            {{ scope.row.census_city }}
            {{ scope.row.census_area }}
            {{ scope.row.census_town }}
            {{ scope.row.census_village }}
            {{ scope.row.house_number }}
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination" v-if="showList">
        <el-pagination background layout="total, prev, pager, next"
          :current-page="pageIndex"
          :page-size="pageNumber"
          :total="pageTotal"
          @current-change="getList"></el-pagination>
      </div>

      <!-- 人员详情 -->
      <el-dialog :visible.sync="dialogVisible" width="800px" title="人员详情" show-close class="dialog-info">
        <el-tabs v-model="activeName">
          <el-tab-pane label="户主信息" name="1">
            <div class="dialog-text">
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">身份证号</div>
                <div class="dialog-text-text">{{info.domicile_res.identity_number}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">户主姓名</div>
                <div class="dialog-text-text">{{info.domicile_res.domicile_name}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">户籍性质</div>
                <div class="dialog-text-text">{{info.domicile_res.domicile_type}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l11">
                <div class="dialog-text-label">住址</div>
                <div class="dialog-text-text">{{info.domicile_res.domicile_address}}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="家庭成员基本信息" name="2">
            <div class="dialog-text">
              <div class="dialog-text-c dialog-text-l11">
                <div class="dialog-text-label">户主关系</div>
                <div class="dialog-text-text">{{info.census_res.rapport}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">身份证号</div>
                <div class="dialog-text-text">{{info.census_res.card_number}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">姓名</div>
                <div class="dialog-text-text">{{info.census_res.census_name}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">性别</div>
                <div class="dialog-text-text">{{info.census_res.sex}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">出生日期</div>
                <div class="dialog-text-text">{{$root.computedBirthday(info.census_res.card_number)}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">年龄</div>
                <div class="dialog-text-text">{{$root.computedAge(info.census_res.card_number)}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">户籍性质</div>
                <div class="dialog-text-text">{{info.census_res.census_domicile_type}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">是否就业登记</div>
                <div class="dialog-text-text">{{info.census_res.work_register}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">电话</div>
                <div class="dialog-text-text">{{info.census_res.phone_number}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">特殊身份</div>
                <div class="dialog-text-text">{{info.census_res.census_identity}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">民族</div>
                <div class="dialog-text-text">{{info.census_res.nation}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">政治面貌</div>
                <div class="dialog-text-text">{{info.census_res.political_status}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">婚姻状况</div>
                <div class="dialog-text-text">{{info.census_res.marriage_status}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">健康状况</div>
                <div class="dialog-text-text">{{info.census_res.health_status}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">残疾等级</div>
                <div class="dialog-text-text">{{info.census_res.handicap_level}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">是否低保</div>
                <div class="dialog-text-text">{{info.census_res.allowance_status}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">学历</div>
                <div class="dialog-text-text">{{info.census_res.education}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l12">
                <div class="dialog-text-label">专业</div>
                <div class="dialog-text-text">{{info.census_res.profession}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l11">
                <div class="dialog-text-label">户口地址</div>
                <div class="dialog-text-text">
                  {{info.census_res.domicile_city}} 
                  {{info.census_res.domicile_area}} 
                  {{info.census_res.domicile_town}} 
                  {{info.census_res.domicile_village}} 
                </div>
              </div>
              <div class="dialog-text-c dialog-text-l11">
                <div class="dialog-text-label">居住地址</div>
                <div class="dialog-text-text">
                  {{info.census_res.census_city}} 
                  {{info.census_res.census_area}} 
                  {{info.census_res.census_town}} 
                  {{info.census_res.census_village}} 
                  {{info.census_res.house_number}} 
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="就业信息" name="3">
            <div class="dialog-text">
              <div class="dialog-text-c dialog-text-l13" v-if="info.work_res.work_status == '无业求职'">
                <div class="dialog-text-label">就业状态</div>
                <div class="dialog-text-text">{{info.work_res.work_status}}</div>
              </div>
              <template v-else-if="info.work_res.work_status == '无就业需求'">
                <div class="dialog-text-c dialog-text-l13" >
                  <div class="dialog-text-label">就业状态</div>
                  <div class="dialog-text-text">{{info.work_res.work_status}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l11">
                  <div class="dialog-text-label">说明</div>
                  <div class="dialog-text-text">{{info.work_res.work_desc}}</div>
                </div>
              </template>
              <div class="dialog-text-c dialog-text-l13" v-else>
                <div class="dialog-text-label">就业状态</div>
                <div class="dialog-text-text">{{info.work_res.work_status}}</div>
              </div>
              <template v-if="info.work_res.work_status == '灵活就业' || info.work_res.work_status == '社区村就业'">
                <div class="dialog-text-c dialog-text-l11">
                  <div class="dialog-text-label">工作地点</div>
                  <div class="dialog-text-text">{{info.work_res.company_address}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l11">
                  <div class="dialog-text-label">工作内容</div>
                  <div class="dialog-text-text">{{info.work_res.work_desc}}</div>
                </div>
              </template>
              <template v-if="info.work_res.work_status == '自主创业'">
                <div class="dialog-text-c dialog-text-l11">
                  <div class="dialog-text-label">创业项目名称</div>
                  <div class="dialog-text-text">{{info.work_res.company_address}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l11">
                  <div class="dialog-text-label">工作内容</div>
                  <div class="dialog-text-text">{{info.work_res.work_desc}}</div>
                </div>
              </template>
              <template v-if="info.work_res.work_status == '单位就业'">
                <div class="dialog-text-c dialog-text-l11">
                  <div class="dialog-text-label">就业单位全称</div>
                  <div class="dialog-text-text">{{info.work_res.company_name}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l11">
                  <div class="dialog-text-label">工作地点</div>
                  <div class="dialog-text-text">{{info.work_res.company_address}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13">
                  <div class="dialog-text-label">职业工种</div>
                  <div class="dialog-text-text">{{info.work_res.work_type}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13">
                  <div class="dialog-text-label">用工形式</div>
                  <div class="dialog-text-text">{{info.work_res.work_shape}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13">
                  <div class="dialog-text-label">单位性质</div>
                  <div class="dialog-text-text">{{info.work_res.company_type}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13">
                  <div class="dialog-text-label">单位联系人</div>
                  <div class="dialog-text-text">{{info.work_res.contact_person}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13">
                  <div class="dialog-text-label">单位联系电话</div>
                  <div class="dialog-text-text">{{info.work_res.company_number}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13">
                  <div class="dialog-text-label">是否公益性就业</div>
                  <div class="dialog-text-text">{{info.work_res.is_charitable}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13">
                  <div class="dialog-text-label">单位产业</div>
                  <div class="dialog-text-text">{{info.work_res.company_industry}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l12">
                  <div class="dialog-text-label">劳动合同时间</div>
                  <div class="dialog-text-text">{{info.work_res.start_time}} 至 {{info.work_res.end_time}}</div>
                </div>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="社会保险信息" name="4">
            <div class="dialog-text">
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">人员身份</div>
                <div class="dialog-text-text">{{info.social_res.identity_type}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">社保信息(一)</div>
                <div class="dialog-text-text">{{info.record_res.social_one}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">社保信息(二)</div>
                <div class="dialog-text-text">{{info.record_res.social_two}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13" v-if="info.social_res.identity_type == '超龄人员'">
                <div class="dialog-text-label">是否退休</div>
                <div class="dialog-text-text">{{info.social_res.is_rest}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l11" 
                v-if="info.record_res.identity_type == '超龄人员' && info.social_res.is_rest == '是'">
                <div class="dialog-text-label">说明</div>
                <div class="dialog-text-text">{{info.social_res.social_two}}</div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="培训求职信息" name="5">
            <p class="dialog-title-p">{{info.job.hunting_list.length > 0 ? '求职信息' : '无求职信息'}}</p>
            <div class="dialog-text" v-if="info.job.hunting_list.length > 0">
              <template v-for="(item, index) in info.job.hunting_list">
                <div class="dialog-text-c dialog-text-l13" :key="index + '1px'">
                  <div class="dialog-text-label">求职岗位</div>
                  <div class="dialog-text-text">{{item.job_position}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13" :key="index + '2px'">
                  <div class="dialog-text-label">薪资要求</div>
                  <div class="dialog-text-text">{{item.job_salary}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13" :key="index + '3px'">
                  <div class="dialog-text-label">就业区域</div>
                  <div class="dialog-text-text">{{item.job_area}}</div>
                </div>
              </template>
            </div>
            <p class="dialog-title-p" style="margin-top: 20px">{{info.job.skill_list.length > 0 ? '培训信息' : '无培训信息'}}</p>
            <div class="dialog-text" v-if="info.job.skill_list.length > 0">
              <template v-for="(item, index) in info.job.skill_list">
                <div class="dialog-text-c dialog-text-l13" :key="index + '1qz'">
                  <div class="dialog-text-label">技能名称</div>
                  <div class="dialog-text-text">{{item.skill_name}}</div>
                </div>
                <div class="dialog-text-c dialog-text-l13" :key="index + '2qz'">
                  <div class="dialog-text-label">技能等级</div>
                  <div class="dialog-text-text">{{item.skill_level}}</div>
                </div>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="系统信息" name="6">
            <div class="dialog-text">
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">转移就业证号</div>
                <div class="dialog-text-text">{{info.record_res.employment_number}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">系统状态</div>
                <div class="dialog-text-text">{{info.record_res.employment_status}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">查询时间</div>
                <div class="dialog-text-text">{{info.record_res.employment_time}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">就失业证号</div>
                <div class="dialog-text-text">{{info.record_res.unemployment_number}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">系统状态</div>
                <div class="dialog-text-text">{{info.record_res.unemployment_status}}</div>
              </div>
              <div class="dialog-text-c dialog-text-l13">
                <div class="dialog-text-label">查询时间</div>
                <div class="dialog-text-text">{{info.record_res.unemployment_time}}</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
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
      showEcharts: false,
      addressProps: { value: 'name', label: 'name', children: 'list', checkStrictly: true },
      list: [],
      showList: false,
      pageIndex: 1,
      pageNumber: 8,
      pageTotal: 0,
      fromShow: true,
      dialogVisible: false,
      info: {
        domicile_res: {},
        record_res: {},
        social_res: {},
        work_res: {},
        census_res: {},
        job: {
          hunting: "是",
          hunting_list: [],
          skill: '是',
          skill_list: []
        }
      },
      activeName: '1'
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
        this.fromShow = false
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
        legend: {
          orient: 'vertical',
          left: '70%',  //图例距离左的距离
          y: 'bottom',  //图例上下居中
          data: dataPie,
          formatter: function(name){
            let index = dataPie.findIndex(e => e.name == name)
            if(index != -1) return `${name}(${dataPie[index].value})`
          }
        },
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
      this.domicileAddress = []
      this.censusAddress = []
      this.companyAddress = []
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

      // 处理年龄
      if(this.query.age1 && this.query.age1 >= 0){
        if(this.query.age2 && this.query.age2 >= 0){
          if(parseInt(this.query.age1) >= parseInt(this.query.age2)){
            return this.$message.error('请填写正确的年龄段')
          }else{
            tmp.age = `${this.query.age1}-${this.query.age2}`
          }
        }else{
          return this.$message.error('请填写正确的年龄段')
        }
      }else if(this.query.age2 && this.query.age2 >= 0){
        return this.$message.error('请填写正确的年龄段')
      }
      delete tmp.age1
      delete tmp.age2
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
      this.fromShow = false
    },

    async openDialog(item){
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
      this.dialogVisible = true
    }
  },
};
</script>

<style lang="scss" scoped>
.echarts-container{
  display: flex;
  // margin-top: 30px;
}
.charts{
  height: 450px;
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
.form-hidden{
  height: 263px;
  overflow: hidden;
}
.dialog-title-p{
  font-size: 18px;
  font-weight: bold;
  padding: 10px;
  width: 105px;
  padding-left: 43px;
}
.dialog-text{
  font-size: 13px;
  line-height: 30px;
  .dialog-text-c{
    display: inline-block;
    div{
      display: inline-block;
    }
  }
  .dialog-text-label{
    width: 95px;
    text-align: right;
    padding-right: 5px;
    font-weight: bold;
  }
  .dialog-text-l11{
    width: 760px;
  }
  .dialog-text-l13{
    width: 250px;
  }
}
.dialog-info{
  ::v-deep .el-dialog__body{
    min-height: 56vh;
  }
  ::v-deep .el-tabs__content{
    background: #FAFAFA;
    padding: 15px 0;
  }
}
</style>