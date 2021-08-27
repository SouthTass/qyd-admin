<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>当前位置：登记管理</el-breadcrumb-item>
        <el-breadcrumb-item>家庭查询</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- 检索框 -->
      <div class="handle-box">
        <el-input v-model="userName" placeholder="请输入户主身份证号或姓名"
          :disabled="memberData.length > 0" class="handle-input"></el-input>
        <el-button type="primary" icon="el-icon-search" v-if="memberData.length < 1"
          @click="domicileList()">检索</el-button>
        <el-button type="primary" icon="el-icon-arrow-left" v-if="memberData.length > 0"
          @click="memberData = []">返回</el-button>
      </div>

      <!-- 户主列表 -->
      <el-table :data="domicileData" v-show="memberData.length < 1"
        border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="identity_number" label="身份证号" width="170" align="center"></el-table-column>
        <el-table-column prop="domicile_name" label="姓名" width="100"></el-table-column>
        <el-table-column label="性别" width="50" align="center">
          <template slot-scope="scope">{{$root.computedSex(scope.row.identity_number)}}</template>
        </el-table-column>
        <el-table-column label="年龄" width="50" align="center">
          <template slot-scope="scope">{{$root.computedAge(scope.row.identity_number)}}</template>
        </el-table-column>
        <el-table-column prop="domicile_address" label="居住地址"></el-table-column>
        <el-table-column prop="domicile_number" label="联系电话" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="110" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="memberList(scope.row.id)">关联成员</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 家庭成员列表 -->
      <el-table :data="memberData" v-if="memberData.length > 0" style="margin-top: 30px"
        border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="rapport" label="与户主关系" width="100" align="center"></el-table-column>
        <el-table-column prop="card_number" label="身份证号" width="170" align="center"></el-table-column>
        <el-table-column prop="census_name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="50" align="center">
          <template slot-scope="scope">{{$root.computedSex(scope.row.card_number)}}</template>
        </el-table-column>
        <el-table-column prop="date" label="年龄" width="50" align="center">
          <template slot-scope="scope">{{$root.computedAge(scope.row.card_number)}}</template>
        </el-table-column>
        <el-table-column prop="work_status" label="是否就业" width="100" align="center"></el-table-column>
        <el-table-column prop="name" label="居住地址">
          <template slot-scope="scope">
            {{scope.row.census_city}}
            {{scope.row.census_area}}
            {{scope.row.census_town}}
            {{scope.row.census_village}}
            {{scope.row.house_number}}
          </template>
        </el-table-column>
        <el-table-column prop="phone_number" label="联系电话" width="120" align="center"></el-table-column>
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" 
              @click="$refs.componentsInfo.show(scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 成员信息组件 -->
    <ComponentsInfo ref="componentsInfo"></ComponentsInfo>
  </div>
</template>

<script>
import ComponentsInfo from '@/components/person/Info'
export default {
  components: {ComponentsInfo},
  data() {
    return {
      userName: '',
      domicileData: [],
      memberData: []
    };
  },
  methods: {
    // 获取户主信息列表
    async domicileList(){
      if(!this.userName) return this.$message.error('请输入户主身份证号或姓名')
      let res = await this.$api.domicileMemberList({page_number: 1000, census_status: 1, user_name: this.userName})
      if(res.status != 0) return
      this.domicileData = res.data.list
    },

    // 获取关联成员列表
    async memberList(id){
      let res = await this.$api.domicileMemberList({page_number: 1000, census_status: 1, domicile_id: id})
      if(res.status != 0) return
      this.memberData = res.data.list
    }
  }
};
</script>

<style lang="scss" scoped>
.handle-box {
  margin-bottom: 20px;
}
.handle-input {
  width: 300px;
  display: inline-block;
  margin-right: 10px;
}
</style>