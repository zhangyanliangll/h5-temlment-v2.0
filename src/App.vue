<template>
  <div id="app">
    {{ 1632709211944 | date }}
    {{ 1632709211944 | dateTime }}
    {{ 1632709211944 | dateTimeChinese }}
    {{ formatDate(1632709211944) }}
    <div id="nav">
      <router-link to="/about">Abou111t</router-link>
      <router-link to="/">Home</router-link> |
    </div>
    <keep-alive>
      <router-view
        class="app-content-box"
        v-if="$route.meta.keepAlive && isRouterAlive"
      ></router-view>
    </keep-alive>
    <router-view
      class="app-content-box"
      v-if="!$route.meta.keepAlive && isRouterAlive"
    ></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isRouterAlive: true,
    }
  },
  provide () {
    return {
      reload: this.reload,
    };
  },
  methods: {
    reload () {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 30px;
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
    }
    a.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
