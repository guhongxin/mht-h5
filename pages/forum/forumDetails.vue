<template>
  <div class="forum-details">
    <div class="head" :style="{background: 'url(/img/1.jpg) no-repeat center', backgroundSize: 'cover'}">
      <div class="title">
        <van-icon name="arrow-left" class="back-icon" />
        末日血战
      </div>
      <div class="forum-infor">
        <div class="forum-infor-left">
          <img src="/img/rmgame.png" />
        </div>
        <div class="forum-infor-right">
          <div class="infor-title">
            <div>末日血战</div>
            <div class="gz">关注</div>
          </div>
          <p class="tzNum">帖子数：9999</p>
          <p class="scNum">收藏数：9999</p>
          <div class="infor-group">
            <div>我的收藏</div>
            <div>我的帖子</div>
            <div>我的消息</div>
          </div>
        </div>
      </div>
    </div>
    <div class="topping">
      <p class="topping-content"><span class="topSpan" >置顶</span><span class="toptxt">最近发现贴吧里出现了一些卖号，收号的朋友，请麻烦,收号的朋友，请麻烦</span></p>
      <p class="topping-content"><span class="topSpan">置顶</span><span class="toptxt">最近发现贴吧里出现了一些卖号，收号的朋友，请麻烦</span></p>
    </div>
    <div class="post-area">
      <van-tabs v-model="active" :line-width="20" :line-height="4">
        <van-tab title="全部">
          <post-item></post-item>
          <post-item></post-item>
        </van-tab>
        <van-tab title="精品区">内容 2</van-tab>
        <van-tab title="公告">内容 3</van-tab>
        <van-tab title="攻略">内容 4</van-tab>
        <van-tab title="活动">内容 4</van-tab>
        <van-tab title="反馈">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import PostItem from "~/components/PostItem.vue";
@Component({
  components: {
    PostItem
  }
})
export default class ForumDetails extends Vue {
  private active:number = 0;
}
</script>
<style lang="scss" scoped>
.forum-details {
  margin-top: -56px;
  .head {
    height: 180px;
    padding: 0px 10px;
    position: relative;
    .title {
      height: 50px;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      line-height: 50px;
      position: relative;
      z-index: 1;
      .back-icon {
        position: absolute;
        top: calc(25px - 8px);
        left: 0px;
      }
    }
  }
  .head::after {
    width: 100%;
    content: "";
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .forum-infor {
    display: flex;
    justify-content: start;
    align-items: center;
    z-index: 1;
    position: relative;
    .forum-infor-left {
      img {
        width: 90px;
        height: 90px;
        display: block;
      }
    }
    .forum-infor-right {
      flex: 1;
      padding: 0px 10px;
      .infor-title {
        font-size: 16px;
        color: #ffffff;
        font-weight: 600;
        margin-bottom: 2px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .gz {
          font-size: 14px;
          padding: 0px 5px;
          line-height: normal;
          color: rgba(125, 179, 73, 1);
          border:1px solid rgba(125, 179, 73, 1);
          border-radius: 4px;
        }
      }
      .tzNum, .scNum {
        font-size: 12px;
        color: #ffffff;
        margin-bottom: 2px;
      }
      .infor-group {
        display: flex;
        justify-content: start;
        align-items: center;
        margin-top: 10px;
        div {
          font-size: 14px;
          color: #7DB349;
          font-weight: bold;
          flex: 1;
        }
      }
    }
  }
  .topping {
    padding: 10px;
    background-color: #ffffff;
    .topping-content {
      font-size: 12px;
      margin-bottom: 4px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .topSpan {
        display: inline-block;
        color: blue;
        margin-right: 5px;
      }
      .toptxt {
        flex: 1;
        display: inline-block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
  }
  .post-area {
    margin-top: 4px;
  }
}
</style>
