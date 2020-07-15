<template>
  <div class="my-news">
    <van-tabs v-model="active" :line-width="20" :line-height="4">
      <van-tab title="通知" style="padding-top: 3px;">
        <SystemNewsItem class="list-item"></SystemNewsItem>
        <SystemNewsItem class="list-item"></SystemNewsItem>
        <SystemNewsItem class="list-item"></SystemNewsItem>
      </van-tab>
      <van-tab title="消息" style="padding-top: 3px;">
        <MyNewsItem class="list-item"></MyNewsItem>
        <MyNewsItem class="list-item"></MyNewsItem>
        <MyNewsItem class="list-item"></MyNewsItem>
        <MyNewsItem class="list-item"></MyNewsItem>
        <MyNewsItem class="list-item"></MyNewsItem>
        <MyNewsItem class="list-item"></MyNewsItem>
        <MyNewsItem class="list-item"></MyNewsItem>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import SystemNewsItem from "~/components/SystemNewsItem.vue";
import MyNewsItem from "~/components/MyNewsItem.vue";
@Component({
  components: {
    SystemNewsItem,
    MyNewsItem
  }
})
export default class MyNews extends Vue {
  private active:number = 0;
}
</script>
<style lang="scss" scoped>
.my-news {
  /deep/ .van-tabs__line {
    background-color: #7DB349;
  }
  .list-item {
    margin-bottom: 10px;
  }
}
</style>
