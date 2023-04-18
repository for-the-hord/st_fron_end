<template>
  <div class="column_bg">
      <!-- <p>用户靶场类型分布</p> -->

    <!-- <p class="wei_tt"> -->
    <!-- <span class="wei_tt_1">{{ newName }}</span> -->
    <!-- <span class="wei_tt_2">0-100威胁度</span> -->
    <!-- </p> -->
    <div id="my_pie" ref="my_pie"></div>
  </div>
</template>

<script>
export default {
  props: {
    method: [],
    newName: "",
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    drawmy_pie() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.my_pie); //这里是为了获得容器所在位置
        var trafficWay = [
          {
            name: "攻击方式1",
            value: 543002,
          },
          {
            name: "攻击方式2",
            value: 210000,
          },
        ];

        var data = [];
        // var borderColor = ['#1978FF', '#7064FF', '#F3BC00', '#70DDA8', '#819EDA']
        // var color = ['#11366A', '#1F1A5C', '#725A05', '#034C29', '#152851']
        var shadowColor = [
          "#1978FF",
          "#7064FF",
          "#F3BC00",
          "#70DDA8",
          "#819EDA",
        ];
        for (var i = 0; i < this.method.length; i++) {
          data.push({
            value: this.method[i].value,
            name: this.method[i].name,
            itemStyle: {
              normal: {
                borderWidth: 1,
                // shadowBlur: 9,
                // borderColor: borderColor[i],
                // color: color[i],
                // shadowColor: shadowColor[i],
              },
            },
          });
        }
        var seriesPosltion = [
          {
            center: ["50%", "50%"],
            radius: ["34%", "65%"],
          },
        ];
        var seriesOption = [];
        for (let temp of seriesPosltion) {
          seriesOption.push({
            name: "",
            type: "pie",
            //clockWise: false,
            radius: ["54%", "85%"],
            center: temp.center,
            //startAngle: 0,
            top: "20%",
            // bottom: '0%',
            hoverAnimation: true,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  color: "#fff",
                  fontSize: 13,
                  align: "center",
                  lineHeight: 20,
                  //   formatter: '{a}{b}{c}{d}'

                  // fontWeight: 'bold',
                  //   formatter: (params) => {
                  //     var percent = 0;
                  //     var total = 0;
                  //     for (var i = 0; i < this.method.length; i++) {
                  //       total += this.method[i].value;
                  //     }
                  //     return params.name + "\n" + params.value;
                  //   },
                },
                labelLine: {
                  length: 20,
                  length2: 30,
                  show: true,
                  color: "#414E67",
                },
              },
            },
            data: data,
          });
        }

        var titleOption = [];
        var titlePosition = [
          {
            title: `总数`,
            unit: "60%",
            num: "16%",
          },
          {
            title: `${this.count}`,
            unit: "50%",
            num: "16%",
          },
        ];
        for (let item of titlePosition) {
          titleOption.push(
            {
              text: item.title,
              top: item.unit,
              textAlign: "center",
              left: "49.5%",
              textStyle: {
                color: "#fff",
                fontSize: 20,
                lineHeight: 18,
                fontWeight: "500",
              },
            },
            // 此处是第二个圈中的图例
            {
              textAlign: "center",
              left: "49.5%",
              textStyle: {
                color: "#fff",
                fontSize: 13,
                fontWeight: "500",
              },
            }
          );
        }
        var option = {
          backgroundColor: "#fff0",
          //   color: color,
          top: "10%",
          title: titleOption,
          tooltip: {
            show: true,
            trigger: "item",
            formatter: "{b}: {c} ({d}%)",
          },
          toolbox: {
            show: false,
          },
          legend: {
            // orient: "vertical",
            icon: "circle",
            right: "auto",
            bottom: "0",
            textStyle: {
              color: "#fff",
            },
          },
          //   formatter: function (params) {
          //     return (
          //       params[0].name +
          //       "<br/>" +
          //       "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
          //       params[0].value
          //     );
          //   },

          series: seriesOption,
        };
        myChart.setOption(option);
        window.addEventListener("resize", function () {
          myChart.resize();
        });
      }, 1);
    },
  },
  mounted() {
    //console.log(this.method, "method");
    this.method.map((e) => {
      this.count = this.count + e.value;
    });
    this.drawmy_pie();
  },
};
</script>
<style lang="scss" scoped>
#my_pie {
  width: 100%;
  height: 250px;
}
.wei_tt {
  width: 100%;
  height: 30px;
  color: white;
  line-height: 15px;
  z-index: 999;
  /* padding-left: 20px; */
  padding-top: 7px;
  background: url("/image/mmind/bg_line.png") no-repeat;
  background-size: 100%;

  /* position: absolute; */
  .wei_tt_1 {
    float: left;
    font-weight: bold;
    margin-left: 40px;
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
  overflow: hidden;
}
</style>
