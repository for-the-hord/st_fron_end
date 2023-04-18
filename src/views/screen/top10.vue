<template>
  <div class="bg">
    <div class="bg_tt">
      <p>预警信息</p>
      <p style="margin-top: -5px">
        <img class="imgs" src="/image/nmind/tit.png" alt="" />
      </p>
    </div>
    <div class="bg_content">
      <p class="bg_c_tt">
        <span style="float: left">标题</span
        ><span style="float: right">日期</span>
        <span style="float: right; margin-right: 72px">标签</span>
      </p>
      <ul>
        <li
          @click="gogogo(item)"
          class="bg_c_c"
          v-for="(item, index) in lists"
          :key="index"
        >
          <span class="tts" v-if="item.name_cn">
            {{ index + 1 }}、{{ item.name_cn }}</span
          >
          <span class="tts" v-if="!item.name_cn"
            >{{ index + 1 }}、{{ item.name }}</span
          >
          <!-- <el-tag type="">{{ item.label }}</el-tag> -->
          <a style="">
            <span class="ziyuanxiangmu">
              {{ item.label }}
            </span>
          </a>
          <span class="times">{{ getTime(item.created) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { top10 } from "@/common/shoye.js";

export default {
  data() {
    return {
      lists: [],
    };
  },
  created() {
    top10().then((res) => {
      this.lists = res.data.data.slice(0, 10);
    });
  },
  methods: {
    gogogo(x) {
      this.$router.push({
        path: "/index/article",
        query: { id: x.id, location_type: 3, name: x.name_cn || x.name},
      });
    },
    // 注:时间戳转时间（ios手机NaN）
    getTime(nS) {
      var date = new Date(parseInt(nS) * 1000);
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      if (mon.toString().length == 1) {
        mon = "0" + mon;
      } else {
        mon = mon;
      }
      if (day.toString().length == 1) {
        day = "0" + day;
      } else {
        day = day;
      }
      //   var hours = date.getHours();
      //   var minu = date.getMinutes();
      //   var sec = date.getSeconds();

      return mon + "-" + day + " ";
    },
  },
};
</script>
<style lang="scss" scoped>
.ziyuanxiangmu {
  // padding: 4px;
  border: 1px solid #3cc8e9;
  border-radius: 4px;
  height: 20px;
  text-align: center;
  width: 65px;
  display: inline-block;
  //   padding: 3px;
  color: #3cc8e9;
  line-height: 20px;
  font-size: 12px;
}
.tts2 {
  display: inline-block;
  border-radius: 3px solid gray;
  padding: 2px;
  background: #fff0;
}
.bg {
  padding: 20px;
  width: 100%;
  height: 51%;
  overflow: auto;
  background-image: url("/image/nmind/ciyun.png");
  // background-position: left bottom;
  background-size: 100% 100%;
  //   border-radius: 50%;RGBA(3, 40, 96, 1)
  //   position: absolute;
  //   top: 100px;
  .imgs {
    width: 80%;
  }
  ul {
    padding-inline-start: 0;
    margin-block-start: 0;
    list-style-type: none;
    margin-block-end: 0;
  }
  .bg_content {
    .bg_c_c {
      width: 100%;
      cursor: pointer;
      list-style: none;
      height: 30px;
      line-height: 30px;
      font-weight: lighter;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      .tts {
        display: inline-block;
        width: 60%;
        overflow: hidden; /*超出部分隐藏*/
        white-space: nowrap; /*不换行*/
        text-overflow: ellipsis; /*超出部分文字以...显示*/
        padding-left: 15px;
      }
      .times {
        display: inline-block;
        min-width: 80px;
        text-align: right;
        // font-family: newfont;
        padding-right: 10px;
        // font-family: 'newfont';
        // 字体图标库
        //   float: right;
        //   margin-right: 10px;
      }
    }
    //   width: 100%;
    .bg_c_c:nth-child(2n-1) {
      background: RGBA(3, 40, 96, 1);
      color: RGBA(236, 238, 242, 1);
    }
    .bg_c_c:nth-child(2n) {
      background: RGBA(0, 34, 84, 1);
      color: RGBA(236, 238, 242, 1);
    }
    .bg_c_c:hover {
      background: RGBA(9, 40, 96, 1);
      color: bisque;
    }
  }
  .bg_c_tt {
    padding-left: 10px;
    padding-right: 10px;
    //   width: 100%;
    height: 30px;
    background: RGBA(26, 74, 166, 1);
    color: rgba(255, 255, 255, 1);
    line-height: 33px;
  }
  .bg_tt {
    height: 30px;
    font-size: 14px;
    color: rgba(71, 225, 255, 1);
    text-align: left;
  }
}
</style>


