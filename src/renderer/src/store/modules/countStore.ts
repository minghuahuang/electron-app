import { defineStore } from "pinia";

export const useCountStore = defineStore('countStore', {
    state: () => ({
        count: 0,
    }),
    getters: {},
    actions: {
        addCount(state, params) {
            state.count += params.num
        }
    }
})