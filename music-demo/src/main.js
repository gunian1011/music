import Vue from 'vue'
import App from './App.vue'
import "@/mobile/flexible"  // 适配
import "@/styles/reset.css" // 初始化
import router from '@/router' // 路由对象

import { Tabbar, TabbarItem, NavBar, Col, Row, Image as VanImage, 
  Cell, Icon, Search, List } from 'vant';


// 目标：封装网络请求
// 1. src/utils/request.js - 设置基础地址，导出axios函数
// 2. src/api/Home.js - 请求方法axios({url: "具体"})
// 3. src/api/index.js - 把Home.js里函数引来统一导出
// 4. 具体逻辑页面，引入api/index.js请求方法，async+await等到axios的结果回来

// 测试封装的api方法
import {recommendMusicAPI} from '@/api'
async function fn() {
  const res = await recommendMusicAPI() // api方法原地会得到axios请求在
   // 原地的Promise对象(里面有一个ajax请求)
  console.log(res);
}
fn()

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Col);
Vue.use(Row);
Vue.use(VanImage);
Vue.use(Cell);
Vue.use(Icon);
Vue.use(Search);
Vue.use(List);

Vue.config.productionTip = false




new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
