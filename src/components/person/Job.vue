<template>
  <el-form ref="pJob" 
    :inline="true" 
    :model="$root.user.work"
    :rules="rules"
    label-width="120px" class="form-container">
    <div class="form-item">
      <h3 class="form-item-title">就业信息</h3>
      <div class="container">
        <div>
          <el-form-item label="就业状态" prop="work_status">
            <el-select v-model="$root.user.work.work_status" class="from-width-l1">
              <el-option v-for="item in $root.user.work_status" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- 就业状态为无就业需求 -->
        <div v-if="$root.user.work.work_status == '无就业需求'">
          <el-form-item label="说明" prop="work_status">
            <el-select v-model="$root.user.work.work_desc" class="from-width-l1">
              <el-option v-for="item in $root.user.work_none_desc" 
                :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- 状态为灵活就业 -->
        <div v-if="$root.user.work.work_status == '灵活就业'">
          <el-form-item label="工作地点">
            <el-input v-model="$root.user.work.company_address" class="from-width-l2"></el-input>
          </el-form-item>
        </div>
        <div v-if="$root.user.work.work_status == '灵活就业'">
          <el-form-item label="工作内容">
            <el-input v-model="$root.user.work.work_desc" class="from-width-l2"
              type="textarea" :rows="6"></el-input>
          </el-form-item>
        </div>

        <!-- 状态为自主创业 -->
        <template v-if="$root.user.work.work_status == '自主创业'">
          <div>
            <el-form-item label="创业项目名称">
              <el-input v-model="$root.user.work.accord.name" class="from-width-l2"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="创业项目地址">
              <el-select v-model="$root.user.work.accord.address" class="from-width-l1" placeholder="请选择地址">
                <el-option v-for="item in $root.user.gender"
                  :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-input v-model="$root.user.work.accord.address" placeholder="请输入具体地址" style="width: 525px"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="创业项目性质">
              <el-input v-model="$root.user.work.accord.type"></el-input>
            </el-form-item>
            <el-form-item label="带动就业人数">
              <el-input v-model="$root.user.work.accord.number"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="创业项目内容">
              <el-input class="from-width-l2"
                v-model="$root.user.work.accord.type" type="textarea" :rows="5"></el-input>
            </el-form-item>
          </div>
        </template>

        <!-- 状态为其他 -->
        <template v-if="$root.user.work.work_status != '无就业需求'
          && $root.user.work.work_status != '灵活就业'
          && $root.user.work.work_status != '无业求职'
          && $root.user.work.work_status != '自主创业'">
          <div>
            <el-form-item label="职业工种" prop="work_type">
              <el-input v-model="$root.user.work.work_type"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="用工形式">
              <el-select v-model="$root.user.work.work_shape" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in $root.user.item1" 
                  :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位性质">
              <el-select v-model="$root.user.work.company_type" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in $root.user.item2" 
                  :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="单位产业">
              <el-select v-model="$root.user.work.company_industry" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in $root.user.item3" 
                  :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="劳动合同时间">
              <el-date-picker style="width: 484px"
                v-model="$root.user.work.start_end_time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="单位联系人">
              <el-input v-model="$root.user.work.contact_person"></el-input>
            </el-form-item>
            <el-form-item label="单位联系电话">
              <el-input v-model="$root.user.work.company_number"></el-input>
            </el-form-item>
            <el-form-item label="是否公益性就业">
              <el-select v-model="$root.user.work.is_charitable" placeholder="请选择" class="from-width-l1">
                <el-option v-for="item in $root.user.yesorno" 
                  :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </template>
      </div>
    </div>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      rules: {

      }
    };
  },
  mounted(){
    
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