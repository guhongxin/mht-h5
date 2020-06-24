<template>
  <div class="modify-personal">
    <template v-if="modifyKey==='password'">
      <van-field v-model="phoneNumber" placeholder="请输入电话号码" />
      <van-field v-model="password" placeholder="请输入旧的密码" type="password" />
      <van-field v-model="newPassword" placeholder="请输入新的密码" type="password" />
      <van-field
        v-model="smsVerifyCode"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendCode1" v-if="!isSendCode1">发送验证码</van-button>
          <van-button size="small" type="primary" v-else>{{btnTxt1}}s</van-button>
        </template>
      </van-field>
    </template>
    <van-field v-model="value" :placeholder="`请输入${placeholder}`" v-else />
    <van-field
        v-model="smsVerifyCode"
        center
        clearable
        placeholder="请输入短信验证码"
        v-if="modifyKey==='phoneNumber'"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendCode" v-if="!isSendCode">发送验证码</van-button>
          <van-button size="small" type="primary" v-else>{{btnTxt}}s</van-button>
        </template>
      </van-field>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bus from "~/plugins/Bus.js";
import { sessionClear, setSession } from "~/assets/utils/auth.js";
@Component
export default class ModifyPersonal extends Vue {
  private value: string = "";
  private placeholder: string = "";
  private phoneNumber: string = "";
  private password: string = "";
  private newPassword: string = "";
  private modifyKey: string = ""; // 修改的属性
  private oldValue: string = ""; // 老的值
  private smsVerifyCode:string = ""; // 验证码
  private btnTxt:number = 59;
  private isSendCode:boolean = false;
  private btnTxt1:number = 59;
  private isSendCode1:boolean = false;
  private mounted() {
    let route: any = this.$route;
    this.value = route.query.modifyTxt;
    this.oldValue = route.query.modifyTxt;
    this.placeholder = route.query.title;
    this.modifyKey = route.query.modifyKey;
    Bus.$on("rightClick", (key: string) => {
      this.save(key);
    });
  }
  private save(key: string) {
    if (this.modifyKey === "password") {
      if (!this.phoneNumber) {
        (this as any).$dialog.alert({
          message: "请输入电话号码！"
        });
        return false;
      }
      if (!this.smsVerifyCode) {
        (this as any).$dialog.alert({
          message: "请输入验证码！"
        });
        return false;
      }
      if (!this.password) {
        (this as any).$dialog.alert({
          message: "旧密码不能为空!"
        });
        return false;
      }
      if (!this.newPassword || this.newPassword.length < 6) {
        (this as any).$dialog.alert({
          message: "新密码不能为空,并且不得少于6位!"
        });
        return false;
      }
      (this as any).$toast.loading({
        mask: true
      });
      (this as any)
        .$axios({
          method: "POST",
          url: "/usr/user/changePassword",
          data: {
            phoneNumber: this.phoneNumber,
            password: this.password,
            newPassword: this.newPassword,
            smsVerifyCode: this.smsVerifyCode
          }
        })
        .then((res: any) => {
          let data = res;
          if (data.code === 0) {
            (this as any).$toast.success("修改成功");
            sessionClear();
            this.$router.go(-1);
          }
        }).catch((err:any) => {
          console.log(err)
        });
    } else if (this.modifyKey === "phoneNumber") {
      // 修改电话号码
      if (!this.value) {
        (this as any).$dialog.alert({
          message: "修改电话号码不能为空"
        });
        return false;
      }
      if (!this.smsVerifyCode) {
        (this as any).$dialog.alert({
          message: "请输入验证码"
        });
        return false;
      }
      (this as any).$toast.loading({
        mask: true
      });
      (this as any).$axios({
        method: "POST",
        url: "/usr/user/bindPhoneNumber",
        data: {
          phoneNumber: this.value,
          smsVerifyCode: this.smsVerifyCode
        }
      })
      .then((res: any) => {
        let data = res;
        if (data.code === 0) {
          (this as any).$toast.success("修改成功");
          this.$router.go(-1);
        }
      }).catch((err:any) => {
        console.log(err)
      });
    } else {
      if (!this.value) {
        (this as any).$dialog.alert({
          message: "修改信息不能为空"
        });
        return false;
      }
      if (this.value === this.oldValue) {
        (this as any).$dialog.alert({
          message: "请修改用户信息！"
        });
        return false;
      }
      (this as any).$toast.loading({
        mask: true
      });
      (this as any)
        .$axios({
          method: "POST",
          url: "/usr/user/updateUser",
          data: {
            user: {
              [key]: this.value
            }
          }
        })
        .then((res: any) => {
          let data = res;
          if (data.code === 0) {
            (this as any).$toast.success("修改成功");
            this.$router.go(-1);
          }
        }).catch((err:any) => {
          console.log(err)
        });
    }
  }
  private sendCode() {
    if (!(this as any).value) {
      (this as any).$dialog.alert({
        message: "请输入电话号码"
      });
      return false;
    }
    this.isSendCode = true;
    let timer = setInterval(()=> {
      this.btnTxt = this.btnTxt - 1;
      if (this.btnTxt === 0) {
        this.isSendCode = false;
        this.btnTxt = 59;
        clearInterval(timer)
      }
    }, 1000)
    let phoneNumber:any = (this as any).value;
    let obj:any = {
      phoneNumber: phoneNumber
    }
    this.getSmsCode(obj);
  }
  private sendCode1() {
    if (!this.phoneNumber) {
      (this as any).$dialog.alert({
        message: "请输入电话号码"
      });
      return false;
    }
    this.isSendCode1 = true;
    let timer = setInterval(()=> {
      this.btnTxt1 = this.btnTxt1 - 1;
      if (this.btnTxt1 === 0) {
        this.isSendCode1 = false;
        this.btnTxt1 = 59;
        clearInterval(timer)
      }
    }, 1000)
    let obj:any = {
      phoneNumber: this.phoneNumber
    }
    this.getSmsCode(obj);
  }
  private getSmsCode(param: any) {
    (this as any).$toast.loading({
      message: '正在发送验证码，请稍后...',
      forbidClick: true,
    });
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/getSmsVerifyCode",
      data: param
    }).then((res:any) => {
      console.log("res", res);
      (this as any).$toast.clear()
    }).catch((err:any) => {
      console.log("err", err);
      (this as any).$toast.clear()
    })
  }
  private destroyed() {
    Bus.$off("rightClick");
  }
}
</script>
