<template>
  <div class="game-new-item">
    <div class="game-new-item-head">
      <div class="game-new-item-head-left">
        <img src="/img/rmgame.png" class="game-icon" />
        <div class="game-name">
          作妖纪
        </div>
      </div>
      <div class="game-new-item-head-right">
        <p>发布时间</p>
        <p>2020-06-10</p>
      </div>
    </div>
    <div class="game-new-image-box">
      <img src="/img/1.png" />
    </div>
    <div class="game-new-footer">
      掘金 - juejin.im - 一个帮助开发者成长的社区
    </div>
  </div>
</template>
<script lang="ts">
import  { Vue, Component } from "vue-property-decorator"
@Component
export default class GameNewItem extends Vue {

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
    line-height: 0px;
    overflow: hidden;
    img {
      width: 100%;
      height: 140px;
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
