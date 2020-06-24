<template>
  <div class="my-picture">
    <div class="image-content">
      <div class="image-box">
        <img :src="accountImage" id="accountImage" />
      </div>
    </div>
    <div class="select-box">
      <span class="selectBtn" @click="selectImage">选择图像</span>
    </div>
    <van-action-sheet  v-model="show">
      <div class="default-image-box">
        <div class="item" v-for="(item, index) in imgIcon" :key="index" @click="iconClick(index)">
          <img :src="`http://173up.tyu89.wang/static/USR_AVATAR/${index + 1}.png`">
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Bus from "~/plugins/Bus.js";
import { sessionClear, setSession } from "~/assets/utils/auth.js";
@Component({
  components: { }
})
export default class myPicture extends Vue {
  private show: boolean = false;
  private accountImage: string = "";
  private key: string = "";
  private imgIcon:Array<string> = new Array(18);
  private mounted() {
    console.log("imgIcon", this.imgIcon)
    let route: any = this.$route;
    this.accountImage = route.query.modifyTxt
      ? route.query.modifyTxt
      : "";
    Bus.$on("rightClick", (key: string) => {
      this.save(key);
    });
  }
  private onCancel() {
    // 取消
    this.show = false;
  }
  // 打开文件
  private save(key: string) {
    (this as any).$toast.loading({
      mask: true
    });
    this.saveApi(this.accountImage)
  }
  private selectImage() {
    // 选择图像
    this.show = true;
  }
  private iconClick(index:number) {
    this.show = false;
    this.accountImage = `http://173up.tyu89.wang/static/USR_AVATAR/${index + 1}.png`;
  }
  private saveApi(url: string) {
    (this as any).$axios({
      method: "POST",
      url: "/usr/user/updateUser",
      data: {
        user:{
          avatarUrl: url
        }
      }
    }).then((res:any) => {
      (this as any).$toast.clear()
      let data = res;
      if (data.code === 0) {
        (this as any).$toast.success('修改成功')
        this.$router.go(-1);
      }
    }).catch((err:any) => {
      (this as any).$toast.clear()
    })
  }
  private destroyed() {
    Bus.$off("rightClick");
  }
}
</script>
<style lang="scss" scoped>
.my-picture {
  min-height: calc(100vh - 106px);
  background-color: #ffffff;
  position: relative;
  .image-content {
    padding-top: 60px;
    box-sizing: border-box;
    .image-box {
      width: 100px;
      height: 100px;
      margin: 0px auto;
      position: relative;
      img {
        height: 100px;
        width: 100px;
        border-radius: 50px;
        display: block;
      }
      .camera-icon {
        background: url("/img/camera.png") no-repeat center;
        background-size: contain;
        height: 28px;
        width: 28px;
        position: absolute;
        left: calc(50% + 14px);
        bottom: 0px;
      }
    }
  }
}
.company {
  width: 100%;
  position: absolute;
  bottom: 0px;
}
.select-box {
  text-align: center;
  .selectBtn {
    font-size: 14px;
    display: inline-block;
  }
}
.default-image-box {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  background-color: #ffffff;
  justify-items: center;
  align-items: center;
  .item {
    padding: 5px;
    img {
      width: 40px;
      display:block;
    }
  }
}
</style>
