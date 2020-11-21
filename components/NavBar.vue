<template>
  <div class="nav-bar" :class="{fixed: fixed}">
    <div style="font-size:0">
      <van-icon name="arrow-left" v-if="back" @click="goBack" class="backStyle"/>
      <img src="/img/logo.png" class="logo" />
    </div>
    <div class="search">
      <van-icon name="search" class="search-icon"/>
      <input :value="value" class="input-text"
        @keyup="test"
        @input="searchText" @focus="inputFocus" data-tag="searchInput"  type="search"/>
      
    </div>
    <img :src="isLogin ? (avatarUrl ? avatarUrl: $defaultUserImage3) : $defaultUserImage" class="user-img" @click="userImageHand"/>
    <div class="search-area">
      <div class="search-contert" data-tag="searchDom">
        <ul>
          <li v-for="(item, key) in searchData" :key="key" @click="goGameDetails(item)" data-tag="searchDom">
            {{item.name}}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator"
import { getToken } from "~/assets/utils/auth.js"
@Component 
export default class NavBar extends Vue{
  private value:string = "";
  private avatarUrl:string = "";
  private timer:any = null;
  private isLogin:boolean = false; // 是否登录
  private searchData:Array<any> = [];
  @Prop({ default: false }) fixed!: boolean;
  @Prop({ default: false }) back!: boolean;
  searchText(e: any) {
    let doc:HTMLInputElement  = e.target;
    this.value = doc.value;
    this.searchClick(this.value)
  }
  private inputFocus() {
    let searchArea:any = document.querySelector(".search-area");
    searchArea && searchArea.classList.add("search-area-show");
  }

  private goBack() {
    console.log('----', )
    this.$router.go(-1)
  }
  private userImageHand() {
    // 点击用户图片
    this.$emit("userImageClick")
  }
  private mounted() {
    // 生命周期
    let self:any = this;
    let _token = getToken();
    if (_token) {
      this.isLogin = true;
      this.getUserInfor();
    } else {
      this.isLogin = false;
    }
    this.$nextTick(() => {
      // @ts-ignore
      document.addEventListener("touchstart", function(e) {
        // 监测触摸开始
        let doc:any = e.target;
        let tag = doc.dataset.tag;
        if (["searchDom", "searchInput"].indexOf(tag) === -1) {
          let searchArea:any = document.querySelector(".search-area");
          searchArea && searchArea.classList.remove("search-area-show");
          let input:any = document.querySelector(".input-text");
          input && input.blur();
          self.searchData = [];
        }
      })
    })
  }
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
      if (data) {
        this.searchData = data.games;
      }
    }).catch((err:any) => {
      console.log("err", err)
    })
  }
  private goGameDetails(param:any) {
    // 跳转到游戏详情
    this.searchData = [];
    let searchArea:any = document.querySelector(".search-area");
    searchArea && searchArea.classList.remove("search-area-show");
    let input:any = document.querySelector(".input-text");
    input && input.blur();
    this.value = "";
    // this.$router.push({ path: `/gameCenter/gameDetails/${param.id}`})
    this.$router.push({ path: '/gameCenter/gameDetails', query: {
      id: param.id
    }})
  }
  private getUserInfor() {
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/getUser"
    }).then((res:any) => {
      let data:any = res.data.user
      this.avatarUrl = data ? data.avatarUrl : ""
    }).catch((err:any) => {
      console.log(err)
    })
  }
  private test(e:any) {
    let keyCode:number = e.keyCode;
    if (keyCode === 13) {
      let searchArea:any = document.querySelector(".search-area");
      if(!searchArea.classList.contains('search-area-show')){
        searchArea && searchArea.classList.add("search-area-show")
      }
      (this as any).getList(this.value);
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~/assets/style/nuxt.scss";
.nav-bar {
  width: 100vw;
  height: 56px;
  background: $nuxt-bg-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  box-sizing: border-box;
  z-index: 2;
  box-shadow: 2px 2px 5px #cccccc;
}
.fixed {
  position: fixed;
  left: 0px;
  top: 0px;
}
.logo {
  width: 103px;
  vertical-align: middle;
}
.search {
  width:175px;
  height:27px;
  background:#EBEBEB;
  border:1px solid #EBEBEB;
  border-radius:27px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  padding: 0px 4px;
  .input-text {
    height: 100%;
    width: 100%;
    border: 0;
    background-color: #EBEBEB;
    outline: none;
    font-size: $nuxt-font-size-sm;
  }
  .search-icon {
    font-size: 14px;
  }
}

.user-img {
  height: 27px;
  width: 27px;
  border-radius: 50%;
}
.backStyle {
  font-size: 24px;
  vertical-align: middle;
  text-align: center;
}
.search-area {
  position: absolute;
  width: 100%;
  left: 0px;
  top: -256px;
  z-index: 1;
  transition: top 0.2s ease-in-out;
  .search-contert {
    height: 200px;
    background-color: #ffffff;
    border-radius: 0px 0px 4px 4px;
    overflow: hidden;
    overflow-y: auto;
    ul {
      li {
        padding: 10px;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
}
.search-area-show {
  top: 56px;
}
::-webkit-search-cancel-button { display: none; }
</style>