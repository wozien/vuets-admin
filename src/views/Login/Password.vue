<template>
  <div class="password">
    <login-header>
      <el-form :model="ruleForm" slot="container" label-position="left" label-width="0px">
        <div class="title">
          <h3>找回密码</h3>
        </div>
      </el-form>
    </login-header>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import LoginHeader from './LoginHeader.vue';

@Component({
  components: { LoginHeader }
})
export default class Password extends Vue {}
</script>

<style lang="scss" scoped>
.password {
  height: 100%;
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>