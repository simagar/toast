import {useToastStore} from "../stores/toast";

type toastFunction = (message: string) => void

interface IToastProvider {
    success: toastFunction
    error: toastFunction
    info: toastFunction
}

export const useToast: IToastProvider = {
    success(message: string) {
        const toastStore = useToastStore()
        toastStore.success(message)
    },

    error(message: string) {
        const toastStore = useToastStore()
        toastStore.error(message)
    },

    info(message: string) {
        const toastStore = useToastStore()
        toastStore.info(message)
    },

}

