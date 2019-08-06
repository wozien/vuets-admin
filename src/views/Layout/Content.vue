<template>
  <el-container class="layout-content">
    <!-- 侧边栏 -->
    <el-aside width="200px">
      <slot name="left"></slot>
    </el-aside>

    <!-- 右边页面  -->
    <el-main>
      <!-- 面包屑 -->
      <div class="top">
        <i class="fa fa-reorder"></i>
        <el-breadcrumb class="breadcrumb" separator="/">
          <el-breadcrumb-item>1</el-breadcrumb-item>
          <el-breadcrumb-item>2</el-breadcrumb-item>
          <el-breadcrumb-item>3</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 内容 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Content extends Vue {}
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .content {
      padding: 10px;
      height: calc(100% - 54px);
      box-sizing: border-box;
    }
  }
}
</style>