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
    industry: [],
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

        var datas = [
        
         
          {
            value: 24,
            name: "镜像1",
            // data: [
            //   {
            //     name: "去年",
            //     value: 600,
            //   },
            //   {
            //     name: "今年",
            //     value: 500,
            //   },
            // ],
          },
          {
            value:15,
            name: "镜像2",
            // data: [
            //   {
            //     name: "去年",
            //     value: 600,
            //   },
            //   {
            //     name: "今年",
            //     value: 500,
            //   },
            // ],
          },
          {
            value: 7,
            name: "镜像3",
            // data: [
            //   {
            //     name: "去年",
            //     value: 600,
            //   },
            //   {
            //     name: "今年",
            //     value: 500,
            //   },
            // ],
          },
        ];
        var maxArr = new Array(this.industry.length).fill(4);
        var option = {
          backgroundColor: "#fff0",
          grid: {
            left: "5%",
            right: "5%",
            bottom: 0,
            top: '5%',
            containLabel: true,
          },
          tooltip: {
            trigger: "item",
            axisPointer: {
              type: "none",
            },
            formatter: function (params) {
              return params.name + " : " + params.value;
            },
          },
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
                align: "right",
                textStyle: {
                  fontSize: 12,
                  color: "#fff",
                  rich: {
                    index: {
                      color: "#fff",
                      fontWeight: "bold",
                      fontStyle: "italic",
                    },
                    name: {
                      width: 7 * 14,
                      align: "left",
                      textAlign: "left",
                    },
                  },
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
              data: datas.map((item) => item.name),
            },
            {
              type: "category",
              inverse: true,
              axisTick: "none",
              axisLine: "none",
              show: true,
              axisLabel: {
                textStyle: {
                  color: "#3196fa",
                  fontSize: "12",
                },
                formatter: "{value}",
              },
              data: this.industry.map((item) => item.value),
            },
          ],
          series: [
            {
              name: "值",
              type: "bar",
              zlevel: 1,
              itemStyle: {
                normal: {
                  // barBorderRadius: 30,
                  color: this.$echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {
                      offset: 0,
                      color: "#ffeb3bcc",
                    },
                    {
                      offset: 1,
                      color: "#ffeb3b3b",
                    },
                  ]),
                },
              },
              barWidth: 10,
              data: this.industry,
            },
            {
              name: "背景",
              type: "bar",
              barWidth: 10,
              barGap: "-100%",
               itemStyle: {
                normal: {
                  color: "#fff0",
                  // barBorderRadius: 30,
                },
              },
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
    // let abc = [];
    // console.log(this.industry.y, "99999");
    // this.industry.y.map((e) => {
    //   abc.push(parseFloat(e * 100).toFixed(2));
    // });
    // console.log(abc, "aaaaaa");
    // this.industry.y = abc;
    // setTimeout(() => {
    //   this.drawMYbar();
    // });
    this.drawMYbar();
  },
};
</script>
<style lang=scss scoped>
#MYbar {
  width: 100%;
  height: 110px;
}
.wei_tt {
  width: 100%;
  height: 30px;
  color: white;
  line-height: 24px;
  z-index: 999;
  padding-top: 7px;
  background: #fff0;
  /* position: absolute; */
  .wei_tt_1 {
    float: left;
    font-weight: bold;
    margin-left: 10px;
    font-size: 14px;
    color: white;
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
  border: 1px solid #1f1f24;
}
</style>
