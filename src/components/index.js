import Vue from 'vue'

import d2Container from './basic/d2-container'
import d2ContainerFrame from './basic/d2-container-frame'
import d2LinkBtn from './basic/d2-link-btn'

// 注意 有些组件使用异步加载会有影响
Vue.component('d2-container', d2Container)
Vue.component('d2-container-frame', d2ContainerFrame)
Vue.component('d2-link-btn', d2LinkBtn)
Vue.component('d2-count-up', () => import('./basic/d2-count-up'))
Vue.component('d2-highlight', () => import('./basic/d2-highlight'))
Vue.component('d2-icon', () => import('./basic/d2-icon'))
Vue.component('d2-icon-svg', () => import('./basic/d2-icon-svg/index.vue'))
Vue.component('d2-icon-select', () => import('./basic/d2-icon-select/index.vue'))
Vue.component('d2-icon-svg-select', () => import('./basic/d2-icon-svg-select/index.vue'))
Vue.component('d2-markdown', () => import('./basic/d2-markdown'))
Vue.component('d2-mde', () => import('./basic/d2-mde'))
Vue.component('d2-module-index-banner', () => import('./basic/d2-module-index-banner'))
Vue.component('d2-module-index-menu', () => import('./basic/d2-module-index-menu'))
Vue.component('d2-quill', () => import('./basic/d2-quill'))
Vue.component('d2-scrollbar', () => import('./basic/d2-scrollbar'))
Vue.component('d2-ueditor', () => import('./basic/d2-ueditor'))
