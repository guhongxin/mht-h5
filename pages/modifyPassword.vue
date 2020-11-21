<template>
  <div class="modifyPassword">
    <div class="page-title">找回密码</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="phone"
        name="手机号码"
        placeholder=""
        readonly
        disabled
      />
      <van-field
        v-model="vcode"
        center
        clearable
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendCode">{{codeTime===60 ? '发送验证码': codeTime + 's'}}</van-button>
        </template>
      </van-field>
      <van-field
        v-model="password"
        name="密码"
        placeholder="请输入新的密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" :loading="btnLoading" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>

    <div class="footer">
      <div @click="goLogin">返回</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { device } from "~/assets/utils/comm.ts"
const md5 = require('blueimp-md5')
@Component({
  layout: 'login'
})
export default class ModifyPassword extends Vue{
  private phone:string = ''
  private vcode:string = ''
  private password:string = ''
  private codeTime:number = 60 // 发送短信倒计时
  private codeDuration:boolean = false // 是否正在发送短信验证码期间
  private btnLoading:boolean = false
  private username: string = '' // 用户名
  private mounted() {
    // @ts-ignore
    // var vConsole = new VConsole();
    let _route = this.$route
    console.log('_route', _route)
    this.phone = _route.params.phone
    this.username = _route.params.username
    const originHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.addEventListener('resize', () => {
      const resizeHeight = document.documentElement.clientHeight || document.body.clientHeight;
      // @ts-check
      if (resizeHeight < originHeight) {
        // 键盘弹起所后所需的页面逻辑
        let deviceType:number = device();
        if (deviceType === 1) {
          let login:any = document.querySelector(".modifyPassword");
          login.style.height = originHeight + "px";
        }
      } else {
        // 键盘收起所后所需的页面逻辑
        let deviceType:number = device();
        if (deviceType === 1) {
          let login:any = document.querySelector(".modifyPassword");
          login.style = undefined;
        }
      }
    }, false);
  }
  private onSubmit() {
    // 提交
    console.log('--提交---')
    let obj = {
      username: this.username,
      verifyCode: this.vcode,
      password: md5(this.password)
    }
    console.log('----', obj)
    if (!this.vcode) {
      (this as any).$toast('请输入验证码！');
      return false
    }
    this.btnLoading = true;
    (this as any).$axios({
      method: "POST",
      url: '/usr/user/updatePassword',
      data: obj
    }).then((res:any) => {
      let data:any = res.data
      this.$router.push({
        path: "/login"
      })
      this.btnLoading = false;
      console.log('data', data)
    }).catch(() => {
      this.btnLoading = false;
      return false
    })
  }
  private goLogin() {
    // 返回到登录页面
    this.$router.push({
      path: '/login'
    })
  }
  private sendCode() {
    // 发送短信
    if (this.codeDuration) {
      return false
    }
    this.codeDuration = true
    this.codeTime = this.codeTime - 1
    let timer:any = setInterval(() => {
      this.codeTime = this.codeTime - 1
      if (this.codeTime === 0) {
        this.codeTime = 60
        this.codeDuration = false
        clearInterval(timer)
      }
    }, 1000);
    (this as any).$axios({
      method: "POST",
      url: '/usr/user/getSmsVerifyCodeByUsername',
      data:  {
        username: this.username
      }
    }).then((res:any) => {
      let data:any = res.data
      console.log('data', data)
    }).catch(() => {
      return false
    })
  }
}
</script>
<style lang="scss" scoped>
.modifyPassword {
  width: 100vw;
  height: 100vh;
  position: relative;
  .page-title {
    width: 100vw;
    text-align: center;
    font-size: 16px;
    padding: 10px 0px;
    box-sizing: border-box;
  }
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
</style>