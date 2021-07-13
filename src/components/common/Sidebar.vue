<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu" background-color="#324157" text-color="#bfcbd9" active-text-color="#20a0ff"
      unique-opened router
      :default-active="onRoutes" :collapse="collapse">
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i"
                  :index="threeItem.index">{{ threeItem.title }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                <template slot="title">
                  <i :class="subItem.icon"></i>
                  <span slot="title">{{ subItem.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
      items: [],
      option1: [
        {
          icon: "el-icon-lx-home",
          index: "1",
          title: "个人管理",
          subs: [
            {
              icon: "el-icon-user",
              index: "personbasetable",
              title: "个人管理",
            },
            {
              icon: "el-icon-c-scale-to-original",
              index: "personbasetablefamily",
              title: "家庭查询",
            },
            {
              icon: "el-icon-document-copy",
              index: "personbasetablejob",
              title: "就业查询",
            },
            {
              icon: "el-icon-warning-outline",
              index: "personbasetableerror",
              title: "异常管理",
            },
            {
              icon: "el-icon-delete",
              index: "personbasetablelogout",
              title: "注销查询",
            }
          ],
        },
        {
          icon: "el-icon-user",
          index: "personbasetableout",
          title: "外来管理",
        },
        {
          icon: "el-icon-user",
          index: "2",
          title: "企业管理",
          subs: [
            {
              icon: "el-icon-document",
              index: "companybase",
              title: "企业基本信息",
            },
            {
              icon: "el-icon-document",
              index: "companypeople",
              title: "人力资源信息",
            },
            {
              icon: "el-icon-document",
              index: "companytrain",
              title: "员工培训需求",
            },
            {
              icon: "el-icon-document",
              index: "companyrecrult",
              title: "用工招聘需求",
            },
          ],
        },
        {
          icon: "el-icon-user",
          index: "querysynt",
          title: "综合查询"
        },
        {
          icon: "el-icon-office-building",
          index: "limitsperson",
          title: "权限管理"
        }
      ],
      option2: [
        {
          icon: "el-icon-document",
          index: "companybase",
          title: "企业基本信息",
        },
        {
          icon: "el-icon-document",
          index: "companypeople",
          title: "人力资源信息",
        },
        {
          icon: "el-icon-document",
          index: "companytrain",
          title: "员工培训需求",
        },
        {
          icon: "el-icon-document",
          index: "companyrecrult",
          title: "用工招聘需求",
        }
      ]
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    },
  },
  created(){
    this.initRoute()
  },
  methods: {
    // 初始化路由
    initRoute(){
      let type = localStorage.getItem('qyd_type')
      if(type == 2){
        this.items = this.option2 
      }else{
        this.items = this.option1
      }
    }
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
