<template>
  <el-dialog title="编辑课程" :visible.sync="dialogVisible" :close-on-click-modal="false" :show-close="false">
    <el-form ref="ruleForm" :model="form" :rules="rules" label-width="100px" size="small" class="form-box">
      <el-form-item prop="title" label="课程名称">
        <el-input v-model="form.title" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item prop="level" label="课程等级">
        <el-select v-model="form.level" placeholder="请选择课程等级">
          <el-option label="初级" value="初级"></el-option>
          <el-option label="中级" value="中级"></el-option>
          <el-option label="高级" value="高级"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="count" label="报名人数">
        <el-input v-model="form.count" placeholder="请输入报名人数"></el-input>
      </el-form-item>
      <el-form-item prop="date" label="上线时间">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item prop="type" label="技术栈">
        <el-radio-group v-model="form.type">
          <el-radio label="vue" name="type"></el-radio>
          <el-radio label="react" name="type"></el-radio>
          <el-radio label="node" name="type"></el-radio>
          <el-radio label="小程序" name="type"></el-radio>
          <el-radio label="angular" name="type"></el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button size="mini" @click="$emit('close-dialog')">取消</el-button>
      <el-button size="mini" type="primary" @click="handleSubmit">确定 </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class EditDialog extends Vue {
  // 属性或参数中使用 ！：表示强制解析（告诉typescript编译器，这里一定有值），常用于vue-decorator中的@Prop
  @Prop(Boolean) dialogVisible!: boolean;
  @Prop(Object) form!: {
    _id: string;
    title: string;
    type: string;
    level: string;
    count: string;
    date: string;
  };

  @Provide() rules: any = {
    title: [{ required: true, message: '请输入课程名称', trigger: 'blur' }],
    level: [{ required: true, message: '请选择课程等级', trigger: 'change' }],
    count: [{ required: true, message: '请输入报名人数', trigger: 'blur' }],
    date: [
      {
        type: 'string',
        required: true,
        message: '请选择日期',
        trigger: 'change'
      }
    ],
    type: [
      {
        required: true,
        message: '请选择技术栈',
        trigger: 'change'
      }
    ]
  };

  handleSubmit(): void {
    (this.$refs.ruleForm as any).validate((valid: boolean) => {
      if (valid) {
        // console.log('success');
        (this as any).$axios.post(`/api/profiles/edit/${this.form._id}`).then((res: any) => {
          this.$emit('close-dialog');
          this.$message({
            message: res.data.msg,
            type: 'success'
          });
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
