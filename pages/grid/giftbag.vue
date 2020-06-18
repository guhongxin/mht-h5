<template>
  <div class="grid-gift-bag">
    <Floor :floorTitle="'游戏礼包'" :isMore="false" class="giftbag-floor"></Floor>
    <div class="tab-menu">
      <van-tabs v-model="active"
        animated
        swipeable
        sticky
        :line-width="15"
        :border="false"
        @click="vanTabClick">
        <van-tab v-for="item in tabMenu" :key="item.id" :title="item.name"></van-tab>
      </van-tabs>
      <div class="gift-bag-list">
        <van-list
          v-if="boxesList.length>0"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          class="list-view"
        >
        <template #default>
          <GridgiftbagItem
            v-for="(item, index) in boxesList"
            :key="index"
            :bjUlr="item.imageUrl" class="gift-bag-list-item"
            :disabled="item.got"
            @receiveClick="receiveClick(item)"></GridgiftbagItem>
        </template>
      </van-list>
        <van-empty description="暂无数据" v-else />
      </div>
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
  private loading:boolean = false;
  private finished:boolean = false;
  private total:number = 0;
  private tabMenu:Array<any> = [];
  private gameId:any;
  private mounted() {
    // 生命周期
    this.boxesList = [];
    this.tabList();
    this.giftCodeBoxList();
  }
  private async giftCodeBoxList() {
    // 请求列表
    let res = await (this as any).$axios({
      method: "POST",
      url: "/usr/giftcode/listGiftCodeBox",
      data: {
        page: this.page,
        gameId: this.gameId || undefined
      }
    })
    let data = res.data;
    this.total = data.page.total;
    let result = data.boxes
    this.boxesList = [...this.boxesList, ...result];
    return new Promise((resolve:any, reject:any) => {
      if (res.code === 0) {
        resolve({ code: 0 })
      } else {
        reject(res)
      }
    })
  }
  private receiveClick(param:any) {
    (this as any).$axios({
      method: "POST",
      url: "/usr/giftcode/receiveGiftCode",
      data: {
        giftCodeBoxId: param.id
      }
    }).then((res:any) => {
      this.giftCodeBoxList();
      let data = res.data;
      (this.$refs.receiveDailogDoc as any).showModule(data);
    })
  }
  private onLoad() {
    this.page.cur += 1;
    this.giftCodeBoxList().then((res:any) => {
      this.loading = false;
      this.finished = false;
      if (this.boxesList.length >= this.total && this.page.cur > 1) {
        this.finished = true;
      }
    }).catch(() => {
      this.loading = false;
      this.finished = false;
    })
  }
  private tabList() {
    (this as any).$axios({
      method: "POST",
      url: "/usr/game/listIdName"
    }).then((res:any) => {
      let data:any = res.data;
      this.tabMenu = data.games;
      this.tabMenu.unshift({ name: "全部", id: 0 })
    }).catch((err:any) => {
      console.log("err", err)
    });
  }
  private vanTabClick(index:any) {
    // 切换tab
    this.boxesList = [];
    this.page.cur = 1;
    this.finished = false;
    this.loading = false;
    this.gameId = this.tabMenu[index].id;
    this.giftCodeBoxList();
  }
}
</script>
<style lang="scss" scoped>
.grid-gift-bag {
  box-sizing: border-box;
  min-height: calc(100vh - 106px);
  .giftbag-floor {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
.tab-menu {
  /deep/ .van-tabs__line {
    background-color: #7DB349;
  }
}
.list-view {
  height: calc(100vh - 200px);
}
.gift-bag-list {
  background-color: #EEF1F3;
  padding: 0px 5px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  .gift-bag-list-item {
    margin: 10px 0px;
    box-sizing: border-box;
  }
}
</style>