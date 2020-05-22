<template>
  <div class="Floor">
    <div class="Floor-head">
      <span class="Floor-head-title">{{ floorTitle }}</span>
      <span class="more">查看更多<van-icon name="arrow" class="more-icon"/></span>
    </div>
    <div class="Floor-content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop} from "vue-property-decorator"
@Component
export default class Floor extends Vue {
  @Prop({ default: "" }) floorTitle!: string; 
}
</script>
<style lang="scss" scoped>
.Floor {
  padding: 0px 7px;
  .Floor-head {
    height: 18px;
    border-left: 4px solid #97C252;
    padding: 2px 0px 2px 4px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .Floor-head-title, .more {
      font-weight: bold;
      font-size:14px;
      line-height: normal;
      display: inline-block;
      color: rgba(89,89,89,1);
    }
    .more-icon {
      font-size:14px;
    }
  }
}
</style>
