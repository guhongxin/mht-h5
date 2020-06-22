<template>
  <div class="game-new-item">
    <div class="game-new-item-head">
      <div class="game-new-item-head-left">
        <img :src="newInfor.game?newInfor.game.iconUrl:''" class="game-icon" />
        <div class="game-name">
          {{newInfor.game ? newInfor.game.name:""}}
        </div>
      </div>
      <div class="game-new-item-head-right">
        <p>发布时间</p>
        <p> {{$customFormat(newInfor.pubTime, "yyyy-MM-dd")}}</p>
      </div>
    </div>
    <div class="game-new-image-box">
      <img :src="newInfor.coverUrl" />
    </div>
    <div class="game-new-footer">
      {{newInfor.title}}
    </div>
  </div>
</template>
<script lang="ts">
import  { Vue, Component, Prop } from "vue-property-decorator"
@Component
export default class GameNewItem extends Vue {
  @Prop({ default() {
    return {}
  }}) newInfor!:any
}
</script>
<style lang="scss" scoped>
.game-new-item {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  .game-new-item-head {
    padding: 4px 6px;
    background-color: #ffffff;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .game-new-item-head-left {
      .game-icon {
        height: 40px;
        width: 40px;
        vertical-align: middle;
      }
      .game-name {
        font-size: 12px;
        font-weight: bold;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .game-new-item-head-right {
      p {
        text-align: right;
        font-size: 12px;
      }
    }
  }
  .game-new-image-box {
    overflow: hidden;
    position: relative;
    padding-bottom: 50%;
    img {
      display: block;
      position: absolute; 
      left: 0; 
      top: 0; 
      width: 100%;
    }
  }
  .game-new-footer {
    padding: 10px 6px;
    background-color: #ffffff;
    border-radius: 0px 0px 4px 4px;
    font-size: 12px;
  }
}
</style>
