<template>
  <div>
    <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" 
    @input="inputFn"/>
    <!-- 搜索容器 -->
    <div class="search_wrap" v-if="resultList.length === 0">
      <p class="hot_title">热门搜索</p>
      <div class="hot_name_wrap">
          <span class="hot_item" 
          v-for="(obj, index) in hotArr" :key="index"
          @click="fn(obj.first)">
            {{obj.first}}</span>
      </div>
    </div>
    <!-- 搜索结果 -->
    <div class="search_wrap" v-else>
      <!-- 标题 -->
      <p class="hot_title">最佳匹配</p>
       
      
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad" >

        <SongItem v-for="obj in resultList" 
        :key="obj.id"
        :name="obj.name"
        :author="obj.ar[0].name"
        :id="obj.id"></SongItem>
      </van-list>
    </div>
  </div>
</template> 

<script>
  // 目标：铺设关键词
  // 1. 搜索框van-search组件，关键词标签样式
  // 2. 找借口，api/Search.js里定义获取搜索关键词的请求方法
  // 3. 引入到当前页面，调用接口拿到数据循环铺设页面
  // 4. 点击关键词把值赋予给van-search

  // 目标：铺设搜索结果
  // 1. 找到搜索结果的接口
  // 2. 在定义methods里getListFn方法获取数据
  // 3. 再点击事件方法里调用getListFn方法
  // 4. 铺设页面
  // 5. 把数据保存到data后循环van-cell使用
  // 6. 互斥显示搜索结果和热搜

  // 目标：搜索框显示结果
  // 1. @input给van-search绑定事件
  // 2. @input事件中，获取搜索结果保存resultList中
  // 3. 判断如果搜索关键字为空，数组清空，阻止网络请求，提前退出

  // 目标：加载更多
  // 1. 集成list组件-定义相关的变量(搞懂变量的作用) -监测触底事件
  // 2. 一旦触底, 自动执行onload方法
  // 3. 对page++, 给后台传递offset偏移量参数-请求下一页的数据
  // 4. 把当前数据和下一页新来的数据拼接起来用在当前 页面的数组里
  // (切记) - 加载更多数据后,一定要把loading改成false, 保证下一次还能触发onload方法
  import {hotSearchAPI, searchResultListAPI} from '@/api'
  import SongItem from '@/components/SongItem.vue'
export default {
  data() {
    return {
      value: "",   // 搜索关键词
      hotArr: [],  // 热搜关键字
      resultList: [], // 搜索结果
      loading: false, // 加载中，只有为false才能自动触发onload方法
      finished: false, // 未加载全部（如果设置为true，底部就不会再执行onload，
      page: 1,  // 当前搜索结果的页码
      timer: null  // 输入框防抖定时器
    }
  },
  async created() {
    const res = await hotSearchAPI()
    console.log(res);
    this.hotArr = res.data.result.hots
  },
  methods: {
    async getListFn() {
      return await searchResultListAPI({
        keywords: this.value,
        limit: 30,
        offset: (this.page - 1) * 30 // 固定公式
      })  // 把结果return出去
      // (难点)：
      // async修饰的函数->默认返回一个全新Promise对象
      // 这个promise对象的结果就是async函数内的return的值
      // 拿到getListFn的返回值用await提取结果
    },
    async fn(val) {  // 点击热搜关键字
      this.page = 1;
      this.finished = false;
      this.value = val; // 选中的关键词赋值到搜索框
      const res = await this.getListFn()
      console.log(res);
      this.resultList = res.data.result.songs;
      this.loading = false;
    },
    async inputFn(){  // 输入框值改变
      // 目标：输入框改变，慢点执行
      // 使用防抖
      if(this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        this.page = 1;
        this.finished = false
        if (this.value.length === 0){
        // 如果搜索框为空，就把搜索结果清空，并且阻止网络请求的发送 提前return
        this.resultList = [];
        return;
      }
        const res = await this.getListFn()
        console.log(res);
        if (res.data.result.songs === undefined) {
          this.resultList = [];
          return;
        }
        this.resultList = res.data.result.songs;
        this.loading = false;
      },900);
    },
    async onLoad() { // 触底事件(要加载下一页数据) 会自动触发吧loading改为true
      this.page++;
      const res = await this.getListFn();
      if (res.data.result.songs === undefined) {
        this.finished = true;
        this.loading = false;
        return;
      }
      this.resultList = [...this.resultList, ...res.data.result.songs];
      this.loading = false;
    }
  },
  components: {
    SongItem
  }
}
</script>

<style scoped>
/* 搜索容器的样式 */
.search_wrap {
  padding: 0.266667rem;
}

/*热门搜索文字标题样式 */
.hot_title {
  font-size: 0.32rem;
  color: #666;
}

/* 热搜词_容器 */
.hot_name_wrap {
  margin: 0.266667rem 0;
  font-size: 30px;
}

/* 热搜词_样式 */
.hot_item {
  display: inline-block;
  height: 0.853333rem;
  margin-right: 0.213333rem;
  margin-bottom: 0.213333rem;
  padding: 0 0.373333rem;
  font-size: 0.373333rem;
  line-height: 0.853333rem;
  color: #333;
  border-color: #d3d4da;
  border-radius: 0.853333rem;
  border: 1px solid #d3d4da;
}

</style>