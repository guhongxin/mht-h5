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
          <div class="video-list" v-if="videoList.length==0">
            <HotVideoItem class="video-list-item"></HotVideoItem>
            <HotVideoItem class="video-list-item"></HotVideoItem>
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
@Component({
  components: {
    HotVideoItem,
    Floor
  }
})
export default class VideoList extends Vue {
  private active:number = 0
  private videoList:Array<any> = []
}
</script>
<style lang="scss" scoped>
.video {
  margin-top: 15px;
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
