import util from '@/plugin/libs/util.js'

export default {
  namespaced: true,
  mutations: {
    /**
     * @description 显示版本信息
     * @param {Object} state state
     */
    versionShow () {
      util.log.capsule('D2Admin', `v${process.env.VUE_APP_VERSION}`)
      console.log('中科大数据研究院-网安中心')
    //   console.log('Document  https://d2.pub/zh/doc/d2-admin')
      console.log('欢迎前端交流：')
    }
  }
}
