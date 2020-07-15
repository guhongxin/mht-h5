<template>
  <div class="system-news-item">
    <div class="left">
      <img src="/img/user2.png" />
    </div>
    <div class="right">
      <span class="title">【平台官方】</span>
      <span class="news-txt">临近中秋，官方推出豪礼，只要参与就有得送，截至时间2020年7月13日至8月15日。我们在四则精灵等</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class SystemNewsItem extends Vue {

}
</script>
<style lang="scss" scoped>
.system-news-item {
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 10px;
  .left {
    img {
      width: 40px;
      height: 40px;
      display: block;
    }
  }
  .right {
    font-size: 0px;
    padding-left: 10px;
    .title {
      font-size: 12px;
      color: #7DB349;
      font-weight: bold;
    }
    .news-txt {
      font-size: 12px;
    }
  }
}
</style>