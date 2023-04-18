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
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            backgroundColor: "rgba(9, 24, 48, 0.5)",
            borderColor: "rgba(75, 253, 238, 0.4)",
            textStyle: {
              color: "#CFE3FC",
            },
            borderWidth: 1,
          },
          grid: {
            top: "15%",
            right: "5%",
            left: "8%",
            bottom: "12%",
          },
          xAxis: [
            {
              name: "月份",
              type: "category",
              data: this.industry.x,
              axisLine: {
                lineStyle: {
                  color: "#FFFFFF",
                },
              },
              axisLabel: {
                margin: 10,
                color: "#e2e9ff",
                textStyle: {
                  fontSize: 12,
                },
              },
              axisTick: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              name: " ",
              axisLabel: {
                formatter: "{value}",
                color: "#e2e9ff",
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#FFFFFF",
                },
              },
              splitLine: {
                lineStyle: {
                  color: "rgba(255,255,255,0.12)",
                },
              },
            },
          ],
          series: [
            {
              type: "bar",
              data: this.industry.y,
              barWidth: "30%",
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
                        color: "#FEC950", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FBAF2F", // 100% 处的颜色
                      },
                    ],
                    false
                  ),
                  shadowColor: "#FBAF2F",
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
                    color: "#FBAF2F",
                    fontSize: 12,
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
