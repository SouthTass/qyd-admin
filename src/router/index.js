import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "person" */ '../components/common/Home.vue'),
      children: [
        {
          path: '/dashboard',
          component: () => import(/* webpackChunkName: "person" */ '../components/page/Dashboard.vue'),
          meta: { title: '系统首页' }
        },
        {
          path: '/personbasetable',
          component: () => import(/* webpackChunkName: "person" */ '../views/person/BaseTable.vue'),
          meta: { title: '个人管理' }
        },
        {
          path: '/personbasetableout',
          component: () => import(/* webpackChunkName: "person" */ '../views/person/BaseTableOut.vue'),
          meta: { title: '外来人员' }
        },
        {
          path: '/personbasetablefamily',
          component: () => import(/* webpackChunkName: "person" */ '../views/person/BaseTableFamily.vue'),
          meta: { title: '家庭查询' }
        },
        {
          path: '/personbasetablejob',
          component: () => import(/* webpackChunkName: "person" */ '../views/person/BaseTableJob.vue'),
          meta: { title: '就业查询' }
        },
        {
          path: '/personbasetableerror',
          component: () => import(/* webpackChunkName: "person" */ '../views/person/BaseTableError.vue'),
          meta: { title: '异常管理' }
        },
        {
          path: '/personbasetablelogout',
          component: () => import(/* webpackChunkName: "person" */ '../views/person/BaseTableLogout.vue'),
          meta: { title: '注销管理' }
        },
        {
          path: '/companybase',
          component: () => import(/* webpackChunkName: "company" */ '../views/company/Base.vue'),
          meta: { title: '企业基本信息' }
        },
        {
          path: '/companypeople',
          component: () => import(/* webpackChunkName: "company" */ '../views/company/People.vue'),
          meta: { title: '人力资源信息' }
        },
        {
          path: '/companytrain',
          component: () => import(/* webpackChunkName: "company" */ '../views/company/Train.vue'),
          meta: { title: '企业培训需求' }
        },
        {
          path: '/companyrecrult',
          component: () => import(/* webpackChunkName: "company" */ '../views/company/Recrult.vue'),
          meta: { title: '用工招聘需求' }
        },
        {
          path: '/querysynt',
          component: () => import(/* webpackChunkName: "querysynt" */ '../views/Query/Synt.vue'),
          meta: { title: '综合查询' }
        },
        {
          path: '/limitsperson',
          component: () => import(/* webpackChunkName: "limitperson" */ '../views/limits/LimitsPerson.vue'),
          meta: { title: '账号管理' }
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "person" */ '../components/page/Login.vue'),
      meta: { title: '登录' }
    },
  ]
});
