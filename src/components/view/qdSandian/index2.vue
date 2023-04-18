<template>
  <div class="column_bg">
    <div id="my_zhe" ref="my_zhe"></div>
  </div>
</template>

<script>
export default {
  props: {
    activity: {},
    heng: [],
    shu: [],
   },
  data() {
    return {
      count: 90,
    };
  },
  created() {
    console.log(this.activity, 'activity');
  },
  methods: {
    drawmy_pie() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.my_zhe); //这里是为了获得容器所在位置

        const option = {
            grid: {
            // left: "10%",
            top: "10%",
            bottom: "15%",
            // right: "5%",
          },
          title: {
            left: 'center',
            // text: '水果季度销量散点图',
            textStyle: {
              color: '#6d6',
            },
          },
          tooltip: {},
          legend: {
            show:false
            // left: 'right',
          },
          dataset: {
            source: [
                // [...['成绩'],...this.heng],
                // [...['成绩'],...this.shu]
                this.heng,
                this.shu
            //   ['quarter', '1', '2', '3', '4'],
            //   ['apple', 400, 250, 380, 320],
            //   ['banana', 100, 160, 120, 100],
            ],
          },
          xAxis: {
            type: 'category',
          },
          yAxis: {},
          series: [
            // {
            //   name: '成绩',
            //   type: 'scatter',
            //   seriesLayoutBy: 'row',
            //   symbolSize: 20,
            //   itemStyle: {
            //     color: '#178E81',
            //   },
            // },
            {
              name: '成绩',
              type: 'scatter',
              seriesLayoutBy: 'row',
              symbolSize: 20,
              itemStyle: {
                color: '#178E81',
              },
            },
          ],
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
