<template>
  <div class="column_bg">
    <p class="wei_tt">
      <span class="wei_tt_1"> {{ name }} </span>
      <!-- <span class="wei_tt_2">0-100威胁度</span> -->
    </p>
    <div id="MYbar" ref="MYbar"></div>
  </div>
</template>


<script>
export default {
  props: {
    industry: {},
    name: "",
  },
  data() {
    return {
      count: 90,
      newname: "",
      danwei:""
    };
  },
  created() {},
  methods: {
    drawMYbar() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.MYbar); //这里是为了获得容器所在位置

        let xLabel = ["3.26", "3.27", "3.28", "3.29", "3.30", "3.31"];
        let goToSchool = ["40", "60", "22", "85", "50", "40"];
        let goOutSchool = ["20", "50", "12", "65", "30", "60"];

        var option = {
          backgroundColor: "#181c26",
          tooltip: {
            trigger: "axis",
            backgroundColor: "#202630",
            borderColor: "#202630",
            textStyle: {
              color: "#fff",
              fontSize: 12,
            },
            axisPointer: {
              type: "line",
              lineStyle: {
                type: "solid",
              },
            },
            formatter:  (params)=> {
              return params[0].name + ":<br/>" + params[0].value +    this.danwei  ;
            },
          },

          grid: {
            top: " 15%",
            left: "15%",
            right: "10%",
            bottom: "20%",
            // containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              axisLine: {
                //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                  color: "#91aac4",
                  type: "dashed",

                },
              },
              axisLabel: {
                //坐标轴刻度标签的相关设置
                textStyle: {
                  color: "#fff",
                  padding: 16,
                  fontSize: 14,
                },
                formatter: function (data) {
                  return data;
                },
              },
              splitLine: {
                show: true,
           
                 lineStyle: {
                  type: "dashed",
                  color: "#91aac4",
                },
              },
              axisTick: {
                show: false,
              },
              data: this.industry.x,
            },
          ],
          yAxis: [
            {
              name: "",
              nameTextStyle: {
                color: "#91aac4",
                fontSize: 16,
                padding: 10,
              },
              min: 0,
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                  color: "#91aac4",
                },
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: "dashed",
                },
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: "#677879",
                  padding: 16,
                },
                formatter: (value) => {
                  if (value === 0) {
                    return value;
                  }
                  return value + `${this.industry.z}`;
                },
              },
              axisTick: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: "上学",
              type: "line",
              symbol: "circle", // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              symbolSize: 8,
              smooth: true,
              lineStyle: {
                normal: {
                  width: 2,
                  color: "#7cb19c61", // 线条颜色
                },
                // borderColor: "#c37b1f85",
              },
              itemStyle: {
                color: "#7cb19c61",
                borderColor: "#7cb19c61",
                borderWidth: 3,
                // shadowColor: "rgba(22, 137, 229)",
                shadowBlur: 14,
              },
              tooltip: {
                show: true,
              },
              areaStyle: {
                //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: this.$echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: "#283828",
                      },
                      {
                        offset: 1,
                        color: "#7cb19c61",
                      },
                    ],
                    false
                  ),
                  shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
                  shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                },
              },
              data: this.industry.y,
            },
          ],
        };

        //    var option = {
        //       backgroundColor: "#0E1327",
        //       tooltip: {
        //         formatter: "{a} <br/>{b} : {c}%",
        //       },

        //       series: [
        //         {
        //           type: "gauge",
        //           radius: "70%",
        //           startAngle: "215",
        //           endAngle: "-35",
        //           pointer: {
        //             show: false,
        //           },
        //           detail: {
        //             formatter: function (value) {
        //               var num = Math.round(value);
        //             },
        //           },
        //           data: dataArr,
        //           title: {
        //             show: false,
        //           },
        //           axisLine: {
        //             show: true,
        //             lineStyle: {
        //               color: [[1, "#073B64"]],
        //               width: 25,
        //               // shadowBlur: 15,
        //               // shadowColor: '#B0C4DE',
        //               shadowOffsetX: 0,
        //               shadowOffsetY: 0,
        //               opacity: 1,
        //             },
        //           },
        //           axisTick: {
        //             show: false,
        //           },
        //           splitLine: {
        //             show: false,
        //             length: 25,
        //             lineStyle: {
        //               color: "#00377a",
        //               width: 2,
        //               type: "solid",
        //             },
        //           },
        //           axisLabel: {
        //             show: false,
        //           },
        //           animationDuration: 4000,
        //         },
        //         {
        //           type: "gauge",
        //           radius: "70%",
        //           startAngle: "215",
        //           endAngle: 215 - (dataArr[0].value / 100) * 250,
        //           pointer: {
        //             show: false,
        //           },
        //           detail: {
        //             formatter: function (value) {},
        //           },
        //           data: dataArr,
        //           title: {
        //             show: false,
        //           },
        //           axisLine: {
        //             show: true,
        //             lineStyle: {
        //               color: [[1, "#19A5FF"]],
        //               width: 25,
        //               // shadowBlur: 15,
        //               // shadowColor: '#B0C4DE',
        //               shadowOffsetX: 0,
        //               shadowOffsetY: 0,
        //               opacity: 1,
        //             },
        //           },
        //           axisTick: {
        //             show: false,
        //           },
        //           splitLine: {
        //             show: false,
        //             length: 25,
        //             lineStyle: {
        //               color: "#00377a",
        //               width: 2,
        //               type: "solid",
        //             },
        //           },
        //           axisLabel: {
        //             show: false,
        //           },
        //           animationDuration: 4000,
        //         },
        //         {
        //           name: "灰色内圈", //刻度背景
        //           type: "gauge",
        //           z: 2,
        //           radius: "63%",
        //           startAngle: "215",
        //           endAngle: "-35",
        //           //center: ["50%", "75%"], //整体的位置设置
        //           axisLine: {
        //             // 坐标轴线
        //             lineStyle: {
        //               // 属性lineStyle控制线条样式
        //               color: [[1, "#018DFF"]],
        //               fontSize: 20,
        //               width: 2,
        //               opacity: 1, //刻度背景宽度
        //             },
        //           },
        //           splitLine: {
        //             show: false,
        //           },
        //           axisLabel: {
        //             show: false,
        //           },
        //           pointer: {
        //             show: false,
        //           },
        //           axisTick: {
        //             show: false,
        //           },
        //           detail: {
        //             show: 0,
        //           },
        //         },
        //         {
        //           name: "白色圈刻度",
        //           type: "gauge",
        //           radius: "83%",
        //           startAngle: 215, //度起始
        //           endAngle: -35, //刻度结束
        //           min: 0,
        //           max: 100,
        //           splitNumber: 4,
        //           z: 4,
        //           axisTick: {
        //             show: false,
        //           },
        //           splitLine: {
        //             length: 0, //刻度节点线长度
        //             lineStyle: {
        //               width: 2,
        //               color: "#018DFF",
        //             }, //刻度节点线
        //           },
        //           axisLabel: {
        //             color: "rgba(255,255,255,8)",
        //             fontSize: 24,
        //           }, //刻度节点文字颜色
        //           pointer: {
        //             show: false,
        //           },
        //           axisLine: {
        //             lineStyle: {
        //               opacity: 0,
        //             },
        //           },
        //           detail: {
        //             show: false,
        //           },
        //           data: [
        //             {
        //               value: 0,
        //               name: "",
        //             },
        //           ],
        //         },
        //       ],

        //     };

        // var option = {
        //     title: {
        //         show: true,
        //         text: '仪表盘'
        //     },
        //     tooltip: {
        //         formatter: "{a} <br/>{b} : {c}%"
        //     },
        //     series: [
        //         {
        //             type: 'gauge',
        //             radius: '50%',
        //             min: 0,
        //             max: 100,
        //             startAngle: 220,
        //             endAngle: -40,
        //             axisLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     width: 1,
        //                     color: [
        //                         [1, 'rgba(0,0,0,0)']
        //                     ]
        //                 }
        //             }, //仪表盘轴线
        //             axisTick: {
        //                 show: true,
        //                 lineStyle: {
        //                     color: '#000',
        //                     width: 1
        //                 },
        //                 length: -8
        //             }, //刻度样式
        //             splitLine: {
        //                 show: true,
        //                 length: -20,
        //                 lineStyle: {
        //                     color: '#000'
        //                 }
        //             }, //分隔线样式
        //             axisLabel: {
        //                 //show:false,
        //                 distance: 30,
        //                 textStyle: {
        //                     color: '#000',
        //                     fontSize: '14',
        //                     fontWeight: 'bold'
        //                 },
        //                 formatter: '{value}'
        //             },
        //             pointer: {
        //                 show: false
        //             },
        //             detail: {
        //                 show: false
        //             }
        //         },
        //         {
        //             name: '排名',
        //             type: 'gauge',
        //             radius: '60%',
        //             startAngle: 220,
        //             endAngle: -40,
        //             min: 0,
        //             max: 100,
        //             axisLine: {
        //                 show: true,
        //                 lineStyle: {
        //                     width: 6,
        //                     color: [
        //                         [
        //                             1, this.$echarts.graphic.LinearGradient(
        //                                 0, 0, 1, 0, [
        //                                     {
        //                                         offset: 0,
        //                                         color: '#f00',
        //                                     },
        //                                     {
        //                                         offset: 0.1,
        //                                         color: '#f00',
        //                                     },
        //                                     {
        //                                         offset: 0.3,
        //                                         color: '#FEA246',
        //                                     },
        //                                     {
        //                                         offset: 0.4,
        //                                         color: '#FEA246',
        //                                     },
        //                                     {
        //                                         offset: 1,
        //                                         color: '#4AC18E',
        //                                     }
        //                                 ]
        //                             )
        //                         ],
        //                     ]
        //                 }
        //             },
        //             axisTick: {
        //                 show: false,
        //             },
        //             splitLine: {
        //                 show: false
        //             },
        //             axisLabel: {
        //                 distance: -60,
        //                 color: '#000',
        //                 formatter: function(v) {
        //                     switch (v + '') {
        //                         case '0':
        //                             return '高';
        //                         case '20':
        //                             return '中';
        //                         case '40':
        //                             return '低';
        //                     }
        //                 }
        //             },
        //             title: { //标题
        //                 show: true,
        //                 offsetCenter: [0, 46], // x, y，单位px
        //                 textStyle: {
        //                     color: "#000",
        //                     fontSize: 14, //表盘上的标题文字大小
        //                     fontWeight: 400,
        //                     fontFamily: 'PingFangSC'
        //                 }
        //             },
        //             pointer: {
        //                 show: true,
        //                 width: 4,
        //                 length: '100%'
        //             },
        //             itemStyle: {
        //                 normal: {
        //                     color: 'red',
        //                     shadowBlur: 5
        //                 }
        //             },
        //             data: [{
        //                 name: '本期排名',
        //                 value: value
        //             }]
        //         },
        //         {
        //             name: '指针中心外圈',
        //             type: 'pie',
        //             legendHoverLink: false,
        //             radius: ['3%', '5%'],
        //             z: 3,
        //             hoverAnimation: false,
        //             label: {
        //                 normal: {
        //                     show: false
        //                 }
        //             },
        //             labelLine: {
        //                 normal: {
        //                     show: false
        //                 }
        //             },
        //             itemStyle: {
        //                 normal: {
        //                     color: {
        //                         type: 'radial',
        //                         x: 0.1,
        //                         y: -0.1,
        //                         r: 1,
        //                         colorStops: [{
        //                             offset: 0,
        //                             color: '#DDDDDD' // 0% 处的颜色
        //                         }, {
        //                             offset: 0.7,
        //                             color: '#1B1811' // 50% 处的颜色
        //                         }, {
        //                             offset: 0.71,
        //                             color: '#1B1811' // 51% 处的颜色
        //                         }, {
        //                             offset: 1,
        //                             color: '#1B1811' // 100% 处的颜色
        //                         }],
        //                         globalCoord: true // 缺省为 false
        //                     }
        //                 }
        //             },
        //             data: [{
        //                 value: 1,
        //                 name: '辅助饼图黑色'
        //             }],
        //         },
        //         {
        //             name: '指针中心内圈',
        //             type: 'pie',
        //             "legendHoverLink": false,
        //             "radius": ['0%', '3%'],
        //             z: 4,
        //             hoverAnimation: false,
        //             label: {
        //                 normal: {
        //                     show: false
        //                 }
        //             },
        //             labelLine: {
        //                 normal: {
        //                     show: false
        //                 }
        //             },
        //             itemStyle: {
        //                 normal: {
        //                     color: "#f00000"
        //                 }
        //             },
        //             data: [{
        //                 value: 1,
        //                 name: '辅助饼图红色'
        //             }]
        //         }
        //     ]
        // };

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }, 100);
    },
  },
  mounted() {
    if (this.industry.z != "") {
        this.danwei = this.industry.z
      this.drawMYbar();
    }
  },
};
</script>
<style lang=scss scoped>
#MYbar {
  width: 100%;
  height: 210px;
}
.wei_tt {
  width: 100%;
  height: 30px;
  color: white;
  line-height: 24px;
  z-index: 999;
  padding-top: 7px;
  background: #18191a;
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
  width: 100%;
}
</style>
