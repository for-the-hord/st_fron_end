import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugin/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }
// console.log('我是看打印何时执行的')
export default {
    path: '/system',
    name: '/system',
    meta,
    redirect: { path: '/system/user' },
    component: layoutHeaderAside,
    children: [
        // lds——系统设置页面
        { path: 'user', name: '/system/user', component: _import('lds_xitong/user'), meta: { ...meta, cache: true, title: '用户管理' } },
        { path: 'role', name: '/system/role', component: _import('lds_xitong/role'), meta: { ...meta, title: '角色管理' } },
        { path: 'lexicon', name: '/system/lexicon', component: _import('lds_xitong/lexicon'), meta: { ...meta, title: '词库管理' } },
        { path: 'extract', name: '/system/extract', component: _import('lds_xitong/extract'), meta: { ...meta, title: '抽取管理' } },
        { path: 'extractLook', name: '/system/extractLook', component: _import('lds_xitong/extractLook'), meta: { ...meta, title: '抽取管理' } },
        { path: 'extractHandle', name: '/system/extractHandle', component: _import('lds_xitong/extractHandle'), meta: { ...meta, title: '抽取管理' } },
        { path: 'extractPDF', name: '/system/extractPDF', component: _import('lds_xitong/extractPDF'), meta: { ...meta, title: '查看PDF' } },
        { path: 'extractTag', name: '/system/extractTag', component: _import('lds_xitong/extractTag'), meta: { ...meta, title: '抽取管理' } },
        { path: 'index', name: '/system/index', component: _import('demo/playground/index'), meta: { ...meta, title: '功能首页' } },
    ]
}
