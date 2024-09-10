import {defineStore} from "pinia";

export const useToastStore = defineStore("toast", {
    state: () => ({
        message: '' as string
    }),

    actions: {
        success(content: string): void {
            this.message = content;
        },
        error(content: string): void {
            this.message = content;
        },
        info(content: string): void {
            this.message = content;
        },
    },
});
