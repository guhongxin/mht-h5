<template>
  <div class="video">
    <Floor :floorTitle="'欢乐视频'" :isMore="false"></Floor>
    <div class="tab-menu">
      <van-tabs v-model="active"
        animated
        swipeable
        sticky
        :line-width="15"
        :border="false"
        @click="vanTabClick">
        <van-tab v-for="item in tabMenu" :key="item.id" :title="item.name"></van-tab>
      </van-tabs>
      <div class="video-list">
        <van-list
          v-if="videos.length>0"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          class="list-view"
        >
        <HotVideoItem class="video-list-item" v-for="(item, index) in videos" 
          :key="index"
          :video="item"></HotVideoItem>
        </van-list>
        <van-empty description="暂无数据" v-else />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import HotVideoItem from "~/components/HotVideoItem.vue"
import Floor from "~/components/Floor.vue";
interface Page {
  cur: number, // 当前页
  size: number // 每页显示条数
}
@Component({
  components: {
    HotVideoItem,
    Floor
  }
})
export default class VideoList extends Vue {
  private active:number = 0
  private videos:Array<any> = []
  private page:Page = {
    cur: 1,
    size: 10 
  }
  private loading:boolean = false;
  private finished:boolean = false;
  private total:number = 0;
  private tabMenu:Array<any> = [];
  private gameId:any;

  private mounted() {
    this.tabList();
    this.getList()
  }
  private getList() {
    this.videos = [];
    return new Promise((resolve:any, reject:any) => {
      (this as any).$axios({
        method: "POST",
        url: "/usr/game/listVideo",
        data: {
          page: this.page,
          gameId: this.gameId || undefined
        }
      }).then((res:any) => {
        let data = res.data
        this.total = data.page.total;
        let result = data.videos;
        this.videos = [...this.videos, ...result];
        resolve({ code: 0 })
      }).catch((err:any) => {
        reject(err)
      })
    })
  }
  private onLoad() {
    this.page.cur += 1;
    this.getList().then((res:any) => {
      this.loading = false;
      this.finished = false;
      if (this.videos.length >= this.total) {
        this.finished = true;
      }
    }).catch(() => {
      this.loading = false;
      this.finished = false;
    })
  }
  private tabList() {
    (this as any).$axios({
      method: "POST",
      url: "/usr/game/listIdName"
    }).then((res:any) => {
      let data:any = res.data;
      this.tabMenu = data.games;
      this.tabMenu.unshift({ name: "全部", id: 0 })
    }).catch((err:any) => {
      console.log("err", err)
    });
  }
  private vanTabClick(index:any) {
    // 切换tab
    this.gameId = this.tabMenu[index].id;
    this.getList();
  }
}
</script>
<style lang="scss" scoped>
.video {
  padding-top: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  min-height: calc(100vh - 106px);
}
.video-list {
  .list-view {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .video-list-item {
      width: 50%;
      background-color: #ffffff;
    }
  }
}
</style>
