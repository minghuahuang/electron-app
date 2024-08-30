import axios, { AxiosInstance, AxiosResponse } from "axios";

const request = axios.create({
    baseURL: '/api',
    timeout: 10000,
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

const http = {
  get<T>(url: string, params?: any, config?: {}): Promise<T> {
    return new Promise((resolve, reject) => {
      request
        .get<T>(url, { params,...config } )
        .then((res: AxiosResponse<T>) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post<T>(url: string, data?: any, config?: {}): Promise<T> {
    return new Promise((resolve, reject) => {
      request
        .post<T>(url, data, config)
        .then((res: AxiosResponse<T>) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default http