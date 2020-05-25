<template>
  <div class="Floor">
    <div class="Floor-head">
      <span class="Floor-head-title">{{ floorTitle }}</span>
      <span class="more" v-if="isMore">查看更多<van-icon name="arrow" class="more-icon"/></span>
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
  @Prop({ default: true }) isMore!: boolean;
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
    .Floor-head-title {
      font-weight: bold;
      font-size:13px;
      line-height: normal;
      display: inline-block;
      color: #595959;
    }
    .more {
      font-weight: bold;
      font-size:11px;
      line-height: normal;
      display: inline-block;
      color: #999999;
    }
    .more-icon {
      font-size: 11px;
    }
  }
}
</style>
