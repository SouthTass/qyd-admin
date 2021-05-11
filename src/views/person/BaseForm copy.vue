<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          当前位置：登记管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>信息登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-form ref="form" :inline="true" :model="form" label-width="80px" class="form">
      <!-- 户籍信息 -->
      <div class="form-item">
        <h3 class="form-item-title">户籍信息</h3>
        <div class="container">
          <el-form-item label="身份证号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="户主姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="户籍性质">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in registerTypeList" :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="住址" >
            <el-input v-model="form.name" style="width: 800px"></el-input>
          </el-form-item>
        </div>
      </div>

      <!-- 基本信息 -->
      <div class="form-item">
        <h3 class="form-item-title">基本信息</h3>
        <div class="container">
          <div>
            <el-form-item label="户主关系">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in registerTypeList" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="身份证号">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-select v-model="value" placeholder="请选择">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </div>



          <el-form-item label="身份证号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="户主姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="住址" >
            <el-input v-model="form.name" style="width: 800px"></el-input>
          </el-form-item>
        </div>
      </div>
      <el-form-item label="选择器">
        <el-select v-model="form.region" placeholder="请选择">
          <el-option key="bbk" label="步步高" value="bbk"></el-option>
          <el-option key="xtc" label="小天才" value="xtc"></el-option>
          <el-option key="imoo" label="imoo" value="imoo"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期时间">
        <el-col :span="11">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            value-format="yyyy-MM-dd"
            style="width: 100%"
          ></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%"
          ></el-time-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="城市级联">
        <el-cascader
          :options="options"
          v-model="form.options"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="选择开关">
        <el-switch v-model="form.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="多选框">
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="步步高" name="type"></el-checkbox>
          <el-checkbox label="小天才" name="type"></el-checkbox>
          <el-checkbox label="imoo" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="单选框">
        <el-radio-group v-model="form.resource">
          <el-radio label="步步高"></el-radio>
          <el-radio label="小天才"></el-radio>
          <el-radio label="imoo"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="文本框">
        <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
      </el-form-item>

      <!-- 系统信息 -->
      <div class="form-item">
        <h3 class="form-item-title">系统信息</h3>
        <div class="container">
          <el-form-item label="转移就业证号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="系统状态">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in registerTypeList" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询时间">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in registerTypeList" :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移就业证号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="系统状态">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in registerTypeList" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="查询时间">
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in registerTypeList" :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>


      <el-form-item>
        <el-button type="primary" @click="onSubmit">表单提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from '@/common/config'
export default {
  name: "baseform",
  data() {
    return {
      options: [
        {
          value: "guangdong",
          label: "广东省",
          children: [
            {
              value: "guangzhou",
              label: "广州市",
              children: [
                {
                  value: "tianhe",
                  label: "天河区",
                },
                {
                  value: "haizhu",
                  label: "海珠区",
                },
              ],
            },
            {
              value: "dongguan",
              label: "东莞市",
              children: [
                {
                  value: "changan",
                  label: "长安镇",
                },
                {
                  value: "humen",
                  label: "虎门镇",
                },
              ],
            },
          ],
        },
        {
          value: "hunan",
          label: "湖南省",
          children: [
            {
              value: "changsha",
              label: "长沙市",
              children: [
                {
                  value: "yuelu",
                  label: "岳麓区",
                },
              ],
            },
          ],
        },
      ],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: true,
        type: ["步步高"],
        resource: "小天才",
        desc: "",
        options: [],
      },
      registerTypeList: config.registerType,
      gender: config.gender
    };
  },
  methods: {
    onSubmit() {
      this.$message.success("提交成功！");
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 12px;
}
.form{
  width: 1000px;
  .form-item{
    padding-top: 15px;
    margin-bottom: 15px;
    .form-item-title{
      font-size: 18px;
      padding-bottom: 15px;
    }
  }
}
</style>