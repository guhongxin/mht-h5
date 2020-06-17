<template>
  <div class="game-new">
    <!-- <Floor :floorTitle="'游戏资讯'" :isMore="false"></Floor> -->
    <div class="game-new-box">
      <van-list
          v-if="news.length >0"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          class="list-view"
        >
         <template #default>
          <gameNewItem v-for="(item, key) in news" :key="key"
            :newInfor="item" @click.native="newContent(item)"></gameNewItem>
        </template>
      </van-list>
      <van-empty v-else description="暂无数据" />
    </div>
    
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue"
import gameNewItem from "~/components/gameNewItem.vue"
interface Page {
  cur: number, // 当前页
  size: number // 每页显示条数
}
@Component({
  components: {
    Floor,
    gameNewItem
  }
})
export default class gameNew extends Vue {
  private news:Array<any> = [];
  private page:Page = {
    cur: 1,
    size: 10
  };
  private loading:boolean = false;
  private finished:boolean = false;
  private total:number = 0;
  private mounted() {
    this.news = [];
    this.getList()
  }
  private getList() {
    return new Promise((resolve:any, reject:any) => {
      (this as any).$axios({
        method: "POST",
        url: "/usr/news/listNews",
        data: {
          page: this.page
        }
      }).then((res:any) => {
        let data = res.data
        this.total = data.page.total;
        let result = data.newsList
        this.news = [...this.news, ...result]
        resolve({ code: 0})
      }).catch((err:any) => {
        reject(err)
      })
    })
  }
  private onLoad() {
    this.page.cur += 1;
    this.getList().then((res:any) => {
      this.loading = false;
      this.finished = false;
      if (this.news.length >= this.total) {
        this.finished = true;
      }
    }).catch(() => {
      this.loading = false;
      this.finished = false;
    })
  }
  private newContent(item:any) {
    this.$router.push({
      path: "/grid/news/newDetail",
      query: {
        id: item.id
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.game-new {
  padding-top: 15px;
  box-sizing: border-box;
}
.game-new-box {
  box-sizing: border-box;
  padding: 0px 7px 10px 7px;
  height: calc(100vh - 111px);
  overflow: hidden;
  overflow-y: auto;
}
</style>
