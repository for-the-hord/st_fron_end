// Vue
import Vue from 'vue';
import i18n from './i18n';
import App from './App';
// 核心插件
import d2Admin from '@/plugin/d2admin';
// store
import store from '@/store/index';

// 菜单和路由设置
import router from './router';
import globalTool from '@/plugin/globalTool.js';

// import { menuHeader, menuAside } from '@/menu'
import { frameInRoutes } from '@/router/routes';

import MetaInfo from 'vue-meta-info';
Vue.use(MetaInfo);
// ceshi

// 引入chearts
import * as echarts from 'echarts';
//  import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import 'echarts-liquidfill';

//axios
import axios from 'axios';
Vue.prototype.axios = axios;
//使用ele
import ElementUI from 'element-ui';
//全局混入table的公共方法
import initTableMixin from './mixins/initTableMixin.js';
Vue.mixin(initTableMixin);
import qdTable from '@/components/view/qdTable/index.vue';
Vue.component('qdTable', qdTable);
import qdFilter from '@/components/view/qdFilter/index.vue';
Vue.component('qdFilter', qdFilter);
import qdForm from '@/components/view/qdForm/index.vue';
Vue.component('qdForm', qdForm);
import qdDialog from '@/components/view/qdDialog/index.vue';
Vue.component('qdDialog', qdDialog);
import qdLeftNav from '@/components/view/qdLeftNav/index.vue';
Vue.component('qdLeftNav', qdLeftNav); //左侧菜单按钮
import qdUpload from '@/components/view/qd-upload/index.vue';
Vue.component('qdUpload', qdUpload);
import qdsteps from '@/components/view/qd-steps/index.vue';
Vue.component('qdSteps', qdsteps);
import qdColumn from '@/components/view/qdColumn/column.vue';
Vue.component('qdColumn', qdColumn);
import qdPie from '@/components/view/qdPie/pie.vue';
Vue.component('qdPie', qdPie);
import qdPieda from '@/components/view/qdPieda/pie.vue';
Vue.component('qdPieda', qdPieda);
import qdLine from '@/components/view/qdLine/line.vue';
Vue.component('qdLine', qdLine);
// import qdBar from '@/components/view/qdBar/qdbar.vue';
// Vue.component('qdBar', qdBar);
// import bar from '@/components/view/qdBARBAR/BAR.vue';
// Vue.component('bar', bar);
// import bar2 from '@/components/view/qdBARBAR2/BAR.vue';
// Vue.component('bar2', bar2);
// import bar3 from '@/components/view/qdBARBAR3/BAR.vue';
// Vue.component('bar3', bar3);
import qdBar2 from '@/components/view/qdBar2/qdbar2.vue';
Vue.component('qdBar2', qdBar2);

// import yibiaopan from '@/components /view/qdYIBIAOPAN/BAR.vue';
// Vue.component('yibiaopan', yibiaopan);
// import yibiaoxian from '@/components/view/qdYIBIAOXIAN/BAR.vue';
// Vue.component('yibiaoxian', yibiaoxian);
// import yibiaoxian2 from '@/components/view/qdYIBIAOXIAN2/BAR.vue';
// Vue.component('yibiaoxian2', yibiaoxian2);
// import yibiaoxian3 from '@/components/view/qdYIBIAOXIAN3/BAR.vue';
// Vue.component('yibiaoxian3', yibiaoxian3);

import hengzhu from '@/components/view/qdHengxiangzhu/index.vue';
Vue.component('hengzhu', hengzhu);

import shuiboqiu from '@/components/view/qdShuiboqiu/index.vue';
Vue.component('shuiboqiu', shuiboqiu);

import borders from '@/components/view/qdBorder/border.vue';
Vue.component('borders', borders);

import qdBarDa from '@/components/view/qdBarDa/barda.vue';
Vue.component('qdBarDa', qdBarDa);
import qdZhe from '@/components/view/qdZhe/zhe.vue';
Vue.component('qdZhe', qdZhe);

