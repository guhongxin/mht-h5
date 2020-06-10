<template>
  <div class="game-new">
    <!-- <Floor :floorTitle="'游戏资讯'" :isMore="false"></Floor> -->
    <div class="game-new-box">
      <gameNewItem></gameNewItem>
      <gameNewItem></gameNewItem>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import Floor from "~/components/Floor.vue"
import gameNewItem from "~/components/gameNewItem.vue"
@Component({
  components: {
    Floor,
    gameNewItem
  }
})
export default class gameNew extends Vue {

}
</script>
<style lang="scss" scoped>
.game-new {
  padding-top: 15px;
  box-sizing: border-box;
}
.game-new-box {
  box-sizing: border-box;
  padding: 10px 7px;
}
</style>
