<template>
  <div class="fs-home-page">
    <HomeNav />
    <div class='container home-content'>
      <HomeCategory />
      <FSBanner distributionSite="1" />
      <HomeNew />
      <HomeHot />
      <HomeProduct />
    </div>
  </div>
</template>

<script setup name='Home'>
import { defineAsyncComponent } from 'vue';
// import HomeNav from './components/HomeNav.vue';
// import FSBanner from '@/components/FSBanner.vue'
// import HomeCategory from './components/HomeCategory.vue';
// import HomeNew from './components/HomeNew.vue';
// import HomeHot from './components/HomeHot.vue';
// import HomeProduct from './components/HomeProduct.vue';

const HomeNav = defineAsyncComponent(() => import('./components/HomeNav.vue'));
const FSBanner = defineAsyncComponent(() => import('@/components/FSBanner.vue'));
const HomeCategory = defineAsyncComponent(() => import('./components/HomeCategory.vue'));
const HomeNew = defineAsyncComponent(() => import('./components/HomeNew.vue'));
const HomeHot = defineAsyncComponent(() => import('./components/HomeHot.vue'));
const HomeProduct = defineAsyncComponent(() => import('./components/HomeProduct.vue'));

</script>

<style scoped lang="scss"></style>
