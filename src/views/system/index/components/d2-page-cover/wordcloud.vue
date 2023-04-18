<template>
  <div class="bg">
    <div class="bg_tt">
      <p>热门关键词</p>
      <p style="margin-top: -5px">
        <img class="imgs" src="/image/nmind/tit.png" alt="" />
      </p>
    </div>
    <div class="bg_content">
      <div>
        <div id="char2" ref="chart2"></div>
      </div>
    </div>
  </div>
</template>
<script>
</script>
<script>
import echarts from "echarts";
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import { wordCloud } from "@/common/shoye.js";

export default {
  //   props: { wordClouds },
  data() {
    //定义需要展示的词语和数值（数值越大，字体会越大）
    return {
      myChart2: null,
      wordClouds: [],
      worddata: [
        {
          name: "Java",
          value: 2300,
          count: 2300,
        },
        {
          name: "python",
          value: 2000,
          count: 2300,
        },
        {
          name: "Java",
          value: 2300,
          count: 2300,
        },
        {
          name: "python",
          value: 2000,
          count: 2300,
        },
        {
          name: "Java",
          value: 2300,
          count: 2300,
        },
        {
          name: "js",
          value: 2000,
          count: 2300,
        },
        {
          name: "map",
          value: 400,
          count: 2300,
        },
        {
          name: "go",
          value: 100,
          count: 2300,
        },
        {
          name: "css",
          value: 200,
          count: 2300,
        },
        {
          name: "html",
          value: 2200,
          count: 2300,
        },
      ],
    };
  },
  created() {},
  mounted() {
    // console.log(this.wordClouds, "子组件接受词云");

    // if (this.wordClouds) {
    //   this.initCharts(); //调用定义词云图方法
    // }

    // console.log(this.wordClouds, "goujian");
    if (this.wordClouds != "") {
      this.initCharts(this.wordClouds); //调用定义词云图方法
    }
    wordCloud().then((res) => {
      if (res.code == "200") {
        this.wordClouds = res.data;
        // console.log(this.wordClouds, "wordClouds");
        this.wordClouds.map((e) => {
          //  console.log(e)
          e["value"] = e["count"];
        });
        // console.log(this.wordClouds, "wordCloudswordClouds");
        this.worddata = this.wordClouds;
        this.initCharts(this.wordClouds.slice(0, 20)); //调用定义词云图方法
      }
    });
  },
  methods: {
    //定义词云图并插入容器内
    initCharts(x) {
      let myChart2 = this.$echarts.init(this.$refs.chart2);
      this.myChart2 = this.$echarts.init(this.$refs.chart2);

      let dou_live_word_result = this.wordClouds;

      //   window.onresize = myChart2.resize;

      myChart2.on("click", (params) => {
        // var name = params.data.name;
        // var value = params.data.value;
        // var uniscid = params.data.uniscid;
        // console.log(name + ":" + value + ":" + uniscid);
        // console.log(params.name, "ppppp");
        sessionStorage.setItem("keys", params.name);
        this.$router.push({
          name: "/search/result",
          query: { keyword: params.name, type: 0 },
        });
      });

      //   myChart2.showLoading()
      var colorlist = ["red", "blue", "yellow"];
      myChart2.setOption({
        title: {
          x: "center",
        },
        backgroundColor: "#fff0",

        series: [
          {
            animation: true, // 默认是true  是否开启动画
            animationDuration: 3000, // 动画时长 ms
            animationDuration: function (arg) {
              // 根据 arg 对不同部分设置不同时长的动画
              // 也可以设置函数 return 3000
              return arg * 1500;
            },

            animationEasing: "linear", // 缓动动画
            animationThreshold: 10, // 动画阈值 单种动画超过10 就会关闭动画

            type: "wordCloud",
            //用来调整词之间的距离
            gridSize: 0,
            //用来调整字的大小范围
            sizeRange: [14, 45],
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            rotationRange: [0, 0],
            //随机生成字体颜色
            textStyle: {
              // color: colorlist[i],
              //   normal: {

              color: function () {
                var colors = [
                  "#56e0fd",
                  "#286e8f",
                  "#7a7340",
                  "#1a7bdb",
                  "#008cfb",
                  "#11356f",
                  "#103771",
                  "#77663c",
                  "#1b567b",
                  "#2979cc",
                  "#2b688f",
                ];
                return colors[parseInt(Math.random() * 10)];
                // return (
                //   "rgb(" +
                //   Math.round(Math.random() * 160) +
                //   ", " +
                //   Math.round(Math.random() * 160) +
                //   ", " +
                //   Math.round(Math.random() * 160) +
                //   ")"

                //     //   "rgb(" +
                //     //   5 +
                //     //   ", " +
                //     //   59 +
                //     //   ", " +
                //     //   Math.round(Math.random() * 1) +
                //     //   ")"
                // );
                //   },
              },
            },
            //位置相关设置
            left: "center",
            top: "center",
            right: null,
            bottom: null,
            width: "200%",
            height: "200%",
            //数据
            data: x,
          },
        ],
      });
      window.addEventListener("resize", function () {
        myChart2.resize();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./css.css";

.ciyuns[data-weight="1"] {
  --size: 1;
}
.ciyuns[data-weight="2"] {
  --size: 2;
}
.ciyuns[data-weight="3"] {
  --size: 3;
}
.ciyuns[data-weight="4"] {
  --size: 4;
}
.ciyuns[data-weight="5"] {
  --size: 5;
}
.ciyuns[data-weight="6"] {
  --size: 6;
}
.ciyuns[data-weight="7"] {
  --size: 7;
}
.ciyuns[data-weight="8"] {
  --size: 8;
}
.ciyuns[data-weight="9"] {
  --size: 9;
}
.ciyuns[data-weight="10"] {
  --size: 10;
}

.ciyuns {
  line-height: 40px;
  text-align: center;
  --size: 4;
  font-size: calc(var(--size) * 0.25rem + 0.5rem);
  /* ... */
}

// .ciyuns::after {
//   content: " (" attr(data-weight) ")";
//   font-size: 1rem;
// }

.ciyuns {
  display: inline-block;
  width: 25%;
  height: 40px;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}

.ciyuns:nth-child(2n + 1) {
  color: #fec300;
  font-size: 1.25em !important;
}
.ciyuns:nth-child(3n + 1) {
  color: #47e1ff;
  font-size: 1.5em !important;
}
.ciyuns:nth-child(4n + 1) {
  color: #47e1ff;
  font-size: 1em !important;
}

.ciyuns:nth-of-type(3n + 1) {
  color: #fec300;
  font-size: 1.25em;
}
.ciyuns:nth-of-type(4n + 3) {
  font-size: 1.5em;
  color: #47e1ff;
}
.ciyuns:nth-of-type(5n - 3) {
  color: #47e1ff;

  font-size: 1em;
}
.ciyuns:focus {
  outline: 1px dashed;
}

#myChart,
#char2 {
  width: 100%;
  height: 200px;
  cursor: pointer !important;
  div {
    cursor: pointer !important;
  }
  canvas {
    cursor: pointer !important;
  }

  //   display: flex;
  //   justify-items: center;
  //   justify-content: space-around;
}
.bg {
  padding: 20px;
  width: 100%;
  height: 245px;
  background-image: url("/image/nmind/yujing.png");
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
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // flex-wrap: wrap;
    // height: 220px;
    // color: white;

    .bg_c_c {
      width: 100%;

      list-style: none;
      height: 30px;
      line-height: 30px;
      font-weight: lighter;
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .tts {
        display: inline-block;
        width: 70%;
        overflow: hidden; /*超出部分隐藏*/
        white-space: nowrap; /*不换行*/
        text-overflow: ellipsis; /*超出部分文字以...显示*/
      }
      .times {
        display: inline-block;
        min-width: 25%;
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


