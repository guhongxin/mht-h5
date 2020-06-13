<template>
  <div class="modify-personal">
    <van-field v-model="value" placeholder="请输入用户名" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Bus from "~/plugins/Bus.js"
@Component
export default class ModifyPersonal extends Vue {
  private value:string = ""
  private mounted() {
    let route:any = this.$route
    this.value = route.query.modifyTxt
    Bus.$on("rightClick", this.save)
  }
  private save() {
    console.log("保存", this.value)
  }
}
</script>
