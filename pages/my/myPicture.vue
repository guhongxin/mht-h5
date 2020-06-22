<template>
  <div class="my-picture">
    <div class="image-content">
      <div class="image-box">
        <img :src="accountImage" id="accountImage" />
        <div class="camera-icon" @click="selecImage"></div>
      </div>
      <van-action-sheet
        v-model="show"
        :actions="actions"
        cancel-text="取消"
        close-on-click-action
        @cancel="onCancel"
        @select="onSelect"
      />
    </div>
    <CompanyCopyWrit class="company"></CompanyCopyWrit>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue";
import Bus from "~/plugins/Bus.js";
import { sessionClear, setSession } from "~/assets/utils/auth.js";
@Component({
  components: {
    CompanyCopyWrit
  }
})
export default class myPicture extends Vue {
  private show: boolean = false;
  private actions: Array<any> = [{ name: "相册" }, { name: "照相" }];
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
  private onSelect(item: any) {
    if (item.name === "相册") {
      // 选择本地相册
      this.openLocalImage();
    } else {
      // 拍照
      this.openCamera();
    }
  }
  private openLocalImage() {
    // 打开本地相册
    this.fileOpen();
  }
  private openCamera() {
    // 打开相机
    this.fileOpen(true);
  }
  // 打开文件 isOpenCamera 是否打开相机
  private fileOpen(isOpenCamera?: boolean) {
    let self = this;
    let inputFileDom: any = document.getElementById("inputFile");
    if (inputFileDom) {
      document.body.removeChild(inputFileDom);
    }
    let input: any = document.createElement("input");
    input.id = "inputFile";
    input.type = "file";
    input.className = "imgeInput";
    input.style.display = "none";
    input.accept = "image/*";
    if (isOpenCamera) {
      input.capture = "camera";
    }
    input.click();
    // @ts-ignore
    document.body.appendChild(input);
    input.onchange = function(e: any) {
      let file = e.target.files[0];
      self.fileData = file;
      let src = window.URL.createObjectURL(file);
      self.accountImage = src;
      let accountImage: any = document.getElementById("accountImage");
      accountImage.onload = function() {
        // 明确地通过调用释放
        window.URL.revokeObjectURL(src);
      };
      input.value = "";
      document.body.removeChild(input);
    };
  }
  private save(key: string) {
    if (!this.fileData) {
      (this as any).$dialog.alert({
        message: '请选择上传的图片！'
      })
      return false;
    }
    this.canvasDataURL(this.saveApi);
   
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
      let data = res;
      if (data.code === 0) {
        (this as any).$toast.success('修改成功')
        this.$router.go(-1);
      }
    })
  }
  private canvasDataURL(callback:any, obj?:any) {
    let self = this;
    let reader = new FileReader();
    let fileName = this.fileData.name;
    let filetype = this.fileData.type;
    reader.readAsDataURL(this.fileData);
    reader.onload = function(e) {
      let img: any = new Image();
      img.src = this.result;
      img.onload = function() {
        let that = this;
        // 默认按比例压缩
        let w = that.width,
          h = that.height,
          scale = w / h;
        w = w;
        h = w / scale;
        let quality = 0.1; // 默认图片质量为0.7
        //生成canvas
        let canvas = document.createElement("canvas");
        let ctx:any = canvas.getContext("2d");
        // 创建属性节点
        let anw = document.createAttribute("width");
        anw.nodeValue = w;
        let anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        // 图像质量
        // quality值越小，所绘制出的图像越模糊
        let base64 = canvas.toDataURL("image/jpeg", quality);
        canvas.toBlob(function (blob) {
          // @ts-ignore
          let file = new File([blob], fileName, {type: filetype, lastModified: Date.now()})
          let formdata = new FormData();
          // @ts-ignore
          formdata.append("file",file);
          (self as any).$axios({
            method: "POST",
            data: formdata,
            url: `${(self as any).$upfileUrl}/upload/USR_AVATAR`
          }).then((res:any) => {
            let url = `${(self as any).$upfileUrl}${res}`
            callback(url)
          })
        }, 'image/png');
      };
    };
  }
  private destroyed() {
    Bus.$off("rightClick");
    this.fileData = null;
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
