<template>
     <div id="dbzhu" ref="dbzhu"></div>
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
        var myChart = this.$echarts.init(document.getElementById("dbzhu"));
        window.onresize = myChart.resize;

        var xdata = ["一星", "二星", "三星", "四星", "五星"];
        var ydata = ["1.99", "25.99", "32.85", "5.08", "1.15"];
        var ydata2 = ["1.80", "16.28", "32.85", "5.08", "1.12"];
        var option = {
          backgroundColor: "#fff0",
          legend: {
            top: 10,
            itemWidth: 9,
            itemHeight: 5,
            icon: "roundRect",
            left: "center",
            padding: 0,
            textStyle: {
              color: "#E6E6E7",
              fontSize: 14,
              padding: [2, 0, 0, 0],
            },
          },
          color: ["#00E4F2", "#6EEBFF", "#F4DA00", "#ECD206"],
          grid: {
            containLabel: true,
            left: 20,
            right: 20,
            bottom: 10,
            top: 40,
          },
          xAxis: {
            axisLabel: {
              color: "#19C3D4",
              fontSize: 12,
              interval: 0,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#04497D",
              },
              show: true,
            },
            data: xdata,
            type: "category",
          },
          yAxis: {
            axisLabel: {
              color: "#9AAEB2",
              fontSize: 14,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#04497D",
              },
              show: true,
            },
            // "name": ""
          },
          series: [
            {
              name: "未映射",
              data: ydata,
              type: "bar",
              barWidth:  5,
              itemStyle: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#092250",
                    },
                    {
                      offset: 1,
                      color: "#00E4F2",
                    },
                  ],
                },
              },
              label: {
                show: false,
              },
            },
            // {
            //   data: [1, 1, 1, 1, 1, 1, 1, 1],
            //   type: "pictorialBar",
            //   barMaxWidth: "20",
            //   symbol: "diamond",
            //   symbolOffset: ["-9", "7"],
            //   symbolSize: [15, 13],
            // },
            // {
            //   data: ydata,
            //   type: "pictorialBar",
            //   barMaxWidth: "20",
            //   symbolPosition: "end",
            //   symbol: "diamond",
            //   symbolOffset: ["-9", "-7"],
            //   symbolSize: [15, 13],
            //   zlevel: 2,
            // },
            {
              name: "已映射",
              data: ydata2,
              type: "bar",
              barWidth:  5,
              itemStyle: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#1263FF",
                    },
                    {
                      offset: 1,
                      color: "#1263FF",
                    },
                  ],
                },
              },
              label: {
                show: false,
              },
            },
            // {
            //   data: [1, 1, 1, 1, 1, 1, 1, 1],
            //   type: "pictorialBar",
            //   barMaxWidth: "20",
            //   symbol: "diamond",
            //   symbolOffset: ["9", "7"],
            //   symbolSize: [15, 13],
            // },
            // {
            //   data: ydata2,
            //   type: "pictorialBar",
            //   barMaxWidth: "20",
            //   symbolPosition: "end",
            //   symbol: "diamond",
            //   symbolOffset: ["9", "-7"],
            //   symbolSize: [15, 13],
            //   zlevel: 3,
            // },
          ],
          tooltip: {
            trigger: "axis",
            show: true,
            backgroundColor: "rgba(0,0,0,0.8)",
            borderWidth: 0,
            textStyle: { fontSize: "100%" },
            formatter: function (item) {
            // var  returnData1 =
            //     '<span style="display:inline-block;margin-right:5px;width:9px;height:5px;background:' +
            
            //     '"></span>';
            // var  returnData2 =
            //     '<span style="display:inline-block;margin-right:5px;width:9px;height:5px;background:' +
                
            //     '"></span>';
            //   //console.log(item);
            //   return (
            //     '<div style="color:#FFF">' +
            //     item[0].axisValue +
            //     "<br/>" +
            //     returnData1 +
            //     item[0].seriesName +
            //     ":" +
            //     item[0].value +
            //     "人<br/>" +
            //     returnData2 +
            //     item[3].seriesName +
            //     ":" +
            //     item[3].value +
            //     "人</div>"
            //   );
            },
          },
        };

        myChart.setOption(option);
      });
    },
  },
  mounted() {
    this.map();
  },
};
</script>
<style lang=scss scoped>
#dbzhu {
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
