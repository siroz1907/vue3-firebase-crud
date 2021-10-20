
//ya createWebHashHistory bu olacak yada createWebHistory bu
import { createRouter, createWebHistory  } from 'vue-router';

import Home from '../views/Home.vue';
import PersonEdit from '../components/PersonEdit.vue';


const routes=[
        {
            path:'/'
            ,component:Home
            ,name:'Home Page'
        },
        {
            path:'/Edit/:kid',
            name:'Edit',
            component : PersonEdit
        },
    ];


const router = new createRouter(
    {
        history : createWebHistory(), //createWebHistory(process.env.BASE_URL),
        routes        
    }
);

export default router;