import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/home/Home'
import GeneralPage from '@/components/pages/GeneralPage'

Vue.use(Router)

export default new Router(
{
    routes: [
                {
                    path        :   '/',
                    name        :   'Home',
                    component   :   Home
                },
                {
                    path        :   '/:second/:third/:fourth',
                    name        :   'General Page Layout',
                    component   :   GeneralPage
                }
            ]
});
