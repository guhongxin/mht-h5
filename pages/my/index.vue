<template>
  <div class="my">
    <div class="user-infor">
      <div class="user-infor-left">
        <img src="/img/user.png" />
      </div>
      <div class="user-infor-right">
        <div class="user-frist">
          <div class="user-name">猕猴桃<span class="user-level">LV3</span></div>
          <div class="edit-user">编辑资料</div>
        </div>
        <div class="account">账号：MHT123456</div>
        <div class="k-coin">K币：63</div>
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
    <div class="list-view">
      <div class="list-item">
        <div class="list-item-left">
          <i class="my-infor"></i>
          <span>我的资料</span>
        </div>
      </div>
      <div class="list-item">
        <div class="list-item-left">
          <i class="my-xx"></i>
          <span>我的消息</span>
        </div>
        <div class="list-item-right">2</div>
      </div>
      <div class="list-item">
        <div class="list-item-left">
          <i class="my-game"></i>
          <span>我的游戏</span>
        </div>
        <div class="list-item-right">
          <van-icon name="arrow" class="more-icon"/>
        </div>
      </div>
      <div class="list-item" @click="goMyGiftBag">
        <div class="list-item-left">
          <i class="my-gift"></i>
          <span>我的礼包</span>
        </div>
        <div class="list-item-right">2</div>
      </div>
      <div class="list-item">
        <div class="list-item-left">
          <i class="my-kb"></i>
          <span>赚取K币</span>
        </div>
        <div class="list-item-right">
          <van-icon name="arrow" class="more-icon"/>
        </div>
      </div>
    </div>
    <div class="tq">
      <div class="tq-left">
        <img src="/img/servicetq.png" />
      </div>
      <div class="tq-right">
        <img src="/img/welfaretq.png" />
      </div>
    </div>
    <CompanyCopyWrit></CompanyCopyWrit>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
@Component({
  components: {
    CompanyCopyWrit
  },
  middleware: "redirectLogin"
})
export default class My extends Vue {
  private goMyGiftBag():void {
    this.$router.push({
      name: "my-giftbag"
    })
  }
}
</script>
<style lang="scss" scoped>
.my {
  padding-top: 15px;
  background-color: #ffffff;
  box-sizing: border-box;
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
  .user-infor-right {
    flex: 1;
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
.list-view {
  margin-top: 20px;
  padding: 0px 23px;
  .list-item {
    font-size: 14px;
    font-weight: 500;
    color: #1A1A1A;
    padding: 20px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .list-item-left {
      i {
        margin-right: 10px;
        vertical-align: middle;
        height: 20px;
        width: 20px;
        display: inline-block;
        background-size: contain;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
    }
    .list-item-right {
      text-align: right;
    }
  }
  & > .list-item:not(:last-child) {
    border-bottom: 1px solid #F3F3F3;
  }
}
.tq {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 23px 10px;
  .tq-left, .tq-right {
    width: 156px;
    height: 85px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.company-copywrit {
  p {
    font-size: 8px;
    color: #595959;
    text-align: center;
  }
}
.my-infor {
  background: url("/img/my2.png") no-repeat center;
}
.my-xx {
  background: url("/img/my3.png") no-repeat center;
}
.my-game {
  background: url("/img/my4.png") no-repeat center;
}
.my-gift {
  background: url("/img/my5.png") no-repeat center;
}
.my-kb {
  background: url("/img/my6.png") no-repeat center;
}
</style>