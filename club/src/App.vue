<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <header></header>
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
  //TODO 支持中英文
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  import Header from "./components/common/header.vue";

  export default {
    name: 'App',
    components: {Header},
    data() {
      return {
        locale: zhCN,
      }
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
