import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/icon.css'
import './components/common/directives'
import 'babel-polyfill'

// 引入echarts
var allecharts = require('echarts');
Vue.prototype.$allecharts = allecharts

// 引入配置文件
import baseConfig from '@/common/config'
Vue.prototype.$baseConfig = baseConfig

// 引入全局过滤器
import '@/common/filter'

// 引入默认option
import dafaultOption from '@/common/option'
Vue.prototype.$option = dafaultOption

// 引入dayjs
import Dayjs from 'dayjs'
Vue.prototype.$dayjs = Dayjs

// 引入北京市地理位置
import DefaultArea from '@/common/area'
Vue.prototype.$DefaultArea = DefaultArea

// 引入API文档
import ApiConfig from '@/api/index'
Vue.prototype.$api = ApiConfig

// 修改element-ui默认样式
Vue.use(ElementUI, {size: 'small'});
ElementUI.Dialog.props.closeOnClickModal.default = false
ElementUI.Dialog.props.closeOnPressEscape.default = false
ElementUI.Dialog.props.showClose.default = false


//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  let role = localStorage.getItem('qyd_username')
  if(!role && to.path !== '/login'){
    next('/login');
  }else{
    next()
  }
});

new Vue({
  data() {
    return{
      user: JSON.parse(JSON.stringify(baseConfig))
    }
  },
  methods: {
    // 根据身份证号码计算年龄
    computedAge(str){
      if(str){
        return this.$dayjs().format('YYYY') - str.slice(6,10)
      }else{
        return ''
      }
    },

    // 根据身份证号码计算性别
    computedSex(str){
      if(str){
        return str.slice(16, 17) % 2 ? '男' : '女'
      }else{
        return ''
      }
    },

    // 根据身份证号码计算出生日期
    computedBirthday(str){
      if(str){
        return `${str.slice(6,10)}-${str.slice(10,12)}-${str.slice(12,14)}`
      }else{
        return ''
      }
    },
  },
  router,
  render: h => h(App)
}).$mount('#app');
