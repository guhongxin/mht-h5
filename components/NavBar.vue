<template>
  <div class="nav-bar" :class="{fixed: fixed}">
    <div style="font-size:0">
      <van-icon name="arrow-left" v-if="back" @click="goBack" class="backStyle"/>
      <img src="/img/logo.png" class="logo" />
    </div>
    <div class="search">
      <input :value="value" type="text" class="input-text" @change="searchText"/>
      <van-icon name="search" class="search-icon"/>
    </div>
    <img src="/img/user.png" class="user-img"/>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator"
@Component 
export default class NavBar extends Vue{
  @Prop({ default: false }) fixed!: boolean;
  @Prop({ default: false }) back!: boolean;
  @Emit('searchClick') searchClick(msg: string){}
  value:string = ""
  searchText(e: any) {
    let doc:HTMLInputElement  = e.target;
    this.value = doc.value;
    this.searchClick(this.value)
  }
  private goBack() {
    this.$router.go(-1)
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
  z-index: 100;
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