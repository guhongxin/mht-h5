<template>
  <div class="personal-data">
    <div class="list-view">
      <div class="list-item bottom">
        <div class="list-item-left">
          <span>头像</span>
        </div>
        <div class="list-item-right">
          <img src="/img/user2.png" class="userImage"/>
        </div>
      </div>
      <div class="list-item" @click="nickName">
        <div class="list-item-left">
          <span>昵称</span>
        </div>
        <div class="list-item-right">
          <span>猕猴桃</span>
        </div>
      </div>
      <div class="list-item" @click="account">
        <div class="list-item-left">
          <span>账号</span>
        </div>
        <div class="list-item-right">
          <span>MHT123456</span>
        </div>
      </div>
      <div class="list-item" @click="sexClick">
        <div class="list-item-left">
          <span>性别</span>
        </div>
        <div class="list-item-right">
          <span>男</span>
        </div>
      </div>
      <div class="list-item" @click="birthdayClick">
        <div class="list-item-left">
          <span>生日</span>
        </div>
        <div class="list-item-right">
          <span>2015-02-03</span>
        </div>
      </div>
      <div class="list-item">
        <div class="list-item-left">
          <span>手机</span>
        </div>
        <div class="list-item-right">
          <span>18758158403</span>
        </div>
      </div>
      <div class="list-item">
        <div class="list-item-left">
          <span>邮箱</span>
        </div>
        <div class="list-item-right">
          <span>13256784512@qq.com</span>
        </div>
      </div>
    </div>
    <!-- 性别 -->
    <van-action-sheet 
      v-model="showSex"
      :actions="sexOption"
      @select="sexSelect"
      cancel-text="取消"/>
    <!-- 日期 -->
    <van-popup v-model="dateShow" round position="bottom" :style="{ height: '40%' }">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="dateTimeCancel"
        @confirm="dateTimeConfirm"
      />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component
export default class PersonalData extends Vue {
  private showSex:boolean = false
  private sexOption:Array<any> = [{ name: '男' }, { name: '女' }, { name: '未知' }]
  private dateShow:boolean = false;
  private currentDate:Object = new Date()
  private minDate:Object = new Date(1917, 1, 1)
  private maxDate:Object = new Date(3000, 1, 1)
  private sexClick() {
    // 
    this.showSex = true
  }
  private sexSelect(item:any) {
    // 选择性别
    this.showSex = false
    console.log("**", item);
  }
  private birthdayClick() {
    // 修改生日
    this.dateShow = true
  }
  private dateTimeCancel() {
    // 日期取消
    this.dateShow = false
  }
  private dateTimeConfirm() {
    // 日期确定
    this.dateShow = false
  }
  private nickName() {
    // 点击昵称
    this.$router.push({
      path: "/my/modifyPersonal",
      query: {
        title: "修改昵称",
        navBarType: '1',
        isRight: "1"  
      }
    })
  }
  private account() {
    // 修改账号
    this.$router.push({
      path: "/my/modifyPersonal",
      query: {
        title: "修改账号",
        navBarType: '1',
        isRight: "1"  
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.list-view {
  .list-item {
    padding: 15px 20px;
    box-sizing: border-box;
    background-color: #ffffff;
    font-size: 14px;
    font-weight: 500;
    color: #1A1A1A;
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
  & > .list-item:not(:first-child):not(:last-child) {
    border-bottom: 1px solid #C1C1C1;
  }
}
.userImage {
  height: 40px;
  width: 40px;
}
.bottom {
  margin-bottom: 10px;
}
</style>
