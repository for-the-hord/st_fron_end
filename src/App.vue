<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
window.onload = function () {
  document.addEventListener(
    "keydown",
    function (event) {
      if (
        (event.ctrlKey === true || event.metaKey === true) &&
        (event.which === 61 ||
          event.which === 107 ||
          event.which === 173 ||
          event.which === 109 ||
          event.which === 187 ||
          event.which === 189)
      ) {
        event.preventDefault();
      }
    },
    false
  );
};

import util from "@/plugin/libs/util";
export default {
  name: "app",
  watch: {
    "$i18n.locale": "i18nHandle",
  },
  created() {
    this.i18nHandle(this.$i18n.locale);
  },
  methods: {
    i18nHandle(val, oldVal) {
      util.cookies.set("lang", val);
      document.querySelector("html").setAttribute("lang", val);
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "~@/assets/style/public-class.scss";
</style>
