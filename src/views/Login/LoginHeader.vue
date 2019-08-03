<template>
  <div class="login-page">
    <div class="page-center">
      <div class="info">
        <div class="title">
          <img src="@/assets/img/logo.png" />
          <span>米修在线</span>
        </div>
        <div class="detail">
          <span>米修在线, 让每个人都有机会学习编程, 更有能力选择学习想要学习的课程!</span>
        </div>
      </div>
      <!-- slot -->
      <div class="container">
        <slot name="container"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class LoginHeader extends Vue {}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background-image: url(../../assets/img/login-back.svg);
  background-repeat: no-repeat;
  background-position: center 110px;
  background-size: 100%;
  .page-center {
    position: absolute;
    width: 400px;
    height: 540px;
    margin: auto;
    top: 60px;
    right: 0;
    left: 0;
    .info {
      text-align: center;
      height: 150px;
      .title {
        display: flex;
        justify-content: center;
        align-items: Center;
        font-size: 32px;
        color: rgba(0, 0, 0, 0.85);
        font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
        font-weight: 600;
        img {
          width: 200px;
          padding-bottom: 3px;
        }
      }
      .detail {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 40px;
        line-height: 1.5;
      }
    }
    .container {
      -webkit-border-radius: 5px;
      border-radius: 5px;
      -moz-border-radius: 5px;
      background-clip: padding-box;
      padding: 35px 35px 15px 35px;
      background: #fff;
      border: 1px solid #eaeaea;
      box-shadow: 0 0 25px #cac6c6;
    }
  }
}
</style>