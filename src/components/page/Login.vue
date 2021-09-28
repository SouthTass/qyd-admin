<template>
  <div class="login-wrap">
    <div class="ms-login">
      <!-- 标题 -->
      <div class="ms-title">
        <span>后台管理系统</span>
        <div>
          <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content" size="mini">
            <el-form-item prop="username">
              <el-input v-model="param.username" placeholder="请输入账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" placeholder="请输入密码" v-model="param.password" 
                style="width: 139px"></el-input>
              <div class="login-btn">
                <el-button type="primary" @click="submitForm()" size="mini">登录</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      
      <!-- 新闻组件 -->
      <div class="info">
        <div class="info-t">
          <p class="info-title"><font>公告</font></p>
          <ul>
            <li v-for="item in 10">{{item}}、这是一条测试公告</li>
          </ul>
        </div>
        <div class="info-t">
          <p class="info-title"><font>政务活动</font></p>
          <ul>
            <li v-for="item in 10">{{item}}、这是一条测试政务活动</li>
          </ul>
        </div>
        
      </div>

      <!-- 页脚 -->
      <div class="ms-footer">Copy-Right 2001-2021</div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      param: {
        username: "chenxy",
        password: "123456",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
      },
    };
  },
  mounted(){
    this.$nextTick( e => {
      let dom = document.getElementById('app')
      dom.style['background'] = '#324157'
    })
  },
  destroyed(){
    let dom = document.getElementById('app')
    dom.style['background-image'] = 'linear-gradient(#fff, rgba(104, 147, 206, 0.5))'
  },
  methods: {
    async submitForm() {
      let validates = await this.$refs.login.validate()
      if(!validates) return
      let res = await this.$api.userLogin(this.param.username, this.param.password)
      if(res.status != 0) return
      localStorage.setItem("qyd_id", res.data.id)
      localStorage.setItem("qyd_username", res.data.name)
      localStorage.setItem("qyd_level", res.data.level)
      localStorage.setItem("qyd_type", res.data.type)
      this.$router.push('/')
    },
  },
};
</script>

<style lang="scss" scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  font-size: 20px;
  color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 800px;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.ms-content {
  width: 200px;
  display: inline-block;
  .el-form-item{
    margin-bottom: 5px;
  }
}
.login-btn {
  display: inline-block;
  margin-left: 5px;
}
.info{
  color: #000;
  display: flex;
  padding-left: 30px;
  background-color: #fff;
  .info-t{
    width: 50%;
    &:nth-child(1){
      border-right: 1px solid rgba(255, 255, 255, 0.3);
    }
    .info-title{
      width: 320px;
      padding: 15px 0 10px 0;
      font-size: 18px;
      border-bottom: 2px solid #000;
    }
    ul{
      li{
        list-style: none;
        line-height: 40px;
      }
    }
  }
}
.ms-footer{
  color: #fff;
  text-align: center;
  line-height: 30px;
}
</style>