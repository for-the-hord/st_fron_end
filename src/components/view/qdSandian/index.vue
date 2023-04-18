<template>
  <div class="column_bg">
    <div id="my_zhe" ref="my_zhe"></div>
  </div>
</template>

<script>
export default {
  props: {
    sandian: [],
   },
  data() {
    return {
      count: 90,
    };
  },
  methods: {
    drawmy_pie() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.my_zhe); //这里是为了获得容器所在位置
        const colorList = ['#378eff', '#31eb8b', '#ffb300', '#ff4646'];
        const option = {
          grid: {
            // left: '10%',
            // right: '5',
            height: "88%",
            width: '88%',
            top: '10',
          },
          tooltip: {
            show: true,
            formatter: function (params) {
              return `<div>
                      成绩：${params.data[0]}
                      <br>人数：${params.data[1]}
                  </div>`
            }
          },
          xAxis: {
            scale: true,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            }
          },
          yAxis: {
            scale: true,
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed"
              }
            }
          },
          series: [
            {
              type: 'scatter',
              data: this.sandian,
              itemStyle: {
                borderColor: '#555',
                normal: {
                  shadowBlur: 0,
                  shadowOffsetY: 0,
                  color: new this.$echarts.graphic.RadialGradient(0.5, 0.2, 0.5, [
                    {
                      offset: 0,
                      color: '#fff',
                    },
                    {
                      offset: 1,
                      color: colorList[2],
                    },
                  ]),
                },
              },
            }
          ]
        };
        myChart.setOption(option);
        window.addEventListener('resize', function () {
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
<style lang="scss" scoped>
#my_zhe {
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
