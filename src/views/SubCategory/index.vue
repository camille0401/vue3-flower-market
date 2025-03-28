<template>
  <div class="sub-category-page">
    <div class="container ">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/${categoryFilterData.parentId}` }">
            {{ categoryFilterData.parentName }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryFilterData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sub-container">
        <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
          <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
          <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
          <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
        </el-tabs>
        <div class="listss" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
          <!-- 商品列表-->
          <FSGoodsItem v-for="goods in goodsList" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getCategoryFilterAPI, getSubCategoryAPI } from "@/apis/category"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import FSGoodsItem from "@/components/FSGoodsItem.vue"

const route = useRoute();

// 获取分类导航数据
const categoryFilterData = ref({});
const getCategoryFilterData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)
  categoryFilterData.value = res?.result || {}
}
onMounted(() => getCategoryFilterData())

// 获取商品列表
const goodsList = ref([]);
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
const getGoodsList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  goodsList.value = res?.result?.items || []
}
onMounted(() => getGoodsList())

// tab切换回调
const tabChange = () => {
  reqData.value.page = 1;
  console.log(reqData.value)
  getGoodsList();
}

// 页面滚动加载数据
const disabled = ref(false)
const load = async () => {
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value);
  goodsList.value = [...goodsList.value].concat(res?.result?.items || []);
  if (reqData.value.page > res?.result?.pages) {
    // stop
    disabled.value = true;
    return;
  }
}

</script>

<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .listss {
    // display: flex;
    // flex-wrap: wrap;
    display: grid;
    grid-template-columns: repeat(4, calc((100% - 30px) / 4));
    gap: 10px;
    width: 100%;
    padding: 0 10px;
  }

  // .goods-item {
  //   display: block;
  //   width: 220px;
  //   margin-right: 20px;
  //   padding: 20px 30px;
  //   text-align: center;

  //   img {
  //     width: 160px;
  //     height: 160px;
  //   }

  //   p {
  //     padding-top: 10px;
  //   }

  //   .name {
  //     font-size: 1.6rem;
  //   }

  //   .desc {
  //     color: #999;
  //     height: 29px;
  //   }

  //   .price {
  //     color: $priceColor;
  //     font-size: 2rem;
  //   }
  // }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
