<template>
  <div class="fs-login-page">
    <!-- header -->
    <header class="login-header container">
      <FSLogo />
      <div class="header-right-box">
        <a href="javascript:;" class="tel">
          <i class="iconfont icon-service"></i>
          4009-939-002
        </a>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section container">
      <div class="form-box" :style="{ transform: `translateX(${formTransX}%)` }">
        <!-- register -->
        <div class="register-box" :class="{ hidden: formTransX === 0 }">
          <h1>register</h1>
          <!-- <input type="email" placeholder="邮箱">
          <input type="password" placeholder="密码">
          <input type="password" placeholder="确认密码"> -->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
            <el-form-item prop="account">
              <el-input v-model="loginForm.account" placeholder="邮箱" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="密码" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="确认密码" />
            </el-form-item>
            <el-form-item prop="agree">
              <el-checkbox v-model="loginForm.agree" size="large">
                我已同意隐私条款和服务条款
              </el-checkbox>
            </el-form-item>
          </el-form>
          <button>注册</button>
        </div>
        <!-- login -->
        <div class="login-box" :class="{ hidden: formTransX === 80 }">
          <h1>login</h1>
          <!-- <input type="text" placeholder="邮箱">
          <input type="password" placeholder="密码"> -->
          <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
            <el-form-item prop="account">
              <el-input v-model="loginForm.account" placeholder="邮箱" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" placeholder="密码" />
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="agree" style="margin-bottom: 0;">
                  <el-checkbox v-model="loginForm.agree" size="large">
                    我已同意隐私条款和服务条款
                  </el-checkbox>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="display: flex; align-items: center; justify-content: flex-end;">
                <a class="forget-btn" href="javascript:void(0);">忘记密码？</a>
              </el-col>
            </el-row>
          </el-form>

          <button @click="doLogin">登录</button>
        </div>
      </div>
      <div class="con-box left">
        <h2>欢迎来到</h2>
        <h2><span>FLOWER-SHOP</span></h2>
        <!-- <p>快来领取你的专属<span>宠物</span>吧</p> -->
        <img src="@/assets/images/img-3.jpg" alt="">
        <p>已有账号</p>
        <button id="login" @click="showLogin">去登录</button>
      </div>
      <div class="con-box right">
        <h2>欢迎来到</h2>
        <h2><span>FLOWER-SHOP</span></h2>
        <!-- <p>快来看看你的美丽<span>鲜花</span>吧</p> -->
        <img src="@/assets/images/img-9.jpg" alt="">
        <p>没有账号？</p>
        <button id="register" @click="showRegister">去注册</button>
      </div>
    </section>
  </div>
</template>
<script setup name="Login">
import FSLogo from "@/components/FSLogo.vue"
import { reactive, ref } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { loginAPI } from '@/apis/user'

const userStore = useUserStore();
const router = useRouter();
const loginFormRef = ref(null);
const loginForm = ref({
  account: "",
  password: "",
  agree: ""
})
const loginRules = reactive({
  account: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' },
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        // 自定义校验逻辑
        // 勾选就通过 不勾选就不通过
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
})

const doLogin = () => {
  const { account, password } = loginForm.value
  // 调用实例方法
  loginFormRef.value.validate(async (valid) => {
    // valid: 所有表单都通过校验  才为true
    console.log(valid)
    // 以valid做为判断条件 如果通过校验才执行登录逻辑
    if (valid) {
      // TODO LOGIN
      // const res = await loginAPI({ account, password })
      // userStore.getUserInfo(res.result || {});

      userStore.login({ account, password })

      // 1. 提示用户
      ElMessage({ type: 'success', message: '登录成功' })
      // 2. 跳转首页
      router.replace({ path: '/' })
    }
  })
}

// login-register-animation
const formTransX = ref(0)
// go-register-btn
const showRegister = () => {
  formTransX.value = 80
  loginFormRef.value.resetFields()
}
// go-login-btn
const showLogin = () => {
  formTransX.value = 0
  loginFormRef.value.resetFields()
}

</script>
<style scoped lang='scss'>
.fs-login-page {
  /* 100%窗口高度 */
  height: 100vh;
  /* 弹性布局 水平+垂直居中 */
  // display: flex;
  // justify-content: center;
  // align-items: center;
  /* 渐变背景 */
  // background: linear-gradient(200deg, #f3e7e9, #e3eeff);
  background: url("@/assets/images/login-bg.jpg") no-repeat;
  background-size: cover;
  background-position: center;
}

