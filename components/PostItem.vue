<template>
  <div class="post-item">
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
      <div><i class="iconfont iconfenxiang"></i>分享</div>
      <div><i class="iconfont iconpinglun"></i>评论</div>
      <div><i class="iconfont icondianzan"></i>点赞</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component
export default class PostItem extends Vue {
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
.post-item {
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
    .content-txt {
      font-size: 12px;
      text-indent: 1em;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
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
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    div {
      flex: 1;
      font-size: 12px;
      text-align: center;
      i {
        margin-right: 5px;
      }
    }
  }
}
</style>
