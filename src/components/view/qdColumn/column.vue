<template>
  <div class="column_bg">
    <p class="wei_tt">
      <span class="wei_tt_1">组织威胁度分布</span>
      <span class="wei_tt_2">0-100威胁度</span>
    </p>
    <div id="my_column" ref="my_column"></div>
  </div>
</template>


<script>
import { mount } from "sortablejs";
export default {
  props: {
    threat: {},
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    drawmy_column() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.my_column); //这里是为了获得容器所在位置
        // var data = [50, 60, 70, 20, 30, 10];
        // var className = ["1年级", "2年级", "3年级", "4年级", "5年级", "6年级"];
        var colorList = [
          "#725A05",
          "#795548",
          "#034C29",
          "#00bcd4",
          "#C7A530",
          "#11366A",
        ];
        var option = {
          //   title: {
          //     text: "攻击组织威胁度分布",
          //     textStyle: {
          //       color: "#fff",
          //     },
          //     left: "0%",
          //     top: "10",
          //   },

          grid: {
            left: "5%",
            right: "5%",
            bottom: "-5%",
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
                "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
                // params[0].seriesName + ' : ' + Number((params[0].value.toFixed(4) / 10000).toFixed(2)).toLocaleString() + ' <br/>'
                params[0].seriesName +
                " : " +
                params[0].value
              );
            },
          },
          backgroundColor: "#0a2250",
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
              data: this.threat.x,
            },
          ],
          series: [
            {
              name: "完成率",
              type: "bar",
              zlevel: 1,
              itemStyle: {
                normal: {
                  barBorderRadius: 0,
                  // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                  //     offset: 0,
                  //     color: 'rgb(57,89,255,1)'
                  // }, {
                  //     offset: 1,
                  //     color: 'rgb(46,200,207,1)'
                  // }]),
                  color: (params) => {
                    return colorList[params.dataIndex];
                  },
                },
              },
              barWidth: 20,
              data: this.threat.y,
              label: {
                show: true,
                position: "insideBottomRight",
                distance: 10,
                fontSize: 14,
                color: "#fff",
                offset: [0, 9],
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
    console.log(this.threat, "threat2");
    this.drawmy_column();
  },
};
</script>
<style lang=scss scoped>
#my_column {
  width: 100%;
  height: 250px;
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
  background: #0a2250;
  /* position: relative; */
  overflow: hidden;
}
</style>
