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
          <el-breadcrumb-item v-for="(item, index) in breadCrumbItems" :key="index" :to="item.path">{{ item.title }}</el-breadcrumb-item>
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
import { Component, Vue, Provide, Watch } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class Content extends Vue {
  @Provide() breadCrumbItems: any;

  // 监听路由变化
  @Watch('$route') handleWatchRoute(to: any) {
    this.initBreadCrumb(to);
  }

  created() {
    this.initBreadCrumb(this.$route);
  }

  initBreadCrumb(route: any): void {
    let items: any = [{ path: '/', title: '后台数据管理' }];
    route.matched.forEach((match: any) => {
      if (match.meta && match.meta.title) {
        items.push({
          path: match.path,
          title: match.meta.title
        });
      }
    });
    this.breadCrumbItems = items;
  }
}
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