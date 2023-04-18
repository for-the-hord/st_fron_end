<template>
  <div class="column_bg">
    <!-- <p class="wei_tt"> -->
    <!-- <span class="wei_tt_1"> {{ name }} </span> -->
    <!-- <span class="wei_tt_2">0-100威胁度</span> -->
    <!-- </p> -->
    <div id="MYbar" ref="MYbar"></div>
    <p style="font-size:14px;margin-top: 6px;">{{ tit }}</p>
  </div>
</template>


<script>
 
export default {
  props: {
    industry: {},
    name: "",
    tit: "",
    num: 0,
  },
  data() {
    return {
      count: 90,
      newname: "",
      yanse: "",
    };
  },
  created() {},
  methods: {
    drawMYbar() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.MYbar); //这里是为了获得容器所在位置
        if (this.name == "hong") {
          this.yanse = "#FA3F43";
        }
        if (this.name == "huang") {
          this.yanse = "#00F8F4";
        }
        if (this.name == "bai") {
          this.yanse = "#C2C2C2";
        }
        let abc = (this.num / 100).toFixed(2);
        var option = {
          backgroundColor: "#fff0", //背景色
          series: [
            {
              type: "liquidFill", //水位图
              radius: "90%", //显示比例
              center: ["50%", "50%"], //中心点
              amplitude: 2, //水波振幅
              data: [abc], // data个数代表波浪数
              color: [this.yanse], //波浪颜色
              backgroundStyle: {
                borderWidth: 2, //外边框
                borderColor: this.yanse, //边框颜色
                color: "#fff0", //边框内部填充部分颜色
              },
              label: {
                //标签设置
                normal: {
                  position: ["50%", "50%"],
                  formatter: `${this.num}%`, //显示文本,
                  textStyle: {
                    fontSize: "12px", //文本字号,
                    color: "#fff",
                    fontWeight:'200',
                  },
                },
              },
              outline: {
                show: false, //最外层边框显示控制
              },
            },
          ],
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }, 100);
    },
  },
  mounted() {
    // let abc = [];
    // console.log(this.industry.y, "99999");
    // this.industry.y.map((e) => {
    //   abc.push(parseFloat(e * 100).toFixed(2));
    // });
    // console.log(abc, "aaaaaa");
    // this.industry.y = abc;
    // setTimeout(() => {
    //   this.drawMYbar();
    // });
    this.drawMYbar();
  },
};
</script>
<style lang=scss scoped>
#MYbar {
  width: 100%;
  height: 60px;
}
.wei_tt {
  width: 100%;
  height: 30px;
  color: white;
  line-height: 24px;
  z-index: 999;
  padding-top: 7px;
  background: #fff0;
  /* position: absolute; */
  .wei_tt_1 {
    float: left;
    font-weight: bold;
    margin-left: 10px;
    font-size: 14px;
    color: gray;
  }
  .wei_tt_2 {
    float: right;
    color: #a8aeba;
    margin-right: 10px;
    font-size: 14px;
  }
}
.column_bg {
  background: #fff0;
  /* position: relative; */
  overflow: hidden;
  width: 100%;
  //   border: 1px solid #1f1f24;
}
</style>
