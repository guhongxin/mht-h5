<template>
  <div class="honor">
    <div class="img-box">
      <img src="/img/about3.png" />
    </div>
    <p class="company-txt">
      公司荣誉
    </p>
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
.honor {
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
  .company-txt {
    padding-bottom: 30px;
    font-size: 12px;
    text-indent: 24px;
    font-weight: 400;
    color: #1A1A1A;
    line-height: 25px;
  }
}
.cyCopyWrit {
  position: absolute;
  bottom: 50px;
  width: 100%;
}
</style>