// header
.login-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10rem;

  .header-right-box {
    display: flex;
    align-items: center;
    column-gap: 2rem;
    font-size: 1.6rem;

    i {
      font-size: 1.4rem;
      color: $fs-base-color-dark;
      letter-spacing: -5px;
      font-weight: 600;
    }

    .tel {
      display: flex;
      align-items: center;

      i {
        font-size: 2.2rem;
        margin-right: 1.5rem;
      }
    }
  }
}

// section-form
.login-section {
  /* 相对定位 */
  position: relative;
  height: 60rem;
  background-color: #fff;
  border-radius: 5px;
  /* 阴影 */
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  margin: auto;
  transform: translateY(45%);


  .form-box {
    /* 绝对定位 */
    position: absolute;
    top: -8%;
    left: 5%;
    // background-color: #d3b7d8;
    background-color: $fs-base-color-light;

    width: 50%;
    height: 70rem;
    border-radius: 5px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    /* 动画过渡 加速后减速 */
    transition: 0.5s ease-in-out;
  }

  .register-box,
  .login-box {
    /* 弹性布局 垂直排列 */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .el-form {
      width: 80%;
    }
  }

  h1 {
    text-align: center;
    margin-bottom: 2.5rem;
    /* 大写 */
    text-transform: uppercase;
    color: #fff;
    /* 字间距 */
    letter-spacing: 5px;
  }

  :deep(.el-input__wrapper) {
    background: none;
    box-shadow: none;
    padding: 0;
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: none !important;
  }

  :deep(.el-form-item.is-error .el-input__wrapper) {
    box-shadow: none !important;
  }

  :deep(.el-input__wrapper:hover) {
    box-shadow: none !important;
  }

  :deep(.el-input__inner) {
    background-color: transparent;
    width: 70%;
    color: #fff;
    border: none;
    /* 下边框样式 */
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    padding: 1rem 0;
    text-indent: 1rem;
    margin: 8px 0;
    font-size: 14px;
    letter-spacing: 2px;
  }

  :deep(.el-input__inner::placeholder) {
    color: #fff;
  }

  :deep(.el-input__inner:focus) {
    color: #a262ad;
    outline: none;
    border-bottom: 1px solid #a262ad80;
    transition: 0.5s;
  }

  :deep(.el-input__inner:focus::placeholder) {
    opacity: 0;
  }

  :deep(.el-checkbox__label) {
    color: #FFFFFF;
  }

  .form-box button {
    width: 80%;
    margin-top: 3.5rem;
    background-color: #f6f6f6;
    outline: none;
    border-radius: 8px;
    padding: 1.5rem;
    color: #a262ad;
    letter-spacing: 2px;
    border: none;
    cursor: pointer;
  }

  .form-box button:hover {
    background-color: #a262ad;
    color: #f6f6f6;
    transition: background-color 0.5s ease;
  }

  .con-box {
    width: 50%;
    /* 弹性布局 垂直排列 居中 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* 绝对定位 居中 */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .con-box.left {
    left: -2%;
  }

  .con-box.right {
    right: -2%;
  }

  .con-box h2 {
    color: #8e9aaf;
    font-size: 25px;
    font-weight: bold;
    letter-spacing: 3px;
    text-align: center;
    margin-bottom: 4px;
  }

  .con-box p {
    font-size: 12px;
    letter-spacing: 2px;
    color: #8e9aaf;
    text-align: center;
  }

  .con-box span {
    color: #d3b7d8;
  }

  .con-box img {
    width: 15rem;
    height: 15rem;
    opacity: 0.9;
    margin: 4rem 0;
  }

  .con-box button {
    margin-top: 3%;
    background-color: #fff;
    color: #a262ad;
    border: 1px solid #d3b7d8;
    padding: 6px 10px;
    border-radius: 5px;
    letter-spacing: 1px;
    outline: none;
    cursor: pointer;
  }

  .con-box button:hover {
    background-color: #d3b7d8;
    color: #fff;
  }

  .hidden {
    display: none;
    transition: 0.5s;
  }
}


a:hover {
  color: $fs-base-color-dark;
}

.forget-btn {
  color: #fff;
  line-height: 32px;

  &:hover {
    color: $fs-base-color-dark
  }
}

.subBtn {

  background: $fs-base-color-dark;
  width: 100%;
  color: #fff;
}
</style>
