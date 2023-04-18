<template>
  <div class="column_bg">
    <!-- <p class="wei_tt"> -->
      <!-- <span class="wei_tt_1">用户靶场漏洞日增数量通统计</span> -->
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
        var data = ["101", "80", "58", "40", "30"];
        var className = [
          "",
          "",
          "",
          "",
          "",
        ];
        var colorList = [
          "rgb(39,93,254)",
          "rgb(39,115,254)",
          "rgb(1,155,255)",
          "rgb(23,167,244)",
          "rgb(125,235,255)",
        ];
        var defaultData = [100, 100, 100, 100, 100, 100];
        var option = {
          grid: {
            left: "5%",
            right: "5%",
            bottom: "5%",
            top: "10%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "none",
            },
            formatter: function (params) {
              return (
                params[0].name +
                "<br/>" +
                "<span style='display:inline-block;margin-right:5px;width:9px;height:9px;background-color:#00FFFF'></span>" +
                // params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' <br/>'
                params[0].seriesName +
                " : " +
                params[0].value +
                "次"
              );
            },
          },
          backgroundColor: "#fff0",
          xAxis: {
            show: false,
            type: "value",
          },
          yAxis: [
            {
              type: "category",
              inverse: true,
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#fff",
                },
              },
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              data:this.industry.x,
            },
            {
              type: "category",
              inverse: true,
              axisTick: "none",
              axisLine: "none",
              show: false,
              axisLabel: {
                textStyle: {
                  color: "#ffffff",
                  fontSize: "12",
                },
                formatter: function (value) {
                  return value + " %";
                },
              },
            //   data: data,
              data:this.industry.y,
            },
          ],
          series: [
            {
              name: "攻击次数",
              type: "bar",
              zlevel: 1,
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  color: (params) => {
                    return colorList[params.dataIndex];
                  },
                },
              },
            //    distance: 52, // 距离
              label: {
                show: true,
                position: "right", // 位置
                color: "#00FFFF",
                fontSize: 14,   
                distance: 2, // 距离
                formatter: "     {c}  ",
              }, // 柱子上方的数值
              barWidth: 8,
            //   data: data,
              data:this.industry.y,
              
            },
            {
              name: "背景",
              type: "bar",
              barWidth: 8,
              barGap: "-100%",
              data: defaultData,
              itemStyle: {
                normal: {
                  color: "#1B375E",
                  barBorderRadius: 0,
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
    //console.log(this.industry, "industry");
    this.drawMYbar();
  },
};
</script>
<style lang=scss scoped>
#MYbar {
  width: 100%;
  height: 300px;
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
    ;
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
