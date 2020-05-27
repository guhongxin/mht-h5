<template>
  <div class="layout">
    <nav-bar :fixed="true" @searchClick="searchClick"></nav-bar>
    <div class="main">
      <nuxt />
    </div>
    
    <van-tabbar v-model="active"
      :active-color="'#459743'"
      :inactive-color="'#999999'">
      <van-tabbar-item icon="home-o" to="/">
        <span>首页</span>
        <template slot="icon">
          <i class="iconfont iconhome"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/gameCenter">
        <span>游戏中心</span>
        <template slot="icon">
          <i class="iconfont icon94"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/forum">
        <span>论坛</span>
        <template slot="icon">
          <i class="iconfont iconluntan"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template slot="icon">
          <i class="iconfont iconwo"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import NavBar from "~/components/NavBar.vue";
@Component({
  components: {
    NavBar
  }
})
export default class Default extends Vue {
  private active: number = 0;
  searchClick(value: string) {}
  private mounted() {
    let route:any = this.$route
    this.active = this.getActive(route)
  }
  @Watch("$route")
  routerChange (val: any) {
    this.active = this.getActive(val)
  }
  // 获取当前的tab
  private getActive(route: any): number {
    let _name:string = route.name
    let nameArr:Array<string> =  _name.split("-")
    let indexObj:any = {
      index: 0,
      gameCenter: 1,
      forum: 2,
      my: 3,
      grid: 0
    }
    return indexObj[nameArr[0]]
  } 
}
</script>
<style lang="scss" scoped>
.layout {
  position: relative;
}
.head {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  background-color: #ffffff;
}
.main {
  height: 100%;
  padding: 56px 0px 50px 0px;
}
</style>
<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 12px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
