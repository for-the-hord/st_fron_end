<template>
     <div id="vline" ref="vline"></div>
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
    console.log(this.$echarts, "echarts");
  },
  methods: {
    map() {
      setTimeout(() => {
        var myChart = this.$echarts.init(document.getElementById("vline"));
        window.onresize = myChart.resize;

        let fontColor = "#787878";

        let Data = [
          {
            name: "评分",
            unit: "%",
            color: "#0ae5e4",
            area: ["#09515a", "#09515a", "transparent"],
            data: this.activity.y,
          },
        //   {
        //     name: "事件",
        //     unit: " ℃",
        //     color: "#06b0ff",
        //     area: ["#096d8e", "#0e4f6a", "transparent"],
        //     data: [20, 32, 101, 34, 90],
        //   }, {
        //     name: "漏洞",
        //     unit: " ℃",
        //     color: "#06b0ff",
        //     area: ["#096d8e", "#0e4f6a", "transparent"],
        //     data: [10, 22, 81, 44,50],
        //   },
        ];
        // let Data = this.activity.y
        let _seriesData = [];
        Data.forEach((e) => {
          _seriesData.push({
            name: e.name,
            type: "line",
            // yAxisIndex: e.name == "温度" ? 0 : 1:2,
            symbol: "circle",
            symbolSize: 1,
            areaStyle: {
              color: this.$echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#096d8e',
                  },
                  {
                    offset: 0.5,
                    color: '#0e4f6a',
                  },
                  {
                    offset: 1,
                    color: 'transparent',
                  },
                ],
                false
              ),
            },
            lineStyle: {
              color: '#09515a',
              width: 2,
            },
            itemStyle: {
              color: '#09515a',
            },

            data: e.data,
          });
        });

       var option = {
          backgroundColor: "#fff0",
          grid: {
            left: "5%",
            right: "10%",
            top: "20%",
            bottom: "15%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#6a7985",
              },
            },
          },
          legend: {
            icon: "Rect",
            orient: "horizontal",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              fontSize: 12, //字体大小
              color: fontColor, //字体颜色
            },
            right: "10%", //距离右侧
            top:'10%'
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              axisLabel: {
                color: fontColor,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#2e2e2e",
                },
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              data: this.activity.x,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "数量(/个)",
              nameTextStyle: {
                color: fontColor,
              },
              axisLabel: {
                formatter: "{value}",
                color: fontColor,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#2e2e2e",
                },
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
            {
              type: "value",
            //   name: "单位/%",
              color: fontColor,
              nameTextStyle: {
                color: fontColor,
              },
              axisLabel: {
                textStyle: {
                  color: fontColor,
                },
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#2e2e2e",
                },
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
          ],
          series: _seriesData,
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
#vline {
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
