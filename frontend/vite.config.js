import { build, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), ViteComponents({
        customComponentResolvers: [
            AntDesignVueResolver()
        ]
    })], // 配置需要使用的插件列表，这里将vue添加进去
    // 配置文件别名 vite1.0是/@/  2.0改为/@
    // 这里是将src目录配置别名为 /@ 方便在项目中导入src目录下的文件
    // resolve: {
    //     alias: {
    //         /*
    //         路径别名
    //         若为文件系统路径必须是绝对路径的形式，否则将以别名原样呈现，不会解析为文件系统路径路径 
    //         */
    //         //'@': process.cwd()+'/src'
    //         //'@':path.resolve('src')
    //         //'@':path.resolve(__dirname, 'src')
    //         '@': path.resolve(__dirname, './src'),
    //         // "/@": pathResolve("src"),
    //     }
    // },
    // 强制预构建插件包
    // optimizeDeps: {
    //     include: ['axios'],
    // },
    // 打包配置
    // build: {
    //     target: 'modules',
    //     outDir: 'dist', //指定输出路径
    //     assetsDir: 'assets', // 指定生成静态资源的存放路径
    //     minify: 'terser' // 混淆器，terser构建后文件体积更小
    // },
    // 本地运行配置，及反向代理配置
    server: {
        host: 'localhost',
        port: 8080,
        strictPort: false,
        https: false,
        cors: true, // 默认启用并允许任何源
        open: true, // 在服务器启动时自动在浏览器中打开应用程序
        //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
        proxy: {
            '/api': {
                target: 'http://localhost:3000', //代理接口
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }

})