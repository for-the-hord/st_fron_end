<template>
     <div id="vbar" ref="vbar"></div>
   </div>
</template>


<script>
export default {
  props: {
    activity: {},
    newName: "",
  },
  data() {
    return {
      count: 90,
    };
  },

  created() {
    console.log(this.activity, "barbarbar");
  },
  methods: {
    map() {
      setTimeout(() => {
        var myChart = this.$echarts.init(document.getElementById("vbar"));
        window.onresize = myChart.resize;
        let dataX = this.activity.x;
        let dataY = this.activity.y;
        // let dataX = [
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        //   "XX街道",
        // ]; //名称
        // let dataY = [
        //   20, 50, 15, 35, 50, 30, 40, 50, 60, 20, 50, 15, 35, 50, 30, 40, 50,
        //   60,
        // ]; //数据
        // let zoomShow = false;
        // if (dataY.length > 14) {
        //   zoomShow = true;
        // } else {
        //   zoomShow = false;
        // }
        var option = {
          backgroundColor: "#fff0",
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            top: "10%",
            right: "5%",
            left: "5%",
            bottom: "10%",
          },
          xAxis: [
            {
              //   splitLine: {
              //     show: true,
              //     interval: 4 - 2,
              //   },
              type: "category",
              data: dataX,
              axisLine: {
                lineStyle: {
                  color: "rgba(66, 192, 255, .3)",
                },
              },
              axisLabel: {
                interval: 0,
                margin: 10,
                color: "#05D5FF",
                textStyle: {
                  fontSize: 11,
                },
                rotate: "0",
              },
              axisTick: {
                //刻度
                show: false,
              },
            },
          ],
          yAxis: [
            {
              axisLabel: {
                padding: [3, 0, 0, 0],
                formatter: "{value}",
                color: "rgba(95, 187, 235, 1)",
                textStyle: {
                  fontSize: 11,
                },
              },
              axisTick: {
                show: true,
              },
              axisLine: {
                lineStyle: {
                  color: "rgba(66, 192, 255, .3)",
                },
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0)",
                },
              },
            },
          ],
          dataZoom: [
            //滚动条
            {
              show: false,
              type: "slider",
              realtime: true,
              startValue: 0,
              endValue: 14,
              xAxisIndex: [0],
              bottom: "10",
              left: "30",
              height: 10,
              borderColor: "rgba(0,0,0,0)",
              textStyle: {
                color: "#05D5FF",
              },
            },
          ],
          series: [
            {
              type: "bar",
              data: dataY,
              barWidth: "10",
              itemStyle: {
                normal: {
                  color: this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "rgba(5, 213, 255, 1)", // 0% 处的颜色
                      },
                      {
                        offset: 0.98,
                        color: "rgba(5, 213, 255, 0)", // 100% 处的颜色
                      },
                    ],
                    false
                  ),
                  shadowColor: "rgba(5, 213, 255, 1)",
                  shadowBlur: 4,
                },
              },
              label: {
                normal: {
                  show: true,
                  lineHeight: 10,
                  formatter: "{c}",
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    fontSize: 10,
                  },
                },
              },
            },
          ],
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      });
    },
  },
  mounted() {
    this.map();
  },
};
</script>
<style lang=scss scoped>
#vbar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.wei_tt {
  width: 100%;
  height: 30px;
  color: white;
  line-height: 15px;
  z-index: 999;
  /* padding-left: 20px; */
  padding-top: 7px;
  background: url("/image/mmind/bg_line.png") no-repeat;
  background-size: 100%;

  /* position: absolute; */
  .wei_tt_1 {
    float: left;
    font-weight: bold;
    margin-left: 40px;
  }
  .wei_tt_2 {
    float: right;
    color: #a8aeba;
    margin-right: 10px;
    font-size: 14px;
  }
}
.column_bg {
  /* background: #051316; */
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
