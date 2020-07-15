<template>
  <div class="my-collect">
    <van-tabs v-model="active" :line-width="20" :line-height="4">
      <van-tab title="游戏" style="padding-top: 3px;">
       <GameItem :gameIfor="gameList"></GameItem>
      </van-tab>
      <van-tab title="帖子" style="padding-top: 3px;">
        <FavoritePostItem></FavoritePostItem>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GameItem from "~/components/GameItem.vue";
import FavoritePostItem from "~/components/FavoritePostItem.vue";
@Component({
  components: {
    GameItem,
    FavoritePostItem
  }
})
export default class MyCollect extends Vue {
  private active:number = 0;
  private gameList:Array<any> = [];
}
</script>
<style lang="scss" scoped>
.my-collect {
  /deep/ .van-tabs__line {
    background-color: #7DB349;
  }
}
</style>