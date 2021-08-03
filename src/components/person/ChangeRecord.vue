<template>
  <el-dialog :visible.sync="visiable" width="800px" center class="table-from">
    <p v-if="list.length < 1" class="none">暂无记录</p>
    <div v-for="item in list" :key="item.id" class="list">
      <p class="list-title">
        操作项目：<span class="list-title-1">{{item.description}}</span>
        操作时间：<span class="list-title-2">{{item.created_at}}</span>
        操作人员：<span class="list-title-3">{{item.operator_name}}</span>
      </p>
      <table class="dialog-table" border="1" >
        <tr>
          <th style="width: 110px" align="center">变更项目</th>
          <th style="width: 320px">变更前内容</th>
          <th style="width: 320px">变更后内容</th>
        </tr>
        <tr v-for="(e, index) in item.p" :key="index">
          <td>{{e.field_name}}</td>
          <td>{{e.last_val}}</td>
          <td>{{e.current_val}}</td>
        </tr>
      </table>
    </div>
    
    <span slot="footer" class="dialog-footer">
      <el-button @click="visiable = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visiable: false,
      list: []
    };
  },
  methods: {
    // 打开弹窗
    async show(item){
      let res = await this.$api.censusLog(item.id)
      if(res.status != 0) return
      res.data.map(e => e.p = JSON.parse(e.configs))
      this.list = res.data
      this.visiable = true
    }
  }
};
</script>

<style lang="scss" scoped>
.form-container{
  width: 750px
}
.dialog-table{
  border-width: 1px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.15);
  td{
    padding: 5px;
  }
}
.none{
  text-align: center;
  line-height: 100px;
}
.list{
  margin-bottom: 30px;
  line-height: 1.5;
  .list-title{
    span{
      display: inline-block;
      width: 150px;
    }
    .list-title-1{
      width: 70px;
    }
  }
}
th{
  text-align: left;
  padding: 5px;
}
.table-from{
  ::v-deep .el-dialog__body{
    max-height: 66vh;
    overflow-y: scroll;
  }
  ::v-deep .el-dialog{
    margin-top: 5vh!important;
  }
}
</style>
