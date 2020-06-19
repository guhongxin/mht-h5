<template>
  <div class="game-center">
    <Floor :floorTitle="'热门游戏'" :isMore="false" class="game-center-floor">
      <div class="game-List">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
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
import { device, downFile } from "~/assets/utils/comm.ts"
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
  private loading:boolean = false;
  private finished:boolean = false;
  private page:Page = {
    cur: 1,
    size: 10
  };
  private total:number = 0;
  private onLoad() {
    this.page.cur += 1;
    this.gameList().then((res:any) => {
      this.loading = false;
      this.finished = false;
      if (this.gamesList.length >= this.total) {
        this.finished = true;
      }
    }).catch(() => {
      this.loading = false;
      this.finished = false;
    })
  }
  private goDetail(param: any) {
    // 跳转游戏详情
    this.$router.push({ path: `/gameCenter/gameDetails/${param.id}`})
  }
  private downHandClick(param: any) {
    let deviceType:number = device()
    if (deviceType === 0) {
      // ios
      document.location.href = param.downUrl
    } else {
      downFile(param.downUrl)
    }
  }
  private mounted() {
    // 生命周期
    this.gamesList = [];
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
    let data = res.data;
    this.total = data.page.total;
    let result = data.games.reduce((total:Array<any>, item:any) => {
      let obj = {
        id: item.id,
        name: item.name,
        iconUrl: item.iconUrl,
        downUrl: item.downloads[deviceType].url,
        size: item.downloads[deviceType].size,
        installCount: item.installCount,
        tags: item.tags,
        intro: item.intro
      }
      total.push(obj)
      return total
    }, [])
    this.gamesList = [...this.gamesList, ...result]
    return new Promise((resolve:any, reject:any) => {
      if (res.code === 0) {
        resolve({ code: 0 })
      } else {
        reject(res)
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.game-center {
  padding-top: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  overflow: hidden;
  overflow-y: auto;
  min-height: calc(100vh - 106px);
}
.game-List {
  padding: 15px;
  height: calc(100vh - 136px);
  overflow: hidden;
  overflow-y: auto;
  .list-view {
    .list-item {
    padding: 11px 0px; 
    }
    &  > .list-item {
      border-bottom: 1px solid #E0E0E0;
    }
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
