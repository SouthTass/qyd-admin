<template>
  <el-form ref="form" :inline="true" :model="form" label-width="80px" class="form-container">
    <div class="form-item">
      <h3 class="form-item-title">就业信息</h3>
      <div class="container">
        <div>
          <el-form-item label="就业状态">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in registerTypeList" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>

        <!-- 状态为灵活就业 -->
        <!-- <div>
          <el-form-item label="职业工种">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div> -->

        <!-- 状态为自主创业 -->
        <!-- <div>
          <el-form-item label="就业单位全称" class="line-height-l2">
            <el-input v-model="$root.user.value" class="from-width-l2"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="户口地址">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input v-model="$root.user.value" placeholder="请输入具体地址" style="width: 525px"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="带动就业人数" class="line-height-l2">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div> -->

        <!-- 状态为其他 -->
        <div>
          <el-form-item label="职业工种">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="用工形式">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位性质">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="单位产业">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="劳动合同时间" class="line-height-l2">
            <el-date-picker style="width: 444px"
              v-model="value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="单位联系人" class="line-height-l2">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="单位联系电话" class="line-height-l2">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="是否公益性就业" class="line-height-l2">
            <el-select v-model="value" placeholder="请选择" class="from-width-l1">
              <el-option v-for="item in gender" 
                :key="item.type" :label="item.name" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="带动就业人数" class="line-height-l2">
            <el-input v-model="form.name"></el-input>
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