<template>
  <div class="video">
    <Floor :floorTitle="'欢乐视频'" :isMore="false"></Floor>
    <div class="tab-menu">
      <van-tabs v-model="active"
        animated
        swipeable
        sticky
        :line-width="15"
        :border="false">
        <van-tab title="全部">
          <div class="video-list" v-if="videos.length>0">
            <HotVideoItem class="video-list-item" v-for="(item, index) in videos" 
             :key="index"
             :video="item"></HotVideoItem>
          </div>
          <van-empty description="暂无数据" v-else />
        </van-tab>
        <van-tab title="末日血战">
          <van-empty description="暂无数据" />
        </van-tab>
        <van-tab title="作妖计">
          <van-empty description="暂无数据" />
        </van-tab>
        <van-tab title="塔防纪元">
          <van-empty description="暂无数据" />
        </van-tab>
      </van-tabs>
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
  private mounted() {
    this.getList()
  }
  private getList() {
    (this as any).$axios({
      method: "POST",
      url: "/usr/game/listVideo",
      data: {
        page: this.page
      }
    }).then((res:any) => {
      let data = res.data
      console.log("---", data);
      this.videos = data.videos
    }).catch((err:any) => {
      console.log(err)
    })
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .video-list-item {
    width: 50%;
    background-color: #ffffff;
  }
}
</style>
