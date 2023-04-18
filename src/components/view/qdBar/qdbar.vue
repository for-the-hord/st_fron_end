<template>
  <div class="column_bg">
    <p class="wei_tt">
      <span class="wei_tt_1">攻击方式频率</span>
      <span class="wei_tt_2">攻击次数</span>
    </p>
    <div id="my_bar" ref="my_bar"></div>
  </div>
</template>


<script>
export default {
  props: {
    method: {},
  },
  data() {
    return {};
  },
  created() {
    console.log(this.method, "method");
  },
  methods: {
    drawmy_column() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.my_bar); //这里是为了获得容器所在位置

        var lds_x = this.method.x;
        var lds_y = this.method.y;
        var lds_z = this.method.z;

        var xData = (function () {
          var data = [];
          for (var i = 1; i < 13; i++) {
            data.push(i + "月份");
          }
          return data;
        })();

        var legendData = [
          {
            name: "勒索软件",
            data: [1916, 450, 240, 123, 890, 1112],
          },
          {
            name: "垃圾软件",
            data: [96, 40, 40, 13, 90, 112],
          },
          {
            name: "垃圾软件11",
            data: [96, 40, 40, 13, 90, 112],
          },
          {
            name: "垃圾软件121",
            data: [96, 40, 40, 13, 90, 112],
          },
        ];
        var ceshidata = [];
        lds_x.map((e, index) => {
          lds_y.map((i, index2) => {
            if (index == index2) {
              ceshidata.push({ name: e, data: i });
            }
          });
        });
        console.log(ceshidata, "ceshidata");
        //   {
        //     name: "硕士生数",
        //     data: [9302, 3892, 2176],
        //   },
        //   {
        //     name: "普通本科生数",
        //     data: [18080, 4537, 4436],
        //   },
        //   {
        //     name: "学生总数",
        //     data: [29298],
        //   },
        // ];
        var seriesList = [];
        for (var i = 0; i < ceshidata.length; i++) {
          seriesList.push({
            type: "bar",
            name: ceshidata[i].name,
            stack: "2",
            legendHoverLink: false,
            barWidth: 30,
            itemStyle: {
              normal: {
                // color: colorList[i],
              },
            },
            label: {
              show: false,
              position: "inside",
              color: "#fff",
              //   formatter: function (params) {
              //     if (params.value == 0) {
              //       return "";
              //     } else {
              //       return params.value;
              //     }
              //   },
            },
            data: ceshidata[i].data,
          });
        }

        var option = {
          backgroundColor: "#0a2250",
          tooltip: {
            axisPointer: {
              type: "shadow",
              textStyle: {
                color: "#fff",
              },
            },
          },
          grid: {
            borderWidth: 0,
            top: 70,
            bottom: 40,
            left: 90,
            textStyle: {
              color: "#fff",
            },
          },
          legend: {
            // orient: "vertical",
            icon: "circle",
            right: "auto",
            top: "5%",
            textStyle: {
              color: "#90979c",
            },
            data: lds_x,
          },
          calculable: true,
          xAxis: [
            {
              type: "value",
              trigger: "axis",
              show: true,
              //   axisLine: {
              //     lineStyle: {
              //       color: "#fff",
              //     },
              //   },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(28, 158, 222, 1)",
                  type: "solid",
                },
              },

              splitLine: {
                show: false,
              },
              
              axisTick: {
                show: false,
              },
              splitArea: {
                show: false,
              },
              axisLabel: {
                interval: 0,
              },
              data: lds_z,
            },
          ],
          yAxis: [
            {
              type: "category",
              splitLine: {
                show: false,
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: "rgba(28, 158, 222, 1)",
                  type: "solid",
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                interval: 0,
              },
              splitArea: {
                show: false,
              },
              data: lds_z,
            },
          ],
          series: seriesList,
        };

        // 3.配置项和数据给实例化对象

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
#my_bar {
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
  }
  .wei_tt_2 {
    position: absolute;
    bottom: -8px;
    right: 0px;
    color: #a8aeba;
    margin-right: 10px;
    z-index: 999;
    font-size: 14px;
  }
}
.column_bg {
  background: #0a2250;
  position: relative;
  overflow: hidden;
  position: relative;
}
</style>
