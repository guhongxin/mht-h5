<template>
  <div class="hotVideoItem-box">
    <div class="hotVideoItem">
      <div class="hotVideoItem-img-box">
        <img :src="video.horCoverUrl" class="coverImage"/>
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
    console.log("param",param)
    this.$router.push({ name: 'play-play', query: {
      coverUrl: param.verCoverUrl,
      videoUrl: param.videoUrl
    }})
  }
}
</script>
<style lang="scss" scoped>
.hotVideoItem-box {
  padding: 0px 5px 10px 5px;
  box-sizing: border-box;
}
.hotVideoItem {
  background-color: #ffffff;
  border-radius: 4px;
  overflow: hidden;
  .hotVideoItem-img-box {
    position: relative;
    text-align: center;
    overflow: hidden;
    padding-bottom: 50%;
    .coverImage {
      display: block;
      max-width: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
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
    padding: 5px;
    font-size: 14px;
    font-weight: bold;
    color: #595959;
    span {
      vertical-align: middle;
    }
  }
}
</style>
