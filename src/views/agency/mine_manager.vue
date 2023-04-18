<template>
  <d2-container>
    <div class="Aone-page">
      <p class="" style="color: gray; cursor: pointer">
        机构评测 > <span @click="goback()"> 我的机构 </span> > <span style="color: black"> 我的评测</span>
      </p>
      <br />
      <br />
      <div class="body-lefts">
        <p class="weights" style="font-size: 20px">我的评测</p>
        <br />
        <br />
        <div class="mine-body flex_center_around">
          <div class="company_add pointer" v-for="(item, index) in body_list">
            <div class="company_head flex_center_around" @contextmenu.prevent="openMenu($event, item)">
              <!-- "status": 2, //评测状态 0-未评测 1-未评测 2-已评测 -->
              <span class="status_add s1" v-if="item.status == 0"> 未 开 始 </span>
              <span class="status_add s2" v-if="item.status == 1"> 进 行 中 </span>
              <span class="status_add s3" v-if="item.status == 2"> 已 评 测 </span>
              {{ item.name }}
            </div>
            <br />

            <div class="bodys">
              <p class="info-p">
                <span class="info-left"> 评测时间： </span>
                <span class="info-right" v-if="item.created">
                  {{ getTime(item.created) }}
                </span>
                <span class="info-right" v-if="!item.created"> 暂无 </span>
              </p>
              <p class="info-p">
                <span class="info-left"> 评测时长： </span>
                <span class="info-right" v-if="item.use_time">
                  {{ formateSeconds(item.use_time) }}
                </span>
                <span class="info-right" v-if="!item.use_time"> 暂无 </span>
              </p>
            </div>
            <div class="fots">
              <el-button @click="starts(item, index, 's')" v-if="item.status == 0" type="primary_test"
                >开始评测</el-button
              >
              <el-button @click="starts(item, index, 'cha')" v-if="item.status == 2" type="primary_test"
                >查看评测</el-button
              >
              <el-button @click="starts(item, index, 'ji')" v-if="item.status == 1" type="primary_test"
                >继续评测</el-button
              >
              <!-- <el-button @click="starts(item, index, 're')" v-if="item.status == 2" type="primary_test"
                >重新评测</el-button
              > -->
            </div>
          </div>
        </div>
      </div>
      <div class="body-rights">
        <p class="weights" style="font-size: 20px">机构信息</p>
        <br />
        <br />
        <div class="rights-info">
          <p class="flex_center_starts2">
            <img src="/image/AOne/gg.png" alt="" />
            <span class="weights" style="font-size: 20px; margin-left: 20px">{{ ins.name }}</span>
          </p>
          <br />
          <p class="flex_center_starts2">
            <span class="yihe" style="margin-right: 10px">
              <span v-if="ins.type == 4"> 科研单位 </span>
              <span v-if="ins.type == 3"> 政府 </span>
              <span v-if="ins.type == 2"> 高校 </span>
              <span v-if="ins.type == 1"> 企业 </span>
              <span v-if="ins.type == 0"> 未知 </span>
            </span>
            <span class="yice" style="margin-right: 10px">机构人数:{{ ins.total_user || '暂无' }}</span>
            <span class="heing" style="margin-right: 10px">职称人数:{{ ins.title_user || '暂无' }}</span>
            <!-- <span class="heerror">审核失败</span> -->
          </p>
          <p class="rights-tt">统一社会信用代码：</p>
          <p class="rights-cc">{{ ins.code || '暂无' }}</p>
          <p class="rights-tt">机构地址：</p>
          <p class="rights-cc">{{ ins.address || '暂无' }}</p>
          <br />

          <p class="weights" style="font-size: 20px">
            评测证书：
            <span v-if="ins.certificate == 0"> 未生成 </span>
            <span v-if="ins.certificate != 0"> 已生成 </span>
          </p>

          <div class="leida2">
            <div class="worded flex_center_around poin ter" @click="getce()">
              <img src="/image/AOne/shengcheng.png" alt="" />
              <span v-if="ins.certificate == 0"> 请完成全部评测生成证书 </span>
            </div>
          </div>
          <!-- 评测机构评价雷达图>机构评测雷达图 -->
          <p class="weights" style="font-size: 20px">机构评测雷达图</p>
          <div class="leida flex_center_around">
            <!-- 当前暂无评价数据 -->
            <qdLeida3 v-if="zhen" :activity="industry"></qdLeida3>
          </div>
        </div>
      </div>
    </div>
  </d2-container>
