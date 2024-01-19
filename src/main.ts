// @ts-nocheck
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App);

//导入路由配置
import router from './router'
app.use(router)


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

// 导入jQuery库，因为ajax用起来方便
import $ from 'jquery'
//导入elementui的消息通知组件，下面封装全局的ajax1的时候处理异常需要弹出通知
import {ElMessage} from "element-plus";

//后端项目的url跟路径
let baseUrl='http://localhost:7700/his-api';
app.config.globalProperties.$baseUrl=baseUrl;

//Minio服务器地址
let minioUrl='http://localhost:9000/his';
app.config.globalProperties.$minioUrl=minioUrl;

//封装全局的ajax
app.config.globalProperties.$ajax=function(url:string,method:string,data:JSON,async : boolean, fun : Function) {
    $.ajax({
        url: baseUrl + url,
        type: method,
        dataType: 'json',
        contentType: 'application/json',
        //上传的数据被序列化（允许Ajax上传数组）
        traditional: true,
        xhrFields: {
            //允许Ajax请求跨域
            withCredentials: true
        },
        headers: {
            token: localStorage.getItem('token')
        },
        async: async,
        data: JSON.stringify(data),
        success: function (resp : any) {
            if (resp.code == 200) {
                fun(resp);
            } else {
                ElMessage.error({
                    message: resp.msg,
                    duration: 1200
                });
            }
        },
        error: function (e : any) {
            //ajax有语法错误的时候
            if (e.status == undefined) {
                ElMessage.error({
                    message: '前端页面错误',
                    duration: 1200
                });
            }
            else {
                let status = e.status;
                //没有登陆体检系统
                if (status == 401) {
                    if (url.startsWith('/front/')) {
                        router.push({
                            name: 'FrontIndex'
                        });
                    } else {
                        router.push({
                            name: 'MisLogin'
                        });
                    }
                }
                else {
                    //后端没有运行，提交的数据有误，或者没有连接上后端项目
                    if (!e.hasOwnProperty('responseText')) {
                        ElMessage.error({
                            message: '后端项目没有启动，或者HTTP请求类型以及参数错误',
                            duration: 1200
                        });
                    }
                    else {
                        ElMessage.error({
                            message: e.responseText,
                            duration: 1200
                        });
                    }
                }
            }
        }
    });

}
//封装用于判断用户是否具有某些权限的公共函数
app.config.globalProperties.isAuth=function(permission:string[]) {
    const permissions:string|null=localStorage.getItem('permissions')
    if (permissions){
        let flag=false;
        for (let one of permissions){
            if (permissions.includes(one)){
                flag = true;
                break
            }
        }
        return false
    }else {
        return false
    }
}


app.mount('#app')
