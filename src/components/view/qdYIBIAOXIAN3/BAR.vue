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
    };
  },
  created() {},
  methods: {
    drawMYbar() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.MYbar); //这里是为了获得容器所在位置

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
            formatter: function (params) {
              return params[0].name + ":<br/>" + params[0].value + "%";
            },
          },

          grid: {
            top: " 15%",
            left: "10%",
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
                  type: "dashed",
                  color: "#91aac4",
                },
              },
              axisLabel: {
                //坐标轴刻度标签的相关设置
                textStyle: {
                  color: "#91aac4",
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
                show: true,
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
                  return value + `%`;
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
                  color: "#c37b1f85", // 线条颜色
                },
                // borderColor: "#c37b1f85",
              },
              itemStyle: {
                color: "#c37b1f85",
                borderColor: "#c37b1f85",
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
                        color: "#d1976c",
                      },
                      {
                        offset: 1,
                        color: "#c37b1f85",
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

        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }, 100);
    },
  },
  mounted() {
    let abc = [];
    console.log(this.industry.y, "99999");
    this.industry.y.map((e) => {
      abc.push(parseFloat(e * 100).toFixed(2));
    });
    console.log(abc, "aaaaaa");
    this.industry.y = abc;
    setTimeout(() => {
      this.drawMYbar();
    });
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
  background: #131419;
  /* position: absolute; */
  .wei_tt_1 {
    float: left;
    font-weight: bold;
    margin-left: 10px;
    font-size: 14px;
    color: gray;
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
  border: 1px solid #1F1F24;
}
</style>
