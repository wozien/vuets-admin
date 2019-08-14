<template>
  <div class="table-data">
    <div class="search-box">
      <el-input size="small" v-model="searchVal" placeholder="请输入课程名称检索"></el-input>
      <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%" :height="tHeight" class="table-box">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="title" label="课程名称"></el-table-column>
      <el-table-column prop="level" label="课程等级" width="120"></el-table-column>
      <el-table-column prop="type" label="技术栈" width="120"></el-table-column>
      <el-table-column prop="count" label="报名人数" width="120"></el-table-column>
      <el-table-column prop="date" label="上线日期" width="160"></el-table-column>
      <el-table-column label="操作" width="160">
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pages">
      <el-pagination layout="total,sizes,prev,pager,next,jumper" :page-sizes="[5, 10, 20]" :page-size="size" :total="total"> </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class TableData extends Vue {
  @Provide() searchVal: string = '';
  @Provide() tableData: any = [];
  @Provide() page: number = 1;
  @Provide() size: number = 5;
  @Provide() total: number = 0;
  @Provide() tHeight: number = document.body.offsetHeight - 270;

  created() {
    this.initData();
  }

  initData() {
    (this as any).$axios.get(`/api/profiles/loadMore/${this.page}/${this.size}`).then((res: any) => {
      // console.log(res);
      this.tableData = res.data.data.list;
      this.total = res.data.data.total;
    });
  }
}
</script>

<style lang="scss" scoped>
.table-data {
  height: 100%;
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
}
</style>