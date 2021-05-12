<template>
  <el-form ref="pTrain" 
    :inline="true" 
    :model="$root.user.job" 
    label-width="120px" class="form-container">
    <div class="form-item">
      <h3 class="form-item-title">培训求职信息</h3>
      <div class="container">
        <div>
          <el-form-item label="是否求职">
            <el-select v-model="$root.user.job.hunting" class="from-width-l1">
              <el-option v-for="item in $root.user.yesorno" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <template v-if="$root.user.job.hunting == '是'">
          <div v-for="(item, index) in $root.user.job.hunting_list" :key="`index${index}`">
            <div>
              <el-form-item :label="`求职岗位${index + 1}`">
                <el-input v-model="item.job_position"></el-input>
              </el-form-item>
              <el-form-item label="薪酬要求">
                <el-select v-model="item.job_salary" class="from-width-l1">
                  <el-option v-for="item in $root.user.item7" 
                    :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="就业区域">
                <el-select v-model="item.job_area" class="from-width-l1">
                  <el-option v-for="item in $root.user.item8" 
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
              <el-option v-for="item in $root.user.yesorno" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <template v-if="$root.user.job.skill == '是'">
          <div v-for="(item, index) in $root.user.job.skill_list" :key="index">
            <div>
              <el-form-item :label="`技能名称${index + 1}`">
                <el-input v-model="item.skill_name"></el-input>
              </el-form-item>
              <el-form-item label="技能等级">
                <el-select v-model="item.skill_level" class="from-width-l1">
                  <el-option v-for="item in $root.user.item9" 
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
  </el-form>
</template>

<script>
import config from '@/common/config'
export default {
  name: "baseform",
  data() {
    return {
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
    
  },
  methods: {
    // 增加求职岗位
    addHunting(){
      this.$root.user.job.hunting_list.push({
        job_position: "",
        job_salary: "",
        job_area: ""
      })
    },

    // 删除求职岗位
    delHunting(index){
      this.$root.user.job.hunting_list.splice(index, 1)
    },

    // 增加技能
    addSkill(){
      this.$root.user.job.skill_list.push({
        job_position: "",
        job_salary: "",
        job_area: ""
      })
    },

    // 删除技能
    delSkill(index){
      this.$root.user.job.skill_list.splice(index, 1)
    }
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