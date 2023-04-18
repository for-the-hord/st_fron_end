<template>
  <div class="affairs-leftBar" :class="{ affcolor1: colorClass }">
    <ul class="leftmenu">
      <el-menu
        :default-active="currentUrl"
        @select="handleSelect"
        class="el-menu-vertical-demo"
        background-color="rgba(0,0,0,0)"
        :text-color="textColor"
        active-text-color="#ffd04b"
        :default-openeds="openeds"
        :dataMenu="dataMenu"
      >
        <template v-if="dataMenu.length">
          <template v-for="item in dataMenu">
            <template
              v-if="item.children == undefined || item.children.length == 0"
            >
              <el-menu-item :index="item.url" :key="item.id">
                <img class="FBIS" :src="item.icon" alt="" />
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </template>
            <template v-else>
              <el-submenu :index="item.url ? item.url : ''" :key="item.id">
                <template slot="title">
                  <img class="FBIS" :src="item.icon" alt="" />
                  <span>{{ item.name }}</span>
                </template>
                <el-menu-item
                  :index="a.url"
                  v-for="a in item.children"
                  :key="a.id"
                >
                  <img class="FBIS" :src="a.icon" alt="" />
                  <span>{{ a.name }}</span>
                </el-menu-item>
              </el-submenu>
            </template>
          </template>
        </template>
      </el-menu>
    </ul>
  </div>
</template>
<script>
export default {
  name: "qdLeftNav",
  props: {
    dataMenu: {
      type: Array,
    },
  },
  data() {
    return {
      colorClass: true, //显示深色背景
      textColor: "white",
      openeds: ["0", "1", "2", "3", "4", "5"], //默认页面展开
      currentUrl: "",
    };
  },
  watch: {
    $route(to, from) {
      this.currentUrl = to.path;
      console.log(this.currentUrl);
      if (this.currentUrl == "/order/index") {
        this.colorClass = true;
        this.textColor = "white";
      } else {
        this.colorClass = false;
        this.textColor = "black";
      }
      if (to.meta.activeMenu) {
        this.currentUrl = to.meta.activeMenu;
      }
      console.log(to.path, "路由");
    },
  },
  computed: {
    // activeMenu() {
    //     const route = this.$route;
    //     const { meta, path } = route;
    //     // if set path, the sidebar will highlight the path you set
    //     if (meta.activeMenu) {
    //         return meta.activeMenu;
    //     } else {
    //         return path;
    //     }
    // },
    //动态菜单数据
    // leftNav: function() {
    //     let arr = [];
    //     this.$store.state.menuData.forEach((item) => {
    //         if (item.name == "报警设置") {
    //             arr = item.children;
    //         }
    //     });
    //     return arr;
    // },
  },
  mounted: function () {
    console.log(this.dataMenu);
    this.currentUrl = this.$route.path;
    console.log(this.$route);
    if (this.currentUrl == "/order/index") {
      this.colorClass = true;
      this.textColor = "white";
    } else {
      this.colorClass = false;
      this.textColor = "black";
    }
    if (this.$route.meta.activeMenu) {
      this.currentUrl = this.$route.meta.activeMenu;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push({
        path: key,
        params: { data: "query" },
      });
      this.currentUrl = this.$route.path;
      console.log(this.currentUrl);
    },
  },
};
</script>
<style scoped>
.leftmenu {
  box-shadow: none !important;
}
.el-menu {
  border-right: none !important;
}
.affairs-leftBar {
  float: left;
  width: 258px;
  height: calc(100vh - 81px);
  overflow: auto;
  margin-right: 0px;
  margin-top: 0px;
  background-color: var(--mainColor);
}
.affcolor1 {
  background: linear-gradient(
    0deg,
    rgba(6, 20, 46, 1) 0%,
    rgba(5, 28, 68, 1) 100%
  );
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}
.affcolor2 {
  background-color: var(--mainColor);
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
}
.leftmenu {
  width: 250px;
  height: calc(100vh - 100px);
  box-shadow: 0px 1px 2px 0px rgba(18, 122, 239, 0.16);
}
.affairs-leftBar ul {
  margin-top: 18px;
}

.affairs-leftBar li {
  line-height: 44px;
  cursor: pointer;
  margin-bottom: 10px;
  font-size: 14px;
  color: var(--multipleColor);
}

.affairs-leftBar li a {
  color: var(--tableText);
  display: block;
  padding-left: 18px;
}

.affairs-leftBar li .secondCase a {
  padding-left: 53px;
}

.affairs-leftBar li i {
  font-size: 16px;
  vertical-align: middle;
  margin-right: 8px;
}

.affairs-leftBar li span {
  font-size: 14px;
  vertical-align: middle;
}

.affairs-leftBar li a:hover {
  color: var(--multipleColor);
  background-color: var(--hoverColor);
}
.secondCase b {
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid #aeb9db;
  font-size: 0;
  margin-right: 20px;
}
.affairs-leftBar li a:hover b {
  background: var(--multipleColor);
  border: 1px solid var(--multipleColor);
}
.FBIS {
  width: 16px;
  height: 16px;
}
.el-submenu__title{
    margin-bottom: 20px;

}
</style>
