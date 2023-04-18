<template>
  <div class="column_bg">
    <p class="wei_tt">
      <span class="wei_tt_1">用户靶场漏洞日增数量通统计</span>
      <!-- <span class="wei_tt_2">0-100威胁度</span> -->
    </p>
    <div id="MYbar" ref="MYbar"></div>
  </div>
</template>


<script>
export default {
  props: {
    industry: {},
  },
  data() {
    return {
      count: 90,
    };
  },
  methods: {
    drawMYbar() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.MYbar); //这里是为了获得容器所在位置
        var option = {
          backgroundColor: "#fff0",
          barWidth: 15,
          xAxis: {
            type: "value",
            splitLine: {
              show: false,
              lineStyle: {
                // color: "rgba(255,255,255,0.2)",
                //  type: 'dashed'
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  改变x轴颜色
              show: true,
              lineStyle: {
                // color: "rgba(255,255,255,0.8)"
              },
            },

            axisLabel: {
              //  改变x轴字体颜色和大小
              show: false,
              textStyle: {
                // color: "rgba(250,250,250,0.6)",
                fontSize: 16,
              },
            },
          },
          yAxis: {
            type: "category",
            data: ["12-26", "12-27", "12-28", "12-29", "12-30"],
            splitLine: {
              show: false,
              lineStyle: {
                // color: "rgba(255,255,255,0.2)",
                //  type: 'dashed'
              },
            },
            axisTick: {
              show: false,
            },
            axisLine: {
              //  改变y轴颜色
              show: false,
            },
            axisLabel: {
              //  改变y轴字体颜色和大小
              //formatter: '{value} m³ ', //  给y轴添加单位
              textStyle: {
                color: "rgba(250,250,250,0.6)",
                fontSize: 16,
              },
            },
          },
          series: [
            {
              type: "bar",
              name: "产出",
              barWidth: 25,
              itemStyle: {
                normal: {
                  label: {
                    show: true, //开启显示
                    position: "insideRight", //在上方显示
                    textStyle: {
                      //数值样式
                      color: "#FFFFFF",
                      fontSize: 16,
                      fontWeight: 600,
                    },
                  },
                  color: this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      offset: 0,
                      color: "#1E190E",
                    },
                    {
                      offset: 1,
                      color: "#FBC953",
                    },
                  ]),
                  // barBorderRadius:15
                },
              },
              data: [19, 29, 39, 81, 29],
            },
          ],
        };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }, 1);
    },
  },
  mounted() {
    ////console.log(this.industry, "industry");
    this.drawMYbar();
  },
};
</script>
<style lang=scss scoped>
#MYbar {
  width: 100%;
  height: 200px;
}
.wei_tt {
  width: 100%;
  height: 30px;
  color: white;
  line-height: 43px;
  z-index: 999;
  padding-top: 7px;
  /* position: absolute; */
  .wei_tt_1 {
    float: left;
    font-weight: bold;
    margin-left: 10px;
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
}
</style>
