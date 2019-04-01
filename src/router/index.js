import Vue from 'vue'
import Router from 'vue-router'
import MusicTab from '@/components/music-tab/music-tab'
import Featured from '@/components/music-tab/featured/featured'
import Rank from '@/components/music-tab/rank/rank'
import Singer from '@/components/music-tab/singer/singer'
import SongPage from '@/components/music-tab/song-page/song-page'
import NewMusic from '@/components/music-tab/new-music/new-music'
import SongDetail from '@/components/song-detail/song-detail'
import SongTag from '@/components/song-tag/song-tag'
import SongByTag from '@/components/song-by-tag/song-by-tag'
import SingerDetail from '@/components/singer-detail/singer-detail'
import SingerMusic from '@/components/singer-detail/singer-music/singer-music'
import SingerAlbum from '@/components/singer-detail/singer-album/singer-album'
import SingerMv from '@/components/singer-detail/singer-mv/singer-mv'
import SingerDesc from '@/components/singer-detail/singer-desc/singer-desc'
import SingerSimilarity from '@/components/singer-detail/singer-similarity/singer-similarity'
import AlbumDetail from '@/components/album-detail/album-detail'
import SearchDetail from '@/components/search-detail/search-detail'
import UserDetail from '@/components/user-detail/user-detail'
import UserFollow from '@/components/user-follow/user-follow'
import MvDetail from '@/components/mv-detail/mv-detail'
// const MusicTab = () => import('@/components/music-tab/music-tab')
// const Featured = () => import('@/components/music-tab/featured/featured')
// const Rank = () => import('@/components/music-tab/rank/rank')
// const Singer = () => import('@/components/music-tab/singer/singer')
// const SongPage = () => import('@/components/music-tab/song-page/song-page')
// const NewMusic = () => import('@/components/music-tab/new-music/new-music')
// const SongDetail = () => import('@/components/song-detail/song-detail')
// const SongTag = () => import('@/components/song-tag/song-tag')
// const SongByTag = () => import('@/components/song-by-tag/song-by-tag')
// const SingerDetail = () => import('@/components/singer-detail/singer-detail')
// const SingerMusic = () => import('@/components/singer-detail/singer-music/singer-music')
// const SingerAlbum = () => import('@/components/singer-detail/singer-album/singer-album')
// const SingerMv = () => import('@/components/singer-detail/singer-mv/singer-mv')
// const SingerDesc = () => import('@/components/singer-detail/singer-desc/singer-desc')
// const SingerSimilarity = () => import('@/components/singer-detail/singer-similarity/singer-similarity')
// const AlbumDetail = () => import('@/components/album-detail/album-detail')
// const SearchDetail = () => import('@/components/search-detail/search-detail')
// const UserDetail = () => import('@/components/user-detail/user-detail')
// const UserFollow = () => import('@/components/user-follow/user-follow')
// const MvDetail = () => import('@/components/mv-detail/mv-detail')

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [{
      path: '/',
      redirect: '/musicTab/featured'
    }, {
      path: '/musicTab',
      component: MusicTab,
      name: 'MusicTab',
      redirect: '/musicTab/featured',
      children: [{
        path: '/',
        redirect: 'featured'
      }, {
        path: 'featured',
        component: Featured
      },
      {
        path: 'rank',
        component: Rank
      },
      {
        path: 'singer',
        component: Singer
      },
      {
        path: 'songPage',
        component: SongPage
      },
      {
        path: 'newMusic',
        component: NewMusic
      }
      ]
    }, {
      path: '/songDetail/:id',
      name: 'SongDetail',
      component: SongDetail
    }, {
      path: '/songTag',
      name: 'SongTag',
      component: SongTag
    }, {
      path: '/songByTag/:tag',
      name: 'SongByTag',
      component: SongByTag
    }, {
      path: '/singerDetail/:id',
      name: 'SingerDetail',
      component: SingerDetail,
      redirect: {
        name: 'SingerMusic'
      },
      children: [{
        path: 'music',
        name: 'SingerMusic',
        component: SingerMusic
      }, {
        path: 'album',
        name: 'SingerAlbum',
        component: SingerAlbum
      }, {
        path: 'mv',
        name: 'SingerMv',
        component: SingerMv
      }, {
        path: 'desc',
        name: 'SingerDesc',
        component: SingerDesc
      }, {
        path: 'similarity',
        name: 'SingerSimilarity',
        component: SingerSimilarity
      }]
    }, {
      path: '/albumDetail/:id',
      name: 'AlbumDetail',
      component: AlbumDetail
    }, {
      path: '/searchDetail/:keyword',
      name: 'SearchDetail',
      component: SearchDetail
    }, {
      path: '/userDetail/:uid',
      name: 'UserDetail',
      component: UserDetail
    }, {
      path: '/userFollow/:uid',
      name: 'UserFollow',
      component: UserFollow
    }, {
      path: '/mvDetail/:mvid',
      name: 'MvDetail',
      component: MvDetail
    }]
  })
}