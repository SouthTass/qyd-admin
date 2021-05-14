<template>
  <el-dialog title="查看个人信息" :visible.sync="visiable" width="800px" center>
    <table class="dialog-table" border="1">
      <tr style="text-align: center">
        <td colspan="6">个人信息</td>
      </tr>
      <tr>
        <td style="width: 70px">姓名</td>
        <td style="width: 180px">{{info.census_name}}</td>
        <td style="width: 70px">年龄</td>
        <td style="width: 180px">{{$dayjs().format('YYYY') - ('' + info.birthday).slice(0, 4)}}</td>
        <td style="width: 70px">性别</td>
        <td style="width: 180px">{{info.sex}}</td>
      </tr>
      <tr>
        <td>就业状态</td>
        <td>单位就业</td>
        <td>户籍性质</td>
        <td>{{info.census_domicile_type}}</td>
        <td>身份证号</td>
        <td>{{info.card_number}}</td>
      </tr>
      <tr>
        <td>联系电话</td>
        <td colspan="5">{{info.phone_number}}</td>
      </tr>
      <tr>
        <td>居住地址</td>
        <td colspan="5">{{`${info.census_city}${info.census_area}${info.census_town}${info.census_village}${info.house_number}`}}</td>
      </tr>
    </table>
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
      info: {},
      user: {
        text: '注销原因一',
        desc: ''
      }
    };
  },
  methods: {
    // 打开弹窗
    show(item){
      this.info = item
      this.visiable = true
    },

    // 注销
    logout(){
      this.$emit('success')
      this.$message.success('注销成功')
      this.visiable = false
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
</style>
