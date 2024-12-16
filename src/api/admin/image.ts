import {config} from "@/utils/request";

export function apiAdminUploadImageUrl() {
    const baseUrl = (config.baseURL || "/") as string
    if (baseUrl.endsWith("/")) {
        return baseUrl + "api/v1/admin/image/upload"
    }
    return baseUrl + "/api/v1/admin/image/upload"
}

export function apiAdminUploadVideoUrl() {
    const baseUrl = (config.baseURL || "/") as string
    if (baseUrl.endsWith("/")) {
        return baseUrl + "api/v1/admin/video/upload"
    }
    return baseUrl + "/api/v1/admin/video/upload"
}