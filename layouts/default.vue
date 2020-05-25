<template>
  <div class="layout">
    <nav-bar :fixed="true" @searchClick="searchClick"></nav-bar>
    <div class="main">
      <nuxt />
    </div>
    <!-- <div class="company-copywrit">
      <p>
        公司：武汉灵动在线科技有限公司
        备案号：工信部备案号：鄂ICP备15004704号-3：公安机关备案号：42018502000448     
      </p>
      <p>网络文化经营许可证：鄂网文〔2016〕2305-065号：电信增值许可证号：鄂B2-20160108。</p>
    </div> -->
    <div class="footer">
      <van-tabbar v-model="active" route
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
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavBar from "~/components/NavBar.vue";
@Component({
  components: {
    NavBar
  }
})
export default class Default extends Vue {
  active: number = 0;
  searchClick(value: string) {
    console.log("****", value);
  }
}
</script>
<style lang="scss" scoped>
.head {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  background-color: #ffffff;
}
.footer {
  height: 50px;
}
.main {
  padding: 56px 0px 0px 0px;
}
.company-copywrit {
  p {
    font-size: 12px;
    color: #595959;
    text-align: center;
  }
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
