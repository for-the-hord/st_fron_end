<template>
  <div class="column_bg">
    <!-- <p style="color:white">用户靶场系统类型分布</p> -->
    <!-- <p class="wei_tt"> -->
    <!-- <span class="wei_tt_1">攻击区域分布</span> -->
    <!-- <span class="wei_tt_2">0-100威胁度</span> -->
    <!-- </p> -->
    <div id="my_pie" ref="my_pie"></div>
  </div>
</template>


<script>
export default {
  props: {
    area: [],
  },
  data() {
    return {
      count: 90,
    };
  },
  methods: {
    drawmy_pie() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.my_pie); //这里是为了获得容器所在位置
        var data = [
          {
            value: 3661,
            name: "地区5",
          },
          {
            value: 5713,
            name: "地区4",
          },
          {
            value: 9938,
            name: "地区3",
          },
          {
            value: 17623,
            name: "地区2",
          },
          {
            value: 3299,
            name: "地区1",
          },
        ];
        var option = {
          backgroundColor: "#fff0",
          top: "10%",
          // title: {
          //     text: '注册资金',
          //     subtext: '2016年',
          //     x: 'center',
          //     y: 'center',
          //     textStyle: {
          //         fontWeight: 'normal',
          //         fontSize: 16
          //     }
          // },
          tooltip: {
            show: true,
            trigger: "item",
            formatter: "{b}: {c} ({d}%)",
          },
          legend: {
            // bottom: "90%",
            // left:'right',
            icon: "circle",
            textStyle: {
              color: "#fff",
            },
          },
          //   legend: {
          //     orient: "horizontal",
          //     bottom: "0%",
          //     data: ["<10w", "10w-50w", "50w-100w", "100w-500w", ">500w"],
          //   },
          series: [
            {
              type: "pie",
              radius: ["0%", "68%"],
              //   color: ["#11366A", "#1F1A5C", "#725A05", "#034C29", "#152851"],

              //   itemStyle: {
              //     normal: {
              //       color: "#fff0",
              //     },
              //     emphasis: {
              //       color: "#fff0",
              //     },
              //   },
              label: {
                normal: {
                  position: "outside",
                  formatter: `{b} `,
                  //   formatter: `{hr|}`,
                  textStyle: {
                    color: "#DADCE1",
                    fontWeight: "",
                    fontSize: 12,
                  },
                },
              },
              labelLine: {
                lineStyle: {
                  color: "#414E67",
                },
              },
              data: this.area,
            },
            {
              type: "pie",
              selectedMode: "single",
              radius: ["0%", "58%"],
              //   color: ["#11366A", "#1F1A5C", "#725A05", "#034C29", "#152851"],

              label: {
                normal: {
                  position: "inner",
                  formatter: "{d}%",

                  textStyle: {
                    color: "#fff",
                    fontWeight: "",
                    fontSize: 14,
                  },
                },
              },
              labelLine: {
                normal: {
                  show: true,
                },
              },
              data: this.area,
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
    this.drawmy_pie();
  },
};
</script>
<style lang=scss scoped>
#my_pie {
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
  background: #fff0;
  /* position: relative; */
  overflow: hidden;
}
</style>
