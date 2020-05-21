<template>
  <div class="hot-game-item">
    <img class="game-icon" :src="gameIfor.src" />
    <p class="game-name">{{ gameIfor.name }}</p>
    <p class="game-size">{{ gameIfor.size }}</p>
    <p class="game-tag">{{ gameIfor.tag }}</p>
    <div class="down-btn">下载</div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"
export default class HotGameItem extends Vue {
 @Prop({ default: {} }) private gameIfor!: Object
}
</script>
<style lang="scss" scoped>

</style>
