<template>
  <div class="play">
    <video :src="videoSrc" :poster="coverUrl" controls="controls" id="video-box"
      webkit-playsinline="true"
      playsinline="true"
      x-webkit-airplay="allow"
      x5-video-player-type="h5"
      x5-video-player-fullscreen="true"
      x5-video-orientation="portraint">
      您的浏览器不支持 video 标签。
      </video>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component
export default class Play extends Vue {
  private videoSrc:string = "";
  private coverUrl:string = "";
  private mounted() {
    let route:any = this.$route
    this.videoSrc = route.query.videoUrl
    this.coverUrl = route.query.coverUrl
    console.log("route", route)
  }
}
</script>
<style lang="scss" scoped>
.play {
  width: 100wh;
  height: calc(100vh - 106px);
  .cover-box {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, .1);
    text-align: center;
    img {
      height: 100%;
    }
  }
}
#video-box {
  width: 100%;
  height: calc(100vh - 106px);
}
</style>