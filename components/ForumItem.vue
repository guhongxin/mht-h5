<template>
  <div class="forumItem">
    <div class="forum-item-content">
      <img src="/img/1.jpg" />
    </div>
    <div class="forum-item-footer">
      <div @click="downClick">下载</div>
      <div @click="goforumClick">论坛</div>
      <div @click="goGiftBagClick">礼包</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator"
@Component
export default class ForumItem extends Vue {
  @Emit("downClick")
  private downClick() {}
  @Emit("goforumClick")
  private goforumClick() {}
  @Emit("goGiftBagClick")
  private goGiftBagClick() {}
}
</script>
<style lang="scss" scoped>
.forumItem {
  overflow: hidden;
  padding-bottom: 10px;
  .forum-item-content {
    position: relative;
    box-sizing: border-box;
    padding-bottom: 60%;
    overflow: hidden;
    border-radius: 4px 4px 0px 0px;
    img {
      width: 100%;
      display: block;
      position: absolute;
      left: 0px;
      bottom: 0px;
    }
  }
  .forum-item-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: #ffffff;
    padding: 8px 0px;
    border-radius: 0px 0px 4px 4px;
    div {
      flex: 1;
      text-align: center;
    }
    &>div:not(:last-child) {
      border-right: 1px solid #dddddd;
    }
  }
}
</style>