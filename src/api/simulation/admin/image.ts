import {config} from "@/utils/request"

export function apiAdminPostUploadImageUrl() {
    const baseUrl = (config.baseURL || "/api") as string
    if (baseUrl.endsWith("/")) {
        return baseUrl + "api/v1/admin/image/img"
    }
    return baseUrl + "/api/v1/admin/image/img"
}

export function apiAdminPostUploadVideoUrl() {
    const baseUrl = (config.baseURL || "/api") as string
    if (baseUrl.endsWith("/")) {
        return baseUrl + "/v1/sr/ad/fu/vio"
    }
    return baseUrl + "/v1/sr/ad/fu/vio"
}