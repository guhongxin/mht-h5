<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swipeOptions" :key="index">
        <img :src="item.src" />
      </van-swipe-item>
    </van-swipe>
    <van-grid square :border="false" :icon-size="14">
      <van-grid-item v-for="(item, index) in gridOptions" :key="index" @click="gridItemClick(item)">
        <template #icon>
          <img :src="item.src" class="van-grid-icon" />
        </template>
        <template #text>
          <span class="van-grid-text">{{ item.text }}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <Floor :floorTitle="'欢乐视频'">
      <div class="happy-videos-box">
        <div
          v-for="(item, index) in happyVideos"
          :key="index"
          class="happy-videos"
        >
          <img :src="item.src" />
        </div>
      </div>
    </Floor>
    <Floor :floorTitle="'热门游戏'">
      <div class="hot-game-list">
        <Hot-game-item
          class="hot-game-list-item"
          v-for="(item, index) in hotgameOptions"
          :key="index"
          :gameIfor="item"
        ></Hot-game-item>
      </div>
    </Floor>
    <Floor :floorTitle="'特色活动'">
      <div class="featActiv-box">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(item, index) in featActivOptions"
              :key="index"
            >
              <div><img :src="item.src" /></div>
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
@Component({
  components: {
    Floor,
    HotGameItem,
    CompanyCopyWrit
  }
})
export default class Home extends Vue {
  private swipeOptions: Array<any> = [
    {
      src: "/img/1.png"
    },
    {
      src: "/img/1.png"
    }
  ];
  private gridOptions: Array<any> = [
    {
      src: "/img/game.png",
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
      src: "/img/my.png",
      text: "我的"
    },
    {
      src: "/img/kbshop.png",
      text: "K币商城"
    },
    {
      src: "/img/forum.png",
      text: "论坛"
    },
    {
      src: "/img/service.png",
      text: "服务"
    },
    {
      src: "/img/about.png",
      text: "关于我们"
    }
  ];
  private happyVideos: Array<any> = [
    {
      src: "/img/hlsp.png"
    },
    {
      src: "/img/hlsp.png"
    },
    {
      src: "/img/hlsp.png"
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
      src: "/img/1.png"
    },
    {
      src: "/img/2.png"
    },
    {
      src: "/img/1.png"
    }
  ];
  private mounted() {
    console.log("mounted");
    // @ts-ignore
    let swiper = new Swiper(".swiper-container", {
      effect : 'coverflow',
      slidesPerView: "auto",
      centeredSlides: true,
      autoplay: 3000,
      loop : true,
      coverflow: {
        rotate: 0,
        stretch: 10,
        depth: 60,
        modifier: 4,
        slideShadows: false
      }
    });
  }
  private gridItemClick(param: any) {
    this.$router.push({ path: param.path })
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
</style>
