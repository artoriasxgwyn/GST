import { createRouter, createWebHashHistory } from "vue-router";

import index from "@/views/indexGST.vue";
import politicasGST from "@/views/politicasGST.vue";
import terminosYCondiciones from "@/views/terminosYCondiciones.vue";
import politicasReembolso from "@/views/politicasReembolsoGST.vue";
import politicasGarantia from "@/views/politicasGarantiaGST.vue";

const routes = [
    { path: "/", component: index },
    { path: "/politicas", component: politicasGST },
    { path: "/terminosYCondiciones", component: terminosYCondiciones },
    { path: "/politicasReembolso", component: politicasReembolso },
    { path: "/politicasGarantia", component: politicasGarantia },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
    // 👇 Agrega esto para manejar el scroll
    scrollBehavior(to,) {
        if (to.hash) {
            // Pequeño retraso para asegurar que el DOM cargue
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        el: to.hash,
                        behavior: 'smooth'
                    })
                }, 100)
            })
        }
        return { top: 0, behavior: 'smooth' }
    }
})