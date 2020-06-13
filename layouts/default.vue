<template>
  <div class="layout">
    <nav-bar 
      @searchClick="searchClick"
      :back="back"
      :fixed="true"
      @userImageClick="userImageClick" v-if="navBarType === '0'"></nav-bar>
    <van-nav-bar
      :title="navBarTitle"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      :fixed="true"
      class="txt"
      v-else
    >
    <template #right v-if="navBarRight">
      <span @click="onClickRight" class="van-nav-bar__text">确认</span>
    </template>
    </van-nav-bar>
    <div class="main">
      <nuxt />
    </div>
    <van-tabbar v-model="active"
      :active-color="'#459743'"
      :inactive-color="'#999999'">
      <van-tabbar-item icon="home-o" to="/">
        <span>首页</span>
         <template #icon="props">
          <img :src="props.active ? homeIcon.active : homeIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/service">
        <span>服务</span>
        <template #icon="props">
          <img :src="props.active ? serviceIcon.active : serviceIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/forum">
        <span>论坛</span>
        <template #icon="props">
          <img :src="props.active ? forumIcon.active : forumIcon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我的</span>
        <template #icon="props">
          <img :src="props.active ? myIcon.active : myIcon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator"
import NavBar from "~/components/NavBar.vue"
import Bus from "~/plugins/Bus.js"
@Component({
  components: {
    NavBar
  }
})
export default class Default extends Vue {
  private active: number = 0
  private back:boolean = false
  private navBarType:string = "0" // 0-带搜索的navBar 1-标题居中，左侧返回键navBar
  private navBarTitle:string = "" // navBar标题
  private navBarRight:boolean = false // navBar右侧
  private homeIcon:object = {
    active: "/img/home1.png",
    inactive: "/img/home.png"
  }
  private serviceIcon:object = {
    active: "/img/service1.png",
    inactive: "/img/service.png"
  }
  private forumIcon:object = {
    active: "/img/forum1.png",
    inactive: "/img/forum.png"
  }
  private myIcon:object = {
    active: "/img/my1.png",
    inactive: "/img/my.png"
  }
  searchClick(value: string) {}
  private mounted() {
    let route:any = this.$route
    this.navBarType = route.query.navBarType === '1' ? '1' : '0'
    this.navBarTitle = route.query.title
    this.navBarRight = route.query.isRight === '1'
    this.active = this.getActive(route)
  }
  @Watch("$route")
  routerChange (val: any) {
    this.navBarType = val.query.navBarType === '1' ? '1' : '0'
    this.navBarTitle = val.query.title
    this.navBarRight = val.query.isRight === '1'
    this.active = this.getActive(val)
  }
  // 获取当前的tab
  private getActive(route: any): number {
    let _name:string = route.name
    // @ts-ignore
    var vConsole = new VConsole();
    let nameArr:Array<string> =  _name.split("-");
    this.back = nameArr.length > 1
    let indexObj:any = {
      index: 0,
      service: 1,
      forum: 2,
      my: 3,
      grid: 0
    }
    return indexObj[nameArr[0]]
  }
  // 点击用户图片
  private userImageClick() {
    // 获取token是否存在，不存在跳转到登录界面，存在进入我的页面
    this.$router.push({
      name: "my"
    })
  }
  // 
  private onClickLeft() {
    // 点击navBar 左侧按钮 返回到上一页
    this.$router.go(-1)
  }
  private onClickRight() {
    // 点击右侧按钮
    Bus.$emit('rightClick')
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
  min-height: 100vh;
  padding: 56px 0px 50px 0px;
  position: relative;
  box-sizing: border-box;
  background-color: #dddddd;
}
.txt {
  height: 56px;
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
