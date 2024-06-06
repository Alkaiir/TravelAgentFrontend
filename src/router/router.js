import * as VueRouter from 'vue-router';

import LoginPage from "../pages/LoginPage.vue";
import RegistrationPage from "../pages/RegistrationPage.vue";
import MainPage from "../pages/MainPage.vue";
import ToursPage from "../pages/ToursPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

const routes = [
    {   name: 'main',
        path: '/',
        component: MainPage
    },
    {   name: 'login',
        path: '/login',
        component: LoginPage
    },
    {   name:'registration',
        path: '/registration',
        component: RegistrationPage
    },
    {   name:'tours',
        path: '/tours',
        component: ToursPage
    },
    {   name:'profile',
        path: '/profile',
        component: ProfilePage
    },
]


const router = VueRouter.createRouter({history: VueRouter.createWebHashHistory(), routes,})

export default router