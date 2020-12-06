<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->

<template>
  <div>
    <header class="home-header wrap" :class="{'active' : headerScroll}">
        <router-link tag="i" to="./category"><i class="nbicon nbmenu2"></i></router-link>
        <div class="header-search">
            <router-link tag="span" class="search-title" to="./product-list?from=home">兄弟数码商城</router-link>
        </div>
        <span class="lang-span" v-if="lang!='en-US'" @click="changeLang('en-US')">English</span>
        <span class="lang-span" v-if="lang!='ca-ca'" @click="changeLang('ca-ca')">ជនជាតិខ្មែរ</span>
        <span class="lang-span" v-if="lang!='zh-CN'" @click="changeLang('zh-CN')">中文</span>
        <router-link class="login" tag="span" to="./login" v-if="!isLogin">登录</router-link>
        <router-link class="login" tag="span" to="./user" v-else>
          <van-icon name="manager-o" />
        </router-link>
    </header>
    <nav-bar></nav-bar>
    <swiper :list="swiperList"></swiper>
    <div class="category-list">
      <div v-for="item in categoryList" :key="item.categoryId">
        <img :src="item.imgUrl">
        <span key="lang">{{getName(item.name)}}</span>
      </div>
    </div>
    <div class="good">
      <header class="good-header">{{ $t('lang.home.newArrival') }}</header>
      <div class="good-box">
        <div class="good-item" v-for="item in newGoodses" :key="item.goodsId" @click="goToDetail(item)">
          <img :src="prefix(item.goodsCoverImg)" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">$ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good">
      <header class="good-header">{{ $t('lang.home.hotSell') }}</header>
      <div class="good-box">
        <div class="good-item" v-for="item in hots" :key="item.goodsId" @click="goToDetail(item)">
          <img :src="prefix(item.goodsCoverImg)" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">$ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="good" :style="{ paddingBottom: '100px'}">
      <header class="good-header">{{ $t('lang.home.recommendGoods') }}</header>
      <div class="good-box">
        <div class="good-item" v-for="item in recommends" :key="item.goodsId" @click="goToDetail(item)">
          <img :src="prefix(item.goodsCoverImg)" alt="">
          <div class="good-desc">
            <div class="title">{{ item.goodsName }}</div>
            <div class="price">$ {{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/NavBar'
import swiper from '@/components/Swiper'
import { getHome } from '../service/home'
import { getUserInfo } from '../service/user'
import { getLocal } from '@/common/js/utils'
import { Toast } from 'vant'
export default {
  name: 'home',
  data() {
    return {
      lang: "zh-CN",
      swiperList: [],
      isLogin: false,
      headerScroll: false,
      hots: [],
      newGoodses: [],
      recommends: [],
      categoryList: [
        {
          name: 'quickEntry.companyProfile',
          imgUrl: '//s.yezgea02.com/1604041127880/%E8%B6%85%E5%B8%82%402x.png',
          categoryId: 100001
        }, {
          name: 'quickEntry.productFeature',
          imgUrl: '//s.yezgea02.com/1604041127880/9.9%402x.png',
          categoryId: 100007
        }, {
          name: 'quickEntry.trendyGood',
          imgUrl: '//s.yezgea02.com/1604041127880/%E9%A2%86%E5%88%B8%402x.png',
          categoryId: 100008
        }, {
          name: 'hotSell',
          imgUrl: '//s.yezgea02.com/1604041127880/%E7%9C%81%E9%92%B1%402x.png',
          categoryId: 100009
        }, {
          name: 'quickEntry.promotions',
          imgUrl: '//s.yezgea02.com/1604041127880/%E5%85%A8%E9%83%A8%402x.png',
          categoryId: 100010
        }
      ],
    }
  },
  components: {
    navBar,
    swiper
  },
  async mounted() {
    const token = getLocal('token')
    if (token) {
      this.isLogin = true
    }
    window.addEventListener('scroll', this.pageScroll)
    Toast.loading({
      message: 'loading...',
      forbidClick: true
    });
    const { data } = await getHome()
    this.swiperList = data.carousels
    this.newGoodses = data.newGoodses
    this.hots = data.hotGoodses
    this.recommends = data.recommendGoodses
    Toast.clear()
  },
  methods: {
    getName(name) {
      let s = 'lang.home.' + name
      return this.$t(s)
    },
    pageScroll() {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      scrollTop > 100 ? this.headerScroll = true : this.headerScroll = false
    },
    goToDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` })
    },
    changeLang(lang) {
      let existLang = new Set(['zh-CN', 'en-US', 'ca-ca'])
      if (existLang.has(lang)) {
        this.$i18n.locale = lang
        this.lang = lang
      }
    }
  }
}
</script>

<style lang="less" scoped >
  @import '../common/style/mixin';
  .home-header {
      position: fixed;
      left: 0;
      top: 0;
      .wh(100%, 50px);
      .fj();
      line-height: 50px;
      padding: 0 15px;
      .boxSizing();
      font-size: 15px;
      color: #fff;
      z-index: 10000;
      .nbmenu2 {
        color: @primary;
      }
      .lang-span{
        color: @primary;
      }
      &.active {
        background: @primary;
        .nbmenu2 {
          color: #fff;
        }
        .login {
          color: #fff;
        }
        .lang-span{
          color: #fff;
        }
      }

      .header-search {
          display: flex;
          .wh(40%, 20px);
          line-height: 20px;
          margin: 10px 0;
          padding: 5px 0;
          color: #232326;
          background: rgba(255, 255, 255, .7);
          border-radius: 20px;
          .lang-span {
              color: #1baeae;
              margin-right: 5px;
          }
          .app-name {
              padding: 0 10px;
              color: @primary;
              font-size: 17.37px;
              font-weight: bold;
              border-right: 1px solid #666;
          }
          .icon-search {
              padding: 0 5.5px;
              font-size: 17px;
          }
          .search-title {
              font-size: 17.37px;
              color: #1baeae;
              line-height: 21px;
              padding-left: 16.875px;
          }
      }
      .icon-iconyonghu{
        color: #fff;
        font-size: 22px;
      }
      .login {
        color: @primary;
        line-height: 52px;
        .van-icon-manager-o {
          font-size: 20px;
          vertical-align: -3px;
        }
      }
  }
  .category-list {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    width: 100%;
    padding-bottom: 13px;
    div {
      display: flex;
      flex-direction: column;
      width: 20%;
      text-align: center;
      img {
        .wh(40px, 40px);
        margin: 13px auto 8px auto;
      }
    }
  }
  .good {
    .good-header {
      background: #f9f9f9;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: @primary;
      font-size: 16px;
      font-weight: 500;
    }
    .good-box {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .good-item {
        box-sizing: border-box;
        width: 50%;
        border-bottom: 1PX solid #e9e9e9;
        padding: 10px 10px;
        img {
          display: block;
          width: 120px;
          margin: 0 auto;
        }
        .good-desc {
          text-align: center;
          font-size: 14px;
          padding: 10px 0;
          .title {
            color: #222333;
          }
          .price {
            color: @primary;
          }
        }
        &:nth-child(2n + 1) {
          border-right: 1PX solid #e9e9e9;
        }
      }
    }
  }
  .floor-list {
      width: 100%;
      padding-bottom: 50px;
      .floor-head {
        width: 100%;
        height: 40px;
        background: #F6F6F6;
      }
      .floor-content {
        display: flex;
        flex-shrink: 0;
        flex-wrap: wrap;
        width: 100%;
        .boxSizing();
        .floor-category {
          width: 50%;
          padding: 10px;
          border-right: 1px solid #dcdcdc;
          border-bottom: 1px solid #dcdcdc;
          .boxSizing();
          &:nth-child(2n) {
            border-right: none;
          }
          p {
            font-size: 17px;
            color: #333;
            &:nth-child(2) {
              padding: 5px 0;
              font-size: 13px;
              color: @primary;
            }
          }
          .floor-products {
            .fj();
            width: 100%;
            img {
              .wh(65px, 65px);
            }
          }
      }
    }
  }
</style>
