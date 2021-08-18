<template>
  <el-form ref="PersonageInput"
    :rules="rules"
    :inline="true"
    :model="$root.user"
    label-width="120px" class="form-container">
    <!-- 户主信息 -->
    <div class="form-item">
      <h3 class="form-item-title">户主信息</h3>
      <div class="container">
        <el-form-item label="身份证号" prop="domicile.identity_number">
          <el-input v-model="$root.user.domicile.identity_number" maxlength="18"
            placeholder="请输入18位身份证号码" class="from-width-l1"></el-input>
        </el-form-item>
        <el-form-item label="户主姓名" prop="domicile.domicile_name">
          <el-input v-model="$root.user.domicile.domicile_name" placeholder="请输入户主姓名" class="from-width-l1"></el-input>
        </el-form-item>
        <el-form-item label="户籍性质" prop="domicile.domicile_type">
          <el-select v-model="$root.user.domicile.domicile_type" placeholder="请选择户籍性质" class="from-width-l1">
            <el-option v-for="item in $option.domicileType" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="住址" prop="domicile.domicile_address">
          <el-input v-model="$root.user.domicile.domicile_address" placeholder="请输入住址"
            class="from-width-l9"></el-input>
        </el-form-item>
      </div>
    </div>

    <!-- 家庭成员基本信息 -->
    <div class="form-item">
      <h3 class="form-item-title">{{$route.query.type == 'PersonageInput' ? '家庭成员基本信息' : '租户信息'}}</h3>
      <div class="container">
        <el-form-item label="户主关系" prop="census.rapport" style="display: block">
          <el-select v-model="$root.user.census.rapport" class="from-width-l1" placeholder="请选择与户主的关系">
            <el-option v-for="item in $option.item11" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="census.card_number">
          <el-input v-model="$root.user.census.card_number" maxlength="18" 
            class="from-width-l1" @blur="computedIdentity" placeholder="请输入身份证号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="census.census_name">
          <el-input v-model="$root.user.census.census_name" class="from-width-l1" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="census.sex">
          <el-select v-model="$root.user.census.sex" class="from-width-l1" :disabled="true" 
            placeholder="性别在输入身份证号后自动计算">
            <el-option v-for="item in $option.gender" 
              :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="census.birthday">
          <el-date-picker class="from-width-l1" v-model="$root.user.census.birthday" 
            :disabled="true" placeholder="出生日期在输入身份证号后自动计算"></el-date-picker>
        </el-form-item>
        <el-form-item label="年龄" prop="census.age">
          <el-input v-model="$root.user.census.age" :disabled="true" class="from-width-l1"
            placeholder="年龄在输入身份证号后自动计算"></el-input>
        </el-form-item>
        <el-form-item label="户籍性质" prop="census.census_domicile_type">
          <el-select v-model="$root.user.census.census_domicile_type" class="from-width-l1" placeholder="请选择户籍性质">
            <el-option v-for="item in $option.item10" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否就业登记" prop="census.work_register">
          <el-select v-model="$root.user.census.work_register" class="from-width-l1"
            placeholder="请选择是否就业登记">
            <el-option v-for="item in $option.yesorno" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="census.phone_number">
          <el-input v-model="$root.user.census.phone_number" class="from-width-l1" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="特殊身份" prop="census.census_identity">
          <el-select v-model="$root.user.census.census_identity" class="from-width-l1" placeholder="请选择特殊身份">
            <el-option v-for="item in $option.item12" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族" prop="census.nation">
          <el-select v-model="$root.user.census.nation" class="from-width-l1" placeholder="请选择民族">
            <el-option v-for="item in $option.item14" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="政治面貌" prop="census.political_status">
          <el-select v-model="$root.user.census.political_status" class="from-width-l1" placeholder="请选择政治面貌">
            <el-option v-for="item in $option.item15" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况" prop="census.marriage_status">
          <el-select v-model="$root.user.census.marriage_status" class="from-width-l1" placeholder="请选择婚姻状况">
            <el-option v-for="item in $option.item16" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="健康状况" prop="census.health_status">
          <el-select v-model="$root.user.census.health_status" class="from-width-l1" placeholder="请选择健康状况">
            <el-option v-for="item in $option.item17" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="残疾等级" prop="census.handicap_level">
          <el-select v-model="$root.user.census.handicap_level" class="from-width-l1" 
            :disabled="$root.user.census.health_status != '残疾'" placeholder="请选择残疾等级">
            <el-option v-for="item in $option.item18" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否低保" prop="census.allowance_status">
          <el-select v-model="$root.user.census.allowance_status" class="from-width-l1" placeholder="请选择是否低保">
            <el-option v-for="item in $option.yesorno" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学历" prop="census.education">
          <el-select v-model="$root.user.census.education" class="from-width-l1" placeholder="请选择学历">
            <el-option v-for="item in $option.item13" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业" prop="census.profession">
          <el-input v-model="$root.user.census.profession" :disabled="isEducation"
            class="from-width-l1" placeholder="请输入专业名称"></el-input>
        </el-form-item>
        <el-form-item label="户口地址" prop="census.domicile_address" style="display: block">
          <el-cascader class="from-width-l10" placeholder="请选择户口地址"
            filterable
            v-model="$root.user.census.domicile_address"
            :options="$DefaultArea"
            :props="addressProps"
            @change="computedDomicileAddress"></el-cascader>
        </el-form-item>
        <el-form-item label="居住地址" prop="census.census_address">
          <el-cascader class="from-width-l10" placeholder="请选择居住地址"
            filterable
            v-model="$root.user.census.census_address"
            :options="$DefaultArea"
            :props="addressProps"
            @change="computedCensusAddress"></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input v-model="$root.user.census.house_number" placeholder="请输入门牌号"
            class="from-width-l9"></el-input>
        </el-form-item>
      </div>
    </div>

    <!-- 就业信息 -->
    <div class="form-item">
      <h3 class="form-item-title">就业信息</h3>
      <div class="container">
        <div>
          <el-form-item label="就业状态" prop="work_status">
            <el-select v-model="$root.user.work.work_status" class="from-width-l1">
              <el-option v-for="item in $option.work_status" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- 就业状态为无就业需求 -->
        <div v-if="$root.user.work.work_status == '无就业需求'">
          <el-form-item label="说明" prop="work_status">
            <el-select v-model="$root.user.work.work_desc" class="from-width-l1">
              <el-option v-for="item in $option.work_none_desc" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- 状态为灵活就业或者社区村就业 -->
        <div v-if="$root.user.work.work_status == '灵活就业' || $root.user.work.work_status == '社区村就业'">
          <el-form-item label="工作地点">
            <el-cascader style="width: 297px"
              filterable
              v-model="company_address_prop"
              :options="$DefaultArea"
              :props="props"
              @change="computedCompanyAddress"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="company_address_desc_prop" placeholder="请输入具体地址" style="width: 458px"
              @change="computedCompanyAddress"></el-input>
          </el-form-item>
        </div>
        <div v-if="$root.user.work.work_status == '灵活就业' || $root.user.work.work_status == '社区村就业'">
          <el-form-item label="工作内容">
            <el-input v-model="$root.user.work.work_desc" class="from-width-l2"
              type="textarea" :rows="6"></el-input>
          </el-form-item>
        </div>

        <!-- 状态为自主创业 -->
        <template v-if="$root.user.work.work_status == '自主创业'">
          <div>
            <el-form-item label="创业项目名称">
              <el-input v-model="$root.user.work.accord.name" placeholder="请输入创业项目名称" class="from-width-l2"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="创业项目地址">
              <el-cascader style="width: 297px"
                filterable
                v-model="$root.user.work.accord.address_array"
                :options="$DefaultArea"
                :props="props"></el-cascader>
            </el-form-item>
            <el-form-item>
              <el-input v-model="$root.user.work.accord.address_desc" 
                placeholder="请输入具体地址" style="width: 458px"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="创业项目性质">
              <el-input v-model="$root.user.work.accord.type" placeholder="请输入创业项目性质"></el-input>
            </el-form-item>
            <el-form-item label="带动就业人数">
              <el-input type="number" v-model.number="$root.user.work.accord.number" placeholder="请输入带动就业人数"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="创业项目内容">
              <el-input class="from-width-l2" placeholder="请输入创业项目内容"
                v-model="$root.user.work.accord.desc" type="textarea" :rows="5"></el-input>
            </el-form-item>
          </div>
        </template>

        <!-- 状态为单位就业 -->
        <template v-if="$root.user.work.work_status == '单位就业'">
          <el-form-item label="就业单位全称">
            <el-input v-model="$root.user.work.company_name" class="from-width-l9"></el-input>
          </el-form-item>
          <el-form-item label="工作地点">
            <el-cascader class="from-width-l10"
              filterable
              v-model="company_address_prop"
              :options="$DefaultArea"
              :props="props"
              @change="computedCompanyAddress"></el-cascader>
          </el-form-item>
          <el-form-item>
            <el-input v-model="company_address_desc_prop" placeholder="请输入具体地址" 
              class="from-width-l9"
              @change="computedCompanyAddress"></el-input>
          </el-form-item>
          <el-form-item label="职业工种" prop="work_type">
            <el-input v-model="$root.user.work.work_type" class="from-width-l1"
              placeholder="请输入职业工种"></el-input>
          </el-form-item>
          <el-form-item label="用工形式">
            <el-select v-model="$root.user.work.work_shape" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in $option.item1" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位性质">
            <el-select v-model="$root.user.work.company_type" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in $option.item2" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位联系人">
            <el-input v-model="$root.user.work.contact_person" class="from-width-l1"></el-input>
          </el-form-item>
          <el-form-item label="单位联系电话">
            <el-input v-model="$root.user.work.company_number" class="from-width-l1"></el-input>
          </el-form-item>
          <el-form-item label="是否公益性就业">
            <el-select v-model="$root.user.work.is_charitable" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in $option.yesorno" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位产业">
            <el-select v-model="$root.user.work.company_industry" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in $option.item3" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="劳动合同时间">
            <el-date-picker class="from-width-l9"
              v-model="$root.user.work.start_end_time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </template>
      </div>
    </div>

    <!-- 社会保险信息 -->
    <div class="form-item">
      <h3 class="form-item-title">社会保险信息</h3>
      <div class="container" v-if="$route.query.type == 'PersonageInput'">
        <el-form-item label="人员身份" prop="identity_type">
          <el-select v-model="$root.user.social.identity_type" class="from-width-l1">
            <el-option v-for="item in $option.item4" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社保信息(一)" prop="social_one">
          <el-select v-model="$root.user.social.social_one" class="from-width-l1">
            <el-option v-for="item in $option.item5" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="社保信息(二)" prop="social_two">
          <el-select v-model="$root.user.social.social_two" class="from-width-l1">
            <el-option v-for="item in $option.item5" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否退休" prop="is_rest" v-if="$root.user.social.identity_type == '超龄人员'">
          <el-select v-model="$root.user.social.is_rest" class="from-width-l1">
            <el-option v-for="item in $option.yesorno" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明" prop="social_desc" v-if="$root.user.social.is_rest == '是'">
          <el-select v-model="$root.user.social.social_desc" class="from-width-l1">
            <el-option v-for="item in $option.item6" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>

    <!-- 培训求职信息 -->
    <div class="form-item">
      <h3 class="form-item-title">培训求职信息</h3>
      <div class="container">
        <div>
          <el-form-item label="是否求职">
            <el-select v-model="$root.user.job.hunting" class="from-width-l1">
              <el-option v-for="item in $option.yesorno" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <template v-if="$root.user.job.hunting == '是'">
          <div v-for="(item, index) in $root.user.job.hunting_list" :key="`index${index}`">
            <div>
              <el-form-item :label="`求职岗位${index + 1}`">
                <el-input v-model="item.job_position" class="from-width-l1"></el-input>
              </el-form-item>
              <el-form-item label="薪酬要求">
                <el-select v-model="item.job_salary" class="from-width-l1">
                  <el-option v-for="item in $option.item7" 
                    :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="就业区域">
                <el-select v-model="item.job_area" class="from-width-l1">
                  <el-option v-for="item in $option.item8" 
                    :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-button v-if="index == $root.user.job.hunting_list.length - 1 && index < 2" 
                icon="el-icon-plus" type="primary" circle plain size="mini"
                @click="addHunting"></el-button>
              <el-button v-if="index != 0" 
                icon="el-icon-minus" type="danger" circle plain size="mini"
                @click="delHunting(index)"></el-button>
            </div>
          </div>
        </template>
        <div>
          <el-form-item label="是否培训">
            <el-select v-model="$root.user.job.skill" class="from-width-l1">
              <el-option v-for="item in $option.yesorno" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <template v-if="$root.user.job.skill == '是'">
          <div v-for="(item, index) in $root.user.job.skill_list" :key="index">
            <div>
              <el-form-item :label="`技能名称${index + 1}`">
                <el-input v-model="item.skill_name" class="from-width-l1"></el-input>
              </el-form-item>
              <el-form-item label="技能等级">
                <el-select v-model="item.skill_level" class="from-width-l1">
                  <el-option v-for="item in $option.item9" 
                    :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-button v-if="index == $root.user.job.skill_list.length - 1 && index < 2" 
                icon="el-icon-plus" type="primary" circle plain size="mini"
                @click="addSkill"></el-button>
              <el-button v-if="index != 0" 
                icon="el-icon-minus" type="danger" circle plain size="mini"
                @click="delSkill(index)"></el-button>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- 系统信息 -->
    <div class="form-item" v-if="$route.query.type == 'PersonageInput'">
      <h3 class="form-item-title">系统信息</h3>
      <div class="container">
        <el-form-item label="转移就业证号" prop="employment_number">
          <el-input v-model="$root.user.record.employment_number" class="from-width-l1"
            placeholder="请输入转移就业证号"></el-input>
        </el-form-item>
        <el-form-item label="系统状态" prop="employment_status">
          <el-select v-model="$root.user.record.employment_status" class="from-width-l1"
            placeholder="请选择系统状态">
            <el-option v-for="item in $option.item21" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询时间" prop="employment_time">
          <el-date-picker class="from-width-l1"
            v-model="$root.user.record.employment_time"
            type="date"
            placeholder="请选择查询时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="就失业登记证号" prop="unemployment_number">
          <el-input v-model="$root.user.record.unemployment_number" class="from-width-l1"
            placeholder="请输入就失业登记证号"></el-input>
        </el-form-item>
        <el-form-item label="系统状态" prop="unemployment_status">
          <el-select v-model="$root.user.record.unemployment_status" class="from-width-l1"
            placeholder="请选择系统状态">
            <el-option v-for="item in $option.item22" 
              :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询时间">
          <el-date-picker class="from-width-l1"
            v-model="$root.user.record.unemployment_time"
            type="date"
            placeholder="请选择查询时间">
          </el-date-picker>
        </el-form-item>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="form-item" style="text-align: center">
      <el-button @click="saveInfo('formatConfig')" type="primary">保存并新增</el-button>
      <el-button @click="saveInfo()" type="primary">保 存</el-button>
    </div>
  </el-form>
