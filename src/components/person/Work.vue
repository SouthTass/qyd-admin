<template>
  <el-dialog title="信息" :visible.sync="visiable" width="830px" center>
    <table class="dialog-table" border="1">
      <tr>
        <td class="table-label">姓名</td>
        <td class="table-text">{{info.census_name}}</td>
        <td class="table-label">年龄</td>
        <td class="table-text" v-if="info.card_number">{{$dayjs().format('YYYY') - ('' + info.card_number).slice(6, 10)}}</td>
        <td class="table-label">性别</td>
        <td class="table-text" v-if="info.card_number">{{info.card_number.slice(16, 17) % 2 ? '男' : '女' }}</td>
      </tr>
      <tr>
        <td>就业状态</td><td>{{info.work_status}}</td>
        <td>户籍性质</td><td>{{info.census_domicile_type}}</td>
        <td>身份证号</td><td>{{info.card_number}}</td>
      </tr>
      <tr v-if="info.work_status == '无就业需求'">
        <td>说明</td><td colspan="5">{{info.work_desc}}</td>
      </tr>
      <template v-if="info.work_status == '单位就业'">
        <tr>
          <td>单位名称</td><td colspan="5">{{info.company_name}}</td>
        </tr>
        <tr>
          <td>单位地址</td><td colspan="5">{{info.company_address}}</td>
        </tr>
        <tr>
          <td>职业工种</td><td>{{info.work_type}}</td>
          <td>用工形式</td><td>{{info.work_shape}}</td>
          <td>单位性质</td><td>{{info.company_type}}</td>
        </tr>
        <tr>
          <td>单位联系人</td><td>{{info.contact_person}}</td>
          <td>单位联系电话</td><td>{{info.company_number}}</td>
          <td>是否公益性质</td><td>{{info.is_charitable}}</td>
        </tr>
        <tr>
          <td>单位产业</td><td colspan="5">{{info.company_industry}}</td>
        </tr>
        <tr>
          <td>劳动合同时间</td><td colspan="5">{{info.start_time}}-{{info.end_time}}</td>
        </tr>
      </template>
      <template v-if="info.work_status == '灵活就业'">
        <tr>
          <td>工作地点</td><td colspan="5">{{info.company_address}}</td>
        </tr>
        <tr>
          <td>工作内容</td><td colspan="5">{{info.work_desc}}</td>
        </tr>
      </template>
      <template v-if="info.work_status == '自主创业'">
        <tr>
          <td>创业项目名称</td><td colspan="5">{{info.accord.name}}</td>
        </tr>
        <tr>
          <td>创业项目地址</td><td colspan="5">{{info.accord.address}}{{info.accord.address_desc}}</td>
        </tr>
        <tr>
          <td>创业项目性质</td><td colspan="5">{{info.accord.type}}</td>
        </tr>
        <tr>
          <td>带动就业人数</td><td colspan="5">{{info.accord.number}}</td>
        </tr>
        <tr>
          <td>创业项目内容</td><td colspan="5">{{info.accord.desc}}</td>
        </tr>
      </template>
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
        text: '',
        desc: ''
      }
    };
  },
  methods: {
    // 打开弹窗
    show(item){
      item.accord = {
        name: "",
        address: "",
        address_desc: "",
        desc: "",
        type: "",
        number: ""
      }
      let config = {}
      if(item.work_status == '自主创业' && item.work_configs){
        config = JSON.parse(item.work_configs)
        Object.assign(item.accord, config)
      }
      this.info = item
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
.table-label{
  width: 100px
}
.table-text{
  width: 160px;
}
</style>