</template>

<script>
import { getagency, target } from './big.js';
export default {
  name: 'mine',
  data() {
    return {
      ins: {},
      next: true,
      head_list: [
        { name: '认证机构总数', num: '', src: '/image/AOne/count.png' },
        { name: '已通过审核', num: '', src: '/image/AOne/ok.png' },
        { name: '审核中', num: '', src: '/image/AOne/ing.png' },
        { name: '审核未通过', num: '', src: '/image/AOne/rejucet.png' },
      ],
      body_list: [],
      //   右键
      visible: false,
      top: 0,
      left: 0,
      //   右键
    };
  },
  created() {
    getagency(this.$route.query.id).then((res) => {
      this.body_list = res.data.target_info;
      this.ins = res.data;
      this.industry = res.data.radar;
      if (res.data.radar.legend.length == 0) {
        this.zhen = false;
      } else {
        this.zhen = true;
      }
    });
  },
  watch: {
    //   监听属性对象，newValue为新的值，也就是改变后的值
    visible(newValue, oldValue) {
      if (newValue) {
        //菜单显示的时候
        // document.body.addEventListener，document.body.removeEventListener它们都接受3个参数
        // ("事件名" , "事件处理函数" , "布尔值");
        // 在body上添加事件处理程序
        document.body.addEventListener('click', this.closeMenu);
      } else {
        //菜单隐藏的时候
        // 移除body上添加的事件处理程序
        document.body.removeEventListener('click', this.closeMenu);
      }
    },
  },
  methods: {
    getce() {
      this.$message.warning('请完成全部评测以生成证书');
    },
    goback() {
      this.$router.push({
        path: '/agency/mine',
      });
    },
    formateSeconds(endTime) {
      let secondTime = parseInt(endTime); //将传入的秒的值转化为Number
      let min = 0; // 初始化分
      let h = 0; // 初始化小时
      let result = '';
      if (secondTime >= 60) {
        //如果秒数大于等于60，将秒数转换成整数
        min = parseInt(secondTime / 60); //获取分钟，除以60取整数，得到整数分钟
        secondTime = parseInt(secondTime % 60); //获取秒数，秒数取佘，得到整数秒数
        if (min >= 60) {
          //如果分钟大于等于60，将分钟转换成小时
          h = parseInt(min / 60); //获取小时，获取分钟除以60，得到整数小时
          min = parseInt(min % 60); //获取小时后取佘的分，获取分钟除以60取佘的分
        }
      }
      result = `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${secondTime
        .toString()
        .padStart(2, '0')}`;
      return result;
    },
    starts(x, y, z) {
      let send = {
        agency_id: this.ins.id,
        target_id: x.id,
      };

      if (z == 'cha' && y == 0) {
        this.$router.push({
          path: '/agency/end',
          query: { agency_id: this.ins.id, target_id: x.id, sta: z, ti: 1 },
        });
      }
      if (z == 's' && y == 0) {
        this.$router.push({
          path: '/agency/mine_manager_test',
          query: { agency_id: this.ins.id, target_id: x.id, sta: z, ti: 1 },
        });
      }
      if (z == 'ji' && y == 0) {
        this.$router.push({
          path: '/agency/mine_manager_test',
          query: { agency_id: this.ins.id, target_id: x.id, sta: z, ti: 1 },
        });
      }


      if (z == 'cha' && y == 1) {
        this.$router.push({
          path: '/agency/end',
          query: { agency_id: this.ins.id, target_id: x.id, sta: z, ti: 2 },
        });
      }
      if (z == 's' && y == 1) {
        this.$router.push({
          path: '/agency/mine_manager_test2',
          query: { agency_id: this.ins.id, target_id: x.id, sta: z, ti: 2 },
        });
      }
      if (z == 'ji' && y == 1) {
        this.$router.push({
          path: '/agency/mine_manager_test2',
          query: { agency_id: this.ins.id, target_id: x.id, sta: z, ti: 2 },
        });
      }
      if (y > 1) {
        this.$message.warning('当前题库尚在准备中');
        return false;
      }
    },
    getTime(nS) {
      var date = new Date(parseInt(nS) * 1000);
      var year = date.getFullYear();
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      if (mon.toString().length == 1) {
        mon = '0' + mon;
      } else {
        mon = mon;
      }
      if (day.toString().length == 1) {
        day = '0' + day;
      } else {
        day = day;
      }
      return year + '-' + mon + '-' + day + ' ';
    },
    go_any() {
      this.$router.push({
        path: '/agency/mine/add',
      });
    },
    //右击
    openMenu(e, item) {
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

<style lang="scss" scoped>
.worded {
  width: 80%;
  border: 1px dotted #009bb6;
  background: #e5f5f7;
  padding: 10px;
  color: #009bb6;
  border-radius: 4px;
  margin: 20px auto;
}
.fots {
  margin-top: 10px;
}
.leida {
  width: 100%;
  height: 300px;
}
.leida2 {
  width: 100%;
  height: 100px;
}
.renzheng {
  width: 80%;
  text-align: center;
  margin: 100px auto;
}
.rights-tt {
  color: #101010;
  font-size: 16px;
  margin: 20px auto;
}
.rights-cc {
  color: #8f90a6;
  font-size: 16px;
  margin: 15px auto;
}
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
.context_li i {
  margin-right: 4px;
}
.context_li {
  width: 50px;
  text-align: center;
}
.info-p {
  height: 30px;
  line-height: 30px;
  padding: 0 10px 0 10px;
  margin: 10px auto;
}
.info-left {
  float: left;
}
.info-right {
  float: right;
  color: #8f90a6;
}
.yihe {
  display: inline-block;
  padding: 4px;
  border: 1px solid #00b2b0;
  color: #00b2b0;
  background: #e2ffff;
  font-size: 13px;
}

.yice {
  display: inline-block;
  padding: 4px;
  border: 1px solid #0080ff;
  color: #0080ff;
  background: #e5f0ff;
  font-size: 13px;
}

.heing {
  display: inline-block;
  padding: 4px;
  border: 1px solid #daab04;
  color: #daab04;
  background: #fff9c8;
  font-size: 13px;
}

.heerror {
  display: inline-block;
  padding: 4px;
  border: 1px solid #ff3d00;
  color: #ff3d00;
  background: #ffe8e0;
  font-size: 13px;
}
.test {
  height: 40px;
  position: relative;
}
.mine-head {
  width: 80%;
  height: 140px;
  margin: 30px auto;
  background: #fff;
  border: 1px solid #e8e8e8;
}
.body-lefts {
  width: 70%;
  overflow: hidden;
  margin: 0 auto;
  float: left;
}
.body-rights {
  float: left;
  width: 28%;
  margin-left: 1%;
  //   background: #fff;
  border-radius: 4px;
  .rights-info {
    padding: 20px;
    background: #fff;
  }
}
.mine-body {
  width: 100%;
  overflow: auto;
  margin: 0 auto;
  //   height: 700px;
  flex-wrap: wrap;
  padding-bottom: 20px;
}
.company_add {
  width: 280px;
  height: 280px;
  text-align: center;
  background: #fff;
  border-radius: 4px;
  margin: 10px;
}
.company_head {
  background: url('/image/AOne/test.png') no-repeat center;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  height: 120px;
  position: relative;
}
.item-head {
  width: 200px;
  height: 84px;
  // border: 1px solid gray;
  border-radius: 4px;
  background: #f5f7fa;
}
.names {
  color: #909399;
  font-size: 14px;
}
.nums {
  font-size: 20px;
  font-weight: bold;
  color: black;
  margin-top: 5px;
}
.imgs {
  position: absolute;
  right: 20px;
  top: -20px;
  background: url('/image/AOne/pointer_fenshu.png') no-repeat;
  width: 47px;
  height: 47px;
  color: #7f4215;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  line-height: 43px;
}
.status_add {
  position: absolute;
  width: 70px;
  height: 28px;
  text-align: center;
  line-height: 28px;
  color: white;
  border-radius: 0 0 0 4px;
  right: 0;
  top: 0;
  font-size: 14px;
}
.s1 {
  background: red;
  border-radius: 4px !important;
}
.s2 {
  background: #00b2b0;
  border-radius: 4px !important;
}
.s3 {
  background: #8f8f8f;
  border-radius: 4px !important;
}
</style>
