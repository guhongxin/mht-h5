<template>
  <div class="activ-item">
    <div class="activ-item-head">
      <div class="activ-item-head-left">
        <div class="activ-item-name">{{activeData.title}}</div>
      </div>
      <div class="activ-item-head-right">
        <p>发布时间</p>
        <p> {{$customFormat(activeData.pubTime, "yyyy-MM-dd")}}</p>
      </div>
    </div>
    <div class="active-content" @click="itemClick">
      <img :src="activeData.imageUrl"/>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit} from "vue-property-decorator"
@Component
export default class ActivItem extends Vue {
  @Prop({ default: {}}) activeData?:object
  @Emit("itemClick")
  private itemClick() {}
}
</script>
<style lang="scss" scoped>
.activ-item {
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
  .activ-item-head {
    padding: 4px 6px;
    background-color: #ffffff;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .activ-item-head-left {
      .activ-item-name {
        font-size: 12px;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .activ-item-head-right {
      p {
        text-align: right;
        font-size: 12px;
      }
    }
  }
  .active-content {
    background-color: #ffffff;
    border-radius: 0px 0px 4px 4px;
    position: relative;
    padding-bottom: 45%;
    overflow: hidden;
    img {
      display: block;
      position: absolute; 
      left: 0; 
      top: 0; 
      width: 100%;
    }
  }
}
</style>
