<template>
    <main id="app" :class="{'is-loading': is_loading}">
        <router-view />
    </main>
</template>

<script>
// import Hero from './components/Hero';
export default
{
    name        :   'app',
    data        :   function()
                    {
                        return  {
                                    is_loading  :   false
                                };
                    },
    components  :   {
                        // Hero
                    },
    watch       :   {
                        $route (to, from)
                        {
                            this.is_loading             =   true;
                            global.footer.is_loading    =   true;
                            // global.overlay.show =   true;
                            // global.overlay.fade =   false;
                            setTimeout(function ()
                            {
                                NProgress.start();
                            }, 300);
                        }
                    }
}
</script>

<style>
@import 'css/styles.css';
</style>
