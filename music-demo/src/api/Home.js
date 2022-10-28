// 文件名-尽量和模块页面文件名  统一查找(方便查找)
import request from '@/utils/request'

// 首页 - 拿到推荐歌单
export const recommendMusic = params => request ({
    url: "/top/playlist",
    params  // 这个是简写的形式
    // 将来外面可能传入params的值{limit: 20}
})

// 推荐最新的音乐
export const newMusic = params => request ({
    url: '/personalized/newsong',
    params
})