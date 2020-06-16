<template>
  <div class="personal-data">
    <div class="list-view">
      <div class="list-item bottom">
        <div class="list-item-left">
          <span>头像</span>
        </div>
        <div class="list-item-right" @click="userImageClick(user.avatarUrl)">
          <img :src="user.avatarUrl ? user.avatarUrl : $defaultUserImage" class="userImage"/>
        </div>
      </div>
      <div class="list-item" @click="modifyClick({
        title: '昵称',
        modifyTxt: user.nickname,
        key: 'nickname'
      })">
        <div class="list-item-left">
          <span>昵称</span>
        </div>
        <div class="list-item-right">
          <span>{{user.nickname}}</span>
        </div>
      </div>
      <div class="list-item" @click="sexClick">
        <div class="list-item-left">
          <span>性别</span>
        </div>
        <div class="list-item-right">
          <span>{{user.gender}}</span>
        </div>
      </div>
      <div class="list-item" @click="birthdayClick">
        <div class="list-item-left">
          <span>生日</span>
        </div>
        <div class="list-item-right">
          <span>{{$customFormat(user.birthday, "yyyy-MM-dd")}}</span>
        </div>
      </div>
      <div class="list-item"  @click="modifyClick({
        title: '手机',
        modifyTxt: user.phoneNumber,
        key: 'phoneNumber'
      })">
        <div class="list-item-left">
          <span>手机</span>
        </div>
        <div class="list-item-right">
           <span>{{user.phoneNumber}}</span>
        </div>
      </div>
      <div class="list-item"  @click="modifyClick({
        title: '邮箱',
        modifyTxt: user.email,
        key: 'email'
      })">
        <div class="list-item-left">
          <span>邮箱</span>
        </div>
        <div class="list-item-right">
          <span>{{user.email}}</span>
        </div>
      </div>
      <div class="list-item"  @click="modifyClick({
        title: '密码',
        key: 'password'
      })">
        <div class="list-item-left">
          <span>修改密码</span>
        </div>
        <div class="list-item-right"></div>
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
import { getSession } from "~/assets/utils/auth.js"
import { sessionClear, setSession } from "~/assets/utils/auth.js"
enum GenderEnum {
  UNKNOWN = "未知",
  MALE = "男",
  FEMALE = "女"
}
@Component
export default class PersonalData extends Vue {
  private showSex:boolean = false
  private sexOption:Array<any> = [
    { name: '男', value: 'MALE' },
    { name: '女', value: 'FEMALE' },
    { name: '未知', value: 'UNKNOWN' }]
  private dateShow:boolean = false;
  private currentDate:Object = new Date()
  private minDate:Object = new Date(1917, 1, 1)
  private maxDate:Object = new Date(3000, 1, 1)
  private user:any = {
    nickname: "",
    username: "",
    avatarUrl: "",
    birthday: "",
    gender: "",
    phoneNumber: "",
    email: "",
  }
  private sexClick() {
    // 
    this.showSex = true
  }
  private sexSelect(item:any) {
    // 选择性别
    this.showSex = false;
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/updateUser",
      data: {
        user:{
          gender: item.value
        }
      }
    }).then((res:any) => {
      let data = res;
      if (data.code === 0) {
        (this as any).$toast.success('修改成功')
        sessionClear()
        this.getUserInfor()
      }
    })
  }
  private getUserInfor() {
    // 获取用户信息
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/getUser"
    }).then((res:any) => {
      let data:any = res.data.user
      if (data) {
        this.user = {
          nickname: data.nickname,
          username: data.username,
          avatarUrl: data.avatarUrl,
          phoneNumber: data.phoneNumber,
          email: data.email,
        }
        // @ts-ignore
        this.user.gender = GenderEnum[ data.gender || 'UNKNOWN' ]
        this.user.birthday = data.birthday ? data.birthday : ""
        setSession("user",JSON.stringify(data))
      }
    })
  }
  private birthdayClick() {
    // 修改生日
    this.dateShow = true
  }
  private dateTimeCancel() {
    // 日期取消
    this.dateShow = false
  }
  private dateTimeConfirm(val:any) {
    // 日期确定
    let time = new Date(val).getTime();
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/updateUser",
      data: {
        user:{
          birthday: time
        }
      }
    }).then((res:any) => {
      let data = res;
      if (data.code === 0) {
        (this as any).$toast.success('修改成功')
        sessionClear()
        this.getUserInfor()
      }
    })
    this.dateShow = false
  }
  private modifyClick(param: {
    title: string;
    modifyTxt: string;
    key: string;
  }) {
    // 点击修改
    this.$router.push({
      path: "/my/modifyPersonal",
      query: {
        title: param.title,
        navBarType: '1',
        isRight: '1',
        modifyTxt: param.modifyTxt,
        modifyKey: param.key
      }
    })
  }
  private userImageClick(url:string) {
    // 修改图像
     this.$router.push({
      path: "/my/myPicture",
      query: {
        title: "修改图像",
        navBarType: '1',
        isRight: '1',
        modifyTxt: url,
        modifyKey: "avatarUrl"
      }
    })
  }
  private mounted() {
    // @ts-ignore
    let _user = getSession("user") ? JSON.parse(getSession("user")) : null
    // @ts-ignore
    if (_user) {
      this.user = {
        nickname: _user.nickname,
        username: _user.username,
        avatarUrl: _user.avatarUrl,
        phoneNumber: _user.phoneNumber,
        email: _user.email,
      }
      // @ts-ignore
      this.user.gender = GenderEnum[ _user.gender || 'UNKNOWN' ]
      this.user.birthday = _user.birthday ? _user.birthday : ""
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-data {
  min-height: calc(100vh - 106px);
}
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
