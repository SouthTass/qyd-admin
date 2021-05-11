<template>
  <el-form ref="pTrain" 
    :inline="true" 
    :model="$root.user.job" label-width="120px" class="form-container">
    <div class="form-item">
      <h3 class="form-item-title">培训求职信息</h3>
      <div class="container">
        <div>
          <el-form-item label="是否求职">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in registerTypeList" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <template>
          <div>
            <el-form-item label="求职岗位1">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="薪酬要求">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="就业区域">
              <el-select v-model="value" placeholder="请选择" class="from-width-l2">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否培训">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="技能等级">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="技能名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="求职岗位2">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="薪酬要求">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="就业区域">
              <el-select v-model="value" placeholder="请选择" class="from-width-l2">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否培训">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="技能等级">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="技能名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="求职岗位3">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="薪酬要求">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="就业区域">
              <el-select v-model="value" placeholder="请选择" class="from-width-l2">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="是否培训">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="技能等级">
              <el-select v-model="value" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in gender" 
                  :key="item.type" :label="item.name" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="技能名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
        </template>
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