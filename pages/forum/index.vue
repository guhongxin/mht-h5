<template>
  <div class="forum">
    <Floor :floorTitle="'游戏论坛'" :isMore="false" class="titleFloor"></Floor>
    <div class="banner-box">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.imageUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="forum-list">
      <forum-item class="forum-list-item" 
        v-for="(item, index) in list" :key="index"
        @downClick="downClick"
        @goforumClick="goforumClick"></forum-item>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue";
import ForumItem from "~/components/ForumItem.vue";
import { getToken } from "~/assets/utils/auth.js";
@Component({
  components: {
    Floor,
    ForumItem
  }
})
export default class Forum extends Vue {
  private  bannerList: Array<any> = [{
    imageUrl: "/img/1.png"
  }, {
    imageUrl: "/img/2.png"
  }];
  private list:Array<any> = new Array(2);
  private downClick() {
    console.log("下载")
  }
  private goforumClick() {
    // 进入论坛详情页
    console.log("论坛")
    // this.$router.push({
    //   path: "/forum/forumDetails",
    //   query: {
    //     navBarType: '2'
    //   }
    // })
    let _token = getToken()
    // window.location.href = `http://192.168.1.16:8081/index.html?token=${_token}`
    window.location.href = `http://192.168.1.17:8080/index.html?token=${_token}`
  }
  private goGiftBagClick() {
    // 进入礼包页
  }
}
</script>
<style lang="scss" scoped>
.forum {
  box-sizing: border-box;
  min-height: calc(100vh - 106px);
  .titleFloor {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .banner-box {
    background-color: #ffffff;
    padding: 0px 7px 10px;
    box-sizing: border-box;
    .my-swipe {
      border-radius: 4px;
      width: 100%;
      position: relative;
      box-sizing: border-box;
      padding-bottom: 50%;
      img {
        width: 100%;
        display: block;
        position: absolute;
        left: 0; 
        top: 0; 
      }
    }
  }
  .forum-list {
    box-sizing: border-box;
    padding: 10px 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: wrap;
    .forum-list-item {
      flex: 50%;
    }
    &>.forum-list-item:nth-child(2n+1) {
      padding-right: 2px;
    }
    &>.forum-list-item:nth-child(2n) {
      padding-left: 2px;
    }
  }
}
</style>
