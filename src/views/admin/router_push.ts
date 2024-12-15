import {RouteLocationNormalizedLoaded, Router} from "vue-router";

const pushTo = (router: Router, route: RouteLocationNormalizedLoaded, path: string, query?: object) => {
    if (!path) {
        path = "/admin"
    }

    return router.push({
        path: path,
        query: {
            ...route.query,
            ...query,
        },
    })
}

export default pushTo