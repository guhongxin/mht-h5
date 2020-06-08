<template>
  <div class="login">
    <van-form ref="loginForm">
      <van-field
        v-model.trim="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        @blur="checkPassword" :error-message="passwordErrMsg"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" @click="submitBtn" :loading="btnLoading">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import { setToken } from "~/assets/utils/auth.js"
interface From {
  username: string;
  password: string;
}
@Component({
  layout: 'login'
})
export default class Login extends Vue {
  private username:string = "";
  private password:string = "";
  private passwordErrMsg:string = "";
  private btnLoading:boolean = false;
  private submitBtn() {
    // 提交
    this.btnLoading = true;
    if (this.passwordErrMsg) {
      this.btnLoading = false;
      return false
    }
    (this.$refs.loginForm as any).validate().then((res:any) => {
      let obj:From = {
        username: this.username,
        password: this.password
      }
      this.Login(obj)
    }).catch((err:any) => {
      this.btnLoading = false;
    })
  }
   
  private checkPassword() {
    // 密码校验
    if (!this.password) {
      this.passwordErrMsg = "请输入密码"
    } else if (this.password.length < 5) {
      this.passwordErrMsg = "密码长度必须大于5位"
    } else {
      this.passwordErrMsg = ""
    }
  }
  private Login(param:From) {
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/loginUser",
      data: param
    }).then((res:any) => {
      let data = res.data;
      //设置token
      setToken(data.token);
      this.btnLoading = false;
      (this as any).$router.push({ path: "/" });
    }).catch(() => {
      this.btnLoading = false;
    })
  }
}
</script>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>