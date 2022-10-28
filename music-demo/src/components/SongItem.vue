<template>
    <van-cell center :title="name" :label="author + '  -  ' + name" 
       :key="id">
        <template #right-icon>
          <van-icon name="play-circle-o" size=".7rem" @click="PlayFn"/>
        </template>
      </van-cell>
</template>

<script>
export default {
    props: {
        name: String, // 歌名
        author: String, // 歌手 
        id: Number,  // 歌曲ID
    },
    methods: {
        PlayFn() {
            this.$router.push({
                path: '/play',
                query: {
                    id: this.id // 歌曲id 通过路由跳转出去
                }
            })
        }
    }
}
</script>

<style scoped>
.van-cell {
    border-bottom: 1px solid lightgray;
}

</style>