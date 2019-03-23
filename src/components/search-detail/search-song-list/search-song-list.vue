<template>
  <div class="search-song-list-wrapper">
    <div class="song-list-item" v-for="(item, index) in playlists" :key="item.id">
      <div class="song-list-cover" 
        @mouseenter="changeCurrentHover(index)"
        @mouseleave="changeCurrentHover(null)">
        <img v-lazy="item.coverImgUrl">
        <div class="cover-hover-bg" v-show="currentHoverIndex === index">
          <div class="item-play-icon">
             <i class="iconfont icon-play"></i>
          </div>
        </div>
      </div>
      <div class="name" @click="toSongListDetail(item.id)">
        {{item.name}}
      </div>
      <div class="user">
        {{item.creator.nickname}}
      </div>
      <div class="time">
        {{item.playCount | convertUnit}}人播放
      </div>
      <div class="number">
        {{item.trackCount}}首
      </div>
    </div>
  </div>
</template>

<script>
import { convertUnit } from '@/common/js/util'
export default {
  data() {
    return {
      currentHoverIndex: null
    }
  },
  props: {
    playlists: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    changeCurrentHover(index) {
      this.currentHoverIndex = index
    },
    toSongListDetail(id) {
      this.$router.push({
        name: 'SongDetail',
        params: { id }
      })
    },
    toSingerDetail(id) {
      this.$router.push({
        name: 'SingerDetail',
        params: { id }
      })
    }
  },
  filters: {
    convertUnit
  }
}
</script>

<style scoped lang="scss">
@import 'scss/variable.scss';
$ablum-height: 80px;
.search-song-list-wrapper {
  .song-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $ablum-height;
    padding: 10px 0;
    border-top: 1px solid $btn-border-color;
    font-size: $font-size-medium;
    &:hover {
      background: $hover-bg-hint;
    }
    .song-list-cover {
      position: relative;
      width: $ablum-height;
      height: $ablum-height;
      img {
        width: 100%;
        height: 100%;
      }
      .cover-hover-bg {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .name {
      width: 42%;
      margin-left: 10px;
      cursor: pointer;
      &:hover {
        color: $color-text-highlight;
      }
    }
    .user {
      width: 20%;
      cursor: pointer;
      &:hover {
        color: $color-text-highlight;
      }
    }
    .time {
      flex: 1;
      text-align: right;
      color: $color-text-dark;
    }
    .number {
      width: 10%;
      text-align: right;
      color: $color-text-dark;
    }
  }
}
</style>
