<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in carousels" :key="index">
        <img :src="item.imageUrl" />
      </van-swipe-item>
    </van-swipe>
    <WGrid :itemOption="gridOptions" @gridClick="gridItemClick"></WGrid>
    <Floor :floorTitle="'欢乐视频'">
      <div class="happy-videos-box">
        <div class="swiper-container1">
          <div class="swiper-wrapper box1">
            <div
              class="swiper-slide"
              v-for="(item, index) in hotVideos"
              :key="index"
            >
              <img :src="item.coverUrl" />
            </div>
          </div>
        </div>
      </div>
    </Floor>
    <Floor :floorTitle="'热门游戏'">
      <div class="hot-game-list">
        <Hot-game-item
          class="hot-game-list-item"
          v-for="(item, index) in games"
          :key="index"
          :gameIfor="item"
        ></Hot-game-item>
      </div>
    </Floor>
    <Floor :floorTitle="'特色活动'">
      <div class="featActiv-box">
        <div class="swiper-container">
          <div class="swiper-wrapper box1">
            <div
              class="swiper-slide"
              v-for="(item, index) in hotActivities"
              :key="index"
            >
              <div><img :src="item.imageUrl" /></div>
            </div>
          </div>
        </div>
      </div>
    </Floor>
    <CompanyCopyWrit></CompanyCopyWrit>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Floor from "~/components/Floor.vue";
import HotGameItem from "~/components/HotGameItem.vue";
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue";
import WGrid from "~/components/WGrid.vue"
import { device } from "~/assets/utils/comm.ts"
@Component({
  components: {
    Floor,
    HotGameItem,
    CompanyCopyWrit,
    WGrid
  }
})
export default class Home extends Vue {
  private carousels:Array<any> = [];
  private games:Array<any> = [];
  private hotActivities:Array<any> = [];
  private hotVideos:Array<any> = [];
  private gridOptions: Array<any> = [
    {
      src: "/img/game.png",
      path:"/gameCenter/gameCenter",
      text: "游戏中心"
    },
    {
      src: "/img/giftbox.png",
      path: "/grid/giftbag",
      text: "礼包"
    },
    {
      src: "/img/news.png",
      text: "新闻资讯"
    },
    {
      src: "/img/kbshop.png",
      text: "K币商城"
    },
    {
      src: "/img/about.png",
      text: "关于我们"
    }
  ];
  private hotgameOptions: Array<any> = [
    {
      src: "/img/rmgame.png",
      name: "末日血战",
      size: "200M",
      tag: "末日废土"
    },
    {
      src: "/img/rmgame.png",
      name: "塔防纪元",
      size: "200M",
      tag: "策略塔防"
    },
    {
      src: "/img/rmgame.png",
      name: "末日血战",
      size: "200M",
      tag: "末日废土"
    },
    {
      src: "/img/rmgame.png",
      name: "塔防纪元",
      size: "200M",
      tag: "策略塔防"
    }
  ];
  private featActivOptions: Array<any> = [
    {
      imageUrl: "/img/1.png"
    },
    {
      imageUrl: "/img/2.png"
    },
    {
      imageUrl: "/img/1.png"
    },
    {
      imageUrl: "/img/1.png"
    },
    {
      imageUrl: "/img/1.png"
    }
  ];
  private mounted() {
    this.carouselList();
    this.hotVideoList();
    this.hotGameList();
    this.activList();
    // @ts-ignore
    let swiper1 = new Swiper(".swiper-container1", {
      slidesPerView: "auto",
      centeredSlides: false,
      spaceBetween: 6,
      observer: true,
      observeParents:true
    });
    this.$nextTick(() => {
      setTimeout(() => {
        // @ts-ignore
        let swiper = new Swiper(".swiper-container", {
          effect: 'coverflow',
          slidesPerView: "auto",
          centeredSlides: true,
          loop: true,
          observer: true,
          observeParents:true,
          coverflowEffect: {
            rotate: 0,
            stretch: 10,
            depth: 50,
            modifier: 4,
            slideShadows: false
          }
        });
      }, 500)
      let doc:any = document.querySelector(".box1")
      setTimeout(() => {
        doc.style.transform = 'translate3d(0px, 0px, 0px)';
      }, 100)
    })
  }
  private gridItemClick(param: any, index: number) {
    if (!param.path) {
      (this as any).$dialog.alert({
        message: '该功能暂未开启'
      })
    }
    this.$router.push({ path: param.path })
  }
  private async carouselList() {
    // 轮播
    let res = await (this as any).$axios({
      method: "POST",
      url: "/usr/index/carousels"
    })
    this.carousels = res.data.carousels
  }
  private async hotVideoList() {
    let res1 = await (this as any).$axios({
      method: "POST",
      url: "/usr/index/hotVideos"
    })
    this.hotVideos = res1.data.videos
  }
  private async hotGameList() {
    // 游戏
    let res = await (this as any).$axios({
      method: "POST",
      url: "/usr/index/hotGames"
    })
    this.games = res.data.games
    let deviceType:number = device()
    this.games = res.data.games.reduce((total:Array<any>, item:any) => {
      let obj = {
        id: item.id,
        name: item.name,
        iconUrl: item.iconUrl,
        downUrl: item.downloads[deviceType].url,
        size: (item.downloads[deviceType].size / 1024 / 1024).toFixed(2)
      }
      total.push(obj)
      return total
    }, [])
  }
  private async activList() {
    // 游戏
    let res = await (this as any).$axios({
      method: "POST",
      url: "/usr/index/hotActivities"
    })
    this.hotActivities = res.data.activities
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/nuxt.scss";
.my-swipe .van-swipe-item {
  height: 220px;
  background-color: #39a9ed;
  img {
    height: 220px;
  }
}
.van-grid-icon {
  height: 34px;
  width: 34px;
  img {
    height: 34px;
  }
}
.van-grid-text {
  font-size: 12px;
}
.happy-videos-box {
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  .happy-videos {
    flex: 1;
    height: 170px;
    img {
      width: 100%;
      height: 170px;
    }
  }
  & > .happy-videos:not(:last-child) {
    margin-right: 8px;
  }
}
.hot-game-list {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  .hot-game-list-item {
    flex: 1;
  }
}
.featActiv-box {
  padding: 15px;
}
.swiper-container {
  justify-content: center;
}
.swiper-slide-active {
  img {
    width: 210px;
    height: 110px;
  }
}
.swiper-slide {
  img {
    width: 210px;
    height: 110px;
  }
}

.swiper-container .swiper-wrapper .swiper-slide {
  width: 210px;
  height: 110px;
}
.swiper-container .swiper-wrapper .swiper-slide img {
  width: 210px;
  height: 110px;
}
.swiper-container1 {
  width: 100%;
  height: 170px;
  overflow: hidden;
  .swiper-slide {
    width: 30%;
    img {
      width: 100%;
      height: 170px;
    }
  }
}
</style>
