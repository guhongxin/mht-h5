<template>
  <div class="game-item" @click="goDetails">
    <div class="game-item-left">
      <img src="/img/rmgame.png" />
    </div>
    <div class="game-item-middle">
      <div class="game-name">末日血战</div>
      <div class="game-tag-list">
        <div class="game-tag">放置</div>
        <div class="game-tag">回合</div>
        <div class="game-tag">卡牌</div>
      </div>
      <div class="game-other">
        <div class="game-subtitle">末日废土</div>
        <div class="game-pepole-numb">900万人玩过 | 200M</div>
      </div>
    </div>
    <div class="game-item-right">
      <div class="down-btn" @click.stop="downClick">下载</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator"
@Component
export default class GameItem extends Vue {
  // @Prop({ default: {} }) private gameIfor!:Object;
  @Emit("goDetailClick") goDetailClick() {}
  @Emit("downHandClick") downHandClick() {}
  private goDetails() {
    this.goDetailClick();
  }
  private downClick() {
    this.downHandClick()
  }
}
</script>
<style lang="scss" scoped>
.game-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}
.game-item-left {
  width: 68px;
  margin-right: 16px;
  img {
    height: 68px;
    width: 68px;
  }
}
.game-item-middle {
  flex: 2;
  .game-name {
    font-size: 16px;
    font-weight: bold;
    color: #595959;
  }
  .game-tag-list {
    margin-top: 7px;
  }
  .game-tag {
    display: inline-block;
    height: 16px;
    width: 32px;
    font-size: 12px;
    font-weight: 400;
    color:rgba(145,144,144,1);
    line-height: 16px;
    border: 1px solid rgba(145,144,144,1);
    border-radius: 3px;
    text-align: center;
    position: relative;
  }
  .game-tag::before {
    content: "";
    width: 0px;
    height: 0px;
    border-right: 16px solid rgba(233, 233, 233, 1);
    border-left: 16px solid transparent;
    border-top: 12px solid transparent;
    position: absolute;
    bottom: 0px;
    right: 0px;
    z-index: -1;
  }
  .game-other {
    font-size: 10px;
    font-weight: bold;
    color: rgba(66,67,72,1);
    opacity: 0.7;
    margin-top: 10px;
    display: flex;
    justify-content: start;
    align-items: center;
    .game-subtitle {
      margin-right: 4px;
    }
  }
}
.game-item-right {
  flex: 1;
  .down-btn {
    float: right;
    width: 63px;
    background: linear-gradient(0deg,rgba(69,151,67,1),rgba(125,179,73,1));
    border-radius: 12px;
    text-align: center;
    line-height: normal;
    color: #ffffff;
    font-size: 14px;
    font-weight:bold;
    padding: 2px 0px;
  }
}
</style>
