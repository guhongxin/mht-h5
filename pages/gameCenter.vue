<template>
  <div class="game-center">
    <Floor :floorTitle="'热门游戏'" :isMore="false">
      <div class="game-List">
        <van-pull-refresh v-model="refreshing"
          @refresh="onRefresh"
          class="pull-refresh">
           <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            class="list-view"
          >
          <template #default>
            <GameItem class="list-item"></GameItem>
            <GameItem class="list-item"></GameItem>
          </template>
          </van-list>
        </van-pull-refresh>
      </div>
    </Floor>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue";
import GameItem from "~/components/GameItem.vue"
@Component({
  components: {
    Floor,
    GameItem
  }
})
export default class GameCenter extends Vue {
  private list:Array<any> = [];
  private refreshing:boolean = false;
  private loading:boolean = false
  private finished:boolean = false
  private onRefresh() {
    console.log("下拉刷新")
    setTimeout(() => {
      this.refreshing = false;
    }, 3000)
  }
  private onLoad() {
    console.log("列表刷新")
    this.refreshing = false;
    this.finished = false
    this.loading = false;
  }
}
</script>
<style lang="scss" scoped>
.game-List {
  padding: 15px;
}
.pull-refresh {
  height: calc(100vh - 98px - 56px);
  overflow: hidden;
  overflow-y: auto;
}
.list-view {
  .list-item {
   padding: 11px 0px; 
  }
  &  > .list-item {
    border-bottom: 1px solid #E0E0E0;
  }
}
</style>
