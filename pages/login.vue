<template>
  <div class="login">
    <div class="logo">
      <img src="/img/logo1.png" />
    </div>
    <div class="login-from">
      <div class="from-item divIput">
        <div class="icon username-icon"></div>
        <input v-model.trim="username" type="text" placeholder="用户名"/>
      </div>
      <div class="from-item divIput">
        <div class="icon password-icon"></div>
        <input v-model.trim="password" type="password" placeholder="密码" />
      </div>
      <van-button round block type="info" color="#7DB349" class="button-style" @click="submitBtn" :loading="btnLoading">
        登录
      </van-button>
    </div>
    <div class="footer">
      <div @click="goHome">返回</div>
      <!-- <div>注册</div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { setToken } from "~/assets/utils/auth.js"
interface From {
  username: string;
  password: string;
}
import { device } from "~/assets/utils/comm.ts"
@Component({
  layout: 'login'
})
export default class Login extends Vue {
  private username:string = "";
  private password:string = "";
  private btnLoading:boolean = false;
  private submitBtn() {
    // 提交
    if (!this.username) {
      (this as any).$dialog.alert({
        message: '请输入用户名！'
      })
      return false
    }
    if (!this.password) {
      (this as any).$dialog.alert({
        message: '请输入密码！'
      })
      return false
    }
    if (this.password.length < 5) {
       (this as any).$dialog.alert({
        message: '密码必须大于5位长度'
      })
      return false
    }
    let obj:From = {
      username: this.username,
      password: this.password
    }
    this.Login(obj)
  }
  private Login(param:From) {
    this.btnLoading = true;
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/loginUser",
      data: param
    }).then((res:any) => {
      let data = res.data;
      //设置token
      setToken(data.token, { expires: 2 });
      this.btnLoading = false;
      (this as any).$router.push({ path: "/" });
    }).catch((res: any) => {
      console.log("---", res)
      this.btnLoading = false;
    })
  }
  private goHome() {
    // 返回首页
    this.$router.push({
      path: "/"
    })
  }
  private mounted() {
    // @ts-ignore
    // var vConsole = new VConsole();
    const originHeight = document.documentElement.clientHeight || document.body.clientHeight;
    // console.log("---", originHeight)
    window.addEventListener('resize', () => {
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // @ts-check
      if (resizeHeight < originHeight) {
        // 键盘弹起所后所需的页面逻辑
        // console.log("键盘弹起所后所需的页面逻辑", resizeHeight)
        let deviceType:number = device()
        if (deviceType === 1) {
          let login:any = document.querySelector(".login")
          login.style.height = originHeight + "px"
        }
      } else {
        // 键盘收起所后所需的页面逻辑
        let deviceType:number = device()
        if (deviceType === 1) {
          let login:any = document.querySelector(".login")
          login.style = undefined
        }
      }
    }, false);
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  padding: 0px 20px;
  .logo {
    margin: 20px auto;
    text-align: center;
    line-height: 0px;
    img {
      height: 200px;
    }
  }
  .login-from {
    .from-item {
      margin-bottom: 20px;
    }
    .divIput {
      width: 100%;
      height: 40px;
      background: #ffffff;
      border:1px solid #999999;
      border-radius: 20px;
      overflow: hidden;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 10px;
    }
    .icon {
      height: 24px;
      width: 24px;
      margin-right: 10px;
    }
    .username-icon {
      background: url("/img/userName.png") no-repeat center;
      background-size: cover;
    }
    .password-icon {
      background: url("/img/key.png") no-repeat center;
      background-size: cover;
    }
    input {
      flex: 1;
      height: 40px;
      width: calc(100% - 20px);
      font-size: 18px;
      background:none;  
      outline:none;  
      border:none;
    }
    input::-webkit-input-placeholder {
      /* placeholder颜色  */
      color: #aab2bd;
      /* placeholder字体大小  */
      font-size: 18px;
    }
  }
  .button-style {
    font-size: 16px;
    font-weight: bold;
  }
  .footer {
    position: absolute;
    width: 100%;
    padding: 0px 20px;
    left: 0px;
    bottom: 20px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

</style>