<template>
  <van-overlay :show="show"  class="overlayIndex">
    <div class="wrapper" @click="closeClick">
      <div class="block" @click.stop>
        <div class="block-head">
          <div class="block-head-title">游戏礼包<van-icon name="cross"  class="cross-style"  @click.stop="closeClick" /></div>
        </div>
        <div class="block-content">
          <img src="/img/prize.png" class="img-style"/>
        </div>
        <div class="block-footer">
          <div class="block-footer-left">
            <p>兑换码：<span>{{ codeInfor.code }}</span></p>
            <p>有效期：<span>{{ $customFormat(codeInfor.expireTime, "yyyy-MM-dd") }}</span></p>
          </div>
          <div class="block-footer-right">
            <span class="span-btn" @click="copyCode">复制兑换码</span>
          </div>
        </div>
      </div>
    </div>
</van-overlay>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
interface CodeInfor{
  code: string;
  expireTime: number
}
@Component
export default class ReceiveDailog extends Vue {
  private codeInfor:CodeInfor = {
    code: '',
    expireTime: 0
  }
  private show:boolean = false
  private showModule(param:any) {
    // 显示
    this.codeInfor = {
      code: param.code,
      expireTime: param.expireTime
    }
    console.log("param", param);
    this.show = true
  }
  private closeClick() {
    // 关闭
    this.show = false
  }
  private copyCode() {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.setAttribute('value', this.codeInfor.code);
    input.select();
    if (document.execCommand('copy')) {
      document.execCommand('copy');
      (this as any).$toast.success('复制成功');
      this.closeClick();
    }
    document.body.removeChild(input);
  }
}
</script>
<style lang="scss" scoped>
.overlayIndex {
  z-index: 3;
}
  .wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 300px;
  background-color: #fff;
  border-radius: 4px;
  .block-head-title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 10px;
    vertical-align: middle;
    box-sizing: border-box;
    .cross-style {
      float: right;
    }
  }
  .block-content {
    padding: 10px 10px;
    box-sizing: border-box;
    text-align: center;
    .img-style {
      width: 122px;
      height: 100px;
    }
  }
  .block-footer {
    padding: 10px 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .block-footer-left {
      font-size: 12px;
      font-weight: 400;
      color:#424348;
      flex: 2;
    }
    .block-footer-right {
      .span-btn {
        background:linear-gradient(0deg,rgba(69,151,67,1),rgba(125,179,73,1));
        border-radius: 22px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        line-height: normal;
        padding: 5px 15px;
        color: #ffffff;
      }
    }
  }
}
</style>
