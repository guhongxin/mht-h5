<template>
  <div class="my-picture">
    <div class="image-content">
      <div class="image-box">
        <img :src="accountImage" id="accountImage" />
        <div class="camera-icon" @click="selecImage"></div>
      </div>
    </div>
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
  private fileData: any;
  private mounted() {
    let route: any = this.$route;
    this.accountImage = route.query.modifyTxt
      ? route.query.modifyTxt
      : "";
    Bus.$on("rightClick", (key: string) => {
      this.save(key);
    });
  }
  private selecImage() {
    // 选择照片
    this.show = true;
  }
  private onCancel() {
    // 取消
    this.show = false;
  }
  // 打开文件 isOpenCamera 是否打开相机
  private save(key: string) {
    if (!this.fileData) {
      (this as any).$dialog.alert({
        message: '请选择上传的图片！'
      })
      return false;
    }
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
</style>
