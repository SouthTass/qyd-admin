<template>
  <el-dialog width="67%" :visible.sync="dialogVisible" :show-close="true" class="dialog">
    <!-- 头部 -->
    <div slot="title" class="dialog-title">
      <span>题目名称</span>
      <el-button class="dialog-title-button" type="primary" @click="submitTopic">提交答案</el-button>
    </div>

    <!-- 表头 -->
    <div class="dialog-header">
      <span class="dialog-header-num">序号</span>
      <span>题目及选项</span>
    </div>

    <!-- 题目 -->
    <div class="dialog-content">
      <div class="dialog-content-item" v-for="(item, index) in list" :key="index">
        <div class="dialog-content-item-num">{{item.num}}</div>
        <div class="dialog-content-item-text">
          <p class="dialog-content-item-text-info">{{item.title}}</p>

          <!-- 如果是单选题目 -->
          <template v-if="item.type === '单选'">
            <el-radio-group v-model="item.result" class="dialog-content-item-text-container">
              <el-radio class="dialog-content-item-text-container-item"
                v-for="(radio, radio_index) in item.children" 
                :key="radio_index" :label="radio.value">{{radio.name}}</el-radio>
            </el-radio-group>
          </template>

          <!-- 如果是多选题目 -->
          <template v-if="item.type === '多选'">
            <el-checkbox-group v-model="item.result" class="dialog-content-item-text-container">
              <el-checkbox class="dialog-content-item-text-container-item"
                v-for="(checkbox, checkbox_index) in item.children" :key="checkbox_index"
                :label="checkbox.name"></el-checkbox>
            </el-checkbox-group>
          </template>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: true,
      list: [
        {
          id: 0, 
          num: 1, 
          type: '单选',
          title: '15:47 隆基股份：上半年净利49.9亿元，同比增21.30%。',  
          children: [
            {name: '正确', value: true},
            {name: '错误', value: false}
          ],
          result: false
        },
        {
          id: 0, 
          num: 2, 
          type: '多选',
          title: '这是一道多选题这是一道多选题这是一道多选题这是一道多选题这是一道多选题这是一道多选题这是一道多选题这是一道多选题这是一道多选题',  
          children: [
            {name: '选项A', value: 1},
            {name: '选项B', value: 2},
            {name: '选项C', value: 3},
            {name: '选项D', value: 4},
            {name: '选项E', value: 5},
            {name: '选项F', value: 6}
          ],
          result: []
        },
      ]
    };
  },
  methods: {
    submitTopic(){
      this.list.map((e) => {
        // 遍历this.list数组，处理成后端需要的数据
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.dialog{
  ::v-deep .el-dialog__header{
    padding-top: 13px;
  }
  ::v-deep .el-dialog__body{
    padding: 0;
  }
  .dialog-title{
    .dialog-title-button{
      float: right;
      margin-right: 3%;
    }
  }
  .dialog-header{
    line-height: 45px;
    padding: 0 20px;
    background-color: #f2f2f2;
    font-size: 16px;
    margin-top: 15px;
    .dialog-header-num{
      width: 6%;
      display: inline-block;
    }
  }
  .dialog-content{
    height: 60vh;
    overflow-x: hidden;
    overflow-y: auto;
    .dialog-content-item{
      border-bottom: 1px solid #f2f2f2;
      padding: 20px 20px 5px 20px;
      .dialog-content-item-num{
        width: 6%;
        display: inline-block;
        vertical-align: top;
      }
      .dialog-content-item-text{
        width: 92%;
        display: inline-block;
        .dialog-content-item-text-info{
          line-height: 1.5;
        }
        .dialog-content-item-text-container{
          width: 100%;
          margin-top: 15px;
          .dialog-content-item-text-container-item{
            width: 25%;
            margin-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>