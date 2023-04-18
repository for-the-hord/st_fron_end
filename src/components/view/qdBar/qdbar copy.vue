<template>
  <div class="column_bg">
    <p class="wei_tt">
      <span class="wei_tt_1">攻击频率（组织）</span>
      <span class="wei_tt_2">攻击次数</span>
    </p>
    <div id="my_bar" ref="my_bar"></div>
  </div>
</template>


<script>
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
        let myChart = this.$echarts.init(this.$refs.my_bar); //这里是为了获得容器所在位置
        var datas = [
          "2016",
          "2017",
          "2018",
        ];
        var legendData = [
          {
            name: "博士生数",
            data: [1916, 450, 240],
          },
          {
            name: "硕士生数",
            data: [9302, 3892, 2176],
          },
          {
            name: "普通本科生数",
            data: [18080, 4537, 4436],
          },
          {
            name: "学生总数",
            data: [29298],
          },
        ];
        //var colorList = ['#009CEB', '#1665D8', '#F8E71C', '#3BAD4B'];
        var seriesList = [];
        for (var i = 0; i < legendData.length; i++) {
          seriesList.push({
            type: "bar",
            name: legendData[i].name,
            stack: "2",
            legendHoverLink: false,
            barWidth: 10,
            itemStyle: {
              normal: {
                // color: colorList[i],
              },
            },
            label: {
              show: true,
              position: "outside",
              color: "#fff",
             //   formatter: function (params) {
            //     if (params.value == 0) {
            //       return "";
            //     } else {
            //       return params.value;
            //     }
            //   },
            },
            data: legendData[i].data,
          });
        }
       var option = {
          backgroundColor: "#0a2250",
          tooltip: {
            show: true,
          },
          legend: [
            {
              left: "10%",
              top: "7%",
              icon: "react",
              itemWidth: 14,
              itemHeight: 14,
              textStyle: {
                color: "#fff",
              },
              data: ["博士生数", "硕士生数", "普通本科生数", "学生总数"],
            },
          ],
          grid: {
            containLabel: true,
            top: "30%",
            left: "0%",
            right: "0%",
            bottom: "0%",
           },
          xAxis: {
            show: false,
          },
          yAxis: [
            {
              inverse: true,
              data: datas,
              axisLabel: {
                margin: 140,
                fontSize: 10,
                align: "right",
                color: "#000",
                width:100,
                nterval: 0, //强制显示文字
                rich: {
                  a1: {
                    color: "#fff",
                    backgroundColor: "#FF4431",
                    width: 14,
                    height: 14,
                    align: "center",
                    borderRadius: 2,
                  },
                  a2: {
                    color: "#fff",
                    backgroundColor: "#F08228",
                    width: 14,
                    height: 14,
                    align: "center",
                    borderRadius: 2,
                  },
                  a3: {
                    color: "#fff",
                    backgroundColor: "#43A92C",
                    width: 14,
                    height: 14,
                    align: "center",
                    borderRadius: 2,
                  },
                },
                // formatter: function (params) {
                //   let index = datas.indexOf(params);
                //   if (index == 11) {
                //     index = 0;
                //   }
                //   index++;
                //   if (index - 1 < 3) {
                //     return [params].join("\n");
                //   } else {
                //     return ["{b|" + index + "}" + "  " + params].join("\n");
                //   }
                // },
              },
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisPointer: {
                label: {
                  show: true,
                  margin: 30,
                },
              },
            },
            {
              show: false,
              data: datas,
              axisLine: {
                show: false,
              },
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
