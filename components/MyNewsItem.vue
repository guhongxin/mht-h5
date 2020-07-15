<template>
  <div class="my-news-item">
    <div class="head">
      <div class="head-left">
        <img src="/img/user2.png" />
      </div>
      <div class="head-right">
        <p class="user-name">一枝独秀的老人</p>
        <p class="releaseTime">2020-07-15 11:00:00</p>
      </div>
    </div>
    <div class="people-pub-news">
      不是傻子，是傻白甜
    </div>
    <div class="my-reply">
      我：<span>南瓜头的本体差不多，选择哪个好些?还是两个都做</span>
    </div>
    <div class="footer">
      <div class="footer-left">末日血战吧</div>
      <div class="footer-right">
        <i class="iconfont iconpinglun3-copy" style="vertical-align: middle;"></i>
        <span>回复</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component } from "vue-property-decorator"
@Component
export default class MyNewsItem extends Vue {

}
</script>
 <style lang="scss" scoped>
 .my-news-item {
  background-color: #ffffff;
  padding: 10px;
   .head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .head-left {
      img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        display: block;
      }
    }
    .head-right {
      margin-left: 10px;
      .user-name {
        font-size: 16px;
        font-weight: 600;
      }
      .releaseTime {
        font-size: 12px;
      }
    }
  }
  .people-pub-news {
    padding: 10px 0px;
    font-size: 12px;
  }
  .my-reply {
    border-radius: 4px;
    padding: 10px 6px;
    background-color: #F8F9FB;
    font-size: 12px;
  }
  .footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer-left {
      font-size: 12px;
      color: #333333;
    }
    .footer-right {
      font-size: 12px;
      color: #333333;
    }
  }
 }
 </style>