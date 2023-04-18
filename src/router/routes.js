import layoutHeaderAside from '@/layout/header-aside';
// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/plugin/libs/util.import.' + process.env.NODE_ENV);

/**
 * 在主框架内显示
 */

const meta = {
    auth: true,
};
const frameIn = [{
        path: '/',
        redirect: {
            name: 'index',
        },
        component: layoutHeaderAside,
        children: [
            // 情报大屏
            // {
            //     path: 'index',
            //     name: 'index',
            //     meta: {
            //         title: '系统大屏',
            //         auth: true,
            //     },
            //     component: _import('screen/index'),
            // },
            {
                path: 'index',
                name: 'index',
                meta: {
                    title: '数据管理',
                    auth: true,
                },
                component: _import('newdata/paper'),
            },

            // 刷新页面 必须保留
            {
                path: 'refresh',
                name: 'refresh',
                hidden: true,
                component: _import('system/function/refresh'),
            },
            // 页面重定向 必须保留
            {
                path: 'redirect/:route*',
                name: 'redirect',
                hidden: true,
                component: _import('system/function/redirect'),
            },
        ],
    },
    {
        path: '/system',
        name: '/system',
        meta,
        redirect: {
            path: '/system/user',
        },
        component: layoutHeaderAside,
        children: [
            // 系统管理路由
            {
                path: 'user',
                name: '/system/user',
                component: _import('admin/user'),
                meta: {
                    ...meta,
                    cache: true,
                    title: '用户管理',
                },
            },
            {
                path: 'role',
                name: '/system/role',
                component: _import('admin/role'),
                meta: {
                    ...meta,
                    title: '角色管理',
                },
            },
            {
                path: 'module',
                name: '/system/module',
                component: _import('admin/module'),
                meta: {
                    ...meta,
                    title: '模块管理',
                },
            },
        ],
    },
    {
        path: '/muban',
        name: '/muban',
        meta,
        redirect: {
            path: '/muban/index',
        },
        component: layoutHeaderAside,
        children: [{
            path: 'index',
            name: '/muban/index',
            meta: {
                title: '模板管理',
                auth: true,
            },
            component: _import('newdata/index'),
        }, ],
    },
    {
        path: '/company',
        name: '/company',
        meta,
        redirect: {
            path: '/company/index',
        },
        component: layoutHeaderAside,
        children: [{
            path: 'index',
            name: '/company/index',
            meta: {
                title: '模板管理',
                auth: true,
            },
            component: _import('newdata/mine'),
        }, ],
    },


    // {
    //   path: '/range',
    //   name: '/range',
    //   meta,
    //   redirect: {
    //     path: '/range/tool'
    //   },
    //   component: layoutHeaderAside,
    //   children: [{
    //     path: '/range/tool',
    //     name: '/range/tool',
    //     component: _import('range/tool'),
    //     meta: {
    //       ...meta,
    //       title: '工具介绍'
    //     }
    //   },
    //     {
    //       path: '/range/tool/det',
    //       name: '/range/tool/det',
    //       component: _import('range/tooldet'),
    //       meta: {
    //         ...meta,
    //         title: '工具介绍详情'
    //       }
    //     },
    //     {
    //       path: '/range/trial',
    //       name: '/range/trial',
    //       component: _import('range/trial'),
    //       meta: {
    //         ...meta,
    //         title: '对抗实验'
    //       }
    //     }, {
    //       path: '/range/trialdet',
    //       name: '/range/trialdet',
    //       component: _import('range/trialdet'),
    //       meta: {
    //         ...meta,
    //         title: '对抗实验详情'
    //       }
    //     },
    //     {
    //       path: '/range/trialdetter',
    //       name: '/range/trialdetter',
    //       component: _import('range/trialdetter'),
    //       meta: {
    //         ...meta,
    //         title: '对抗实验详情'
    //       }
    //     }, {
    //       path: '/range/mine',
    //       name: '/range/mine',
    //       component: _import('range/mine'),
    //       meta: {
    //         ...meta,
    //         title: '我的实验'
    //       }
    //     }, {
    //       path: '/range/miner',
    //       name: '/range/miner',
    //       component: _import('range/miner'),
    //       meta: {
    //         ...meta,
    //         title: '我的实验'
    //       }
    //     }, {
    //       path: '/range/manager',
    //       name: '/range/manager',
    //       component: _import('range/manager'),
    //       meta: {
    //         ...meta,
    //         title: '实验管理'
    //       }
    //     },
    //     {
    //       path: '/range/manager_add',
    //       name: '/range/manager_add',
    //       component: _import('range/manager_add'),
    //       meta: {
    //         ...meta,
    //         title: '实验管理新增'
    //       }
    //     },
    //     {
    //       path: '/range/manager_put',
    //       name: '/range/manager_put',
    //       component: _import('range/manager_put'),
    //       meta: {
    //         ...meta,
    //         title: '实验管理新增'
    //       }
    //     },
    //     {
    //       path: '/range/manager_put_2_3',
    //       name: '/range/manager_put_2_3',
    //       component: _import('range/manager_put_2_3'),
    //       meta: {
    //         ...meta,
    //         title: '实验管理修改'
    //       }
    //     },
    //     {
    //       path: '/range/manager_look',
    //       name: '/range/manager_look',
    //       component: _import('range/manager_look'),
    //       meta: {
    //         ...meta,
    //         title: '实验管理查看'
    //       }
    //     },
    //   ]
    // },
    // /agency/mine
    //
    {
        path: '/agency',
        name: '/agency',
        meta,
        redirect: {
            path: '/agency/mine',
        },
        component: layoutHeaderAside,
        children: [{
                path: '/agency/mine',
                name: '/agency/mine',
                component: _import('agency/mine'),
                meta: {
                    ...meta,
                    title: '',
                },
            },
            {
                path: '/agency/manager',
                name: '/agency/m我得机构anager',
                component: _import('agency/manager'),
                meta: {
                    ...meta,
                    title: '机构管理',
                },
            },
            {
                path: '/agency/mine_manager',
                name: '/agency/mine_manager',
                component: _import('agency/mine_manager'),
                meta: {
                    ...meta,
                    title: '我的机构',
                },
            },
            {
                path: '/agency/mine_manager_test',
                name: '/agency/mine_manager_test',
                component: _import('agency/mine_manager_test'),
                meta: {
                    ...meta,
                    title: '我的机构',
                },
            },
            {
                path: '/agency/mine_manager_test2',
                name: '/agency/mine_manager_test2',
                component: _import('agency/mine_manager_test2'),
                meta: {
                    ...meta,
                    title: '我的机构',
                },
            },
            // {
            //     path: '/agency/mine_manager_test3',
            //     name: '/agency/mine_manager_test3',
            //     component: _import('agency/mine_manager_test3'),
            //     meta: {
            //         ...meta,
            //         title: '我的机构',
            //     },
            // },
            // {
            //     path: '/agency/mine_manager_test3_cha',
            //     name: '/agency/mine_manager_test3_cha',
            //     component: _import('agency/mine_manager_test3_cha'),
            //     meta: {
            //         ...meta,
            //         title: '我的机构',
            //     },
            // },
            {
                path: '/agency/end',
                name: '/agency/end',
                component: _import('agency/end'),
                meta: {
                    ...meta,
                    title: '评测得分',
                },
            },
            {
                path: '/agency/mine/add',
                name: '/agency/mine/add',
                component: _import('agency/add'),
                meta: {
                    ...meta,
                    title: '机构认证',
                },
            },
        ],
    },

    {
        path: '/exam',
        name: '/exam',
        meta,
        redirect: {
            path: '/exam/index',
        },
        component: layoutHeaderAside,
        children: [{
                path: '/exam/index',
                name: '/exam/index',
                component: _import('exam/index'),
                meta: {
                    ...meta,
                    title: '在线考试',
                },
            },

            {
                path: '/exam/mine',
                name: '/exam/mine',
                component: _import('exam/mine'),
                meta: {
                    ...meta,
                    title: '我的考试',
                },
            },
            {
                path: '/exam/question',
                name: '/exam/question',
                component: _import('exam/question'),
                meta: {
                    ...meta,
                    title: '题库管理',
                },
            },
            {
                path: '/exam/paper',
                name: '/exam/paper',
                component: _import('exam/paper'),
                meta: {
                    ...meta,
                    title: '试卷管理',
                },
            },
            {
                path: '/exam/paper/detail',
                name: '/exam/paper/detail',
                component: _import('exam/paperDetail'),
                meta: {
                    ...meta,
                    title: '试卷详情',
                },
            },
            {
                path: '/exam/paper/detail2',
                name: '/exam/paper/detail2',
                component: _import('exam/paperDetail2'),
                meta: {
                    ...meta,
                    title: '试卷详情',
                },
            },
            {
                path: '/exam/mine/test_paper',
                name: '/exam/mine/test_paper',
                component: _import('exam/test_paper'),
                meta: {
                    ...meta,
                    title: '开始考试',
                },
            },
            {
                path: '/exam/mine/test_paper_look',
                name: '/exam/mine/test_paper_look',
                component: _import('exam/test_paper_look'),
                meta: {
                    ...meta,
                    title: '考试详情',
                },
            },
            {
                path: '/exam/mine/end',
                name: '/exam/mine/end',
                component: _import('exam/end'),
                meta: {
                    ...meta,
                    title: '考试结果',
                },
            },
            {
                path: '/exam/mine/top',
                name: '/exam/mine/top',
                component: _import('exam/top'),
                meta: {
                    ...meta,
                    title: '考试排行',
                },
            },
        ],
    },
];

/**
 * 在主框架之外显示
 */
const frameOut = [
    // 登录
    {
        path: '/login',
        name: 'login',
        component: _import('system/login'),
    },
    {
        path: '/register',
        name: 'register',
        component: _import('system/register'),
    },
    {
        path: '/find',
        name: 'find',
        component: _import('system/find/index'),
    },
    {
        path: '/find1',
        name: 'find1',
        component: _import('system/find/index2'),
    },
];

/**
 * 错误页面
 */
const errorPage = [{
    path: '*',
    name: '404',
    component: _import('system/error/404'),
}, ];

// 导出需要显示菜单的
export const frameInRoutes = frameIn;

// 重新组织后导出
export default [...frameIn, ...frameOut, ...errorPage];