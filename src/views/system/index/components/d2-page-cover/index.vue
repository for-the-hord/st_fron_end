<template>
  <!-- 新版本 -->

  <div class="home_page">
    <el-row :gutter="10" type="flex" class="row-bg" justify="space-between">
      <el-col :span="3"
        ><div class="title grid-content bg-purple">
          <div class="img_tt">
            <img src="/image/nmind/eyi.png" alt="" />
          </div>
          <div class="span_tt">
            <p class="span_tt_tt">恶意软件</p>
            <!-- <p class="span_tt_body">259，4561</p> -->
            <d2-count-up
              class="span_tt_body"
              :end="Statistics.malware"
              :duration="6"
            />
            <span class="upups">
              当日
              <!-- {{ Statistics.malware_asc }} -->
              <d2-count-up
                class="span_tt_bodys"
                :end="Statistics.malware_asc"
                :duration="6"
              />
              <img
                v-if="Statistics.malware_asc != 0"
                src="/image/nmind/up.png"
                alt=""
              />
            </span>
          </div></div
      ></el-col>
      <el-col :span="3"
        ><div class="title grid-content bg-purple">
          <div class="img_tt">
            <img src="/image/nmind/wzhang.png" alt="" />
          </div>
          <div class="span_tt">
            <p class="span_tt_tt">文章</p>
            <!-- <p class="span_tt_body">259，4561</p> -->
            <d2-count-up
              class="span_tt_body"
              :end="Statistics.article"
              :duration="6"
            />
            <span class="upups">
              当日
              <!-- {{ Statistics.malware_asc }} -->
              <d2-count-up
                class="span_tt_bodys"
                :end="Statistics.article_asc"
                :duration="6"
              />
              <img
                v-if="Statistics.article_asc != 0"
                src="/image/nmind/up.png"
                alt=""
              />
            </span>
          </div></div
      ></el-col>
      <el-col :span="3"
        ><div class="title grid-content bg-purple">
          <div class="img_tt">
            <img src="/image/nmind/sjyuan.png" alt="" />
          </div>
          <div class="span_tt">
            <p class="span_tt_tt">数据源</p>
            <!-- <p class="span_tt_body">259，4561</p> -->
            <d2-count-up
              class="span_tt_body"
              :end="Statistics.source"
              :duration="6"
            />
            <span class="upups">
              当日
              <!-- {{ Statistics.malware_asc }} -->
              <d2-count-up
                class="span_tt_bodys"
                :end="Statistics.source_asc"
                :duration="6"
              />
              <img
                v-if="Statistics.source_asc != 0"
                src="/image/nmind/up.png"
                alt=""
              />
            </span>
          </div></div
      ></el-col>
      <el-col :span="3"
        ><div class="title grid-content bg-purple">
          <div class="img_tt">
            <img src="/image/nmind/zclxing.png" alt="" />
          </div>
          <div class="span_tt">
            <p class="span_tt_tt">资产</p>
            <!-- <p class="span_tt_body">259，4561</p> -->
            <d2-count-up
              class="span_tt_body"
              :end="Statistics.asset"
              :duration="6"
            />
            <span class="upups">
              当日
              <!-- {{ Statistics.malware_asc }} -->
              <d2-count-up
                class="span_tt_bodys"
                :end="Statistics.asset_asc"
                :duration="6"
              />
              <img
                v-if="Statistics.asset_asc != 0"
                src="/image/nmind/up.png"
                alt=""
              />
            </span>
          </div></div
      ></el-col>
      <el-col :span="3"
        ><div class="title grid-content bg-purple">
          <div class="img_tt">
            <img src="/image/nmind/sjian.png" alt="" />
          </div>
          <div class="span_tt">
            <p class="span_tt_tt">事件</p>
            <!-- <p class="span_tt_body">259，4561</p> -->
            <d2-count-up
              class="span_tt_body"
              :end="Statistics.event"
              :duration="6"
            />
            <span class="upups">
              当日
              <!-- {{ Statistics.malware_asc }} -->
              <d2-count-up
                class="span_tt_bodys"
                :end="Statistics.event_asc"
                :duration="6"
              />
              <img
                v-if="Statistics.event_asc != 0"
                src="/image/nmind/up.png"
                alt=""
              />
            </span>
          </div></div
      ></el-col>
      <el-col :span="3"
        ><div class="title grid-content bg-purple">
          <div class="img_tt">
            <img src="/image/nmind/ldong.png" alt="" />
          </div>
          <div class="span_tt">
            <p class="span_tt_tt">漏洞</p>
            <!-- <p class="span_tt_body">259，4561</p> -->
            <d2-count-up
              class="span_tt_body"
              :end="Statistics.leak"
              :duration="6"
            />
            <span class="upups">
              当日
              <!-- {{ Statistics.malware_asc }} -->
              <d2-count-up
                class="span_tt_bodys"
                :end="Statistics.leak_asc"
                :duration="6"
              />
              <img
                v-if="Statistics.leak_asc != 0"
                src="/image/nmind/up.png"
                alt=""
              />
            </span>
          </div></div
      ></el-col>
      <el-col :span="3"
        ><div class="title grid-content bg-purple">
          <div class="img_tt">
            <img src="/image/nmind/zzhi.png" alt="" />
          </div>
          <div class="span_tt">
            <p class="span_tt_tt">组织</p>
            <!-- <p class="span_tt_body">259，4561</p> -->
            <d2-count-up
              class="span_tt_body"
              :end="Statistics.organization"
              :duration="6"
            />
            <span class="upups">
              当日
              <!-- {{ Statistics.malware_asc }} -->
              <d2-count-up
                class="span_tt_bodys"
                :end="Statistics.organization_asc"
                :duration="6"
              />
              <img
                v-if="Statistics.organization_asc != 0"
                src="/image/nmind/up.png"
                alt=""
              />
            </span>
          </div></div
      ></el-col>
      <el-col :span="3"
        ><div class="title grid-content bg-purple">
          <div class="img_tt">
            <img src="/image/nmind/ioc.png" alt="" />
          </div>
          <div class="span_tt">
            <p class="span_tt_tt">IOC指标</p>
            <!-- <p class="span_tt_body">259，4561</p> -->
            <d2-count-up
              class="span_tt_body"
              :end="Statistics.indicator"
              :duration="6"
            />
            <span class="upups">
              当日
              <!-- {{ Statistics.malware_asc }} -->
              <d2-count-up
                class="span_tt_bodys"
                :end="Statistics.indicator_asc"
                :duration="6"
              />
              <img
                v-if="Statistics.indicator_asc != 0"
                src="/image/nmind/up.png"
                alt=""
              />
            </span>
          </div></div
      ></el-col>
    </el-row>
    <br />

    <el-row
      :gutter="1"
      type="flex"
      class="row-bg gaodu"
      justify="space-between"
    >
      <el-col :span="6" class="gaodu2" style="width:26%">
        <bg />
        <br />
        <wordcloud :wordClouds="wordClouds" />
      </el-col>
      <el-col :span="17" class="gaodu2"> <maps /></el-col>
    </el-row>
  </div>
  <!-- 新版本 -->
