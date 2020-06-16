<template>
  <div class="about">
    <Floor :floorTitle="'关于我们'" :isMore="false"></Floor>
    <div class="about-head">
      <ul>
        <li :class="{active: active === 0}" @click="menuClick(0)">了解我们</li>
        <li :class="{active: active === 1}" @click="menuClick(1)">加入我们</li>
        <div class="hz" :class="{ hz1: active === 1}"></div>
      </ul>
    </div>
    <div class="about-context">
      <div class="understand-me" v-if="active === 0">
        <div class="image-box" @click="goCompanyIntrod">
          <img src="/img/understandme1.png" />
        </div>
        <div class="image-box" @click="goCulture">
          <img src="/img/understandme2.jpg" />
        </div>
        <div class="image-box" @click="goHonor">
          <img src="/img/understandme3.png" />
        </div>
        <div class="image-box" @click="goCooperation">
          <img src="/img/understandme4.png" />
        </div>
      </div>
      <div class="join-me" v-else>
        <div class="baner">
          <img src="/img/banner.png" />
        </div>
        <div class="image-box">
          <img src="/img/socialRecruitment.png" />
        </div>
        <div class="image-box">
          <img src="/img/campusRecruitment.png" />
        </div>
      </div>
    </div>
    <!-- <CompanyCopyWrit class="cyCopyWrit"></CompanyCopyWrit> -->
  </div>
</template>
<script lang="ts">
import Floor from "~/components/Floor.vue"
import { Vue, Component } from "vue-property-decorator"
import CompanyCopyWrit from "~/components/CompanyCopyWrit.vue"
@Component({
  components: {
    Floor,
    CompanyCopyWrit
  }
})
export default class About extends Vue {
  private active:number = 0
  private menuClick(index:number) {
    this.active = index
  }
  private goCompanyIntrod() {
    // 公司概述
    this.$router.push({
      path: "/grid/about/companyIntroduc",
       query: {
        title: "公司概述",
        navBarType: '1'
      }
    })
  }
  private goCulture() {
    // 企业文化
    this.$router.push({
      path: "/grid/about/culture",
       query: {
        title: "企业文化",
        navBarType: '1'
      }
    })
  }
  private goHonor() {
    // 企业荣耀
    this.$router.push({
      path: "/grid/about/honor",
       query: {
        title: "公司荣耀",
        navBarType: '1'
      }
    })
  }
  private goCooperation() {
    // 商务合作
    this.$router.push({
      path: "/grid/about/cooperation",
       query: {
        title: "商务合作",
        navBarType: '1'
      }
    })
  }
} 
</script>
<style lang="scss" scoped>
.about {
  padding: 15px 0px 75px 0px;
  box-sizing: border-box;
  background-color: #ffffff;
  .about-head {
    margin-top: 14px;
    text-align: center;
    ul {
      display: inline-block;
      position: relative;
      li {
        width: 80px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        color: #595959;
        float: left;
      }
      .active {
        color: #1A1A1A;
      }
    }
    .hz {
      width: 16px;
      height: 3px;
      background:#7DB349;
      border-radius:3px;
      clear: both;
      position: absolute;
      left: calc(25% - 8px);
      bottom: -10px;
      transition: left 500ms cubic-bezier(0.58, 0.12, 0.54, 1.06);
    }
    .hz1 {
      left: calc(75% - 8px);
    }
  }
  .about-context {
    margin-top: 26px;
    padding: 0px 15px;
    box-sizing: border-box;
    .understand-me {
      .image-box {
        line-height: 0px;
        margin-bottom: 10px;
        border-radius: 4px;
        box-shadow: 5px 5px 5px rgba(0,0,0, 0.2);
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .join-me {
      .baner {
        margin: 0px -15px;
        line-height: 0px;
        margin-bottom: 10px;
        img {
          height: 62px;
          width: 100%;
        }
      }
      .image-box {
        line-height: 0px;
        margin-bottom: 10px;
        img {
          width: 100%;
        }
      }
    }
  }
}
.cyCopyWrit {
  position: absolute;
  bottom: 50px;
  width: 100%;
}
</style>
