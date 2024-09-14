import axios from "axios";
import {message} from "ant-design-vue";
// 创建 axios 实例
const service = axios.create({
    baseURL: "/api",
    timeout: 120000, // 请求超时时间
});

// 请求错误的方法
const err = (error) => {
    console.log("err", error);
    const data = error.response.data;
    message.warning(data.msg || "请求失败!")
    return Promise.reject(error);
};
/**
 * request interceptor
 * 添加请求拦截器
 */
service.interceptors.request.use(async (config) => {
    return config;
}, err);

/**
 * response interceptor
 * 所有请求统一返回
 * 添加响应拦截器
 */
service.interceptors.response.use((response) => {
    // 做统一的错误处理
    if (response.data.code !== 200) {
        message.warning(response.data.msg || "服务器维护中")
        return response;
    } else {
        return response.data;
    }
}, err);

export default service
