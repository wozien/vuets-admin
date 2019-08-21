<template>
  <div class="account-data">
    <div class="add-box">
      <el-button type="primary">添加账户</el-button>
    </div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="role" label="角色" width="180"></el-table-column>
      <el-table-column prop="username" label="账号" width="180"></el-table-column>
      <el-table-column prop="des" label="描述"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.username !== 'admin'">
          <el-button>编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class AccountData extends Vue {
  @Provide() tableData: any = [];

  created() {
    this.getData();
  }

  getData() {
    (this as any).$axios('/api/users/allUsers').then((res: any) => {
      this.tableData = res.data.datas;
    });
  }
}
</script>

<style lang="scss" scoped>
.account-data {
  height: 100%;
  overflow: auto;
  .add-box {
    margin-bottom: 10px;
  }
}
</style>
