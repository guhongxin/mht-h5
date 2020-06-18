<template>
  <!-- <div class="grid-giftbag-item" :style="{background: `url(${bjUlr}) no-repeat center`, backgroundSize: 'cover'}"> -->
  <div class="grid-giftbag-item">
    <img :src="bjUlr" class="img-box"/>
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
  background-color: #ffffff;
  border-radius: 4px;
  padding-bottom: 50%;
  overflow: hidden;
  .img-box {
    position: absolute;
    width: 100%;
    top: 0px;
    right: 0px;
  }
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
