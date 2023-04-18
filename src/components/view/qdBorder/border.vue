<template>
  <div class="column_bg">
    <p class="wei_tt flex_center_around">
      <span class="wei_tt_1 " > {{ name }} </span>
      <span class="wei_tt_1 " >   {{ danwei }}</span>
      <!-- <span class="wei_tt_2">0-100威胁度</span> -->
    </p>
    <div class="myborder">
      {{ num }}
    </div>
  </div>
</template>


<script>
export default {
  props: {
    name: "",
    danwei: "",
    num: "",
  },
  data() {
    return {
      count: 90,
    };
  },
  created(){
console.log(this.danwei,'11111111')
  },
  methods: {},
  mounted() {},
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
   background: #18191a;
  .wei_tt_1 {
     font-weight: bold;
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
  height: 110px;
  border: 1px solid #1F1F24  ;
}
.myborder {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 26px;
  font-weight: bold;
  color: white;
  width: 100%;
  height: 80px;
  background: #1B1D24;
}
</style>
