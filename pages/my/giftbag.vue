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
          <div class="my-gift-bag-list" v-if="giftList.length > 0">
            <MygiftbagItem class="my-gift-bag-list-item"
              v-for="(item, index) in giftList" :key="index"
              :giftCodes="item"></MygiftbagItem>
          </div>
          <van-empty description="暂无数据" v-else />
        </van-tab>
        <van-tab title="末日血战">
          <van-empty description="暂无数据" />
        </van-tab>
        <van-tab title="作妖计">
          <van-empty description="暂无数据" />
        </van-tab>
        <van-tab title="塔防纪元">
          <van-empty description="暂无数据" />
        </van-tab>
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
// 接口
interface Page {
  cur: number, // 当前页
  size: number // 每页显示条数
}
@Component({
  components: {
    Floor,
    CompanyCopyWrit,
    MygiftbagItem
  }
})
export default class MyGiftBag extends Vue {
  private active:number = 0
  private giftList:Array<any> = []; // 礼包列表
  private page:Page = {
    cur: 1,
    size: 10 
  };
  private mounted() {
    // 生命周期
    this.myGiftList();
  }
  private async myGiftList() {
    // 我的礼包列表
    let res = await (this as any).$axios({
      method: "POST",
      url: "/usr/giftcode/listMyGiftCode",
      data: {
        page: this.page
      }
    })
    console.log("----", res)
    this.giftList = res.data.giftCodes
  }
}
</script>
<style lang="scss" scoped>
.my-gift-bag {
  padding: 15px 15px;
  box-sizing: border-box;
  background-color: #ffffff;
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