<template>
  <div class="login">
    <van-form>
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ validator: passwordValidator,  message: passwordErrMsg }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" @click="submitBtn">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component({
  layout: 'login'
})
export default class Login extends Vue {
  private username:string = "";
  private password:string = "";
  private passwordErrMsg:string = "";
  private submitBtn() {
    // 提交
  }
  private passwordValidator(val:string) {
    // 密码校验
    if (!val) {
      this.passwordErrMsg = "请输入密码"
    } else if (val.length < 5) {
      this.passwordErrMsg = "密码长度必须大于5位"
    }
  }
}
</script>