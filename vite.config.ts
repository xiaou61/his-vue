import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//导入element-plus相关的依赖库
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

//配置svg依赖库
import path from 'path'
import viteSvgIcons,{createSvgIconsPlugin} from "vite-plugin-svg-icons";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      vue(),
      //配置按需自动加载element-plus控件
      AutoImport({
        resolvers:[ElementPlusResolver()]
      }),
      //引入控件库
      Components({
        resolvers:[ElementPlusResolver()]
      }),
      //引入svg图标素材文件
      createSvgIconsPlugin({
          iconDirs:[path.resolve(process.cwd(),'src/icons/svg')],
          symbolId:'[name]'
      })
  ],
  server:{
    host:'localhost',
    port:7600
  }
})
