<template>
  <div class="game-new">
    <!-- <Floor :floorTitle="'游戏资讯'" :isMore="false"></Floor> -->
    <div class="game-new-box" v-if="news.length >0">
      <gameNewItem v-for="(item, key) in news" :key="key"
        :newInfor="item" @click.native="newContent(item)"></gameNewItem>
    </div>
    <van-empty v-else description="暂无数据" />
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
  private news:Array<any> = []
  private page:Page = {
    cur: 1,
    size: 10 
  }
  private mounted() {
    this.getList()
  }
  private getList() {
    (this as any).$axios({
      method: "POST",
      url: "/usr/news/listNews",
      data: {
        page: this.page
      }
    }).then((res:any) => {
      let data = res.data
      this.news = data.newsList
    }).catch((err:any) => {
      console.log(err)
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
}
</style>
