<template>
  <div class="nav-bar" :class="{fixed: fixed}">
    <div style="font-size:0">
      <van-icon name="arrow-left" v-if="back" @click="goBack" class="backStyle"/>
      <img src="/img/logo.png" class="logo" />
    </div>
    <div class="search">
      <input :value="value" type="text" class="input-text" @input="searchText" @focus="inputFocus"/>
      <van-icon name="search" class="search-icon"/>
    </div>
    <img :src="avatarUrl ? avatarUrl : $defaultUserImage" class="user-img" @click="userImageHand"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator"
import { getSession } from "~/assets/utils/auth.js"
@Component 
export default class NavBar extends Vue{
  private value:string = "";
  private avatarUrl:string = "";
  @Prop({ default: false }) fixed!: boolean;
  @Prop({ default: false }) back!: boolean;
  @Emit('searchClick') searchClick(msg: string){}
 
  searchText(e: any) {
    let doc:HTMLInputElement  = e.target;
    this.value = doc.value;
    this.searchClick(this.value)
  }

  @Emit("inputFocus")
  private inputFocus() {
    this.$router.push({
      path: "/search"
    })
  }

  private goBack() {
    this.$router.go(-1)
  }
  private userImageHand() {
    // 点击用户图片
    this.$emit("userImageClick")
  }
  private mounted() {
    // 生命周期
    // @ts-ignore
    let _user = getSession("user") ? JSON.parse(getSession("user")) : null
    this.avatarUrl = _user ? _user.avatarUrl : ""
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
  align-items: center;
  padding: 2px 27px;
  position: relative;
  .input-text {
    height: 100%;
    width: 100%;
    border: 0;
    background-color: #EBEBEB;
    outline: none;
    font-size: $nuxt-font-size-sm;
  }
  .search-icon {
    position: absolute;
    font-size: 14px;
    left: 4px;
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
</style>