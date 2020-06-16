<template>
  <div class="cooperation">
    <div class="img-box">
      <img src="/img/about4.png" />
    </div>
    <div class="list">
      <div class="title">合作内容</div>
      <div class="list-context">
        <p class="txt">国内市场合作、国内渠道推广、海外发行、海外渠道合作</p>
      </div>
    </div>
    <div class="list">
      <div class="title">联系方式</div>
      <div class="list-context">
        <div class="list-context-item">
          <p class="list-context-item-title">市场商务合作：</p>
          <p class="list-context-item-txt">李小姐：15927194430</p>
        </div>
        <div class="list-context-item">
          <p class="list-context-item-title">渠道合作：</p>
          <p class="list-context-item-txt">朱先生：15071015738</p>
        </div>
        <div class="list-context-item">
          <p class="list-context-item-title">引入合作：</p>
          <p class="list-context-item-txt">裴先生：13597703077</p>
        </div>
      </div>
    </div>
    <!-- <CompanyCopyWrit class="cyCopyWrit"></CompanyCopyWrit> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
@Component({
  components: {
    CompanyCopyWrit
  }
})
export default class Culture extends Vue {

}
</script>
<style lang="scss" scoped>
.cooperation {
  min-height: calc(100vh - 106px);
  background-color: #ffffff;
  padding: 40px 15px 0px 15px;
  box-sizing: border-box;
  position: relative;
  .img-box {
    margin-bottom: 20px;
    img {
      width: 100%;
      display: block;
    }
  }
  .list {
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .list-context {
      margin: 10px 0px;
      .txt {
        font-size: 12px;
        font-weight: 400;
        color: #1A1A1A;
      }
      .list-context-item {
        margin-bottom: 10px;
        .list-context-item-title {
          font-size: 14px;
          font-weight: 600;
        }
        .list-context-item-txt {
          font-size: 12px;
          font-weight: 400;
          color: #1A1A1A;
        }
      }
    }
  }
}
</style>