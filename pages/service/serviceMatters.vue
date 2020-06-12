<template>
  <div class="service-matters">
    <div class="img-box">
      <img src="/img/time.png" />
      <div class="content">
        <p class="content-title">服务时间</p>
        <p class="content-txt">周一至周五：12:00-21:00</p>
        <p class="content-txt">周末及节假日另行通知</p>
      </div>
    </div>
    <div class="img-box">
      <img src="/img/qq.png" />
      <div class="content">
        <p class="content-title">联系客服</p>
        <p class="content-txt">QQ：123456789</p>
      </div>
    </div>
    <CompanyCopyWrit class="company"></CompanyCopyWrit>
  </div>
</template>
<script lang="ts">
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
import { Vue, Component } from "vue-property-decorator"
@Component({
  components: {
    CompanyCopyWrit
  }
})
export default class ServiceMatters extends Vue {

}
</script>
<style lang="scss" scoped>
.service-matters {
  padding: 15px 15px;
  box-sizing: border-box;
  background-color: #ffffff;
  min-height: calc(100vh - 106px);
  position: relative;
  .img-box {
    width: 100%;
    position: relative;
    margin-bottom: 22px;
    img {
      width: 100%;
      display:block;
    }
    .content {
      position: absolute;
      top: 18px;
      left: 27px;
      .content-title {
        font-size: 23px;
        font-weight: bold;
        color:#ffffff;
      }
      .content-txt {
        font-size: 15px;
        font-weight: 400;
        color:#ffffff;
      }
    }
  }
}
.company {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
</style>
