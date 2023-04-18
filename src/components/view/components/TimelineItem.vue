<template>
  <div :class="classes">
    <div class="timeline--item-line"></div>
    <div class="timeline--item-node">
      <slot name="node">
        <div class="timeline--item-node-content">
          {{ node }}
        </div>
      </slot>
    </div>
    <div class="timeline--item-time">
      <slot name="time" :time="time">{{ getTime(time) }}</slot>
      <br /><br />
      <span style="color: #ffffff99"> {{ dis_name }}</span>
    </div>
    <div class="timeline--item-body">
      <slot>
        <div class="timeline--item-body-wrapper">
          <div class="timeline--item-title">
            <slot name="title">
              <span v-html="title"> </span>
            </slot>
          </div>
          <div class="timeline--item-content">
            <span v-html="content"></span>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimelineItem",
  props: {
    node: {
      type: [String, Number],
    },
    dis_name: {
      type: String,
    },
    time: {
      type: String,
    },
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    // 相对轴的位置
    position: {
      type: String,
      default: "top",
    },
  },
  computed: {
    classes() {
      return {
        "timeline--item": true,
        [`timeline--item-position-${this.position}`]: true,
      };
    },
  },
  methods: {
    getTime(nS) {
      {
        if (nS) {
          var date = new Date(parseInt(nS) * 1000);
          var year = date.getFullYear();
          var mon = date.getMonth() + 1;
          var day = date.getDate();
          //   var hours = date.getHours();
          //   var minu = date.getMinutes();
          //   var sec = date.getSeconds();

          return year + "-" + mon + "-" + day + " ";
        } else {
          return "";
        }
      }
    },
  },
};
</script>
