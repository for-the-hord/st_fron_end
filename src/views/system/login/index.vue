<template>
  <div class="page-login">
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
        style="background: #0b1322"
      >
        <div class="page-login--content-main" flex="dir:top main:center cross:center;">
          <!-- <img class="topbg" src="/image/AOne/top.png" /> -->
          <div class="smind_left">
            <!-- <video class="v_video" loop="loop" autoplay="autoplay" muted="true"> -->
            <img class="v_video" src="@/assets/image/AOne/f.png" />
            <!-- </video> -->
          </div>
          <div class="page-login--form">
            <el-card shadow="never">
              <br />
              <br />
              <br />
              <br />

              <br />
              <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
                <br />
                <el-form-item prop="username">
                  <el-input type="text" v-model="formLogin.username" placeholder="账号">
                    <i style="color: #fff" slot="prepend" class="el-icon-user"></i>
                  </el-input>
                </el-form-item>
                <br />
                <el-form-item prop="password">
                  <el-input type="password" v-model="formLogin.password" placeholder="密码">
                    <i style="color: #fff" slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <br />
                <p>
                  <el-checkbox v-model="checked">记住密码</el-checkbox>
                </p>
                <br />
                <br />
                <el-button
                  style="background: #0db8ba; color: white; border: none !important; font-size: 16px"
                  size="default"
                  @click="submit"
                  class="button-login"
                >
                  登 录
                </el-button>
              </el-form>
            </el-card>
            <p class="page-login--options" flex="main:justify cross:center">
              <span @click="forgetPwd"><d2-icon name="question-circle" /> 忘记密码</span>
              <span @click="registerUser">注册用户</span>
            </p>
            <!-- quick login -->
            <!-- <el-button
              class="page-login--quick"
              size="default"
              type="info"
              @click="dialogVisible = true"
            >
              快速选择用户（测试功能）
            </el-button> -->
          </div>
        </div>
        <div class="page-login--content-footer">
          <!-- <p class="page-login--content-footer-locales">
            <a
              v-for="language in $languages"
              :key="language.value"
              @click="onChangeLocale(language.value)"
            >
              {{ language.label }}
            </a>
          </p> -->
          <p class="page-login--content-footer-copyright">
            <!-- <d2-icon name="copyright" /> -->
            <!-- Copyright © 2023 数据填报系统 -->
            <!-- <a href="https://github.com/FairyEver">
              @FairyEver
            </a> -->
          </p>
          <!-- <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p> -->
        </div>
      </div>
    </div>
    <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="page-login--quick-user" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o" />
            <span>{{ user.name }}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { mapActions } from 'vuex';
import localeMixin from '@/locales/mixin.js';
import { getMenu } from '@/common/login_system.js';

