//引入ElLoading加载组件
import { ElLoading } from 'element-plus'

// 记录当前页⾯请求总次数
let needLoadingRequestCount = 0

//loading加载动画方法,也能在页面局部引用该方法实现loading动画加载
export function loading() {
  //加载动画请求设置,lock为true表示全屏加载,text为加载时显示的加载文本,background为加载时背景透明度
  const load = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0.1)',
  })
  return load
}

//显⽰loading
export function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    loading()
  }
  needLoadingRequestCount++
}

//隐藏loading
export function tryHideFullScreenLoading() {
  // 已经有loading的情况下，不再触发
  if (needLoadingRequestCount <= 0) return

  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    // 防抖
    setTimeout(() => {
      //关闭loading
      loading().close()
    }, 300)
  }
}
