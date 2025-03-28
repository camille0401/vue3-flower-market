<template>
  <LayoutHeaderFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>
<script setup name="Layout">
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutHeaderFixed from './components/LayoutHeaderFixed.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
onMounted(() => categoryStore.getCategory())
</script>
<style scoped lang="scss"></style>
