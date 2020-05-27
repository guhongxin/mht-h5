<template>
  <div class="grid-gift-bag">
    <Floor :floorTitle="'游戏礼包'" :isMore="false" class="giftbag-floor"></Floor>
    <div class="tab-menu">
      <van-tabs v-model="active"
        animated
        swipeable
        sticky
        :line-width="15"
        :border="false">
        <van-tab title="全部">
          <div class="gift-bag-list">
            <GridgiftbagItem :bjUlr="'/img/grid-giftbag1.png'" class="gift-bag-list-item"></GridgiftbagItem>
            <GridgiftbagItem :bjUlr="'/img/grid-giftbag2.png'" class="gift-bag-list-item"></GridgiftbagItem>
            <GridgiftbagItem :bjUlr="'/img/grid-giftbag1.png'" class="gift-bag-list-item"></GridgiftbagItem>
            <GridgiftbagItem :bjUlr="'/img/grid-giftbag2.png'" class="gift-bag-list-item"></GridgiftbagItem>
            <GridgiftbagItem :bjUlr="'/img/grid-giftbag1.png'" class="gift-bag-list-item"></GridgiftbagItem>
          </div>
        </van-tab>
        <van-tab title="末日血战"></van-tab>
        <van-tab title="作妖计"></van-tab>
        <van-tab title="塔防纪元"></van-tab>
      </van-tabs>
    </div>
    <!-- <CompanyCopyWrit></CompanyCopyWrit> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
import Floor from "~/components/Floor.vue";
import GridgiftbagItem from "~/components/GridgiftbagItem.vue";
@Component({
  components: {
    Floor,
    CompanyCopyWrit,
    GridgiftbagItem
  }
})
export default class gridgiftbag extends Vue {
  private active:number = 0
}
</script>
<style lang="scss" scoped>
.grid-gift-bag {
  margin-top: 5px;
  padding: 0px 15px;
  box-sizing: border-box;
}
.tab-menu {
  height: calc(100vh - 129px);
  /deep/ .van-tabs__line {
    background-color: #7DB349;
  }
}
.gift-bag-list {
  .gift-bag-list-item {
    margin: 10px 0px;
    box-sizing: border-box;
  }
}
</style>