import { createRouter, createWebHashHistory } from "vue-router"

import index from "@/views/indexGST.vue"
import PoliticasGST from "@/views/PoliticasGST.vue"

const routes = [
    { path: "/", component: index },
     { path: "/politicas", component: PoliticasGST },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes
})