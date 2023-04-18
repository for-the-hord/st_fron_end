<template>
  <div class="column_bg">
    <div id="my_zhe" ref="my_zhe" style="margin-top:0px"></div>
  </div>
</template>

<script>
export default {
  props: {
    activity: {},
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

        // const legendData = ['中科大数据研究院', '本人自己的公司名称', '系统机构平均得分']; //图例
        const legendData = this.activity.legend;
        console.log(legendData, "======lengendData")
        const average = this.activity.average.value;
        const mine = this.activity.mine.value;
        const top1 = this.activity.top1.value;
        //图例
        const color = ['#4A99FF', '#4BFFFC', '#FAB329']; //线条边框颜色

        const backgroundColor = '#fff0';

        const title = {
          //   text: '车辆雷达图',
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
          padding: 0,
          top: 30,
          left: 40,
        };
        const legend = {
          //data，就是取得每个series里面的name属性。
          // orient: 'cloumn',
          icon: 'circle', //图例形状
          padding: 0,
          bottom: 0,
          // left: 0,
          itemWidth: 12, //小圆点宽度
          itemHeight: 12, // 小圆点高度
          itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
          textStyle: {
            fontSize: 12,
            color: '#00E4FF',
          },
        };
        const tooltip = {
          show: true,
        };
        // 零信任、零故障、零隐患、零损失、韧性评价
        const indicator = [
          {
            name: '零信任',
            // max: 6000,
          },
          {
            name: '零故障',
            // max: 5000,
          },
          {
            name: '零隐患',
            // max: 5000,
          },
          {
            name: '零损失',
            // max: 5000,
          },
          {
            name: '韧性评价',
            // max: 5000,
          },
        ];
        const dataArr = [
          {
            name: legendData[0],
            value: top1,
            symbolSize: 8,
            symbol: 'circle',

            lineStyle: {
              width: 2,
            },
            areaStyle: {
              // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: color[0],
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0,0,0,0)',
                  },
                  {
                    offset: 1,
                    color: color[0],
                  },
                ],
                global: false,
              },
              opacity: 1, // 区域透明度
            },
          },
          {
            value: mine,
            name: legendData[1],

            symbolSize: 8,
            symbol: 'circle',
            lineStyle: {
              width: 2,
            },

            areaStyle: {
              // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: color[1],
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0,0,0,0)',
                  },
                  {
                    offset: 1,
                    color: color[1],
                  },
                ],
                global: false,
              },
              opacity: 1, // 区域透明度
            },
          },
          {
            value: average,
            name: legendData[2],
            symbolSize: 8,
            symbol: 'circle',
            lineStyle: {
              width: 2,
            },

            areaStyle: {
              // 单项区域填充样式
              color: {
                type: 'linear',
                x: 0, //右
                y: 0, //下
                x2: 1, //左
                y2: 1, //上
                colorStops: [
                  {
                    offset: 0,
                    color: color[1],
                  },
                  {
                    offset: 0.5,
                    color: 'rgba(0,0,0,0)',
                  },
                  {
                    offset: 1,
                    color: color[1],
                  },
                ],
                global: false,
              },
              opacity: 1, // 区域透明度
            },
          },
        ];

        var option = {
            grid: {
            // left: "10%",
            // top: "15%",
            // bottom: "15%",
            // right: "5%",
          },
          backgroundColor,
          color,
          title,
          legend,
          tooltip,
          radar: {
            center: ['50%', '50%'], //圆心坐标距离左边和上边的距离
            radius: ['1%', '75%'], //内外半径，不写默认是75%
            startAngle: 90, //可以旋转图形
            shape: 'polygon',
            axisName: {
              color: '#fff',
              fontSize: 12,
            },
            indicator: indicator,
            splitArea: {
              show: false, //默认显示颜色分割区域，不需要显示
            },
            axisLine: {
              show: true, //是否显示十字交叉线
              //指向外圈文本的分隔线样式
              lineStyle: {
                color: '#153269', //线条颜色
              },
            },
            axisLabel: { show: false },
            splitLine: {
              //雷达一圈圈
              show: true,
              lineStyle: {
                type: 'solid',
                color: '#113865', // 雷达一圈圈颜色分隔线颜色
                width: 1, // 分隔线线宽
              },
            },
          },
          series: [
            {
              type: 'radar',
              data: dataArr,
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
  height: 293px;
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
