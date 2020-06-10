<template>
  <div class="company-copywrit">
    <p>武汉灵动在线科技有限公司</p>
    <p>鄂ICP备15004704号-3</p>
    <p>公安机关备案号：42018502000448</p>
    <p>网络文化经营许可证：鄂网文〔2016〕2305-065号</p>
    <p>电信增值许可证号：鄂B2-20160108</p>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component
export default class CompanyCopyWrit extends Vue {

}
</script>
<style lang="scss" scoped>
.company-copywrit {
  background-color: #ffffff;
  p {
    font-size: 8px;
    color: #595959;
    text-align: center;
  }
}
</style>