import qdFor from '@/components/view/qdForecast/for.vue';
Vue.component('qdFor', qdFor);
import qdOpen from '@/components/view/qdOpen/index.vue';
Vue.component('qdOpen', qdOpen);

import qdLou from '@/components/view/qdLou/lou.vue';
Vue.component('qdLou', qdLou);

import qdLeida from '@/components/view/qdLeida/index.vue';
Vue.component('qdLeida', qdLeida);
import qdLeida2 from '@/components/view/qdLeida/index3.vue';
Vue.component('qdLeida2', qdLeida2);
import qdLeida6 from '@/components/view/qdLeida/index_lds6.vue';
Vue.component('qdLeida6', qdLeida6);
import qdLeida3 from '@/components/view/qdLeida/index_lds.vue';
Vue.component('qdLeida3', qdLeida3);

import qdSAN from '@/components/view/qdSandian/index.vue';
Vue.component('qdSAN', qdSAN);

import HN from '@/components/view/henan/index.vue';
Vue.component('HN', HN);
import HN2 from '@/components/view/henan/map_song_new.vue';
Vue.component('HN2', HN2);



import qdFoot from '@/components/view/qdFoot/foot.vue';
Vue.component('qdFoot', qdFoot);

import qdOrder from '@/components/view/qd-order/index.vue';
Vue.component('qdOrder', qdOrder);

import loading001 from '@/components/view/loading/loading.js';
Vue.use(loading001);

// import VueSlider from 'vue-slider-component'
// import 'vue-slider-component/theme/default.css'

// Vue.component('VueSlider', VueSlider)

import Timeline from '@/components/view/components/index';

import { getTime } from '@/plugin/utils/user.js';
import scroll from 'vue-seamless-scroll';
Vue.use(scroll);

Vue.use(Timeline);
Vue.use(getTime);

// import '@/components/view/style.css'

// / main.js

// 注册滚动条加载触发事件v-loadmore绑定
import directives from './directives';
Vue.use(directives);
// 核心插件
Vue.use(d2Admin);
Vue.use(ElementUI);
Vue.use(globalTool);

import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
Vue.component('Editor', Editor);
Vue.component('Toolbar', Toolbar);

new Vue({
    router,
    store,
    i18n,
    render: (h) => h(App),
    created() {
        // 处理路由 得到每一级的路由设置
        this.$store.commit('d2admin/page/init', frameInRoutes);
        // 设置顶栏菜单
        // this.$store.commit('d2admin/menu/headerSet', menuHeader)
        // 初始化菜单搜索功能
        // this.$store.commit('d2admin/search/init', menuHeader)
    },
    mounted() {
        // 展示系统信息
        this.$store.commit('d2admin/releases/versionShow');
        // 用户登录后从数据库加载一系列的设置
        this.$store.dispatch('d2admin/account/load');
        // 获取并记录用户 UA
        this.$store.commit('d2admin/ua/get');
        // 初始化全屏监听
        this.$store.dispatch('d2admin/fullscreen/listen');
    },
    watch: {
        // 检测路由变化切换侧边栏内容
        '$route.matched': {
            handler(matched) {
                if (matched.length > 0) {
                    const _side = menuAside.filter((menu) => menu.path === matched[0].path);
                    this.$store.commit('d2admin/menu/asideSet', _side.length > 0 ? _side[0].children : []);
                }
            },
            immediate: true,
        },
        $route(to, form) {
            if (to.fullPath) {
                console.log(to.fullPath, '000000000')
                console.log(to.fullPath.split('?')[0])
                if (to.fullPath.split('?')[0] == '/exam/paper/detail') {
                    //    执行页面操作
                }
                if (to.fullPath.split('?')[0] != '/exam/paper/detail') {
                    this.$store.state.d2admin.account.filters_list = [];
                }
            }

        }
    },
}).$mount('#app');