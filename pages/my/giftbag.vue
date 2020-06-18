<template>
  <div class="my-gift-bag">
    <Floor :floorTitle="'我的礼包'" :isMore="false" class="giftbag-floor"></Floor>
    <div class="tab-menu">
      <van-tabs v-model="active" animated
        swipeable
        sticky
        :line-width="15"
        :border="false"
        @click="vanTabClick">
        <van-tab v-for="item in tabMenu" :key="item.id" :title="item.name"></van-tab>
      </van-tabs>
      <div class="my-gift-bag-list">
        <van-list
        v-if="giftList.length>0"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        class="list-view"
      >
        <MygiftbagItem class="my-gift-bag-list-item"
          v-for="(item, index) in giftList" :key="index"
          :giftCodes="item"></MygiftbagItem>
      </van-list>
      <van-empty description="暂无数据" v-else />
    </div>
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
  private loading:boolean = false;
  private finished:boolean = false;
  private total:number = 0;
  private tabMenu:Array<any> = [];
  private gameId:any;
  private mounted() {
    // 生命周期
    this.giftList = [];
    this.tabList();
    this.myGiftList();
  }
  private async myGiftList() {
    // 我的礼包列表
    let res = await (this as any).$axios({
      method: "POST",
      url: "/usr/giftcode/listMyGiftCode",
      data: {
        page: this.page,
        gameId: this.gameId || undefined
      }
    })
    let data = res.data;
    this.total = data.page.total;
    let result = data.giftCodes;
    this.giftList = [...this.giftList, ...result];
    return new Promise((resolve:any, reject:any) => {
      if (res.code === 0) {
        resolve({ code: 0 })
      } else {
        reject(res)
      }
    })
  }
  private onLoad() {
    this.page.cur += 1;
    this.myGiftList().then((res:any) => {
      this.loading = false;
      this.finished = false;
      if (this.giftList.length >= this.total) {
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
    this.giftList = [];
    this.page.cur = 1;
    this.gameId = this.tabMenu[index].id;
    this.myGiftList();
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
    height: calc(100vh - 183px);
    overflow: hidden;
    overflow-y: auto;
    .list-view {
      .my-gift-bag-list-item {
        padding: 10px 0px;
        box-sizing: border-box;
      }
      & > .my-gift-bag-list-item:not(:last-child) {
        border-bottom: 1px solid #C1C1C1;
      }
    }
  }
}
</style>