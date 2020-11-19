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
        @goforumClick="goforumClick"
        @goGiftBagClick="goGiftBagClick"></forum-item>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue";
import ForumItem from "~/components/ForumItem.vue";
import { getToken, setToken } from "~/assets/utils/auth.js";
import { device, downFile } from "~/assets/utils/comm";
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
  private list:Array<any> = new Array(1);
  private downClick() {
    // 下载
    if (device() === 0) {
      // ios
      document.location.href = 'https://apps.apple.com/cn/app/id1506142761';
    } else {
      downFile('http://down.tyu89.wang/mrxz/mrxz-mht.apk');
    }
  }
  private goforumClick() {
    // 进入论坛详情页
    let _token = getToken()
    let _herf = 'http://mrfm.18183g.com/mrxz/index'
    if (_token) {
      _herf += `?token=${_token}`
    } 
    window.location.href = _herf
  }
  private goGiftBagClick() {
    // 进入礼包页
    this.$router.push({
      path: "/grid/giftbag"
    })
  }
  
  private mounted() {
    let _token = getToken()
    if (!_token) {
      let token = this.getQueryString('token')
      if (token && token !== 'null') {
        setToken(token, { expires: 2 });
        location.reload()
      }
    }
   
  }
  private getQueryString(name:string):string {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return '';
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
    justify-content: flex-start;
    align-items: center;
    flex-flow: wrap;
    .forum-list-item {
      width: 50%;
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
