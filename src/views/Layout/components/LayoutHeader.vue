<template>
  <header class='app-header'>
    <div class="container header-box">
      <FSLogo />
      <!-- <div class="app-header-member">
      </div> -->
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="キーワードで検索する">
        <el-button type="primary">検索</el-button>
      </div>
      <!-- 头部购物车 -->
      <HeaderCart />

    </div>
  </header>
</template>

<script setup name="LayoutHeader">
import FSLogo from "@/components/FSLogo.vue";
import HeaderCart from "./HeaderCart.vue";
</script>

<style scoped lang='scss'>
.app-header {
  .header-box {
    display: flex;
    align-items: center;
    column-gap: 20px;
  }

  .search {
    position: relative;
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: calc(100% - 340px);
    padding: 5px 20px;
    line-height: 48px;
    border: 1px solid $fs-base-color-dark;
    border-radius: var(--el-border-radius-base);
    background: rgba(255, 51, 153, 0.05);

    .icon-search {
      font-size: 1.8rem;
      margin-left: 5px;
    }

    input {
      background-color: transparent;
      border: none;
      height: 100%;
      background: transparent;
      flex-grow: 1;
      font-size: 1.6rem;
      font-weight: 500;
      letter-spacing: 0.05em;
      padding: 0 10px;
      border: 0;
    }

    // input::placeholder {
    //     color: #fff;
    // }

    input:focus {
      color: #a262ad;
      outline: none;
      border-bottom: 1px solid #a262ad80;
      transition: 0.5s;
    }

    input:focus::placeholder {
      opacity: 0;
    }

    .el-button {
      height: 100%;
    }

  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 2.2rem;
      }

      em {
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        background: $helpColor;
        line-height: 1;
        font-style: normal;
        color: #fff;
        font-size: 1.2rem;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
