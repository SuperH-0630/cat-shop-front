import useUserStore, {hasLoad, isLogin} from "@/store/user"

export const isAdmin = (): boolean => {
    if (!isLogin() || !hasLoad()) {
        return false
    }

    return useUserStore().user.type !== 1
}

export const isRootAdmin = (): boolean => {
    return isAdmin() && useUserStore().user.type === 3
}