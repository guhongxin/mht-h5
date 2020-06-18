<template>
  <div class="video">
    <Floor :floorTitle="'欢乐视频'" :isMore="false" class="titleFloor"></Floor>
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
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        class="list-view"
        v-if="videos.length>0"
      >
        <div class="video-list"  >
          <HotVideoItem class="video-list-item" v-for="(item, index) in videos" 
            :key="index"
            :video="item"></HotVideoItem>
        </div>
      </van-list>
      <van-empty description="暂无数据" v-else />
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
    this.videos = [];
    this.getList()
  }
  private getList() {
    
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
    this.videos = [];
    this.page.cur = 1;
    this.gameId = this.tabMenu[index].id;
    this.getList();
  }
}
</script>
<style lang="scss" scoped>
.video {
  box-sizing: border-box;
  min-height: calc(100vh - 106px);
  .titleFloor {
    padding: 10px 0px;
  }
}
.list-view {
  background-color: #dddddd;
  padding: 10px 5px;
  box-sizing: border-box;
}
.video-list {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .video-list-item {
    width: 50%;
  }
}
</style>
