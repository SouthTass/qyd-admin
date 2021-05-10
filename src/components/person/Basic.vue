<template>
  <el-form ref="form" :inline="true" :model="form" label-width="80px" class="form-container">
    <div class="form-item">
      <h3 class="form-item-title">基本信息</h3>
      <div class="container">
        <div>
          <el-form-item label="户主关系">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
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
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="出生日期">
            <el-date-picker class="from-width-l1"
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="户籍性质">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="是否就业登记" class="line-height-l2">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="特殊身份">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="学历">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="专业">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="民族">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="婚姻状况">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="健康状况">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="残疾等级">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否低保">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="户口地址">
            <el-select v-model="value" placeholder="请选择" class="from-width-l2">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="居住地址">
            <el-select v-model="value" placeholder="请选择" class="from-width-l2">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.name" placeholder="请输入门牌号"
              style="margin-left: 80px" class="from-width-l2"></el-input>
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
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
  mounted(){
    console.log(this.$root.user);
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
    .form-item-hzgx{
      ::v-deep .el-form-item__content{
        width: 177px;
      }
    }
  }
}
</style>