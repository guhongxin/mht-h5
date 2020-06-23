<template>
  <div class="search">
    <nav-bar 
      @searchClick="searchClick"
      :back="back"
      :fixed="true"></nav-bar>
    <div class="seach-list">
      <div class="item" v-for="item in searchData" :key="item.id" @click="goGameDetails(item)">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import NavBar from "~/components/NavBar.vue"
@Component({
  layout: 'search',
  components: {
    NavBar
  }
})
export default class Search extends Vue {
  private back:boolean = true;
  private timer:any =null;
  private searchData:Array<any> = [];
  private searchClick(param:string) {
    let queryStr:string = param.trim();
    if (this.timer) {
      clearTimeout(this.timer)
    } 
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.getList(queryStr);
    }, 600)
  }
  private getList(inputValue:string) {
    (this as any).$axios({
      method: "POST",
      url: "/usr/game/searchGame",
      data: {
        input: inputValue
      }
    }).then((res:any) => {
      let data = res.data;
      this.searchData = data.games;
    }).catch((err:any) => {
      console.log("err", err)
    })
  }
  private goGameDetails(param:any) {
    // 跳转到游戏详情
    // this.$router.push({ path: `/gameCenter/gameDetails/${param.id}`})
    this.$router.push({ path: '/gameCenter/gameDetails', query: {
      id: param.id
    }})
  }
}
</script>
<style lang="scss" scoped>
.search {
  padding-top: 50px;
  box-sizing: border-box;
  .seach-list {
    padding: 10px 0px;
    .item {
      font-size: 14px;
      font-weight: 600;
      padding: 10px 20px;
    }
    & > .item:not(:last-child) {
      border-bottom: 1px solid #dddddd;
    }
  }
}
</style>
