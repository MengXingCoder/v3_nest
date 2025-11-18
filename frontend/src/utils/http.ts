// src/api/index.ts
import { http } from './axios'

// 定义接口数据类型（统一管理）
export interface User {
  id: number
  name: string
  email: string
}

export interface LoginReq {
  username: string
  password: string
}

export interface LoginToken {
  token: string
}

// 具体接口函数（带明确返回类型！）
export const getUserInfo = () => http.get<User>('/user/info')

export const login = (data: LoginReq) => http.post<LoginToken>('/auth/login', data)

// Record是TypeScript 内置工具类型
// 表示：“一个对象，它的所有 key 是 string 类型，所有 value 是 unknown 类型(就是value 有可能是 number,string,{},[])”
// const params: Record<string, unknown> = {
//   page: 1,           // number → OK（unknown 包含 number）
//   size: 10,          // number → OK
//   category: 'tech',  // string → OK
//   isActive: true,    // boolean → OK
//   tags: ['vue', 'ts'] // array → OK
// }
export const getArticles = (params?: Record<string, unknown>) =>
  http.get<Article[]>('/articles', params)

export interface Article {
  id: number
  title: string
  content: string
}


// 上传文件（特殊场景）
export const uploadFile = (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  return http.instance.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
}