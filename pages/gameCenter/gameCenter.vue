<template>
  <div class="game-center">
    <Floor :floorTitle="'热门游戏'" :isMore="false" class="game-center-floor">
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
            <GameItem class="list-item"
              v-for="(item, index) in gamesList" :key="index"
              :gameIfor="item"
              @goDetailClick="goDetail(item)"
              @downHandClick="downHandClick(item)"></GameItem>
          </template>
          </van-list>
        </van-pull-refresh>
      </div>
    </Floor>
    <!-- <CompanyCopyWrit></CompanyCopyWrit> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue"
import GameItem from "~/components/GameItem.vue"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
import { device } from "~/assets/utils/comm.ts"
// 接口
interface Page {
  cur: number, // 当前页
  size: number // 每页显示条数
}
@Component({
  components: {
    Floor,
    GameItem,
    CompanyCopyWrit
  }
})
export default class GameCenter extends Vue {
  private gamesList:Array<any> = []; // 列表
  private refreshing:boolean = false;
  private loading:boolean = false
  private finished:boolean = false
  private page:Page = {
    cur: 1,
    size: 10 
  }
  private onRefresh() {
    setTimeout(() => {
      this.refreshing = false;
    }, 3000)
  }
  private onLoad() {
    this.refreshing = false;
    this.finished = false
    this.loading = false;
  }
  private goDetail(param: any) {
    // 跳转游戏详情
    this.$router.push({ name: 'gameCenter-gameDetails', query: {
      id: param.id
    }})
  }
  private downHandClick(param: any) {
    console.log("下载", param)
  }
  private mounted() {
    // 生命周期
    this.gameList();
  }
  private async gameList() {
    // 获取游戏列表
    let res:any = await (this as any).$axios({
      method: "POST",
      url: "/usr/game/listGame",
      data: {
        page: this.page
      }
    })
    let deviceType:number = device();
    this.gamesList = res.data.games.reduce((total:Array<any>, item:any) => {
      let obj = {
        id: item.id,
        name: item.name,
        iconUrl: item.iconUrl,
        downUrl: item.downloads[deviceType].url,
        size: (item.downloads[deviceType].size / 1024 / 1024).toFixed(2),
        installCount: item.installCount,
        tags: item.tags
      }
      total.push(obj)
      return total
    }, [])
  }
}
</script>
<style lang="scss" scoped>
.game-center {
  margin-top: 10px;
}
.game-List {
  padding: 15px;
}
.pull-refresh {
  max-height: calc(100vh - 148px);
  overflow: hidden;
  overflow-y: auto;
  position: relative;
}
.list-view {
  .list-item {
   padding: 11px 0px; 
  }
  &  > .list-item {
    border-bottom: 1px solid #E0E0E0;
  }
}
.company-copywrit {
  p {
    font-size: 8px;
    color: #595959;
    text-align: center;
  }
}
</style>
