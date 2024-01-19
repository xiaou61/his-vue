// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

//导入路由配置
import router from './router'
app.use(router)
app.mount('#app')

//导如elementplus的css文件
import 'element-plus/dist/index.css'
//导入组件库
import  ElementPlus from 'element-plus'

//为了让日历组件能够正常显示，需要导入简体中文场景

import zhCn from 'element-plus/es/locale/lang/zh-cn'

//导入svg依赖库
import 'virtual:svg-icons-register'

//把组件库整合在vue框架上
app.use(ElementPlus,{
    zhCn
})

//为了可以使用自带的图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
