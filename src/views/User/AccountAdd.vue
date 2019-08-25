<template>
  <el-dialog class="account-add" title="新增账户" :visible.sync="visible" :close-on-click-modal="false" :show-close="false" width="30%">
    <el-form :model="account" :rules="rules" ref="ruleForm" label-width="100px" class="form-box">
      <el-form-item label="请选择角色" prop="role">
        <el-select v-model="account.role" placeholder="请选择角色" @change="selectChange">
          <el-option v-for="option in options" :label="option.role" :value="option.role" :key="option.key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="请输入账号" prop="username">
        <el-input v-model="account.username" placeholder="请输入账号"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close-dialog')">取消</el-button>
      <el-button type="primary" @click="submitForm">确定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop, Emit } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class AccountAdd extends Vue {
  @Prop(Boolean) visible!: boolean;
  @Prop(Array) options!: any;

  @Provide() account: object = {
    key: '',
    role: '',
    des: '',
    username: ''
  };

  @Provide() rules: any = {
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    role: [{ required: true, message: '请选择角色', trigger: 'change' }]
  };

  selectChange(data: string) {
    const option = this.options.find((item: any) => item.role === data);
    if (option) {
      (this as any).account.key = option.key;
      (this as any).account.des = option.des;
    }
  }

  @Emit('close-dialog')
  submitForm() {
    (this as any).$refs.ruleForm.validate((valid: boolean) => {
      if (valid) {
        (this as any).$axios.post('/api/users/addUser', this.account).then((res: any) => {
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
          this.$emit('update');
        });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.form-box {
  .el-input,
  .el-select {
    width: 200px !important;
  }
}
</style>