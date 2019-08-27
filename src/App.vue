<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';

@Component({
  components: {}
})
export default class App extends Vue {
  @Mutation('SET_USER') setUser: any;
  created() {
    this.setUser(localStorage.tsToken || '');
  }
}
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
