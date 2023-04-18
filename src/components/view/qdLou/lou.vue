<template>
  <div class="column_bg">
    <p class="wei_tt">
      <span class="wei_tt_1">攻击行业分布</span>
      <!-- <span class="wei_tt_2">0-100威胁度</span> -->
    </p>
    <div id="my_lou" ref="my_lou"></div>
  </div>
</template>


<script>
export default {
  props: {
    industry: [],
  },
  data() {
    return {
      count: 90,
    };
  },
  methods: {
    drawmy_pie() {
      setTimeout(() => {
        let myChart = this.$echarts.init(this.$refs.my_lou); //这里是为了获得容器所在位置
        var option = {
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c}",
            // formatter: function(d){
            //     console.log(d,'dddddddddddddd')
            // },
          },
          legend: {
            // orient: "vertical",
            icon: "circle",
            right: "auto",
            top: "5%",
            textStyle: {
              color: "#fff",
            },
          },
        //   color: ["#0099FF", "#FF7A8C", "#FFA94C", "#73A0FA", "#8167F5"],
          //   legend: {
          //     data: ["访问人数", "提交订单", "支付成功", "到店消费"],
          //     orient: "horizontal",
          //     bottom: 0,
          //     icon: "circle",
          //     itemWidth: 8,
          //     itemHeight: 8,
          //     itemGap: 20,
          //     borderRadius: 4,
          //     textStyle: {
          //       fontSize: 14,
          //     },
          //   },
          series: [
            // {
            //   name: "漏斗图",
            //   type: "funnel",
            //   left: "10%",
            //   top: "20%",
            //   width: "60%",
            //   minSize: "30%",
            //   gap: 2,
            //   label: {
            //     normal: {
            //       color: "#939AA9",
            //       position: "right",
            //       formatter: "{b} ({c})",

            //       rich: {
            //         aa: {
            //           align: "center",
            //           color: "#939AA9",
            //           fontSize: "12",
            //           lineHeight: "30",
            //         },
            //         bb: {
            //           align: "center",
            //           color: "#939AA9",
            //           fontSize: "22",
            //         },
            //       },
            //     },
            //   },
            //   labelLine: {
            //     normal: {
            //       show: false,
            //       length: 10,
            //       lineStyle: {
            //         width: 1,
            //         type: "solid",
            //       },
            //     },
            //   },
            //   itemStyle: {
            //     normal: {
            //       borderColor: "#fff",
            //       borderWidth: 0,
            //     },
            //   },
            //   data: this.industry,
            // },
            {
              name: "漏斗图",
              type: "funnel",
              left: "10%",
              top: "20%",

              width: "80%",
              height:"75%",
              minSize: "30%",
              gap: 2,
              label: {
                normal: {
                  color: "#fff",
                  show: true,
                  position: "inside",
                  textStyle: {
                    fontSize: 12,
                  },
                  formatter:"{b}" ,
            //        formatter: function(d){
            //            if(d.name=="最高值" || d.name=='最低值'){
            //                var abc = '{a|779}{b|笔}'
            //                return abc
            //            }else{
            //                return d.name
            //            }
            //     console.log(d,'dddddddddddddd')
            // },
                },
              },
              labelLine: {
                normal: {
                  length: 10,
                  lineStyle: {
                    width: 1,
                    type: "solid",
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: "#fff",
                  borderWidth: 0,
                },
              },
              data: this.industry,
            },
          ],
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
#my_lou {
  width: 100%;
  height: 350px;
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
