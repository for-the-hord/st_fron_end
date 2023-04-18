<template>
  <div class="column_bg" v-if="forecastOrg || forecastArea || forecastIndustry">
    <p class="wei_tt">
      <span class="wei_tt_1">事件预测</span>
      <span class="wei_tt_2"
        >该预测结果是由海量数据分析得到，仅供参考使用！</span
      >
    </p>
    <div class="myfor" v-if="forecastOrg">
      <SeeksRelationGraph ref="seeksRelationOrg" :options="userGraphOptions" />
    </div>
    <div class="myfor" v-if="forecastArea">
      <SeeksRelationGraph ref="seeksRelationArea" :options="userGraphOptions" />
    </div>
    <div v-if="forecastIndustry" class="myfor">
      <SeeksRelationGraph
        ref="seeksRelationIndustry"
        :options="userGraphOptions"
      />
    </div>
  </div>
</template>


<script>
import SeeksRelationGraph from "relation-graph";
export default {
  props: {
    forecast: {},
  },
  data() {
    return {
      forecastOrg: false,
      forecastArea: false,
      forecastIndustry: false,
      userGraphOptions: {
        // backgroundImage: "/image/nmind/for.png",
        // backgroundImageNoRepeat: true,
        layouts: [
          {
            label: "中心",
            layoutName: "tree",
            layoutClassName: "seeks-layout-center",
            defaultJunctionPoint: "border",
            defaultNodeShape: 0,
            defaultLineShape: 1,
            max_per_height: "60",
            levelDistance: "200,300,500,500",
            centerOffset_x: 0,
            centerOffset_y: 0,
            from: "left",
          },
        ],
        disableDragNode:false,
        disableZoom:false,
        defaultNodeBorderWidth: 0,
        defaultNodeShape: 1,
        allowShowMiniNameFilter: false,
        allowShowMiniToolBar: false,
        defaultJunctionPoint: "lr",
        defaultLineShape: 4,
        // disableZoom: false,
      },
    };
  },
  components: { SeeksRelationGraph },
  created() {
    if (this.forecast.org.links) {
      this.forecastOrg = true;
    }
    if (this.forecast.area.links) {
      this.forecastArea = true;
    }
    if (this.forecast.industry.links) {
      this.forecastIndustry = true;
    }
  },
  methods: {
    setGraphDataArea() {
      var h = "#f10e0e";
      var m = "#2196f3";
      var l = "#8bc34a";
      setTimeout(
        function () {
          this.g_loading = false;
          this.$refs.seeksRelationArea.setJsonData(
            this.forecast.area,
            (seeksRGGraph) => {
              // 这些写上当图谱初始化完成后需要执行的代码
            }
          );
        }.bind(this),
        1000
      );
    },
    setGraphDataOrg() {
      var h = "#f10e0e";
      var m = "#2196f3";
      var l = "#8bc34a";
      setTimeout(
        function () {
          this.g_loading = false;
          this.$refs.seeksRelationOrg.setJsonData(
            this.forecast.org,
            (seeksRGGraph) => {
              // 这些写上当图谱初始化完成后需要执行的代码
            }
          );
        }.bind(this),
        1000
      );
    },
    setGraphDataIndustry() {
      var h = "#f10e0e";
      var m = "#2196f3";
      var l = "#8bc34a";
      setTimeout(
        function () {
          this.g_loading = false;
          this.$refs.seeksRelationIndustry.setJsonData(
            this.forecast.industry,
            (seeksRGGraph) => {
              // 这些写上当图谱初始化完成后需要执行的代码
            }
          );
        }.bind(this),
        1000
      );
    },
  },
  mounted() {
    if (this.forecastOrg) {
      this.setGraphDataOrg();
    }
    if (this.forecastArea) {
      this.setGraphDataArea();
    }
    if (this.forecastIndustry) {
      this.setGraphDataIndustry();
    }
  },
};
</script>
<style lang=scss scoped>
.myfor {
  width: 90%;
  height: 350px;
  margin: 10px auto 30px auto;
  background-color: rgba(6, 28, 67, 1);
}

.wei_tt {
  width: 100%;
  height: 40px;
  color: rgba(255, 255, 255, 1);
  line-height: 43px;
  z-index: 999;
  justify-items: center;
  align-items: center;
  background-color: rgba(13, 37, 81, 1);
  /* position: absolute; */
  .wei_tt_1 {
    float: left;
    font: inherit;
    //margin-left: 10px;
    padding-left: 20px;
  }

  .wei_tt_2 {
    float: right;
    color: #a8aeba;
    margin-right: 10px;
    font-size: 14px;
  }
}

.column_bg {
  background: rgba(9, 27, 62, 0.8);
  /* position: relative; */
  overflow: hidden;
  margin-bottom: 20px;
}
 

</style>
