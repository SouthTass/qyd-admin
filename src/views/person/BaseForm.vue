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
    <el-button @click="saveInfo()" type="primary">保 存</el-button>
    <Pcensus ref="Pcensus"></Pcensus>
    <Pbasic></Pbasic>
    <Pjob></Pjob>
    <Psocial></Psocial>
    <Ptrain></Ptrain>
    <Psystem></Psystem>
    <div class="footer">
      <el-button @click="saveInfo()" type="primary">保 存</el-button>
    </div>
  </div>
</template>

<script>
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
      
    };
  },
  methods: {
    async saveInfo(){
      let census = await this.$refs['Pcensus'].$refs['census'].validate()
      // if()
      console.log('census', census)
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
.footer{
  text-align: center;
  margin-top: 40px;
}
</style>