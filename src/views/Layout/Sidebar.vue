<template>
  <el-scrollbar class="el-scrollbar">
    <!-- 根据路由渲染的动态菜单 -->
    <el-menu class="el-menu-side" :default-active="$router.currentRoute.path" router>
      <template v-for="item in menus">
        <el-menu-item v-if="item.children.length === 1" :index="item.children[0].path" :key="item.name">
          <i :class="item.children[0].meta.icon"></i>
          <span slot="title">{{ item.children[0].meta.title }}</span>
        </el-menu-item>
        <el-submenu v-else :key="item.name" :index="item.children[0].path">
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <span slot="title">{{ item.meta.title }}</span>
          </template>
          <el-menu-item v-for="child in item.children" :key="child.name" :index="child.path">
            <i :class="child.meta.icon"></i>
            <span slot="title">{{ child.meta.title }}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { State } from 'vuex-class';

@Component({
  components: {}
})
export default class SideBar extends Vue {
  @State('routes') routes: any;

  // computed
  get menus() {
    return this.routes.filter((item: any) => item.show && item.children && item.children.length);
  }

  created() {
    console.log(this.menus);
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  .el-menu-side {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
    }
  }
}
</style>