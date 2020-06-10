<template>
  <div class="my-giftbag-item">
    <div class="my-giftbag-item-left">
      <img :src="giftCodes.iconUrl" />
    </div>
    <div class="my-gittbag-item-middle">
      <div class="gittbag-name"> 
        {{giftCodes.gameName}} <span class="jp-name">{{giftCodes.giftCodeBoxName}}</span>                    
      </div>
      <div class="termofvalidity">有效期至:<span>{{$customFormat(giftCodes.expireTime, "yyyy-MM-dd")}}</span></div>
      <div class="code">礼包码:<span>{{giftCodes.code}}</span></div>
    </div>
    <div class="my-gittbag-item-right">
      <div class="copyCodeBtn"
        :class="[ disabled ? 'disableBtn' : 'enableBtn']" @click="copyCode">复制兑换码</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop} from "vue-property-decorator"
@Component
export default class MygiftbagItem extends Vue {
  @Prop({ default: false }) disabled!:boolean
  @Prop({ default: function() {
    return {}
  }}) giftCodes!:any
  private copyCode() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', this.giftCodes.code);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      (this as any).$toast.success('复制成功');
    }
    document.body.removeChild(input);
  }
}
</script>
<style lang="scss" scoped>
.my-giftbag-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .my-giftbag-item-left {
    width: 68px;
    margin-right: 15px;
    img {
      height: 68px;
      width: 68px;
      vertical-align: middle;
    }
  }
  .my-gittbag-item-middle {
    flex: 2;
    .gittbag-name {
      font-size: 16px;
      color: #595959;
      font-weight: bold;
      .jp-name {
        font-size: 12px;
      }
    }
    .termofvalidity {
      font-size: 12px;
      font-weight:400;
      margin-top: 3px;
      color:#808080;
    }
    .code {
      font-size: 12px;
      font-weight:400;
      color:#808080;
      margin-top: 3px;
    }
  }
  .my-gittbag-item-right {
    flex: 1;
    height: 68px;
    position: relative;
    .copyCodeBtn {
      width: 100%;
      font-size: 14px;
      font-weight:bold;
      color:#ffffff;
      line-height: normal;
      padding: 5px 0px;
      box-sizing: border-box;
      text-align: center;
      border-radius:24px;
      position: absolute;
      bottom: 0px;
    }
    .enableBtn {
      background:linear-gradient(0deg,rgba(69,151,67,1),rgba(125,179,73,1));
    }
    .disableBtn {
      background-color: #727272;
    }
  }
}
</style>
