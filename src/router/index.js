import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/pages/home/Home'
import GeneralPage from '@/components/pages/GeneralPage'
import NewsList from '@/components/pages/NewsList'

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
                    path        :   '/our-expertise/:third',
                    name        :   'Our expertise',
                    component   :   GeneralPage
                },
                {
                    path        :   '/:second/:third/:fourth',
                    name        :   'General Page Layout',
                    component   :   GeneralPage
                },
                {
                    path        :   '/news/:slug',
                    name        :   'News List',
                    component   :   NewsList
                }
            ]
});
