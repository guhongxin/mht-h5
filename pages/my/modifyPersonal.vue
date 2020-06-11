<template>
  <div class="modify-personal">
    <van-field v-model="value" placeholder="请输入用户名" />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component
export default class ModifyPersonal extends Vue {
  private value:string = ""
}
</script>
