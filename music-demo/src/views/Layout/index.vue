<template>
  <div>
    <van-nav-bar
      :title="activeTitle" fixed/>
      <div class="main">
          <!-- 二级路由-挂载点 -->
          <router-view></router-view>
      </div>
      
      <div>
        <van-tabbar route>
        <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/layout/search" icon="search">搜索</van-tabbar-item>
      </van-tabbar>
      </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      activeTitle: this.$route.meta.title, // 默认顶部导航要显示的标题(默认获取当前路由对象里的meta中的title值)
    }
  },
  // 路由切换 - 监听$route对象改变
  watch: {
    $route() {
      this.activeTitle = this.$route.meta.title;  // 提取切换后路由信息对象里的title值
    }
  }
}
</script>

<style scoped>
.main {
  padding-top: 46px;
  padding-bottom: 50px;
}
</style>