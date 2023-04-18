import {
    Message,
    MessageBox
} from 'element-ui'
import util from '@/plugin/libs/util.js'
import router from '@/router'
import {
    SYS_USER_LOGIN
} from '@/api/sys.user.js'
import {
    getToken,
    removeToken
} from "@/plugin/utils/auth";
import {
    login,
    getMenu
} from "@/common/login_system.js";
import store from '@/store/index'




export default {
    namespaced: true,
    state: {
        token: getToken(),
        skinType: "",
        name: "",
        idid: "",
        extarctLookid: "",
        everyData: "",
        filters_list: []

    },
    mutations: {
        SET_SKINTYPE: (state, skinType) => {
            state.skinType = skinType;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        set_role_id_lds: (state, name) => {
            state.role_id_lds = name
        }
    },

    actions: {
        //    lds 登录部分 *****************************
        // async LoginByUsername({ commit }, userInfo) {
        //     return new Promise((resolve, reject) => {
        //         login(userInfo)
        //             .then((response) => {
        //                 //console.log(response, 'response')
        //                 const data = response.data;
        //                 // Cookies.set("token", data.token, {
        //                 //     expires: 7,
        //                 // }); //登录成功后将token存储在cookie之中   response.data.token
        //                 sessionStorage.setItem("token", data.token);
        //                 commit("SET_TOKEN", data.token); //data.token
        //                 commit("SET_NAME", data.nickname);
        //                 commit("set_role_id_lds", data.role_id);
        //                 resolve(response);
        //             })
        //             .catch((error) => {
        //                 reject(error);
        //             });
        //     });
        // },
        //    lds 登录部分 *****************************





        /**
         * @description 登录
         * @param {Object} context
         * @param {Object} payload username {String} 用户账号
         * @param {Object} payload password {String} 密码
         * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
         */
        async logins({
            dispatch
        }, {
            account = '',
            password = '',
        } = {}) {
            let res = await login({
                account,
                password,
            })
            console.log(res, 'res')
            sessionStorage.setItem('token', res.data.token_id)
            sessionStorage.setItem('role_id', res.data.user_id)


            // token_id
            // : 
            // null
            // user_id
            // : 
            // "58ddfe13d12e11eda82d50ebf6ba65b0"
            // user_name
            // : 
            // "管理员"
            // sessionStorage.setItem('name', res.data.real_name)
            ////console.log(res.data.role_id, 'role_id_lds')
            // commit("set_role_id_lds", res.data.role_id);

            // await dispatch('d2admin/user/set', {
            //     role_id_lds: res.data.role_id
            // })
            // this.$store.state.role_id_lds = res.data.role_id
            // set_role_id_lds
            // //console.log(this.$store.state.role_id_lds)

            // commit("SET_TOKEN", data.token); //data.token
            // commit("SET_NAME", data.nickname);
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            // 如有必要 token 需要定时更新，默认保存一天
            util.cookies.set('uuid', res.data.user_name)
            util.cookies.set('token', res.data.token_id)
            util.cookies.set('user_id', res.data.user_id)
                // this.state.role_id_ld//s = res.data.role_id


            // 设置 vuex 用户信息
            await dispatch('d2admin/user/set', {
                    name: res.data.user_name,
                    role_id_lds: res.data.user_id
                }, {
                    root: true
                })
                // await dispatch('d2admin/user/setRole_id', { role_id_lds: res.data.role_id }, { root: true })

            // 用户登录后从持久化数据加载一系列的设置
            await dispatch('load')
        },
        /**
         * @description 注销用户并返回登录页面
         * @param {Object} context
         * @param {Object} payload confirm {Boolean} 是否需要确认
         */
        logout({
            commit,
            dispatch
        }, {
            confirm = false
        } = {}) {
            /**
             * @description 注销
             */
            async function logout() {
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('name')
                commit("d2admin/menu/headerSet", []);

                // 删除cookie
                util.cookies.remove('token')
                util.cookies.remove('uuid')
                    // 清空 vuex 用户信息
                await dispatch('d2admin/user/set', {}, {
                        root: true
                    })
                    // 跳转路由
                router.push({
                    name: 'login'
                })
            }
            // 判断是否需要确认
            if (confirm) {
                commit('d2admin/gray/set', true, {
                    root: true
                })
                MessageBox.confirm('确定要退出当前用户吗', '退出用户', {
                        type: 'warning'
                    })
                    .then(() => {
                        commit('d2admin/gray/set', false, {
                            root: true
                        })
                        logout()
                    })
                    .catch(() => {
                        commit('d2admin/gray/set', false, {
                            root: true
                        })
                        Message({
                            message: '取消退出操作'
                        })
                    })
            } else {
                logout()
            }
        },
        /**
         * @description 用户登录后从持久化数据加载一系列的设置
         * @param {Object} context
         */
        async load({
            dispatch
        }) {
            // 加载用户名
            await dispatch('d2admin/user/load', null, {
                    root: true
                })
                // 加载主题
            await dispatch('d2admin/theme/load', null, {
                    root: true
                })
                // 加载页面过渡效果设置
            await dispatch('d2admin/transition/load', null, {
                    root: true
                })
                // 持久化数据加载上次退出时的多页列表
            await dispatch('d2admin/page/openedLoad', null, {
                    root: true
                })
                // 持久化数据加载侧边栏配置
            await dispatch('d2admin/menu/asideLoad', null, {
                    root: true
                })
                // 持久化数据加载全局尺寸
            await dispatch('d2admin/size/load', null, {
                    root: true
                })
                // 持久化数据加载颜色设置
            await dispatch('d2admin/color/load', null, {
                root: true
            })
        }
    }
}