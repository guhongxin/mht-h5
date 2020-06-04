<template>
  <div class="hot-game-item">
    <img class="game-icon" :src="gameIfor.iconUrl" />
    <p class="game-name">{{ gameIfor.name }}</p>
    <p class="game-size">{{ gameIfor.size }}M</p>
    <p class="game-tag">{{ gameIfor.tag }}</p>
    <div class="down-btn">下载</div>
  </div>
</template>
<script lang="ts">

import { Vue, Component, Prop} from "vue-property-decorator"
@Component 
export default class HotGameItem extends Vue {
  @Prop({ default: {} }) private gameIfor!:Object;

}
</script>
<style lang="scss" scoped>
.hot-game-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  .game-icon {
    height: 63px;
    width: 63px;
  }
  .game-name {
    font-size: 12px;
    font-weight:bold;
    color:rgba(89,89,89,1);
  }
  .game-size, .game-tag {
    font-size: 12px;
    font-weight:bold;
    color:rgba(166,166,166,1);
  }
  .down-btn {
    width: 54px;
    display: inline-block;
    background: linear-gradient(0deg,rgba(69,151,67,1),rgba(125,179,73,1));
    border-radius: 10px;
    text-align: center;
    font-size: 12px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    padding: 2px 0px;
  }
}
</style>
