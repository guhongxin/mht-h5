<template>
  <div class="comm-problem">
    <van-tabs v-model="active" :border="false">
      <van-tab title="账号相关">
        <div class="flex-grid account-frist">
          <div class="grid-item">
            <div class="grid-item-icon" @click="passwordClick">
              <img src="/img/lock.png" />
            </div>
            <div class="grid-item-title">
              密码修改
            </div>
          </div>
          <div class="grid-item">
            <div class="grid-item-icon" @click="secretGuardAbout">
              <img src="/img/shield.png"/>
            </div>
            <div class="grid-item-title">
              密保相关
            </div>
          </div>
          <div class="grid-item">
            <div class="grid-item-icon" @click="rechargeRecord">
              <img src="/img/magnifier.png"/>
            </div>
            <div class="grid-item-title">
              充值记录查询
            </div>
          </div>
        </div>
        <van-collapse v-model="activeNames" accordion>
          <van-collapse-item name="1">
            <template #title>
              <div class="collapse-title">
                <img src="/img/question.png" />
                <span>登陆未成功或异常报错？</span>
              </div>
            </template>
            <p>登陆需要使用猕猴桃平台账号，如已拥有，请您确保您的账密信息无误后进行登陆；如未拥有/登陆失败或遇到其他异常情况请联系人工客服。</p>
          </van-collapse-item>
          <van-collapse-item name="2">
            <template #title>
              <div class="collapse-title">
                <img src="/img/question.png" />
                <span>如何更换密保信息？</span>
              </div>
            </template>
            <p>换绑手机：您可在登录任一游戏后，点开游戏内侧方悬浮球，进入账号安全选项，可以进行手机换绑。</p>
            <p>换绑邮箱：轻触“我的”进入用户中心，点击“我的资料”-“邮箱”进行换绑。</p>
          </van-collapse-item>
          <van-collapse-item name="3">
            <template #title>
              <div class="collapse-title">
                <img src="/img/question.png" />
                <span>如何联系客服？</span>
              </div>
            </template>
            <p>QQ客服：搜索添加服务号800184997</p>
            <p>微信客服：搜索公众号 KiwiGame</p>
          </van-collapse-item>
          <van-collapse-item name="4">
            <template #title>
              <div class="collapse-title">
                <img src="/img/question.png" />
                <span>如何领取及兑换游戏礼包？</span>
              </div>
            </template>
            <p>领取礼包需要先使用猕猴桃平台账号进行登陆，已领取的礼包码可进入“我的”-“我的礼包”进行查看。且关注对应游戏的公众号及微博，也可以领取更多礼包哦。</p>
          </van-collapse-item>
          <van-collapse-item name="5">
            <template #title>
              <div class="collapse-title">
                <img src="/img/question.png" />
                <span>K币如何获取？</span>
              </div>
            </template>
            <p>每充值1元可对应获得10枚K币，K币可进入首页“商城”进行奖励兑换。更多K币获取方式敬请期待后续优惠活动和规则。</p>
          </van-collapse-item>
        </van-collapse>
      </van-tab>
      <van-tab title="充值服务" disabled></van-tab>
      <van-tab title="其它" disabled></van-tab>
    </van-tabs>
    <!-- <CompanyCopyWrit class="company"></CompanyCopyWrit> -->
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
export default class CommProblem extends Vue {
  private active:number = 0
  private activeNames:string = ''
  private secretGuardAbout() {
    (this as any).$dialog.alert({
      message: '该功能暂未开启'
    })
  }
  private rechargeRecord() {
    (this as any).$dialog.alert({
      message: '该功能暂未开启'
    })
  }
  private passwordClick() {
    (this as any).$dialog.alert({
      message: '该功能暂未开启'
    })
  }
}
</script>
<style lang="scss" scoped>
.comm-problem {
  padding-top: 15px;
  box-sizing: border-box;
  background-color: #ffffff;
  min-height: calc(100vh - 106px);
  position: relative;
  /deep/ .van-tabs__line {
    background-color: #7DB349;
  }
  .account-frist {
    margin: 20px 0px;
  }
  .flex-grid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .grid-item {
      padding: 10px;
      text-align: center;
      flex: 1;
      .grid-item-icon {
        img {
          margin: 0px auto;
          height: 30px;
          width: 30px;
          display: block;
        }
      }
      .grid-item-title {
        color: #666666;
        font-size: 12px;
        font-weight: 400;
        margin-top: 4px;
      }
    }
  }
  .collapse-title {
    img {
      height: 20px;
      width: 20px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      color: #1A1A1A;
      font-weight: 400;
    }
  }
}
.company {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
</style>
