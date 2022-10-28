// 搜索
import request from '@/utils/request'

export const hotSearch = params => request({
    url: '/search/hot',
    params
})

// 搜索结果
export const searchResultList = params => request({
    url: '/cloudsearch',
    params
})