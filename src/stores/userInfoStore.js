import {defineStore} from 'pinia';

export const useUserInfoStore = defineStore('userInfo', {
    state: () => ({
        userInfo: {},
    }),
    getters: {
        userInfoName: (state) => state.userInfo?.name
    },
    actions: {
        setUserInfo(data) {
            this.userInfo = data;
        }
    },
    persist: {
        enabled: true // true 表示开启持久化保存
    }
});
