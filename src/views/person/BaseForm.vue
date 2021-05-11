<template>
  <div class="person-container">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          当前位置：登记管理
        </el-breadcrumb-item>
        <el-breadcrumb-item>信息登记</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <Pcensus ref="pCensuss"></Pcensus>
    <Pbasic></Pbasic> -->
    <Pjob></Pjob>
    <Psocial></Psocial>
    <Ptrain></Ptrain>
    <Psystem></Psystem>
    <el-button @click="saveInfo()">提交按钮 </el-button>
  </div>
</template>

<script>
import config from '@/common/config'
import Pcensus from '@/components/person/Census'
import Pbasic from '@/components/person/Basic'
import Pjob from '@/components/person/Job'
import Ptrain from '@/components/person/Train'
import Psocial from '@/components/person/Social'
import Psystem from '@/components/person/System'
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
    saveInfo(){
      this.$refs['pCensuss'].$refs['pCensus'].validate((valid) => {
        console.log(valid)
      });
    }
  },
  components: {
    Pcensus, Pbasic, Pjob, Ptrain, Psocial, Psystem
  }
};
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 12px;
}
.person-container{
  width: 1000px;
  margin: 0 auto;
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