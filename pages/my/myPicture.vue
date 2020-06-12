<template>
  <div class="my-picture">
    <div class="image-content">
      <div class="image-box">
        <img :src="accountImage" id="accountImage"/>
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
import { Vue, Component } from "vue-property-decorator"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
@Component({
  components: {
    CompanyCopyWrit
  }
})
export default class myPicture extends Vue {
  private show:boolean = false
  private actions:Array<any> = [{ name: '相册' }, { name: '照相' }]
  private accountImage:string ="/img/user2.png"
  private selecImage() {
    // 选择照片
    this.show = true
  }
  private onCancel() {
    // 取消
    this.show = false
  }
  private onSelect(item:any) {
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
    let self = this
    // @ts-ignore
    let inputFileDom:any = document.getElementById("inputFile")
    if (inputFileDom) {
      document.body.removeChild(inputFileDom)
    }
    let input:HTMLInputElement = document.createElement("input");
    input.id = "inputFile"
    input.type = "file"
    input.className = "imgeInput"
    input.style.display = "none"
    input.accept="image/*"
    input.click();
    // @ts-ignore
    document.body.appendChild(input)
    input.onchange = function(e:any) {
      let file = e.target.files[0]
      let src = window.URL.createObjectURL(file)
      self.accountImage = src
      let accountImage:any = document.getElementById("accountImage")
      accountImage.onload = function() {
        // 明确地通过调用释放
        window.URL.revokeObjectURL(src);
      }
      input.value = ""
      document.body.removeChild(input)
    }
  }
  private openCamera() {
    // 打开相机
    let self = this
    let inputFileDom:any = document.getElementById("inputFile")
    if (inputFileDom) {
      document.body.removeChild(inputFileDom)
    }
    let input:any = document.createElement("input");
    input.id = "inputFile"
    input.type = "file"
    input.className = "imgeInput"
    input.style.display = "none"
    input.accept="image/*"
    input.capture='camera'
    input.click();
    // @ts-ignore
    document.body.appendChild(input)
    input.onchange = function(e:any) {
      let file = e.target.files[0]
      let src = window.URL.createObjectURL(file)
      self.accountImage = src
      let accountImage:any = document.getElementById("accountImage")
      accountImage.onload = function() {
        // 明确地通过调用释放
        window.URL.revokeObjectURL(src);
      }
      input.value = ""
      document.body.removeChild(input)
    }
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
