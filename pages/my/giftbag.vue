<template>
  <div class="my-gift-bag">
    <Floor :floorTitle="'我的礼包'" :isMore="false" class="giftbag-floor"></Floor>
    <div class="tab-menu">
      <van-tabs v-model="active" animated
        swipeable
        sticky
        :line-width="15"
        :border="false">
        <van-tab title="全部">
          <div class="my-gift-bag-list">
            <MygiftbagItem class="my-gift-bag-list-item"></MygiftbagItem>
            <MygiftbagItem class="my-gift-bag-list-item" :disabled="true"></MygiftbagItem>
            <MygiftbagItem class="my-gift-bag-list-item"></MygiftbagItem>
            <MygiftbagItem class="my-gift-bag-list-item"></MygiftbagItem>
          </div>
        </van-tab>
        <van-tab title="末日血战"></van-tab>
        <van-tab title="作妖计"></van-tab>
        <van-tab title="塔防纪元"></van-tab>
      </van-tabs>
    </div>
    <CompanyCopyWrit></CompanyCopyWrit>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
import MygiftbagItem from "~/components/MygiftbagItem.vue"
@Component({
  components: {
    Floor,
    CompanyCopyWrit,
    MygiftbagItem
  }
})
export default class MyGiftBag extends Vue {
  private active:number = 0
}
</script>
<style lang="scss" scoped>
.my-gift-bag {
  margin-top: 5px;
  padding: 0px 15px;
  box-sizing: border-box;
}
.giftbag-floor {
  padding: 0px;
}
.tab-menu {
  height: calc(100vh - 129px);
  /deep/ .van-tabs__line {
    background-color: #7DB349;
  }
  .my-gift-bag-list {
    .my-gift-bag-list-item {
      padding: 10px 0px;
      box-sizing: border-box;
    }
    & > .my-gift-bag-list-item:not(:last-child) {
      border-bottom: 1px solid #C1C1C1;
    }
  }
}
</style>