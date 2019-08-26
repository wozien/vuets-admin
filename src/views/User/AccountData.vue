<template>
  <div class="account-data">
    <div class="add-box">
      <el-button type="primary" @click="addAccount">添加账户</el-button>
    </div>
    <el-table :data="tableData" border style="width:100%">
      <el-table-column label="角色" width="180">
        <template slot-scope="scope">
          <el-select @change="selectChange(scope.row)" v-if="scope.row.edit" v-model="scope.row.role">
            <el-option v-for="option in options" :label="option.role" :value="option.role" :key="option.key"></el-option>
          </el-select>
          <span v-else>{{ scope.row.role }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账号" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.username" v-if="scope.row.edit"></el-input>
          <span v-else>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="des" label="描述"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope" v-if="scope.row.username != 'admin'">
          <el-button @click="handleEdit(scope.$index, scope.row)" v-if="!scope.row.edit" size="mini">编辑</el-button>
          <el-button @click="handleSave(scope.$index, scope.row)" v-else type="success" size="mini">完成</el-button>

          <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <account-add :visible="dialogVisible" :options="options" @close-dialog="closeDialog" @update="getData"></account-add>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import AccountAdd from './AccountAdd.vue';

@Component({
  components: { AccountAdd }
})
export default class AccountData extends Vue {
  @Provide() tableData: any = [];

  @Provide() dialogVisible: Boolean = false;

  // select数据
  @Provide() options: any = [
    {
      key: 'admin',
      role: '管理员',
      des: 'Super Administrator. Have access to view all pages.'
    },
    {
      key: 'editor',
      role: '客服',
      des: 'Normal Editor. Can see all pages except permission page'
    },
    {
      key: 'visitor',
      role: '游客',
      des: 'Just a visitor. Can only see the home page and the document page'
    }
  ];

  created() {
    this.getData();
  }

  getData() {
    (this as any).$axios('/api/users/allUsers').then((res: any) => {
      // 设置编辑状态
      res.data.datas.forEach((item: any) => {
        item.edit = false;
      });
      this.tableData = res.data.datas;
    });
  }

  addAccount() {
    this.dialogVisible = true;
  }

  closeDialog() {
    this.dialogVisible = false;
  }

  handleEdit(index: number, row: any): void {
    row.edit = true;
  }

  handleSave(index: number, row: any): void {
    row.edit = false;
    (this as any).$axios.post(`/api/users/editUser/${row._id}`, row).then((res: any) => {
      this.$message({
        message: res.data.msg,
        type: 'success'
      });
    });
  }

  handleDelete(index: number, row: any): void {
    (this as any).$axios.delete(`/api/users/deleteUser/${row._id}`).then((res: any) => {
      this.$message({
        message: res.data.msg,
        type: 'success'
      });
      this.tableData.splice(index, 1);
    });
  }

  selectChange(row: any): void {
    const option = this.options.find((item: any) => item.role === row.role);
    if (option) {
      row.key = option.key;
      row.des = option.des;
    }
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
