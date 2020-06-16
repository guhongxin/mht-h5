<template>
  <div class="hotVideoItem">
    <div class="hotVideoItem-img-box">
      <img :src="video.coverUrl" />
      <div class="play-box">
        <img src="/img/play.png" @click="playVideo(video)"/>
      </div>
    </div>
    <div class="hotVideoItem-title">
      <span>{{video.gameName}}</span>
      <span>|</span>
      <span>{{video.title}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
@Component
export default class HotVideoItem extends Vue {
   @Prop({ default: function() {
    return {}
  }}) video!:any
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
    text-align: center;
    img {
      width: 100%;
      height: 89px;
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
