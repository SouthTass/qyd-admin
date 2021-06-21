<template>
  <el-form ref="pSystem" 
    :inline="true"
    :model="$root.user.record"
    label-width="120px" 
    class="form-container">
    <div class="form-item">
      <h3 class="form-item-title">社会保险信息</h3>
      <div class="container">
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
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
};
</script>

<style lang="scss" scoped>
.container{
  padding-bottom: 12px;
}
</style>