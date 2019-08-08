<template>
  <div class="login">
    <login-header>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" slot="container" label-position="left" label-width="0px">
        <div class="title">
          <h3>账号密码登录</h3>
        </div>

        <!-- username -->
        <el-form-item prop="username">
          <el-input type="text" v-model="ruleForm.username" auto-complete="off" placeholder="账号">
            <i slot="prefix" class="fa fa-user-o"></i>
          </el-input>
        </el-form-item>

        <!-- password -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="密码">
            <i slot="prefix" class="fa fa-lock"></i>
          </el-input>
        </el-form-item>

        <!-- button -->
        <el-form-item>
          <el-button type="primary" :loading="isLogin" style="width:100%" @click.native.prevent="handleClick">
            登录
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内自动登录</el-checkbox>
          <el-button type="text" class="forget" @click="$router.push('./password')">忘记密码？</el-button>
        </el-form-item>
      </el-form>
    </login-header>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import LoginHeader from './LoginHeader.vue';

@Component({
  components: { LoginHeader }
})
export default class Login extends Vue {
  @Mutation('SET_USER') setUser: any;

  // data
  @Provide() isLogin: boolean = false;

  @Provide() ruleForm: {
    username: String;
    pwd: String;
    autoLogin: Boolean;
  } = {
    username: '',
    pwd: '',
    autoLogin: true
  };

  @Provide() rules = {
    username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
    pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  };

  // 登录
  handleClick(): void {
    (this.$refs['ruleForm'] as any).validate((valid: boolean) => {
      if (valid) {
        // console.log('校验通过');
        this.isLogin = true;
        (this as any).$axios
          .post('/api/users/login', this.ruleForm)
          .then((res: any) => {
            this.isLogin = false;
            // 存储token
            localStorage.setItem('tsToken', res.data.token);
            // 保存到vuex
            this.setUser(res.data.token);
            // 跳转首页
            this.$router.push('/');
          })
          .catch(() => {
            this.isLogin = false;
          });
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style>