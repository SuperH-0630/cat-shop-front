import {config} from "@/utils/request";

export function apiAdminPostUploadImageUrl() {
    const baseUrl = (config.baseURL || "/") as string
    if (baseUrl.endsWith("/")) {
        return baseUrl + "api/v1/admin/image/upload"
    }
    return baseUrl + "/api/v1/admin/image/upload"
}

export function apiAdminPostUploadVideoUrl() {
    const baseUrl = (config.baseURL || "/") as string
    if (baseUrl.endsWith("/")) {
        return baseUrl + "api/v1/admin/video/upload"
    }
    return baseUrl + "/api/v1/admin/video/upload"
}