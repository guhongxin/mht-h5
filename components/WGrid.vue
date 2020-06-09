<template>
  <div class="w-grid">
    <div class="w-grid-item" v-for="(item, key) in itemOption" :key="key" @click="gridClick(item, key)">
      <div class="icon-box">
        <img :src="item.src" />
      </div>
      <div class="title">{{item.text}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator"
@Component
export default class WGrid extends Vue {
 @Prop({ default: [] }) itemOption!:Array<any>
 @Emit("gridClick") sendGridHandle(item:any, index: number) {}
 private gridClick(item:any, index: number) {
   // 点击九宫格
   this.sendGridHandle(item, index)
 }
}
</script>
<style lang="scss" scoped>
.w-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  align-items: center;
  .w-grid-item {
    padding: 15px 0px;
    text-align: center;
    .icon-box {
      display: inline-block;
      line-height: 0px;
      img {
        height: 34px;
        width: 34px;
      }
    }
    .title {
      font-size: 12px;
      font-weight: 600;
    }
  }
}
</style>
                                                                                             