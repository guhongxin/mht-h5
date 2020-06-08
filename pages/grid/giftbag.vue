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
          <div class="gift-bag-list" v-if="boxesList.length>0">
            <GridgiftbagItem
              v-for="(item, index) in boxesList"
              :key="index"
              :bjUlr="item.imageUrl" class="gift-bag-list-item"
              :disabled="item.got"
              @receiveClick="receiveClick(item)"></GridgiftbagItem>
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
    <!-- <CompanyCopyWrit></CompanyCopyWrit> -->
    <ReceiveDailog ref="receiveDailogDoc"></ReceiveDailog>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
import Floor from "~/components/Floor.vue";
import GridgiftbagItem from "~/components/GridgiftbagItem.vue";
import ReceiveDailog from "~/components/ReceiveDailog.vue";
// 接口
interface Page {
  cur: number, // 当前页
  size: number // 每页显示条数
}
@Component({
  middleware: "redirectLogin",
  components: {
    Floor,
    CompanyCopyWrit,
    GridgiftbagItem,
    ReceiveDailog
  }
})
export default class gridgiftbag extends Vue {
  private active:number = 0
  private boxesList:Array<any> = []
  private page:Page = {
    cur: 1,
    size: 10 
  };
  private mounted() {
    // 生命周期
    this.giftCodeBoxList();
  }
  private async giftCodeBoxList() {
    // 请求列表
    let res = await (this as any).$axios({
      method: "POST",
      url: "/usr/giftcode/listGiftCodeBox",
      data: {
        page: this.page
      }
    })
    this.boxesList = res.data.boxes
  }
  private receiveClick(param:any) {
    (this as any).$axios({
      method: "POST",
      url: "/usr/giftcode/receiveGiftCode",
      data: {
        giftCodeBoxId: param.id
      }
    }).then((res:any) => {
      let data = res.data;
      (this.$refs.receiveDailogDoc as any).showModule(data);
    })
  }
}
</script>
<style lang="scss" scoped>
.grid-gift-bag {
  margin-top: 15px;
  padding: 0px 15px;
  box-sizing: border-box;
}
.tab-menu {
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