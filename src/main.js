import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题/
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import baseConfig from '@/common/config'

// 引入全局过滤器
import '@/common/filter'

import Dayjs from 'dayjs'
Vue.prototype.$dayjs = Dayjs

import DefaultArea from '@/common/area'
Vue.prototype.$DefaultArea = DefaultArea

import ApiConfig from '@/api/index'
Vue.prototype.$api = ApiConfig

Vue.use(ElementUI, {size: 'small'});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
});

new Vue({
  data() {
    return{
      user: baseConfig
    }
  },
  created(){
    this.initUserInfo()
  },
  methods: {
    // 初始化信息
    async initUserInfo(){
      // 基本信息中用身份证号码算出性别，出生日期，年龄
      let str = this.$root.user.census.card_number
      this.$root.user.census.sex = str.slice(16, 17) % 2 ? '男' : '女' 
      this.$root.user.census.birthday = `${str.slice(6,10)}-${str.slice(10,12)}-${str.slice(12,14)}`
      this.$root.user.census.age = this.$dayjs().format('YYYY') - str.slice(6,10)

      // 整理基本信息中的户口地址和居住地址
      this.$root.user.census.domicile_address.push(this.$root.user.census.domicile_city)
      this.$root.user.census.domicile_address.push(this.$root.user.census.domicile_area)
      this.$root.user.census.domicile_address.push(this.$root.user.census.domicile_town)
      this.$root.user.census.domicile_address.push(this.$root.user.census.domicile_village)
      this.$root.user.census.census_address.push(this.$root.user.census.census_city)
      this.$root.user.census.census_address.push(this.$root.user.census.census_area)
      this.$root.user.census.census_address.push(this.$root.user.census.census_town)
      this.$root.user.census.census_address.push(this.$root.user.census.census_village)

      // 工作状态work_status为自主创业时，将工作状态格式化
      if(this.$root.user.work.work_status == '自主创业'){
        this.$root.user.work.accord = JSON.parse(this.$root.user.work.work_desc)
      }
    }
  },
  router,
  render: h => h(App)
}).$mount('#app');
