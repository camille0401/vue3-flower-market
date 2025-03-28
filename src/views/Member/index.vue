<!-- 会员中心 -->

<template>
  <div class="fs-member-page">
    <FSFullCategoryNav />
    <div class="container member-box">
      <!-- 面包屑 -->
      <div class="bread-box">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>会员中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div class="content-box">

      </div>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="aside">
            <h4 class="title m-bottom-20">
              <i class="iconfont icon-meiguihua"></i>
              会员中心
              <i class="iconfont icon-meiguihua"></i>
            </h4>
            <ul class="nav-list">
              <li class="item-nav">
                <RouterLink class="nav-subtitle" to="/member/home" active-class="active"><i
                    class="iconfont icon-huiyuan1"></i><span>首页</span></RouterLink>
              </li>
              <li class="item-nav">
                <div class="nav-subtitle">
                  <i class="iconfont icon-yonghu"></i><span>个人中心</span>
                </div>
                <ul>
                  <li class="sub-menu-title">
                    <RouterLink to="/member/info" active-class="active">个人信息</RouterLink>
                  </li>
                  <li class="sub-menu-title">
                    <RouterLink to="/member/address" active-class="active">收货地址</RouterLink>
                  </li>
                </ul>
              </li>
              <li class="item-nav">
                <div class="nav-subtitle">
                  <i class="iconfont icon-icon-test"></i><span>订单中心</span>
                </div>
                <ul>
                  <li class="sub-menu-title">
                    <RouterLink to="/member/order" active-class="active">我的订单</RouterLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="18">
          <div class="content">
            <!-- 进度条 -->
            <!-- <FSProgress /> -->

            <RouterView />
          </div>
        </el-col>
      </el-row>

    </div>
  </div>
</template>

<script setup>
import FSFullCategoryNav from '@/components/FSFullCategoryNav.vue';
import FSProgress from '@/components/FSProgress.vue';

</script>

<style lang="scss" scoped>
.fs-member-page {
  background: #F3F5F7;

  .member-box {
    padding: 0 20px 20px;

    .bread-box {
      padding: 25px 0;
    }

    .aside {
      width: 100%;
      border-radius: 12px;
      padding: 20px;
      background: #fff;

      .title {
        display: flex;
        align-items: center;
        column-gap: 10px;
        font-size: 18px;
        line-height: 40px;
        font-weight: 400;
        color: #232628;
        margin-bottom: 20px;

        i {
          font-size: 18px;
        }
      }

      .nav-list {


        .item-nav {
          margin-bottom: 10px;

          .nav-subtitle {
            display: flex;
            align-items: center;
            column-gap: 10px;
            font-size: 14px;
            line-height: 30px;
            color: #232628;

            i {
              font-size: 20px;
              font-weight: 600;
            }

            &:hover {
              color: $fs-base-color-dark;
            }
          }

          .sub-menu-title {
            padding-left: 40px;
            margin: 16px 0;
            font-size: 12px;
            line-height: 30px;
            line-height: 18px;
            color: #232628;
            cursor: pointer;

            a {
              &:hover {
                color: $fs-base-color-dark;
              }
            }


          }

          .active {
            color: $fs-base-color-dark;
          }
        }
      }
    }

    .content {
      width: 100%;
    }

  }
}
</style>
