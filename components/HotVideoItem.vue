<template>
  <div class="hotVideoItem">
    <div class="hotVideoItem-img-box">
      <img src="/img/2.png" />
      <div class="play-box">
        <img src="/img/play.png" @click="playVideo(item)"/>
      </div>
    </div>
    <div class="hotVideoItem-title">
      <span>作妖记</span>
      <span>|</span>
      <span>道观守阵推荐</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component
export default class HotVideoItem extends Vue {
  private playVideo(param:any) {
    // 播放热门视频
    this.$router.push({ name: 'play-play', query: {
      coverUrl: param.coverUrl,
      videoUrl: param.videoUrl
    }})
  }
}
</script>
<style lang="scss" scoped>
.hotVideoItem {
  padding: 10px 5px;
  .hotVideoItem-img-box {
    line-height: 0px;
    position: relative;
    img {
      width: 100%;
    }
    .play-box {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        height: 24px;
        width: 24px;
      }
    }
  }
  .hotVideoItem-title {
    font-size: 14px;
    font-weight: bold;
    color: #595959;
    span {
      vertical-align: middle;
    }
  }
}
</style>
