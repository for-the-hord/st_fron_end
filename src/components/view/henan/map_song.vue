<template>
  <div ref="agencyMap" style="width:100%;height:700px;margin-top: 50px;"></div>
</template>
<script>
import henan from "./HN.json";
import { new_map } from './big.js';

export default {
  data() {
    return {
      mapChart: null,
      pointData: [
        {
          name: '郑州市',
          agency: {
            "name": "中科大数据研究院",
            "value": 204,
            "primary": 80,
            "middle": 35,
            "sub_senior": 40,
            "senior": 9
          },
          value: [113.69040904, 34.68527802],
          itemStyle: {color: '#db2535'},
        }, {
          name: '郑州市',
          agency: {
            "name": "中资特种物流平台",
            "value": 164,
            "primary": 40,
            "middle": 35,
            "sub_senior": 40,
            "senior": 9
          },
          value: [113.75782229, 34.72901481],
          itemStyle: {color: '#4ab2e5'},
        }
      ],
      cityData: [
        {
          "name": "郑州市",
          "value": 204,
          "primary": 120,
          "middle": 35,
          "sub_senior": 40,
          "senior": 9
        },
        {
          "name": "洛阳市",
          "value": 164,
          "primary": 80,
          "middle": 35,
          "sub_senior": 40,
          "senior": 9
        },
        {
          "name": "周口市",
          "value": 164,
          "primary": 80,
          "middle": 35,
          "sub_senior": 40,
          "senior": 9
        }
      ]
    };
  },
  computed: {},
  methods: {
    initChart: function () {
      this.mapChart = this.$echarts.init(this.$refs.agencyMap);
      this.$echarts.registerMap("henan", henan);
      this.setOptions(this.mapChart);
    },
    setOptions: function (chart) {
      chart.setOption(
          {
            // title: {
            //   text: '河南省人才地图',
            //   left: 'center',
            //   top: 10,
            // },
            backgroundColor: "#fff0",
            color: "#fff",
            tooltip: {
              trigger: "item",
              color: "#fff",
              backgroundColor: "#0a23518a", //标题背景色
              borderColor: "#000000de", //边框颜色
              borderWidth: 1, //边框线宽
              padding: 5, //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
              textStyle: {
                // 提示框浮层的文本样式。
                color: "#fff",
                fontStyle: "normal",
                fontWeight: "normal",
                fontFamily: "sans-serif",
                fontSize: 14,
              },
            },
            geo: {
              show: true,
              map: "henan",
              aspectScale: 0.75,
              zoom: 1.25,
              layoutCenter: ["50%", "50%"],
              label: {
                normal: {
                  show: true,
                  color: "#fff"
                },
                emphasis: {
                  show: true,
                  color: "#fff",
                }
              },
              itemStyle: {
                normal: {
                  areaColor: '#fff0',
                  borderColor: '#35adce',
                  borderWidth: 1,
                  shadowColor: '#35adce',
                  shadowOffsetX: 0,
                  shadowOffsetY: 2
                },
                emphasis: {
                  areaColor: '#0049A6',
                }
              }
            },
            series: [
              {
                // 控制坐标落点
                name: "机构",
                type: "effectScatter",
                coordinateSystem: "geo",
                showEffectOn: "render",
                data: this.pointData,  // 地图坐标落点数据
                hoverAnimation: false,
                rippleEffect: {
                  brushType: "stroke",
                  scale: 1,   // 控制是否带有波浪纹
                  period: 1, // 控制是否带有波浪纹
                },
                symbolSize: 4,  // 坐标圆点大小
                clickable: false,
                // 控制鼠标移动到坐标圆点上显示数据
                tooltip: {
                  formatter: function (params) {
                    return `<div>
                          ${params.data.agency.name}
                         <br>总人数：${params.data.agency.value}
                         <br>助理级：${params.data.agency.primary}
                         <br>中  级：${params.data.agency.middle}
                         <br>副高级：${params.data.agency.sub_senior}
                         <br>正高级：${params.data.agency.senior}
                      </div>`
                  }
                }
              },
              {
                type: "map",
                map: "henan",
                layoutCenter: ["50%", "50%"],
                aspectScale: 0.75,
                zoom: 1.25,
                clickable: false,
                label: {
                  normal: {
                    show: true,
                    textStyle: {
                      color: '#fff'
                    }
                  },
                  emphasis: {
                    show: true,
                    textStyle: {
                      color: '#fff'
                    }
                  }
                },
                tooltip: {
                  formatter: function (params) {
                    return `<div>${params.data.name}
                          <br>总人数：${params.data.value}
                         <br>助理级：${params.data.primary}
                         <br>中  级：${params.data.middle}
                         <br>副高级：${params.data.sub_senior}
                         <br>正高级：${params.data.senior}
                      </div>`
                  }
                },
                itemStyle: {
                  normal: {
                    areaColor: '#fff0',
                    borderColor: '#35adce',
                    borderWidth: 1
                  },
                  emphasis: {
                    areaColor: '#0049A6',
                  }
                },
                // 地图数据
                data: this.cityData,
              },
            ],
          }
      )
    },
  },
  mounted() {
  },
  created() {
    // new_map().then(res=>{
    //   this.cityData = res.data.city_data;
    //   this.pointData = res.data.point_data;
    //   this.pointData.forEach((item, ind) => {
    //     item.value = JSON.parse(item.value);
    //     this.pointData[ind] = item
    //   })
    //   setTimeout(() => {
    //       this.initChart()
    //     }, 2000)
    // })
  },
};
</script>
<style scoped>
</style>
