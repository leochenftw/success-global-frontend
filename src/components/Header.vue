<template>
    <header id="header" class="bg-eerie-black">
        <nav class="navbar is-transparent">
            <div class="navbar-brand">
                <a class="navbar-item" href="/#/">
                    <img src="../assets/logo.png" alt="Success Global" width="88" height="50">
                </a>
                <div v-on:click="show_mobile_menu" :class="{'navbar-burger': true, 'burger': true, 'is-active': mobile_menu_is_active}" data-target="mobile-menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>

            <div id="mobile-menu" :class="{'navbar-menu': true, 'is-active': mobile_menu_is_active}">
                <div class="navbar-end">
                    <div class="navbar-item" v-for="item in navigation">
                        <router-link :to="item.url">{{item.title}}</router-link>
                    </div>
                    <div class="navbar-item">
                        <div class="field is-grouped">
                            <a class="button is-gold" href="/#/">
                                <span>Request Consultation</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            </nav>
    </header>
</template>

<script>

export default
{
    name        :   'Header',
    data        :   function()
                    {
                        return  {
                                    mobile_menu_is_active   :   false,
                                    navigation              :   []
                                }
                    },
    components  :   {

                    },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {
                        // console.log('header udpated');
                    },
    methods     :   {
                        show_mobile_menu    :   function(e)
                                                {
                                                    e.preventDefault();
                                                    this.mobile_menu_is_active  =   !this.mobile_menu_is_active;
                                                }
                    }
}
</script>
