import util from '@/plugin/libs/util'

export default {
  install (Vue, options) {
    Vue.prototype.$open = util.open
  }
}
