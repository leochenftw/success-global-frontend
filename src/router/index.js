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
                ,
                {
                    path        :   '/:second',
                    name        :   'Level 2',
                    component   :   GeneralPage
                },
                {
                    path        :   '/:second/:third',
                    name        :   'Level 3',
                    component   :   GeneralPage
                },
                {
                    path        :   '/:second/:third/:fourth',
                    name        :   'Level 4',
                    component   :   GeneralPage
                },
                {
                    path        :   '/news/:slug',
                    name        :   'News List',
                    component   :   NewsList
                }
            ]
});
