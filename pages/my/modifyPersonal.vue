<template>
  <div class="modify-personal">
    <template v-if="ismodifyPassword">
      <van-field v-model="username" placeholder="请输入用户名" />
      <van-field v-model="password" placeholder="请输入旧的密码" />
      <van-field v-model="newPassword" placeholder="请输入新的密码" />
    </template>
    <van-field v-model="value" :placeholder="`请输入${placeholder}`" v-else />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bus from "~/plugins/Bus.js";
import { sessionClear } from "~/assets/utils/auth.js";
@Component
export default class ModifyPersonal extends Vue {
  private value: string = "";
  private placeholder: string = "";
  private username: string = "";
  private password: string = "";
  private newPassword: string = "";
  private ismodifyPassword: boolean = false; // 是否修改密码
  private mounted() {
    let route: any = this.$route;
    this.value = route.query.modifyTxt;
    this.placeholder = route.query.title;
    console.log("---", route);
    this.ismodifyPassword = route.query.modifyKey === "password";
    Bus.$on("rightClick", (key: string) => {
      this.save(key);
    });
  }
  private save(key: string) {
    
    if (this.ismodifyPassword) {
      if (!this.username) {
        (this as any).$dialog.alert({
          message: "用户名不能为空!"
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
      (this as any)
        .$axios({
          method: "POST",
          url: "/usr/user/changePassword",
          data: {
            username: this.username,
            password: this.password,
            newPassword: this.newPassword
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
    } else {
      if (!this.value) {
        (this as any).$dialog.alert({
          message: "修改信息不能为空"
        });
        return false;
      }
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
            sessionClear();
            this.$router.go(-1);
          }
        }).catch((err:any) => {
          console.log(err)
        });
    }
  }
  private destroyed() {
    Bus.$off("rightClick");
  }
}
</script>
