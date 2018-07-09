<template>
    <main id="app" :class="{'is-loading': is_loading}">
        <router-view />
        <FloatingContact />
    </main>
</template>

<script>
import FloatingContact from '@/components/elements/FloatingContact';
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
                        FloatingContact
                    },
    watch       :   {
                        $route (to, from)
                        {
                            this.is_loading                     =   true;
                            global.footer.is_loading            =   true;
                            // global.overlay.show =   true;
                            // global.overlay.fade =   false;
                            global.header.mobile_menu_is_active =   false;
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
