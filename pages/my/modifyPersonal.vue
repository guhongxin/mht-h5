<template>
  <div class="modify-personal">
    <van-field v-model="value" placeholder="请输入用户名" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Bus from "~/plugins/Bus.js"
import { sessionClear } from "~/assets/utils/auth.js"
@Component
export default class ModifyPersonal extends Vue {
  private value:string = ""
  private mounted() {
    let route:any = this.$route
    this.value = route.query.modifyTxt
    Bus.$on("rightClick", (key: string) => {
      this.save(key)
    })
  }
  private save(key: string) {
    if (!this.value) {
      (this as any).$dialog.alert({
        message: '修改信息不能为空'
      })
      return false;
    }
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/updateUser",
      data: {
        user:{
          [key]: this.value
        }
      }
    }).then((res:any) => {
      let data = res;
      if (data.code === 0) {
        (this as any).$toast.success('修改成功')
        sessionClear()
        this.$router.go(-1)
      }
    })
  }
  private destroyed() {
    Bus.$off("rightClick")
  }
}
</script>
