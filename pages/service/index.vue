<template>
  <div class="servie">
    <div class="user-infor">
      <div class="user-infor-left">
        <img src="/img/user.png" />
      </div>
      <div class="user-infor-middle">
        <div class="user-frist">
          <div class="user-name">猕猴桃<span class="user-level">LV3</span></div>
        </div>
        <div class="account">账号：MHT123456</div>
        <div class="k-coin">K币：63</div>
      </div>
      <div class="user-infor-right">
        <div class="div-btn" @click="signIn">签到</div>
      </div>
    </div>
    <div class="level-percentage-box">
      <div class="level-percentage-left"></div>
      <div class="level-percentage-right">
        <div class="level-progress">
          <div class="progress-portion" style="width:40%;">
            <div class="progress-pivot">LV3</div>
          </div>
        </div>
      </div>
    </div>
    <Floor :floorTitle="'VIP 规则说明'" style="margin: 59px 0px 20px 0px" :isMore="false">
    </Floor>
    <div class="servie-descript">
      <div class="title">充值服务</div>
      <div class="servie-grid">
        <div class="servie-grid-item" v-for="(item, index) in recharge" :key="index" @click="gridClick(item)">
          <div class="grid-icon">
            <img :src="item.src" />
          </div>
          <div class="grid-title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="servie-descript">
      <div class="title">客服中心</div>
      <div class="servie-grid">
        <div class="servie-grid-item" v-for="(item, index) in kfCenter" :key="index" @click="gridClick(item)">
          <div class="grid-icon">
            <img :src="item.src" />
          </div>
          <div class="grid-title">
            {{ item.title }}
          </div>
        </div>
      </div>
    </div>
    <CompanyCopyWrit class="cyCopyWrit"></CompanyCopyWrit>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
interface Recharge {
  /**
   * servie-grid
   * src icon地址
   * title 标题
   */
  src: string;
  title: string;
  path?: string;
}
@Component({
  components: {
    Floor,
    CompanyCopyWrit
  }
})
export default class Service extends Vue {
  private recharge:Array<Recharge> = [{
    src: "/img/recharge.png",
    title: "充值"
  }, {
    src: "/img/balance.png",
    title: "账户余额"
  }, {
    src: "/img/record.png",
    title: "充值记录"
  }]
  private kfCenter:Array<Recharge> = [{
    src: "/img/problem.png",
    title: "常见问题",
    path: "/service/commProblem"
  }, {
    src: "/img/serviceNotice.png",
    title: "服务须知",
    path: "/service/serviceMatters"
  }, {
    src: "/img/rgkf.png",
    title: "人工客服"
  }]
  private gridClick(item:any) {
    // 点击九宫格
    if (!item.path) {
      (this as any).$dialog.alert({
        message: '该功能暂未开启'
      })
      return false
    }
    this.$router.push({
      path: item.path,
      query: {
        navBarType: "1",
        title: item.title
      }
    })
  }
  private signIn() {
    // 签到
    (this as any).$dialog.alert({
      message: '该功能暂未开启'
    })
  }
}
</script>
<style lang="scss" scoped>
.servie {
  padding-top: 15px;
  padding-bottom: 60px;
  box-sizing: border-box;
  background-color: #ffffff;
}
.user-infor {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 23px;
  .user-infor-left {
    width: 54px;
    height: 54px;
    margin-right: 11px;
    img {
      height: 54px;
      width: 54px;
    }
  }
  .user-infor-middle {
    flex: 2;
    .user-frist {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-name {
        font-size: 18px;
        color: #1A1A1A;
        font-weight: bold;
        .user-level {
          display: inline-block;
          font-size: 12px;
          color: #fff;
          background: linear-gradient(-90deg,rgba(69,151,67,1),rgba(125,179,73,1));
          padding: 2px 4px;
          border-radius: 4px;
          margin-left: 5px;
        }
      }
      .edit-user {
        font-size: 14px;
        color: #999999;
        font-weight: bold;
      }
    }
    .account {
      font-size: 11px;
      font-weight: 400;
      color: #1A1A1A;
    }
    .k-coin {
      font-size: 10px;
      font-weight: bold;
      color: rgba(153,153,153,1);
    }
  }
  .user-infor-right {
    .div-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 63px;
      height: 24px;
      border-radius: 12px;
      font-size: 14px;
      color: #fff;
      font-weight: bold;
      background: linear-gradient(-90deg,rgba(69,151,67,1),rgba(125,179,73,1));
    }
  }
}
.level-percentage-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 23px;
  margin-top: 20px;
  .level-percentage-left {
    width: 54px;
    margin-right: 11px;
  }
  .level-percentage-right {
    flex: 1;
    .level-progress {
      width: 100%;
      height: 8px;
      background: #E6E6E6;
      border-radius: 4px;
    }
    .progress-portion {
      height: 8px;
      background: linear-gradient(-90deg,rgba(69,151,67,1),rgba(125,179,73,1));
      border-radius: 4px;
      position: relative;
      .progress-pivot {
        display: inline-block;
        position: absolute;;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight:bold;
        font-style:italic;
        color:rgba(125,179,73,1);
        top: -14px;
        right: 0px;
      }
    }
  }
}
.servie-descript {
  padding: 0px 7px;
  margin-bottom: 20px;
  .title {
    font-size: 14px;
    font-weight: bold;
    color: #1A1A1A;
    margin-bottom: 25px;
  }
  .servie-grid {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .servie-grid-item {
      text-align: center;
      .grid-icon {
        line-height: 0px;
        img {
          height: 20px;
          width: 20px;
        }
      }
      .grid-title {
        margin-top: 10px;
        font-size: 12px;
        color: #666666;
        font-weight: 400;
      }
    }
  }
}
.cyCopyWrit {
  position: absolute;
  bottom: 50px;
  width: 100%;
}
</style>
