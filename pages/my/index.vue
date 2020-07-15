<template>
  <div class="my">
    <div class="my-frist">
      <div class="user-infor">
        <div class="user-infor-left">
          <img :src="user.avatarUrl ? user.avatarUrl : $defaultUserImage3" />
        </div>
        <div class="user-infor-middle">
          <div class="user-frist">
            <div class="user-name">
              <span>{{ user.nickname }}</span>
              <!-- <span class="user-level">LV<span>{{vip.level}}</span></span> -->
            </div>
          </div>
          <div class="account">账号：{{ user.username || "无" }}</div>
          <div class="k-coin">K币：{{ user.kCoin }}</div>
        </div>
        <div class="user-infor-right">
          <span @click="logoutClick">退出</span>
        </div>
      </div>
      <div class="level-percentage-box">
        <div class="level-percentage-left"></div>
        <div class="level-percentage-right">
          <div class="level-progress">
            <div class="progress-portion" :style="{ width: vip.expProgress }">
              <div class="progress-pivot" :style="{ left: vip.expProgress }">
                LV<span>{{ vip.level }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list-view">
      <div class="list-item" @click="personalClick">
        <div class="list-item-left">
          <i class="my-infor"></i>
          <span>我的资料</span>
        </div>
        <div class="list-item-right">
          <van-icon name="arrow" class="more-icon" />
        </div>
      </div>
      <div class="list-item" @click="myxxClick">
        <div class="list-item-left">
          <i class="my-xx"></i>
          <span>我的消息</span>
        </div>
        <div class="list-item-right">
          <span>-</span>
          <van-icon name="arrow" class="more-icon" />
        </div>
      </div>
      <div class="list-item" @click="myGameClick">
        <div class="list-item-left">
          <i class="my-game"></i>
          <span>我的游戏</span>
        </div>
        <div class="list-item-right">
          <van-icon name="arrow" class="more-icon" />
        </div>
      </div>
      <div class="list-item" @click="goMyGiftBag">
        <div class="list-item-left">
          <i class="my-gift"></i>
          <span>我的礼包</span>
        </div>
        <div class="list-item-right">
          <span>{{ mygiftCodeCount }}</span>
          <van-icon name="arrow" class="more-icon" />
        </div>
      </div>
      <div class="list-item" @click="goMySc">
        <div class="list-item-left">
          <i class="my-sc"></i>
          <span>我的收藏</span>
        </div>
        <div class="list-item-right">
          <span>{{ mygiftCodeCount }}</span>
          <van-icon name="arrow" class="more-icon" />
        </div>
      </div>
      <div class="list-item" @click="myKbClick">
        <div class="list-item-left">
          <i class="my-kb"></i>
          <span>赚取K币</span>
        </div>
        <div class="list-item-right">
          <van-icon name="arrow" class="more-icon" />
        </div>
      </div>
    </div>
    <div class="tq">
      <div class="tq-left">
        <img src="/img/servicetq.png" @click="fwtqClick" />
      </div>
      <div class="tq-right">
        <img src="/img/welfaretq.png" @click="fltqClick" />
      </div>
    </div>
    <!-- <CompanyCopyWrit class="cyCopyWrit"></CompanyCopyWrit> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue";
import { getSession, removeToken, sessionClear } from "~/assets/utils/auth.js";
import { getToken } from "~/assets/utils/auth.js";
@Component({
  components: {
    CompanyCopyWrit
  },
  middleware: "redirectLogin"
})
export default class My extends Vue {
  private user: any = {
    nickname: "",
    username: "",
    avatarUrl: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    email: "",
    kCoin: 0
  };
  private vip = {
    level: 0,
    curExp: 0,
    maxExp: 0,
    expProgress: "0%"
  };
  private mygiftCodeCount: number = 0;
  private goMyGiftBag(): void {
    // 我的礼包
    this.$router.push({
      name: "my-giftbag"
    });
  }
  private personalClick() {
    // 我的资料
    // @ts-ignore
    this.$router.push({
      path: "/my/personalData",
      query: {
        title: "我的资料",
        navBarType: "1"
      }
    });
  }
  private mounted() {
    // @ts-ignore
    let _token = getToken();
    if (_token) {
      this.getUserInfor();
    }
    this.getMyGiftCodeCount();
  }
  private logoutClick() {
    // 退出
    (this as any)
      .$axios({
        method: "POST",
        url: "/usr/user/logout"
      })
      .then((res: any) => {
        removeToken();
        sessionClear();
        this.$router.push({ path: "/login" });
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  private getMyGiftCodeCount() {
    (this as any)
      .$axios({
        method: "POST",
        url: "/usr/giftcode/getMyGiftCodeCount"
      })
      .then((res: any) => {
        let data = res.data;
        this.mygiftCodeCount = data.count;
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  private getUserInfor() {
    (this as any)
      .$axios({
        method: "POST",
        url: "/usr/user/getUser"
      })
      .then((res: any) => {
        let _user: any = res.data.user;
        // @ts-ignore
        if (_user) {
          this.vip.level = _user.vip.level;
          this.vip.curExp = _user.vip.curExp;
          this.vip.maxExp = _user.vip.maxExp;
          if (!_user.vip.maxExp) {
            this.vip.expProgress = "0%";
          } else {
            this.vip.expProgress =
              ((this.vip.curExp * 100) / this.vip.maxExp).toFixed(2) + "%";
          }
          this.user = {
            nickname: _user.nickname,
            username: _user.username,
            avatarUrl: _user.avatarUrl,
            birthday: _user.birthday,
            gender: _user.gender,
            phoneNumber: _user.phoneNumber,
            email: _user.email,
            kCoin: _user.kCoin
          };
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  private myxxClick() {
    // 查看我的消息
    (<any> this).$router.push({
      path: "/my/myNews",
      query: {
        title: "我的消息",
        navBarType: "1"
      }
    });
  }
  private myGameClick() {
    // 查看我的游戏
    (this as any).$dialog.alert({
      message: "该功能暂未开启,敬请期待"
    });
  }
  private myKbClick() {
    // 赚取K币
    (this as any).$dialog.alert({
      message: "该功能暂未开启,敬请期待"
    });
  }
  private fwtqClick() {
    (this as any).$dialog.alert({
      message: "该功能暂未开启,敬请期待"
    });
  }
  private fltqClick() {
    (this as any).$dialog.alert({
      message: "该功能暂未开启,敬请期待"
    });
  }
  private goMySc()  {
    // 收藏
    (this as any).$router.push({
      path: "/my/myCollect",
      query: {
        title: "我的消息",
        navBarType: "1"
      }
    });
  }
}
</script>
<style lang="scss" scoped>
.my {
  padding: 0px;
  box-sizing: border-box;
  min-height: calc(100vh - 106px);
}
.my-frist {
  background-color: #ffffff;
  padding: 15px 0px;
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
      border-radius: 50%;
    }
  }
  .user-infor-middle {
    flex: 1;
    .user-frist {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-name {
        font-size: 18px;
        color: #1a1a1a;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
        .user-level {
          display: inline-block;
          font-size: 12px;
          color: #fff;
          background: linear-gradient(
            -90deg,
            rgba(69, 151, 67, 1),
            rgba(125, 179, 73, 1)
          );
          padding: 2px 4px;
          border-radius: 4px;
          margin-left: 5px;
          vertical-align: text-bottom;
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
      color: #1a1a1a;
    }
    .k-coin {
      font-size: 10px;
      font-weight: bold;
      color: rgba(153, 153, 153, 1);
    }
  }
  .user-infor-right {
    width: 50px;
    font-size: 12px;
    text-align: right;
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
      background: #e6e6e6;
      border-radius: 4px;
    }
    .progress-portion {
      height: 8px;
      background: linear-gradient(
        -90deg,
        rgba(69, 151, 67, 1),
        rgba(125, 179, 73, 1)
      );
      border-radius: 4px;
      position: relative;
      .progress-pivot {
        display: inline-block;
        position: absolute;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-style: italic;
        color: rgba(125, 179, 73, 1);
        top: -14px;
        right: 0px;
      }
    }
  }
}
.list-view {
  margin-top: 20px;
  padding: 0px 23px;
  background-color: #ffffff;
  .list-item {
    font-size: 14px;
    font-weight: 500;
    color: #1a1a1a;
    padding: 15px 0px;
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
    border-bottom: 1px solid #f3f3f3;
  }
}
.tq {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 23px;
  .tq-left,
  .tq-right {
    width: 156px;
    height: 85px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.login-out {
  float: right;
  font-size: 12px;
}
.cyCopyWrit {
  margin-top: 20px;
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
.my-sc {
  background: url("/img/my7.png") no-repeat center;
}
.more-icon {
  vertical-align: middle;
}
</style>