export default {
  mixins: [localeMixin],
  data() {
    return {
      newmenu: [],
      topmenu: [],
      allmenu: [],
      loginType: 1,
      saidemenu_lei: [],
      saidemenu_lei2: [],
      saidemenu_lei3: [],
      checked: true,
      timeInterval: null,
      time: dayjs().format('HH:mm:ss'),
      // 快速选择用户
      dialogVisible: false,
      users: [
        {
          name: '',
          username: '',
          password: '',
        },
        {
          name: '',
          username: '',
          password: '',
        },
        {
          name: '',
          username: '',
          password: '',
        },
      ],
      // 表单
      formLogin: {
        username: '',
        password: '',
        code: '',
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ],
      },
      data_menu: [
      {
          icon: null,
          id: 5,
          mod_order: 0,
          parent_id: 0,
          path: '/index',
          title: '首页',
        },
        {
          icon: null,
          id: 5,
          mod_order: 1,
          parent_id: 0,
          path: '/paper',
          title: '数据管理',
        },
        {
          icon: null,
          id: 5,
          mod_order: 2,
          parent_id: 0,
          path: '/muban',
          title: '模板管理',
        },
        {
          icon: null,
           id: 5,
          mod_order: 3,
          parent_id: 0,
          path: '/company',
          title: '单位管理',
        },
        {
          children: [
            {
              icon: null,
              id: 2,
              mod_order: 1,
              parent_id: 1,
              path: '/system/user',
              title: '用户管理',
            },
            {
              icon: null,
              id: 3,
              mod_order: 2,
              parent_id: 1,
              path: '/system/role',
              title: '角色管理',
            },
            {
              icon: null,
              id: 4,
              mod_order: 3,
              parent_id: 1,
              path: '/system/module',
              title: '模块管理',
            },
          ],
          icon: null,
          id: 1,
          mod_order: 9,
          parent_id: 0,
          path: '/system',
          redirect: '/system/user',
          title: '系统管理',
        },
      ],
    };
  },
  mounted() {
    this.timeInterval = setInterval(() => {
      this.refreshTime();
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timeInterval);
    this.timeInterval = null;
  },
  watch: {
    checked: {
      handler(newData, oldData) {
        if (newData) {
          localStorage.setItem('username', this.formLogin.username);
          localStorage.setItem('password', this.formLogin.password);
          var a = localStorage.getItem('username');
          var b = localStorage.getItem('password');
          this.formLogin.username = a;
          this.formLogin.password = b;
        } else {
          localStorage.setItem('username', '');
          localStorage.setItem('password', '');
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    ...mapActions('d2admin/account', ['logins']),
    refreshTime() {
      this.time = dayjs().format('HH:mm:ss');
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username;
      this.formLogin.password = user.password;
      this.submit();
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // if (this.checked) {
          //   var a = localStorage.getItem("username");
          //   var b = localStorage.getItem("password");
          //   this.logins({
          //     username: a,
          //     password: b,
          //   }).then((res) => {
          //     this.$router.push("/");
          //     // 重定向对象不存在则返回顶层路径
          //     //   this.$router.replace(this.$route.query.redirect || '/')
          //   });
          // }
          //   登录
          //   注意 这里的演示没有传验证码
          //   具体需要传递的数据请自行修改代码
          // alert('登录')
          // this.$router.push("/");
          this.logins({
            account: this.formLogin.username,
            password: this.formLogin.password,
           }).then((res) => {
            console.log(res,'newssss')
            //   let ids = sessionStorage.getItem('role_id');
            //   getMenu(ids).then((res) => {
            //     let abc = res.data;
            //     abc.map((e) => {
            //       this.allmenu.push(e);
            //     });
            //     localStorage.setItem('allmenu', JSON.stringify(this.allmenu));
            //     this.huoqucaidan();
            //   });

            this.data_menu.map((e) => {
              this.allmenu.push(e);
            });
            localStorage.setItem('allmenu', JSON.stringify(this.allmenu));
            this.huoqucaidan();
            //   this.$router.push('/data');
            this.$router.push({
              path: '/',
            });
          });
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败，请检查');
        }
      });
    },
    huoqucaidan() {
      if (this.allmenu) {
        this.allmenu.map((e) => {
          //   this.saidemenu_lei = e.children;
          if (e.path == '/system') {
            this.saidemenu_lei2 = e.children;
            localStorage.setItem('saidemenu_lei2', JSON.stringify(this.saidemenu_lei2));
          }
          //   this.topmenu.push(e);
          if (e.path == '/exam') {
            this.saidemenu_lei = e.children;
            console.log(this.saidemenu_lei, 'saidemenu_leisaidemenu_lei');
            localStorage.setItem('saidemenu_lei', JSON.stringify(this.saidemenu_lei));
          }

          if (e.path == '/agency') {
            this.saidemenu_lei3 = e.children;
            console.log(this.saidemenu_lei3, 'saidemenu_leisaidemenu_lei3');
            localStorage.setItem('saidemenu_lei3', JSON.stringify(this.saidemenu_lei3));
          }

          this.topmenu.push(e);
          this.topmenu.map((e) => {
            if (e.children) {
              delete e.children;
            }
          });
        });

        this.newmenu = [...new Set(this.topmenu)];
        localStorage.setItem('newmenu', JSON.stringify(this.newmenu));

        this.$store.commit('d2admin/menu/headerSet', JSON.parse(localStorage.getItem('newmenu')));
      }
    },
    forgetPwd() {
      // 忘记功能块
      this.$router.push({
        path: '/find',
        query: {
          loginType: this.loginType,
        },
      });
    },
    registerUser() {
      this.$router.push({
        path: '/register',
        query: {
          loginType: this.loginType,
        },
      });

      // 注册用户功能块
    },
  },
};
</script>

<style lang="scss" scoped>
@import './login.css';
.page-login {
  @extend %unable-select;
  //   $backgroundColor: #020c22;
//   background: url('/image/AOne/login.png') no-repeat;
  // ---
  //   background-color: $backgroundColor;
  //   background-color: #0C141C;
  background-size: 100% 100%;
  height: 100%;
  position: relative;
  background-color: #0e111c;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
    background-position: 16% 42%;
    background-size: 38%;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 408px;
    height: 443px;
    position: absolute;
    right: 20%;
    top: 25%;
   background-image: url('~@/assets/image/AOne/welcome.png');

    background-size: 100% 100%;
    // 卡片
    .el-card {
      margin-bottom: 15px;
      background: #fff0;
      border: none;
      //   bac
    }

    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      padding: 0;
      font-size: 14px;
      color: $color-primary;
      font-weight: bold;
      margin: 0 50px 15px 45px;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 0.5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #fff;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0% {
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100% {
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
.title_lds {
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  color: #505b71;
  font-family: PingFangSC-Medium, PingFang SC;
}
.welcome {
  color: #505b71;
  font-weight: bold;
  font-size: 18px;
  font-family: PingFangSC-Medium, PingFang SC;
}
.el-input__inner {
}
.topbg {
  width: 100%;
  // height: 50px;
}
.el-card__body {
//   background-image: url('../../../assets/image/AOne/welcome.png');
}
input::-webkit-input-placeholder {
  color: #bac4d0ff !important;
}

input::-moz-input-placeholder {
  color: #bac4d0ff !important;
}

input::-ms-input-placeholder {
  color: #bac4d0ff !important;
}
.el-input__inner {
  &::placeholder {
    color: #bac4d0ff !important;
  }

  &::-webkit-input-placeholder {
    /* WebKit browsers 适配谷歌 */
    color: #bac4d0ff !important;
  }

  &:-moz-placeholder {
    /* Mozilla Firefox 4 to 18 适配火狐 */
    color: #bac4d0ff !important;
  }

  &::-moz-placeholder {
    /* Mozilla Firefox 19+ 适配火狐 */
    color: #bac4d0ff !important;
  }

  &:-ms-input-placeholder {
    /* Internet Explorer 10+  适配ie*/
    color: red;
  }
}
.smind_left {
  position: absolute;
  left: 10%;
  top: 24%;
  width: 800px;
  img {
    width: 80%;
  }
}
.v_video {
  width: 100%;
  //   height: 400px;
}
.page-login--form {
  .el-form-item {
    margin-bottom: 10px;
  }
}
</style>
