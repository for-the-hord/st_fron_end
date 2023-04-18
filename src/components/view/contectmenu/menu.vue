<template>
  <div class="page">
    <!-- @contextmenu鼠标右键显示菜单事件 -->
    <!-- 给vue组件绑定事件时候，组件加上.native才能监听原生事件，否则会认为监听的是来自Item组件自定义的事件， -->
    <!-- .prevent用来阻止浏览器默认事件，因浏览器右键会显示自己设置好的菜单所以需要设置默认阻止事件 -->
    <el-button type="primary" @contextmenu.prevent.native="openMenu($event)"
      >右键显示菜单</el-button
    >
    <!-- 因右键自定义菜单事件需要获取当前点击的位置，所以此处绑定动态样式来控制菜单实时跟踪鼠标右键点击位置 -->
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li>菜单一</li>
      <li>菜单二</li>
    </ul>
  </div>
</template>
 
<script>
export default {
  components: {},
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
    };
  },
  watch: {
    //   监听属性对象，newValue为新的值，也就是改变后的值
    visible(newValue, oldValue) {
      if (newValue) {
        //菜单显示的时候
        // document.body.addEventListener，document.body.removeEventListener它们都接受3个参数
        // ("事件名" , "事件处理函数" , "布尔值");
        // 在body上添加事件处理程序
        document.body.addEventListener("click", this.closeMenu);
      } else {
        //菜单隐藏的时候
        // 移除body上添加的事件处理程序
        document.body.removeEventListener("click", this.closeMenu);
      }
    },
  },
  methods: {
    //右击
    openMenu(e) {
      var x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
      var y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
      this.top = y;
      this.left = x;
      this.visible = true; //显示菜单
    },
    //关闭菜单
    closeMenu() {
      this.visible = false; //关闭菜单
    },
  },
};
</script>
 
<style lang='scss' scoped>
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: fixed; //关键样式设置固定定位
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}
 
.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  cursor: pointer;
}
.contextmenu li:hover {
  background: #eee;
}
</style>