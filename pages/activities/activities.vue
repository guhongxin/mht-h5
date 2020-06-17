<template>
  <div class="activities">
    <div class="activities-content">
      <van-list
          v-if="activList.length >0"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          class="list-view"
        >
         <template #default>
          <ActivItem v-for="(item, key) in activList" :key="key"
          :activeData="item"
          @itemClick="itemClick(item)"></ActivItem>
        </template>
      </van-list>
      <van-empty v-else description="暂无数据" />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import ActivItem from "~/components/ActivItem.vue"
interface Page {
  cur: number, // 当前页
  size: number // 每页显示条数
}
@Component({
  components: {
    ActivItem
  }
})
export default class Activities extends Vue {
  private activList:Array<any> = [];
  private page:Page = {
    cur: 1,
    size: 3 
  }
  private loading:boolean = false;
  private finished:boolean = false;
  private total:number = 0;
  private mounted() {
    this.activList = [];
    // 生命周期
    this.getList();
  }
  private getList() {
    return new Promise((resolve:any, reject:any) => {
      (this as any).$axios({
        method: "POST",
        url: "/usr/activity/listActivity",
        data: {
          page: this.page
        }
      }).then((res: any) => {
        let data = res.data;
        this.total = data.page.total;
        let result = data.activities
        this.activList = [...this.activList, ...result];
        resolve({ code: 0})
      }).catch((err:any) => {
        reject(err)
      })
    })
  }
  private itemClick(item:any) {
    document.location.href = item.url;
  }
  private onLoad() {
    // 向下滚动
    this.page.cur += 1;
    this.getList().then((res:any) => {
      this.loading = false;
      this.finished = false;
      if (this.activList.length >= this.total) {
        this.finished = true;
      }
    }).catch(() => {
      this.loading = false;
      this.finished = false;
    })
  }
}
</script>
<style lang="scss" scoped>
.activities {
  padding-top: 15px;
  box-sizing: border-box;
  .activities-content {
    padding: 0px 10px;
    box-sizing: border-box;
    height: calc(100vh - 111px);
    overflow: hidden;
    overflow-y: auto;
  }
}
</style>