</template>

<script>
export default {
  name: 'PersonageInput',
  data() {
    return {
      isEducation: false,            // 是否显示专业输入框   
      addressProps: {                // 格式化地址文件，以符合选择器的要求
        value: 'name',
        label: 'name',
        children: 'list',
      },
      rules: {
        'domicile.identity_number': [
          { required: true, message: '请输入18位身份证号码', trigger: 'change' },
          { min: 18, max: 18, message: '身份证号码不能少于18位', trigger: 'change' }
        ],
        'domicile.domicile_name': [
          { required: true, message: '请输入户主姓名', trigger: 'change' }
        ],
        'domicile.domicile_type': [
          { required: true, message: '请选择户籍性质', trigger: 'change' }
        ],
        'domicile.domicile_address': [
          { required: true, message: '请输入住址', trigger: 'change' }
        ],
        'census.rapport': [
          { required: true, message: '请选择户主关系', trigger: 'blur' }
        ],
        'census.card_number': [
          { required: true, message: '请输入18位身份证号码', trigger: 'blur' },
          { min: 18, max: 18, message: '身份证号码不能少于18位', trigger: 'blur' }
        ],
        'census.census_name': [
          { required: true, message: '请输入户主姓名', trigger: 'blur' }
        ],
        'census.census_domicile_type': [
          { required: true, message: '请选择户籍性质', trigger: 'blur' }
        ],
        'census.work_register': [
          { required: true, message: '请选择是否登记了就业状况', trigger: 'blur' }
        ],
        'census.census_identity': [
          { required: true, message: '请选择特殊身份', trigger: 'blur' }
        ],
        'census.nation': [
          { required: true, message: '请选择民族', trigger: 'blur' }
        ],
        'census.political_status': [
          { required: true, message: '请选择政治面貌', trigger: 'blur' }
        ],
        'census.marriage_status': [
          { required: true, message: '请选择婚姻状况', trigger: 'blur' }
        ],
        'census.health_status': [
          { required: true, message: '请选择健康状况', trigger: 'blur' }
        ],
        'census.allowance_status': [
          { required: true, message: '请选择是否为低保户', trigger: 'blur' }
        ],
        'census.education': [
          { required: true, message: '请选择学历', trigger: 'blur' }
        ],
        'census.census_domicile_address': [
          { required: true, message: '请选择户口地址', trigger: 'blur' }
        ],
        'census.census_address': [
          { required: true, message: '请选择居住地址', trigger: 'blur' }
        ]
      }
    };
  },
  watch: {
    // 高中以下不让输入专业
    '$root.user.census.education': function(){
      if(this.$root.user.census.education == '文盲或半文盲'
      || this.$root.user.census.education == '小学'
      || this.$root.user.census.education == '初中'
      || this.$root.user.census.education == '高中'){
        this.isEducation = true
        this.$root.user.census.profession = '无'
      }else{
        this.isEducation = false
        this.$root.user.census.profession = ''
      }
    },

    // 选择残疾的情况下才能选择残疾等级
    '$root.user.census.health_status': function(){
      console.log(this.$root.user.census.health_status)
      if(this.$root.user.census.health_status != '残疾'){
        this.$root.user.census.handicap_level = ''
      }
    }
  },
  created() {
    if(this.$route.query.id) this.censusGet()
  },
  methods: {
    // 查询个人信息
    async censusGet(){
      let res = await this.$api.censusGet(this.$route.query.id)
      if(res.status != 0) return
      this.$root.user.domicile = res.data.domicile_res

      // 处理年龄，性别，出生日期，户籍地址，居住地址
      res.data.census_res.age = this.$root.computedAge(res.data.census_res.card_number)
      res.data.census_res.sex = this.$root.computedSex(res.data.census_res.card_number)
      res.data.census_res.birthday = this.$root.computedBirthday(res.data.census_res.card_number)
      res.data.census_res.census_address = []
      if(res.data.census_res.census_city) res.data.census_res.census_address.push(res.data.census_res.census_city)
      if(res.data.census_res.census_area) res.data.census_res.census_address.push(res.data.census_res.census_area)
      if(res.data.census_res.census_town) res.data.census_res.census_address.push(res.data.census_res.census_town)
      if(res.data.census_res.census_village) res.data.census_res.census_address.push(res.data.census_res.census_village)
      res.data.census_res.domicile_address = []
      if(res.data.census_res.domicile_city) res.data.census_res.domicile_address.push(res.data.census_res.domicile_city)
      if(res.data.census_res.domicile_area) res.data.census_res.domicile_address.push(res.data.census_res.domicile_area)
      if(res.data.census_res.domicile_town) res.data.census_res.domicile_address.push(res.data.census_res.domicile_town)
      if(res.data.census_res.domicile_village) res.data.census_res.domicile_address.push(res.data.census_res.domicile_village)
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
    },

    // 保存信息
    async saveInfo(type){
      this.$refs['PersonageInput'].validate(valid => {
        if(valid) {
          this.saveInfoApi(type)
        }else{
          this.$nextTick(() => {
            let isError = document.getElementsByClassName('is-error')
            isError[0].scrollIntoView({block: 'center', behavior: 'smooth'})
          })
        }
      })
    },

    // 处理api保存数据
    async saveInfoApi(type){
      let body = JSON.parse(JSON.stringify(this.$root.user))
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

      if(this.$route.query.id) return this.censusUpdate(body, type)
      
      let res = await this.$api.censusCreate(body)
      if(res.status != 0) return this.$message.error('系统错误，请稍后再试')
      if(res.data.hasOwnProperty('status')){
        this.$message.error(res.data.message)
      }else{
        this.$message.success('录入成功')
        if(type == 'formatConfig') this.foramtUserConfig()
      }
    },

    // 修改信息
    async censusUpdate(body, type){
      let res = await this.$api.censusUpdate(body)
      if(res.status != 0) return this.$message.error('系统错误，请稍后再试')
      if(res.data.hasOwnProperty('status')){
        this.$message.error(res.data.message)
      }else{
        this.$message.success('修改成功')
        if(type == 'formatConfig') this.foramtUserConfig()
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
        this.$option[`${index[sh]}`] = arr
      })
    },

    // 处理户口地址
    computedDomicileAddress(item){
      this.$root.user.census.domicile_city = item[0] || ''
      this.$root.user.census.domicile_area = item[1] || ''
      this.$root.user.census.domicile_town = item[2] || ''
      this.$root.user.census.domicile_village = item[3] || ''
    },

    // 处理居住地址
    computedCensusAddress(item){
      this.$root.user.census.census_city = item[0] || ''
      this.$root.user.census.census_area = item[1] || ''
      this.$root.user.census.census_town = item[2] || ''
      this.$root.user.census.census_village = item[3] || ''
    },

    // 输入身份证号码之后，计算性别、出生日期、年龄
    computedIdentity(){
      if(this.$root.user.census.card_number.length < 18) return
      let str = this.$root.user.census.card_number
      this.$root.user.census.sex = str.slice(16, 17) % 2 ? '男' : '女' 
      this.$root.user.census.birthday = `${str.slice(6,10)}-${str.slice(10,12)}-${str.slice(12,14)}`
      this.$root.user.census.age = this.$dayjs().format('YYYY') - str.slice(6,10)
    },

    // 保存了之后，只保留户主信息，剩余的全部删除
    foramtUserConfig(){
      let tmp = JSON.parse(JSON.stringify(this.$root.user.domicile))
      this.$root.user = JSON.parse(JSON.stringify(this.$baseConfig))
      this.$root.user.domicile = tmp
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container{
  width: 1335px;
  margin-left: 30px;
}
.form-container .form-item{
  padding-top: 15px;
  margin-bottom: 15px;
}
.form-container .form-item .form-item-title{
  font-size: 18px;
  padding-bottom: 15px;
  text-align: center;
}
.from-width-l1{
  width: 277px !important;
}
.from-width-l2{
  width: 792px !important;
}
.from-width-l3{
  width: 425px !important;
}
.from-width-l4{
  width: 325px !important;
}
.from-width-l5{
  width: 208px !important;
}
.from-width-l6{
  width: 297px !important;
}
.from-width-l7{
  width: 485px !important;
}
.from-width-l8{
  width: 302px !important;
}
.from-width-l9{
  width: 685px!important
}
.from-width-l10{
  width: 395px!important
}
</style>