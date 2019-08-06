<template>
  <div class="layout">
    <!-- 头部 -->
    <layout-header></layout-header>

    <!-- 内容 -->
    <layout-content>
      <sidebar slot="left"></sidebar>
      <router-view slot="content"></router-view>
    </layout-content>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LayoutHeader from './LayouHeader.vue';
import LayoutContent from './Content.vue';
import Sidebar from './Sidebar.vue';

@Component({
  components: { LayoutHeader, LayoutContent, Sidebar }
})
export default class Layout extends Vue {}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #f5f7f9;
}
</style>