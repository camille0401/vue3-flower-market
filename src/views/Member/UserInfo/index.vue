<template>
  <div class="fs-member-userinfo-container">
    <h2 class="big-title">个人信息</h2>

    <div class="content-box">
      <div class="avatar"><el-avatar :size="100" :src="userStore.userInfo?.avatar" /></div>
      <div class="form-group">
        <el-form ref="userInfoRef" :model="userInfoForm" style="max-width: 400px;">
          <el-form-item prop="userName">
            <template #label>
              <div class="dyn-label"><span>姓</span><span>名</span></div>
            </template>
            <el-input v-model="userInfoForm.userName" />
          </el-form-item>
          <el-form-item prop="birthday">
            <template #label>
              <div class="dyn-label"><span>生</span><span>日</span></div>
            </template>
            <el-date-picker style="width: 100%;" v-model="userInfoForm.birthday" type="date" />
          </el-form-item>
          <el-form-item prop="phone">
            <template #label>
              <div class="dyn-label">联系电话</div>
            </template>
            <el-input v-model="userInfoForm.phone" />
          </el-form-item>
          <el-form-item prop="email">
            <template #label>
              <div class="dyn-label">绑定邮箱</div>
            </template>
            <el-input v-model="userInfoForm.email" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="large" style="width: 100%;">保存</el-button>
          </el-form-item>
        </el-form>

      </div>
    </div>
  </div>
</template>

<script setup>
// import { getLikeListAPI } from '@/apis/user'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
// import GoodsItem from '@/views/Home/components/GoodsItem.vue'
const userStore = useUserStore()


const userInfoForm = ref({
  avatar: "",
  userName: "",
  gender: 1,
  birthday: "",
  phone: "",
  email: "",

})

</script>


<style scoped lang="scss">
.fs-member-userinfo-container {
  padding: 20px;
  background: #fff;
  border-radius: 12px;

  .big-title {
    font-size: 20px;
    line-height: 40px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .content-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 400px;
    row-gap: 20px;
    margin: 40px;
  }

  .form-group {
    width: 100%;

    .dyn-label {
      display: flex;
      justify-content: space-between;
      width: 48px;
      font-size: 12px;
      vertical-align: top;
      font-weight: normal;
      line-height: 36px;
      margin-right: 20px;
    }

    :deep(.el-form-item) {
      margin-bottom: 40px;
    }

    :deep(.el-input__wrapper) {
      background-color: #F7F9FA;
      box-shadow: none;
      color: #232628;
    }

  }

}
</style>
