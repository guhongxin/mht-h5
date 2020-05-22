<template>
  <div class="home">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in swipeOptions" :key="index">
        <img :src="item.src" />
      </van-swipe-item>
    </van-swipe>
    <van-grid square :border="false">
      <van-grid-item v-for="(item, index) in gridOptions" :key="index">
        <template #icon>
          <img :src="item.src" class="van-grid-icon"/>
        </template>
        <template #text>
          <span class="van-grid-text">{{item.text}}</span>
        </template>
      </van-grid-item>
    </van-grid>
    <Floor :floorTitle="'欢乐视频'">
      <div class="happy-videos-box">
        <div v-for="(item, index) in happyVideos" :key="index" class="happy-videos">
          <img :src="item.src">
        </div>
      </div>
    </Floor>
    <Floor :floorTitle="'热门游戏'">
      <div class="hot-game-list">
        <Hot-game-item class="hot-game-list-item" v-for="(item, index) in hotgameOptions" :key="index" :gameIfor="item"></Hot-game-item>
      </div>
    </Floor>
    <Floor :floorTitle="'特色活动'"></Floor>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Floor from "~/components/Floor.vue"
import HotGameItem from "~/components/HotGameItem.vue"
@Component({
  components: {
    Floor,
    HotGameItem
  }
})
export default class Home extends Vue {
  private swipeOptions: Array<any> = [{
    src: "/img/1.png"
  }, {
    src: "/img/1.png"
  }]
  private gridOptions:Array<any> = [{
    src: "/img/game.png",
    text: "游戏中心"
  }, {
    src: "/img/giftbox.png",
    text: "礼包"
  }, {
    src: "/img/news.png",
    text: "新闻资讯"
  }, {
    src: "/img/my.png",
    text: "我的"
  }, {
    src: "/img/kbshop.png",
    text: "K币商城"
  }, {
    src: "/img/forum.png",
    text: "论坛"
  }, {
    src: "/img/service.png",
    text: "服务"
  }, {
    src: "/img/about.png",
    text: "关于我们"
  }]
  private happyVideos: Array<any> = [{
    src: "/img/hlsp.png"
  }, {
    src: "/img/hlsp.png"
  }, {
    src: "/img/hlsp.png"
  }]
  private hotgameOptions: Array<any> = [{
    src: "/img/rmgame.png",
    name: "末日血战",
    size: "200M",
    tag: "末日废土"
  }, {
    src: "/img/rmgame.png",
    name: "塔防纪元",
    size: "200M",
    tag: "策略塔防"
  }, {
    src: "/img/rmgame.png",
    name: "末日血战",
    size: "200M",
    tag: "末日废土"
  }, {
    src: "/img/rmgame.png",
    name: "塔防纪元",
    size: "200M",
    tag: "策略塔防"
  }]
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/nuxt.scss";
.my-swipe .van-swipe-item {
  height: 220px;
  background-color: #39a9ed;
}
.van-grid-icon {
  height: 34px;
  width: 34px;
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
    img {
      width: 86px;
      height: 170px;
      height: 100%;
    }
  }
  &>.happy-videos:not(:last-child) {
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
</style>>
