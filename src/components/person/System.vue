<template>
  <el-form ref="system"
    :inline="true"
    :model="$root.user.record"
    label-width="125px" 
    class="form-container">
    <div class="form-item">
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