</template>
<script>
import { login, getMenu } from "@/common/login.js";
import { allData, wordCloud } from "@/common/shoye.js";

import { menuHeader, menuAside } from "@/menu";
// import bg from "../d2-spa/bg";
import bg from "./top10";
import wordcloud from "./wordcloud";
import maps from "./map";

import VueMatrixRaindrop from "vue-matrix-digit-rain";
// import "./digitalrain.js";

export default {
  components: {
    // VueMatrixRaindrop,
    bg,
    wordcloud,
    maps,
  },
  data() {
    return {
      timer: null,
      allmenu: [],
      input2: "",
      shows: "",
      markList: [
        { name: "资产" },
        { name: "事件" },
        { name: "组织 / 人 / 黑客" },
        { name: "漏洞" },
      ],
      Statistics: {},
      wordClouds: [],
    };
  },
  created() {
    //   debugger
    allData().then((res) => {
      //   console.log(res, "allData");
      if (res.code == "200") {
        this.Statistics = res.data;
      }
    });
    //   this.$refs('serchA')
    // console.log(this.$router, "metametametametametametametametameta");
    let ids = sessionStorage.getItem("role_id");
    getMenu(ids).then((res) => {
      let abc = res.data;
      abc.map((e) => {
        // console.log(e);
        if (e.is_power == 1) {
          this.allmenu.push(e);
        }
      });
      //   this.allmenu = res.data;
      console.log(this.allmenu, "getMenu");
      this.huoqucaidan();
      //   sessionStorage.setItem("allmenu", JSON.stringify(this.allmenu));
    });
  },
  methods: {
    getUrl() {
      return "./image/theme/d2/logo/13.png";
    },
    seT(x) {
      //   console.log(x);
      this.shows = x;
    },
    getSearch() {
      // this.$router.push('/log')
      this.$router.push({ path: "/log2" });
      //   console.log("路由跳转");
    },
    huoqucaidan() {
      // alert("执行菜单获取");
      //   let allmenu = sessionStorage.getItem("allmenu");
      //   console.log(JSON.parse(allmenu), "abcmenu");
      //   allmenu = JSON.parse(allmenu);
      let allmenu = this.allmenu;
      var sidemenu = [];
      var topmenu = [];
      if (allmenu) {
        allmenu.map((e) => {
          if (e.children) {
            sidemenu = e.children;
          }
          //  else {
          topmenu.push(e);
          //   }
        });
        // console.log(sidemenu, "sidemenu");
        // console.log(topmenu, "topmenu");
        // topmenu = [...allmenu, ...topmenu];
        // console.log(topmenu, "topmenuend");
        // console.log([...new Set(topmenu)]);
        topmenu.map((e) => {
          if (e.children) {
            delete e.children;
          }
        });
        // console.log([...new Set(topmenu)], "1111111111");
        // console.log(topmenu, "topmenu");

        let newmenu = [...new Set(topmenu)];
        // sessionStorage.setItem("newmenu", JSON.stringify(newmenu));
        localStorage.setItem("newmenu", JSON.stringify(newmenu));
        localStorage.setItem("sidemenu", JSON.stringify(sidemenu));
        // console.log(
        //   JSON.parse(sessionStorage.getItem("newmenu")),
        //   ' sessionStorage.getItem("newmenu")'
        // );
        // console.log(
        //   JSON.parse(localStorage.getItem("newmenu")),
        //   ' localStorage.getItem("newmenu")'
        // );
        // console.log(
        //   JSON.parse(localStorage.getItem("sidemenu")),
        //   ' localStorage.getItem("sidemenu")'
        // );

        // 设置顶部导航栏
        this.$store.commit(
          "d2admin/menu/headerSet",
          //   newmenu
          JSON.parse(localStorage.getItem("newmenu"))
        );
        this.$store.commit(
          "d2admin/menu/asideSet",
          //   sidemenu
          JSON.parse(localStorage.getItem("sidemenu"))
        );
      }
    },
  },
  mounted() {
    this.timer = setInterval(() => {
      allData().then((res) => {
        // console.log(res, "allData");
        if (res.code == "200") {
          this.Statistics = res.data;
        }
      });
    }, 60000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
    this.timer=null
  },
  //  演示效果
};
</script>

<style lang="scss" scoped>
@import "./page.css";
.upups {
  position: absolute;
  top: -28px;
  right: 0px;
  font-size: 12px;
  color: #42daf9ff;
  img {
    width: 8px;
  }
}
.span_tt_bodys {
  font-size: 12px;
  margin-right: 6px;
}
body {
  //   min-width: 1366px;
  background: RGBA(4, 29, 74, 1);
}
.gaodu {
  height: calc(100vh - 250px);
}
.gaodu2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
@keyframes turn {
  0% {
    -webkit-transform: rotateY(0deg);
  }
  25% {
    -webkit-transform: rotateY(90deg);
  }
  50% {
    -webkit-transform: rotateY(180deg);
  }
  75% {
    -webkit-transform: rotateY(270deg);
  }
  100% {
    -webkit-transform: rotateY(360deg);
  }
}
.home_page {
  padding: 20px;
  // background: RGBA(6, 33, 80, 1);
  background: url("/image/nmind/shouyebg.png");
  height: 95%;
  //   background-size: cover;
  //   padding: 20px;
  // width: 100%;
  // height/: 100%;
  //   background: #8bc34a;
  .span_tt {
    color: RGBA(255, 255, 255, 1);
    width: 100px;
    position: relative;

    .span_tt_body {
      color: RGBA(66, 218, 249, 1);
      font-size: 20px;
      font-weight: bold;
      margin-top: 20px;
      //   lds_type
      //   font-family: newfont
      //   font-family: mic;
    }
  }
  .img_tt {
    width: 80px;
    animation: turn 5s;
    animation-duration: 5s;
    -webkit-animation-duration: 5s;
    img {
      width: 100%;
    }
  }
  .title {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 128px;
    background: yellow;
    // #072458
    background: linear-gradient(
          to left,
          rgba(71, 225, 255, 1),
          rgba(71, 225, 255, 1)
        )
        left top no-repeat,
      // rgba(71, 225, 255, 1)
      linear-gradient(to bottom, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1))
        left top no-repeat,
      linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1))
        right top no-repeat,
      linear-gradient(to bottom, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1))
        right top no-repeat,
      linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1))
        left bottom no-repeat,
      linear-gradient(to bottom, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1))
        left bottom no-repeat,
      linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1))
        right bottom no-repeat,
      linear-gradient(to left, rgba(71, 225, 255, 1), rgba(71, 225, 255, 1))
        right bottom no-repeat;
    /*设置大小*/
    background-size: 100% 100%;
    //   border: 1px solid #013D78;
    background-image: url("/image/nmind/shujubg.png");
  }
}
.span_tt_tt {
  margin-bottom: 10px;
}
.lds_bg {
  position: absolute;
  top: 10px;
  border-radius: 50%;
  opacity: 0.5;
}
.zhanluett {
  color: red;
  font-size: 29px;
  font-weight: bold;
  margin: 50px auto;
  text-align: center;
}

.sllowblue,
.el-input-group__append {
  background-color: #0bb3ff !important;
  border: 1px solid red !important;
}
.clicks {
  position: absolute;
  width: 84px;
  top: 0;
  height: 36px;
  //   border: 1px solid red;
  left: 0;
}

.active {
  background: #409eff;
  border-radius: 4px;
  transition: all 0.8s linear;
}
.allmark {
  width: 600px;
  display: flex;

  align-items: center;
  justify-content: space-around;
  margin: 10px auto;
  .marks {
    display: inline-block;
    cursor: pointer;
    padding: 4px;
  }
  .shows {
    background: red;
  }
}

.d2-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    img {
      width: 200px;
    }
  }
  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}
 
.marks:nth-child(4):hover .san2 {
    color: #42DAF9 !important;
}
.marks:nth-child(4):hover .san {
    color: #42DAF9 !important;
}
</style>

