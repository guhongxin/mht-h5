<template>
  <div class="servie">
    <div class="servie-box">
      <template >
        <div class="user-infor">
          <div class="user-infor-left">
            <img :src="isLogin ? (user.avatarUrl ? user.avatarUrl : $defaultUserImage3) : $defaultUserImage" />
          </div>
          <div class="user-infor-middle">
            <div class="user-frist">
              <div class="user-name">
                <span>{{user.nickname || "未登录"}}</span>
                <!-- <span class="user-level">LV<span>{{vip.level}}</span></span> -->
              </div>
            </div>
            <div class="account">账号：{{user.username || "无"}}</div>
            <!-- <div class="k-coin">K币：{{ user.kCoin }}</div> -->
          </div>
          <div class="user-infor-right">
            <!-- <div class="div-btn" @click="signIn">签到</div> -->
          </div>
        </div>
        <div class="level-percentage-box">
          <div class="level-percentage-left"></div>
          <div class="level-percentage-right">
            <div class="level-progress">
              <div class="progress-portion" :style="{width: vip.expProgress}">
                <div class="progress-pivot" :style="{left: vip.expProgress}">LV<span>{{vip.level}}</span></div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- <div class="no-login" v-else>
        <div class="login-status">未登录</div>
      </div> -->
    </div>
    <div class="servie-two">
      <!-- <Floor :floorTitle="'VIP 规则说明'" style="margin: 20px 0px 20px 0px" :isMore="false">
      </Floor> -->
      <div class="servie-descript">
        <div class="title">充值服务</div>
        <div class="servie-grid">
          <div class="servie-grid-item" v-for="(item, index) in recharge" :key="index" @click="gridClick(item)">
            <div class="grid-icon">
              <img :src="item.src" />
            </div>
            <div class="grid-title">
              {{index === 1 ? item.title+ ':' +item.num : item.title }}
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
    </div>
    <!-- <CompanyCopyWrit class="company"></CompanyCopyWrit> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
import { getToken } from "~/assets/utils/auth.js"
interface Recharge {
  /**
   * servie-grid
   * src icon地址
   * title 标题
   */
  src: string;
  title: string;
  path?: string;
  num?: Number;
}
@Component({
  components: {
    Floor,
    CompanyCopyWrit
  },
  // middleware: "redirectLogin"
})
export default class Service extends Vue {
  private isLogin:boolean = false; // 是否登录
  private recharge:Array<Recharge> = [{
    src: "/img/recharge.png",
    title: "充值"
  }, {
    src: "/img/balance.png",
    title: "K币",
    num: 0
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
  private user:any = {
    nickname: "",
    username: "",
    avatarUrl: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    email: "",
    kCoin: 0
  }
  private vip = {
    level: 0,
    curExp: 0,
    maxExp: 0,
    expProgress: "0%"
  }
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
  private mounted() {
    let _token = getToken();
    if (_token) {
      this.isLogin = true;
      this.getUserInfor();
    } else {
      this.isLogin = false;
    }
  }
  private getUserInfor() {
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/getUser"
    }).then((res:any) => {
      let _user:any = res.data.user
      // @ts-ignore
      if (_user) {
        this.vip.level = _user.vip.level
        this.vip.curExp = _user.vip.curExp
        this.vip.maxExp = _user.vip.maxExp
        if (!_user.vip.maxExp) {
          this.vip.expProgress = "0%"
        } else {
          this.vip.expProgress = (this.vip.curExp*100 / this.vip.maxExp).toFixed(2) + "%"
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
        }
        this.recharge[1].num = _user.kCoin || 0
      }
    }).catch((err:any) => {
      console.log(err)
    })
  }
}
</script>
<style lang="scss" scoped>
.servie {
  box-sizing: border-box;
  min-height: calc(100vh - 106px);
  position: relative;
}
.servie-box {
  padding: 15px 0px;
  background-color: #ffffff;
  .no-login {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-status {
      font-size: 16px;
      font-weight: 600;
      padding: 4px 10px;
      color: #ffffff;
      background-color: #dddddd;
      border-radius: 4px;
      letter-spacing: 4px;
    }
  }
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
    flex: 2;
    .user-frist {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .user-name {
        font-size: 18px;
        color: #1A1A1A;
        font-weight: bold;
        display: flex;
        justify-content: center;
        align-items: center;
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
      font-size: 12px;
      font-weight: 400;
      color: #1A1A1A;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    }
    .k-coin {
      font-size: 12px;
      font-weight: 400;
      color: #1A1A1A;
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
      flex: 1;
      .grid-icon {
        img {
          display: block;
          height: 30px;
          width: 30px;
          margin: 0px auto;
        }
      }
      .grid-title {
        margin-top: 4px;
        font-size: 14px;
        color: #666666;
        font-weight: 400;
      }
    }
  }
}
.company {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
.servie-two {
  background-color: #ffffff;
  overflow: hidden;
  margin-top: 10px;
  padding: 20px 0px;
  & > .servie-descript:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
