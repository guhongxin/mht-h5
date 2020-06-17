<template>
  <div class="activities">
    <div class="activities-content">
      <ActivItem v-for="(item, key) in activList" :key="key"
        :activeData="item"
        @itemClick="itemClick(item)"></ActivItem>
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
    size: 10 
  }
  private mounted() {
    // 生命周期
    this.getList();
  }
  private getList() {
    (this as any).$axios({
      method: "POST",
      url: "/usr/activity/listActivity",
      data: {
        page: this.page
      }
    }).then((res: any) => {
      let data = res.data;
      this.activList = data.activities;
      console.log("活动列表", data)
    })
  }
  private itemClick(item:any) {
    document.location.href = item.url;
  }
}
</script>
<style lang="scss" scoped>
.activities {
  padding-top: 15px;
  box-sizing: border-box;
  .activities-content {
    padding: 0px 10px;
  }
}
</style>
