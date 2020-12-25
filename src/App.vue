<template>
  <div style="height:100%;width:100%" v-if="!reload">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>

    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
let that
export default {
  name: "App",
  beforeCreate () {
    that = this
  },
  data: function () {
    return {
      reload: false
    }
  },
  methods: {
    reloadPage () {
      this.reload = true
      that.$nextTick(() => {
        this.reload = false
      })
    }
  },
  components: {
    // HelloWorld
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background-color: #f8f8f8;
  color: #2c3e50;
}
</style>
