import { defineStore } from "pinia";


import { ref } from 'vue'

export const useUserStore = defineStore(
    'user',
    () => {
        // 响应式状态
        const token = ref('')

        // 设置token
        const setToken = (newToken: string) => {
            token.value = newToken
        }
        //删除token
        const clearToken = () => {
            token.value = ''
        }


        return {
            token,
            setToken,
            clearToken
        }
    },
    {

        persist: true
    }
)
