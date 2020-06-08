<template>
  <div class="grid-giftbag-item" :style="{background: `url(${bjUlr}) no-repeat center`, backgroundSize: 'cover'}">
    <div class="receiveBtn" 
      :class="[ disabled ? 'disableBtn' : 'enableBtn']"
     @click="receiveBtn">{{ disabled ? "已领取": "领取" }}</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
@Component
export default class  GridgiftbagItem extends Vue{
  @Prop({ default: "" }) bjUlr!:string
  @Prop({ default: false }) disabled!:boolean
  private receiveBtn() {
    if (this.disabled) {
      return false
    }
    this.$emit("receiveClick")
  }
}
</script>
<style lang="scss" scoped>
.grid-giftbag-item {
  position: relative;
  height: 130px;
  .receiveBtn {
    position: absolute;
    display: inline;
    right: 18px;
    bottom: 6px;
    border-radius: 22px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    line-height: normal;
    padding: 5px 15px;
    color: #ffffff;
  }
  .enableBtn {
    background:linear-gradient(0deg,rgba(69,151,67,1),rgba(125,179,73,1));
  }
  .disableBtn {
    background-color: #727272;
  }
}
</style>
