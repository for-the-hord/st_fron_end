<template>
  <div class="page-login">
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify"
        style="background: #0b1322"
      >
        <div class="page-login--content-main" flex="dir:top main:center cross:center;">
          <img class="topbg" src="/image/AOne/top.png" />

          <div class="page-login--form">
            <h1 class="h1">重置密码</h1>

            <el-form ref="loginForm" :rules="rules" :model="formLogin" size="default">
              <br />

              <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="formLogin.password" placeholder="密码"> </el-input>
              </el-form-item>
              <el-form-item prop="password_again" label="确认密码">
                <el-input type="password" v-model="formLogin.password_again" placeholder="确认密码"> </el-input>
              </el-form-item>

              <br />

              <br />
              <br />
              <el-button
                style="background: #e6a033; color: white; border: none !important; font-size: 16px"
                size="default"
                @click="submit2"
                class="button-login"
              >
                提 交
              </el-button>
            </el-form>

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
          <p class="page-login--content-footer-copyright">Copyright © 2022 中科大数据研究院</p>
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
import { recover2 } from '@/common/login_system.js';

export default {
  data() {
    var check_pass = (rule, value, callback) => {
      if (value) {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/.test(value)) {
            callback(new Error('必须包含大小写字母和数字的组合，长度在6-16之间'));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };

    var check_pass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.formLogin.password_again) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    // ^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)[\da-zA-z]{8,16}$

    //   password: /^(?=.*[a-zA-Z0-9].*)(?=.*[a-zA-Z\\W].*)(?=.*[0-9\\W].*).{7,16}$/,

    return {
      user_id: '',
      shows: 1,

      formLogin: {
        password: '',
        password_again: '',
      },

      // 表单校验
      rules: {
        password: [
          {
            validator: check_pass,
            trigger: 'blur',
          },
        ],
        password_again: [
          {
            validator: check_pass2,
            trigger: 'blur',
          },
        ],
      },
    };
  },
  created() {
    console.log(this.$route);
  },

  methods: {
    /**
     * @description 提交表单
     */
    // 提交登录信息

    // 提交登录信息
    submit2() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
      
          let senda_data = {
            user_id: this.$route.query.user_id, //用户ID
            password: this.formLogin.password, //密码
            password_again: this.formLogin.password_again, //确认密码
          };
          recover2(senda_data).then((res) => {
            if (res.code == 200) {
              this.$router.push('/login');
              this.$message.success(res.message);
            } else {
              this.$message.error(res.message);
            }
          });
        } else {
          // 登录表单校验失败
          this.$message.error('表单校验失败，请检查');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './login.css';
.page-login {
  @extend %unable-select;
  //   $backgroundColor: #020c22;
  background: url('/image/AOne/login.png') no-repeat;
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
    width: 600px;
    height: 443px;
    margin: 20px auto;
    // position: absolute;
    // right: 20%;
    // top: 25%;
    // background-image: url('/image/AOne/welcome.png');
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
  background-image: url(/image/AOne/welcome.png);
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
    width: 100%;
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
.h1 {
  font-size: 20px;
  color: white;
  text-align: center;
  margin: 40px;
}
</style>
