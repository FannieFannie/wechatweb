import http from "axios";
const instance = http.create({
  baseURL: process.env.BASE_API, // 该处url会根据开发环境进行变化（开发/发布）
  timeout: 10000 // 设置请求超时连接时间
});

// 添加一个请求拦截器。注意，这里面有 2 个函数——分别是成功和失败时的回调函数，这样设计的原因会在之后介绍
instance.interceptors.request.use(
  function (config) {
    // 发起请求前执行一些处理任务
    return config; // 返回配置信息
  },
  function (error) {
    // 请求错误时的处理
    return Promise.reject(error);
  }
);

// 添加一个响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 处理响应数据
    return response.data; // 返回响应数据
  },
  function (error) {
    // 响应出错后所做的处理工作
    return Promise.reject(error);
  }
);

export default instance;
