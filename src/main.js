import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'
import { lazyImgPlugin } from '@/directives'
import '@/assets/iconfont/iconfont.css'
import './styles/common.scss'

const app = createApp(App)

document.title = 'FLOWER MARKET'

app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
app.use(lazyImgPlugin)
app.mount('#app')
