<template>
  <div class="fs-login-page">
    <div class="login-content">
      <header class="login-header">
        <FSLogo />
      </header>
      <!-- 登录 -->
      <section class="login-section login" v-show="isLogin">
        <h1>WELCOME</h1>
        <el-form style="width: 90%;" ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item prop="account">
            <el-input class="in-1" v-model="loginForm.account" size="large" placeholder="Your email"
              :suffix-icon="UserFilled" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="in-2" v-model="loginForm.password" size="large" placeholder="Your password"
              :suffix-icon="Lock" />
          </el-form-item>
          <el-form-item class="rem">
            <p>
              <el-checkbox size="large">
                记住我
              </el-checkbox>
            </p>
            <a>忘记密码?</a>
          </el-form-item>
          <el-form-item>
            <el-button type="plain" size="large" @click="doLogin">登录</el-button>
          </el-form-item>
        </el-form>
        <p class="reg">
          还没有账号?
          <a href="javascript:void(0);" @click="showRegister">去注册</a>
        </p>
      </section>
      <!-- 注册 -->
      <section class="login-section register" v-show="!isLogin">
        <h1>WELCOME</h1>
        <el-form style="width: 90%;" ref="registerFormRef" :model="registerForm" :rules="registerRules">
          <el-form-item prop="account">
            <el-input class="in-1" v-model="registerForm.account" size="large" placeholder="Your email"
              :suffix-icon="UserFilled" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input class="in-2" v-model="registerForm.password" size="large" placeholder="Your password"
              :suffix-icon="Lock" />
          </el-form-item>
          <el-form-item prop="checkPassword">
            <el-input class="in-3" v-model="registerForm.checkPassword" size="large" placeholder="Confirm password"
              :suffix-icon="Lock" />
          </el-form-item>
          <el-form-item>
            <el-button type="plain" size="large">注册</el-button>
          </el-form-item>
        </el-form>
        <p class="reg">
          已有账号?
          <a href="javascript:void(0);" @click="showLogin">去登录</a>
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import FSLogo from '@/components/FSLogo.vue';
import { reactive, ref } from 'vue'
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { loginAPI } from '@/apis/user'
import { UserFilled, Lock } from '@element-plus/icons-vue'

const userStore = useUserStore();
const router = useRouter();

// 登录
const loginFormRef = ref(null);
const loginForm = ref({
  account: "",
  password: ""
})
const loginRules = reactive({
  account: [
    { required: false, message: '邮箱不能为空', trigger: 'blur' }
  ],
  password: [
    { required: false, message: '密码不能为空', trigger: 'blur' },
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

// 注册
const registerFormRef = ref(null)
const registerForm = ref({
  account: "",
  password: "",
  checkPassword: ""
})
const registerRules = reactive({
  account: [
    { required: false, message: '邮箱不能为空', trigger: 'blur' }
  ],
  password: [
    { required: false, message: '密码不能为空', trigger: 'blur' },
    { min: 6, max: 14, message: '密码长度为6-14个字符', trigger: 'blur' },
  ],
  checkPassword: [
    {
      validator: (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== registerForm.value.password) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
    }
  ]
})


// login-register-animation
const isLogin = ref(true)
// go-register-btn
const showRegister = () => {
  isLogin.value = false;
  loginFormRef.value.resetFields()
}
// go-login-btn
const showLogin = () => {
  isLogin.value = true;
  registerFormRef.value.resetFields()
}

</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

.fs-login-page {
  height: 100vh;
  background: url("@/assets/images/login-bg.jpg");
  background-position: center;
  background-size: cover;
  font-family: poppins !important;
}

.fs-login-page::after {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 0;
}

.login-header {
  p {
    font-size: 1.4em;
    color: #FFF;
  }
}

.login-content {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* 100%窗口高度 */
  height: 100%;
}

.login-header {
  margin-bottom: 40px;
}

.login-section {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  width: 600px;
  padding: 50px 10px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.13);
  overflow: hidden;

  h1 {
    font-size: 3rem;
    color: #FFF;
    margin: 0 0 50px;
    letter-spacing: 3px;
    font-weight: bold;
    animation: reloadA 1s ease-in-out forwards;
    animation-delay: 0.2s;
    opacity: 0;
  }

  :deep(.el-form-item) {
    margin-bottom: 40px;
  }

  :deep(.el-input__wrapper) {
    border: 1px solid #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    // margin-bottom: 40px;
    border-radius: 50px;
    box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
    background: none;
    padding: 5px 25px;
  }

  :deep(.el-input__wrapper.is-focus) {
    box-shadow: 0 0 0 1px var(--el-input-focus-border-color) inset;
    border: none;
  }

  :deep(.el-input__inner) {
    color: $fs-base-color-dark;
    font-size: 1.4rem;
  }

  :deep(.el-input__inner::placeholder) {
    color: #fff;
    font-size: 1.4rem;
  }

  :deep(.el-input__suffix-inner) {
    font-size: 2rem;
    color: #fff;
  }

  :deep(.el-button):hover {
    border: none;
  }


  // .input-wrap {
  //   border: 1px solid #fff;
  //   display: flex;
  //   justify-content: space-between;
  //   align-items: center;
  //   margin-bottom: 40px;
  //   width: 90%;
  //   height: 60px;
  //   border-radius: 50px;
  //   box-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
  // }

  .in-1 {
    animation: reloadA 1.2s ease-in-out forwards;
    animation-delay: 0.4s;
    opacity: 0;

  }

  .in-2 {
    animation: reloadA 1.4s ease-in-out forwards;
    animation-delay: 0.6s;
    opacity: 0;
  }

  .in-3 {
    animation: reloadA 1.8s ease-in-out forwards;
    animation-delay: 0.8s;
    opacity: 0;
  }

  .rem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    animation: reloadA 1.8s ease-in-out forwards;
    animation-delay: 0.8s;
    opacity: 0;
  }

  .rem p,
  .rem a {
    font-size: 1.4rem;
    color: #fff;
    cursor: pointer;
  }

  :deep(.rem .el-form-item__content) {
    justify-content: space-between;
  }


  button {
    font-size: 1.4rem;
    height: 60px;
    width: 100%;
    border-radius: 50px;
    font-weight: 600;
    letter-spacing: 1px;
    transition: 0.3s;
    animation: reloadA 2s ease-in-out forwards;
    animation-delay: 1s;
    opacity: 0;
    cursor: default;
  }

  button:hover {
    background-color: rgb(221, 221, 221);
  }

  .reg {
    font-size: 1.4rem;
    color: #fff;
    margin-top: 40px;
    animation: reloadA 2.2s ease-in-out forwards;
    animation-delay: 1.2s;
    opacity: 0;
  }

  .reg a {
    font-weight: 500;

  }

  :deep(.el-checkbox) {
    color: #FFF;
  }

}

.hidden {
  display: none;
}

@keyframes reloadA {
  from {
    transform: translateY(250px);
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
