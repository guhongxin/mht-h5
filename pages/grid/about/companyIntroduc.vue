<template>
  <div class="company-introduc">
    <div class="img-box">
      <img src="/img/company.png" />
    </div>
    <p class="company-txt">
      猕猴桃游戏为武汉灵动在线科技有限公司旗下品牌。自2014年成立以来，我们怀揣着丰富不同市场人群的精神文明需求这一初衷，通过不断创新的方式，逐步实现公司成立之初的愿景：做全球创意驱动型娱乐运营商。公司始终对市场及文化领域保持超高敏锐度，有前瞻性地发展不同的业务策略和组织策略以敏捷应对各种挑战。我们涵盖手游网游、休闲游戏等40多款产品，游戏用户注册总量超过2000万。截至目前共独代发行6款手游，其中倾力打造的佛系挂机策略手游在同类目排行第一，累计流水破9亿，活跃用户达180万。2020年，我们坚定地实施出海战略，已经为海外玩家准备了4款精品产品，将会在下半年陆续落地，正式扬帆海外！
    </p>
    <CompanyCopyWrit class="company"></CompanyCopyWrit>
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
export default class CompanyIntroduc extends Vue {

}
</script>
<style lang="scss" scoped>
.company-introduc {
  min-height: calc(100vh - 106px);
  background-color: #ffffff;
  padding: 40px 15px 0px 15px;
  box-sizing: border-box;
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
