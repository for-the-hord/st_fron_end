<template>
  <div class="column_bg">
    <p class="wei_tt">
      <span class="wei_tt_1">{{ name }}</span>
      <!-- <span class="wei_tt_2">0-100威胁度</span> -->
    </p>
    <div id="my_zhe" ref="my_zhe"></div>
  </div>
</template>


<script>
export default {
  props: {
    activity: {},
    name: "",
  },
  data() {
    return {
      count: 90,
    };
  },
  created() {
    console.log(this.activity, "activity");
  },
  methods: {
    drawmy_pie() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.my_zhe); //这里是为了获得容器所在位置
        var serlist = [];
        var colorlists = [
          "#F0BA00",
          "#5B8FF9",
          "#FD3030",
          "#725A05",
          "#034C29",
          "#1F1A5C",
        ];
        for (var i = 0; i < this.activity.x.length; i++) {
          serlist.push({
            name: this.activity.x[i],
            type: "line",
            smooth: true,
            symbolSize: 5,
            symbol: "circle", //数据交叉点样式 (实心点)
            data: this.activity.y[i],
            itemStyle: {
              normal: {
                width: 5,
                // color: "rgb(0, 255, 255)",
              },
            },
            lineStyle: {
              normal: {
                // color: "rgb(0, 255, 255)",
                width: 0.5,
              },
            },
            // areaStyle: {
            //   normal: {
            //     color: colorlists[i],
            //   },
            // },
            markLine: {
              symbol: "none",
              silent: true,
              lineStyle: { normal: { type: "dashed" } },
              label: { position: "end" },
            },
          });
        }

        var option = {
          backgroundColor: "#fff0",
          legend: {
            show: true,
            x: "center",
            top: "0%",
            y: "0",
            icon: "stack",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              color: "#1bb4f6",
            },
          },
          grid: {
            left: "10%",
            top: "15%",
            bottom: " 15%",
            right: "5%",
          },
          tooltip: {
            trigger: "axis",
            show: true,
            textStyle: {
              fontSize: 14,
              color: "#fff",
            },
            backgroundColor: "rgba(50,50,50,0.7)",
            borderWidth: 0,
          },
          dataZoom: [
            {
              show: true,
              height: 10,
              xAxisIndex: [0],
              bottom: 10,
              start: 0,
              end: 100,
              handleIcon:
                "path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z",
              handleSize: "110%",
              handleStyle: {
                color: "rgba(255, 255, 255,0.5)",
              },
              textStyle: {
                color: "#fff",
                fontSize: 10,
              },
              fillerColor: "rgba(42, 131, 223,1)",
              borderColor: "rgba(66, 130, 197,1)",
              backgroundColor: "rgba(12, 67, 124,0.5)",
              showDataShadow: false,
              brushSelect: false,
            },
            {
              type: "inside",
            },
          ],
          yAxis: {
            show: true,
            // min: 10,
            // max: 100,
            type: "value",
            nameTextStyle: {
              color: "rgba(255,255,255,0.7)",
              fontSize: 12,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(28, 158, 222, 1)",
                type: "solid",
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "rgba(28, 158, 222, 1)",
              },
            },
            axisLabel: {
              formatter: "{value}",
              color: "rgba(28, 158, 222, 1)",
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "solid",
                color: "rgba(0, 206, 209, 0.3)",
                width: 0.5,
              },
            },
          },
          xAxis: {
            show: true,
            type: "category",
            boundaryGap: false,
            nameTextStyle: {
              fontSize: 14,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(28, 158, 222, 1)",
              },
            },
            // data: this.activity.z,
          },
          series: serlist,
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
#my_zhe {
  width: 100%;
  height: 230px;
}
.wei_tt {
  width: 100%;
  height: 30px;
  color: white;
  line-height: 16px;
  z-index: 999;
  padding-top: 7px;
  background: #fff0;
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
  /* overflow: hidden; */
  width: 100%;
}
</style>
