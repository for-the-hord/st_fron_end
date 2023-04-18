<template>
  <div :class="classes">
    <div class="timeline--content" style="padding-top:20px">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Timeline',
  props: {
    direction: {
      type: String,
      default: 'column'
    },
    linePosition: {
      type: String,
      default: 'top'
    },
    lineStyle: {
      type: String,
      default: 'solid',
      validate: val => ['solid', 'dashed', 'dotted'].indexOf(val) !== -1
    },
    timeAside: {
      type: Boolean,
      default: false
    },
    showEndline: {
      type: Boolean,
      default: false
    },
    nodeShape: {
      type: String,
      default: 'circle'
    },
    fillNode: {
      type: Boolean,
      default: false
    },
    fillParent: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes() {
      return {
        'timeline': true,
        [`timeline--direction-${this.direction}`]: true,
        [`timeline--position-${this.linePosition}`]: true,
        'timeline--timeaside': this.timeAside,
        'timeline--show-endline': this.showEndline,
        [`timeline--shape-${this.nodeShape}`]: true,
        'timeline--fill-node': this.fillNode,
        'timeline--fill-parent': this.fillParent,
        [`timeline--line-${this.lineStyle}`]: true
      }
    }
  }
}
</script>
