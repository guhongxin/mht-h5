<template>
  <div class="favorite-post-item">
    <div class="head">
      <div class="head-left">
        <img src="/img/user2.png" />
      </div>
      <div class="head-right">
        <div class="user-name">新月</div>
        <div class="releaseTime">刚刚</div>
      </div>
    </div>
    <div class="content">
      <div class="content-title">今天又是元气满满的一天喔！</div>
      <div class="content-txt">
        一个人要么提得起，要么放得下，最可悲的是既提不起又放不下，犹豫来犹豫去，最可悲的是最可悲的是既提不起又放不下既提不起又放不下,在中间摇摆不定。但是，往往犹豫的人能找到足够的理由证明他的行为是对的。
      </div>
      <div class="content-image">
        <div class="img-box" v-for="(item, key) in img" :key="key">
          <img :src="item.src" />
        </div>
      </div>
    </div>
    <div class="footer">
      <div><i class="iconfont icondianzan"></i>1</div>
      <div><i class="iconfont iconpinglun3-copy"></i>3</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class FavoritePostItem extends Vue {
  private img = [{
    src: "/img/5.png"
  }, {
    src: "/img/6.png"
  }, {
    src: "/img/7.png"
  }]
}
</script>
<style lang="scss" scoped>
.favorite-post-item {
  background-color: #ffffff;
  padding: 10px;
  margin-bottom: 10px;
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
  .content {
    margin-top: 5px;
    .content-title {
      font-size: 14px;
      font-weight: 600;
      color: #333333;
      margin: 5px 0px;
    }
    .content-txt {
      font-size: 12px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      color: #666666;
    }
    .content-image {
      display: flex;
      justify-content: start;
      align-items: center;
      .img-box {
        flex: 1;
        position: relative;
        box-sizing: border-box;
        padding-bottom: 35%;
        img {
          width: 100%;
          position: absolute;
          left: 0px;
          bottom: 0px;
          display: block;
        }
      }
      &>.img-box:not(:last-child) {
        margin-right: 4px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    div {
      font-size: 12px;
      text-align: center;
      i {
        margin-right: 3px;
      }
    }
    &>div:first-child {
      margin-right: 5px;
    }
  }
}
</style>