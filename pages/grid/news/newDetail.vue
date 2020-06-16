<template>
  <div class="news-detail">
    <div v-html="content" class="content-box"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component
export default class NesDetail extends Vue {
  private content:string =""
  private mounted() {
    let route = this.$route;
    let id = route.query.id;
    this.getList({ newsId: id })
  }
  private getList(param:any) {
    (this as any).$axios({
      method: "POST",
      url: "/usr/news/getNewsContent",
      data: param
    }).then((res:any) => {
      let data = res.data
      this.content = data.content
    }).catch((err:any) => {
      console.log(err)
    })
  }
}
</script>
<style lang="scss" scoped>
.news-detail {
  padding: 15px 15px;
  box-sizing: border-box;
  min-height: calc(100vh - 106px);
  background-color: #ffffff;
  .content-box {
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    img {
      display: block;
    }
  }
}
</style>
