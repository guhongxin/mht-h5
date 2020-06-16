<template>
  <div class="game-details">
    <div class="game-detail-head">
      <div class="game-detail-left">
        <img :src="gameInfor.iconUrl" />
      </div>
      <div class="game-detail-right">
        <div class="game-name">{{gameInfor.name}}</div>
        <div class="game-tag">
          <span v-for="(item, index) in gameInfor.tags"
            :key="index">{{item}}</span>
        </div>
        <div class="game-size">{{gameInfor.size}}M</div>
        <div class="button-group">
          <div class="down-btn" @click="downHandClick(gameInfor)">下载</div>
          <div class="giftbag-btn">礼包</div>
        </div>
      </div>
    </div>
    <div class="game-detail-grid">
      <div class="grid-item">
        <img src="/img/hd.png" class="grid-item-icon" />
        <div class="grid-item-title">活动</div>
      </div>
      <div class="grid-item">
        <img src="/img/gy.png" class="grid-item-icon" />
        <div class="grid-item-title">攻略</div>
      </div>
      <div class="grid-item">
        <img src="/img/lt.png" class="grid-item-icon" />
        <div class="grid-item-title">论坛</div>
      </div>
      <div class="grid-item">
        <img src="/img/gw.png" class="grid-item-icon" />
        <div class="grid-item-title">官网</div>
      </div>
    </div>
    <Floor :floorTitle="'游戏截图'" :isMore="false" class="detail-floor">
      <div class="game-gift-bag">
        <div class="swiper-container" >
          <div class="swiper-wrapper box1" >
            <div
              class="swiper-slide"
              v-for="(item, index) in images"
              :key="index"
            >
              <img :src="item" />
            </div>
          </div>
        </div>
      </div>
    </Floor>
    <Floor :floorTitle="'欢乐视频'" :isMore="false" class="detail-floor">
      <div class="hl-video">
        <div class="hotVideoItem-img-box" v-for="(item, index) in videos" :key="index">
          <img :src="item.coverUrl" />
          <div class="play-box">
            <img src="/img/play.png" @click="playVideo(item)"/>
          </div>
        </div>
      </div>
    </Floor>
    <CompanyCopyWrit></CompanyCopyWrit>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue";
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue";
import { device, downFile } from "~/assets/utils/comm.ts"
interface GameInfor {
  iconUrl: string;
  name: string;
  tags: Array<string>;
  size: string;
  downUrl: string;
}
@Component({
  components: {
    Floor,
    CompanyCopyWrit
  }
})
export default class GameDetails extends Vue {
  private gameInfor:GameInfor = {
    iconUrl: "",
    name: "",
    tags: [],
    size: "",
    downUrl: ""
  };
  // 视频
  private videos:Array<any> = [];
  //截图
  private images:Array<any> = [];
  // 详情id
  private id:number = 0;
  private mounted() {
    // 生命周期
    // 获取id
    let route:any = this.$route
    this.id = route.query.id
    this.gameDetail();
    this.$nextTick(() => {
      // @ts-ignore
      let mySwiper = new Swiper('.swiper-container', {
        slidesPerView: "auto",
        spaceBetween: -14,
        observer: true,
        observeParents:true
      })
      let doc:any = document.querySelector(".box1")
      setTimeout(() => {
        doc.style.transform = 'translate3d(0px, 0px, 0px)';
      }, 100)
    })
  }
  private async gameDetail() {
    // 游戏详情
    let res:any = await (this as any).$axios({
      method: "POST",
      url: "/usr/game/getGame",
      data: {
        gameId: this.id
      }
    })
    let deviceType:number = device();
    let obj = Object.assign({}, res.data);
    obj.downUrl = res.data.downloads[deviceType].url;
    obj.size = res.data.downloads[deviceType].size;
    this.gameInfor = {
      iconUrl: obj.iconUrl,
      name: obj.name,
      tags: obj.tags,
      size: obj.size,
      downUrl: obj.downUrl
    };
    this.videos = obj.videos.slice(0, 2);
    this.images = obj.images;
    console.log(this.gameInfor);
  }
  private downHandClick(param:any) {
    // 下载
    let deviceType:number = device()
    if (deviceType === 0) {
      // ios
      document.location.href = param.downUrl
    } else {
      downFile(param.downUrl)
    }
  }
  private playVideo(item:any) {
    // 播放视频
    this.$router.push({ name: 'play-play', query: {
      coverUrl: item.coverUrl,
      videoUrl: item.videoUrl
    }})
  }
  private destroyed() {
    // 卸载
    this.id = 0;
  }
  
}
</script>
<style lang="scss" scoped>
.game-details {
  padding: 15px 16px 0px;
  box-sizing: border-box;
  background-color: #ffffff;
  min-height: calc(100vh - 106px);
  .game-detail-head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid #CCCCCC;
    padding-bottom: 24px;
    .game-detail-left {
      width: 106px;
      img {
        height: 106px;
        width: 106px;
        vertical-align: middle;
      }
    }
    .game-detail-right {
      flex: 1;
      box-sizing: border-box;
      padding-left: 12px;
      .game-name {
        font-size: 20px;
        font-weight: bold;
        color:#1A1A1A;
      }
      .game-tag {
        font-size: 12px;
        font-weight:400;
        color:#595959;
        margin: 2px 0px;
        & > span:not(:last-child) {
          margin-right: 5px;
        }
      }
      .game-size {
        font-size: 12px;
        font-weight:400;
        line-height: 16px;
        color:#595959;
      }
      .button-group {
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-content: center;
        .down-btn, .giftbag-btn {
          font-size: 12px;
          padding: 5px 0px;
          width: 62px;
          text-align: center;
          background:linear-gradient(0deg,rgba(69,151,67,1),rgba(125,179,73,1));
          border-radius: 22px;
          line-height: normal;
          font-weight:bold;
          color:rgba(255,255,255,1);
        }
        .down-btn {
          margin-right: 18px;
        }
      }
    }
  }
}
.game-detail-grid {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 20px 0px;
  .grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .grid-item-icon {
      height: 40px;
      width: 40px;
    }
    .grid-item-title {
      line-height: normal;
      margin-top: 5px;
      font-size: 12px;
      font-weight: #5A5A5A;
      font-weight: bold;
    }
  }
}
.hl-video {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .hotVideoItem-img-box {
    width: 50%;
    position: relative;
    text-align: center;
    padding: 2px;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 89px;
      display: block;
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
}
.detail-floor {
  padding: 0px;
}
.game-gift-bag {
  margin-right: -16px;
  padding: 15px 0px;
  box-sizing: border-box;
  .swiper-container {
    width: 100%;
  }
  .swiper-slide {
    img {
      width: 330px;
      height: 150px;
      vertical-align: middle;
    }
}
}

</style>
