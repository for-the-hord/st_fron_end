<template>
  <div
    class="d2-layout-header-aside-group"
    :style="styleLayoutMainGroup"
    :class="{ grayMode: grayActive }"
  >
    <!-- 半透明遮罩 -->
    <div class="d2-layout-header-aside-mask"></div>
    <!-- 主体内容 -->
    <div class="d2-layout-header-aside-content" flex="dir:top">
      <!-- 顶栏 -->
      <div class="m-bg">
        <div
          class="d2-theme-header"
          :style="{ opacity: this.searchActive ? 0.5 : 1 }"
          flex-box="0"
          flex
        >
          <div
            class="zhanlues"
            flex-box="1"
            style="
              min-width: 400px;
              display: flex;
              align-item: center;
              align-items: center;
              justify-content: left;
              color: white;
              font-size: 20px;
              font-weight: bold;
            "
          >
            <span  class="news" style="font-size: 30px;font-weight:bold;  margin-left:100px;margin-top:10px">数据填报系统</span>
            <!-- <img
              style="
                font-size: 30px;
                color: white;
                margin-left: 30px;
               "
              src="/image/AOne/logobg.png"
              alt=""
            /> -->
          </div>
          <!-- <router-link
          to="/index"
          :class="{'logo-group': true, 'logo-transition': asideTransition}"
          :style="{width: asideCollapse ? asideWidthCollapse : asideWidth}"
          flex-box="0">
          <img v-if="asideCollapse" :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/icon-only.png`">
          <img v-else :src="`${$baseUrl}image/theme/${themeActiveSetting.name}/logo/all.png`">
        </router-link>
        <div class="toggle-aside-btn" @click="handleToggleAside" flex-box="0">
          <d2-icon name="bars"/>
        </div> -->
          <d2-menu-header flex-box="1" />
          <!-- 顶栏右侧 -->
          <div class="d2-header-right" flex-box="0">
            <!-- 如果你只想在开发环境显示这个按钮请添加 v-if="$env === 'development'" -->
            <!-- <d2-header-search @click="handleSearchClick" /> -->
            <!-- <d2-header-log /> -->
            <d2-header-fullscreen />
            <!-- <d2-header-theme />
          <d2-header-size />
          <d2-header-locales />
          <d2-header-color /> -->
            <d2-header-user />
          </div>
        </div>
      </div>
      <!-- 下面 主体 -->
      <div class="d2-theme-container" flex-box="1" flex>
        <!-- 主体 侧边栏 -->
        <div
          v-if="dangqianluyou"
          flex-box="0"
          ref="aside"
          :class="{
            'd2-theme-container-aside': true,
            'd2-theme-container-transition': asideTransition,
          }"
          :style="{
            width: asideCollapse ? asideWidthCollapse : asideWidth,
            opacity: this.searchActive ? 0.5 : 1,
          }"
        >
          <d2-menu-side />
        </div>
        <!-- 主体 -->
        <div class="d2-theme-container-main" flex-box="1" flex>
          <!-- 搜索 -->
          <transition name="fade-scale">
            <div v-if="searchActive" class="d2-theme-container-main-layer" flex>
              <d2-panel-search ref="panelSearch" @close="searchPanelClose" />
            </div>
          </transition>
          <!-- 内容 -->
          <transition name="fade-transverse">
            <div
              v-if="!searchActive"
              class="d2-theme-container-main-layer"
              flex="dir:top"
            >
              <!-- tab -->
              <!-- <div class="d2-theme-container-main-header" flex-box="0">
                <d2-tabs />
              </div> -->
              <!-- 页面 -->
              <div class="d2-theme-container-main-body" flex-box="1">
                <transition :name="transitionActive ? 'fade-transverse' : ''">
                  <!-- <keep-alive :include="keepAlive"> -->
                  <router-view v-if="routerAlive" :key="routerViewKey" />
                  <!-- </keep-alive> -->
                </transition>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import d2MenuSide from "./components/menu-side";
import d2MenuHeader from "./components/menu-header";
import d2Tabs from "./components/tabs";
import d2HeaderFullscreen from "./components/header-fullscreen";
import d2HeaderLocales from "./components/header-locales";
import d2HeaderSearch from "./components/header-search";
import d2HeaderSize from "./components/header-size";
import d2HeaderTheme from "./components/header-theme";
import d2HeaderUser from "./components/header-user";
import d2HeaderLog from "./components/header-log";
import d2HeaderColor from "./components/header-color";
import { mapState, mapGetters, mapActions } from "vuex";
import { getMenu } from "@/common/login_system.js";

import mixinSearch from "./mixins/search";
export default {
  name: "d2-layout-header-aside",
  mixins: [mixinSearch],
  components: {
    d2MenuSide,
    d2MenuHeader,
    d2Tabs,
    d2HeaderFullscreen,
    d2HeaderLocales,
    d2HeaderSearch,
    d2HeaderSize,
    d2HeaderTheme,
    d2HeaderUser,
    d2HeaderLog,
    d2HeaderColor,
  },
  data() {
    return {
      newmenu: [],
      topmenu: [],
      allmenu: [],
      saidemenu_lei: [],
      saidemenu_lei2: [],
      // [侧边栏宽度] 正常状态
      asideWidth: "200px",
      // [侧边栏宽度] 折叠状态
      asideWidthCollapse: "65px",
      routerAlive: true,
    };
  },
  computed: {
    ...mapState("d2admin", {
      keepAlive: (state) => state.page.keepAlive,
      grayActive: (state) => state.gray.active,
      transitionActive: (state) => state.transition.active,
      asideCollapse: (state) => state.menu.asideCollapse,
      asideTransition: (state) => state.menu.asideTransition,
    }),
    ...mapGetters("d2admin", {
      themeActiveSetting: "theme/activeSetting",
    }),
    /**
     * @description 用来实现带参路由的缓存
     */
    routerViewKey() {
      // 默认情况下 key 类似 __transition-n-/foo
      // 这里的字符串操作是为了最终 key 的格式和原来相同 类似 __transition-n-__stamp-time-/foo
      const stamp = this.$route.meta[`__stamp-${this.$route.path}`] || "";
      return `${stamp ? `__stamp-${stamp}-` : ""}${this.$route.path}`;
    },
    /**
     * @description 最外层容器的背景图片样式
     */
    styleLayoutMainGroup() {
      return this.themeActiveSetting.backgroundImage
        ? {
            backgroundImage: `url('${this.$baseUrl}${this.themeActiveSetting.backgroundImage}')`,
          }
        : {};
    },
  },
  created() {
    this.allmenu = localStorage.getItem("allmenu");
    this.$store.commit(
      "d2admin/menu/headerSet",
      JSON.parse(localStorage.getItem("newmenu"))
    );
    //console.log(this.allmenu, "1111111111");

    // this.$store.commit(
    //   "d2admin/menu/headerSet",
    //   JSON.parse(localStorage.getItem("newmenu"))
    // );
    // this.$store.commit(
    //   "d2admin/menu/asideSet",
    //   JSON.parse(localStorage.getItem("sidemenu"))
    // );
  },
  provide() {
    return {
      routerRefresh: this.routerRefresh,
    };
  },
  methods: {
    huoqucaidan() {
      if (this.allmenu) {
        //console.log(this.allmenu, "allmenuallmenu");
        this.allmenu.map((e) => {
          //   this.saidemenu_lei = e.children;
          if (e.path == "/system") {
            this.saidemenu_lei2 = e.children;
            //console.log(this.saidemenu_lei2, "saidemenu_lei2saidemenu_lei2");
          }
          //   this.topmenu.push(e);
          if (e.path == "/exam") {
            this.saidemenu_lei = e.children;
            //console.log(this.saidemenu_lei, "saidemenu_leisaidemenu_lei");
          }
           if (e.path == "/agency") {
            this.saidemenu_lei3 = e.children;
            //console.log(this.saidemenu_lei, "saidemenu_leisaidemenu_lei");
          }
          this.topmenu.push(e);
          this.topmenu.map((e) => {
            if (e.children) {
              delete e.children;
            }
          });
        });

        this.newmenu = [...new Set(this.topmenu)];
        localStorage.setItem("newmenu", JSON.stringify(this.newmenu));

        this.$store.commit(
          "d2admin/menu/headerSet",
          JSON.parse(localStorage.getItem("newmenu"))
        );
      }
    },
    routerRefresh() {
      this.routerAlive = false;
      this.$nextTick(() => {
        this.routerAlive = true;
      });
    },
    ...mapActions("d2admin/menu", ["asideCollapseToggle"]),
    /**
     * 接收点击切换侧边栏的按钮
     */
    handleToggleAside() {
      this.asideCollapseToggle();
    },
  },
  watch: {
    $route: {
      handler(newValue, oldValue) {
        // //console.log(newValue, "00000000000");
        //执行代码

        if (
          newValue.matched[0].path == "/exam" ||
          newValue.matched[0].path == "/system" ||
          newValue.matched[0].path == "/agency"
        ) {
          this.dangqianluyou = true;
        } else {
          this.dangqianluyou = false;
        }
       
        setTimeout(() => {
          
          if (newValue.matched[0].path == "/exam") {
         
            this.$store.commit(
              "d2admin/menu/asideSet",
              JSON.parse(localStorage.getItem("saidemenu_lei"))
             );
          }
          if (newValue.matched[0].path == "/system") {
        
            this.$store.commit(
              "d2admin/menu/asideSet",
              JSON.parse(localStorage.getItem("saidemenu_lei2"))
             );
          }
           if (newValue.matched[0].path == "/agency") {
       
            this.$store.commit(
              "d2admin/menu/asideSet",
              JSON.parse(localStorage.getItem("saidemenu_lei3"))
             );
          }
        }, 10);
      },
      immediate: true, //true就表示会立即执行
      deep: true,
    },
    allmenu: {
      handler(newValue, oldValue) {},
    },
  },
  mounted() {
    // this.huoqucaidan();
  },
};
</script>

<style lang="scss">
// 注册主题
@import "~@/assets/style/theme/register.scss";
.zhanlues {
  //   background: url("/image/nmind/logo.png");
  background-size: 100% 100%;
  width: 0;
}
.d2-theme-header-menu {
  margin-left: 10%;
}
.news{
  background-image:-webkit-linear-gradient(bottom,#58d5e6d3,#58d5e698,); 
    -webkit-background-clip:text; 
    -webkit-text-fill-color:transparent;  
} 
</style>
