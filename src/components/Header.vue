<template>
    <header id="header">
        <nav class="navbar is-transparent">
            <div class="navbar-brand">
                <a class="navbar-item" href="/#/" v-on:click="scroll_to($event,'body')">
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
                        <a :href="item.url" v-on:click="scroll_to($event,item.scroll_to)">{{item.title}}</a>
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
                        scroll_to           :   function(e, to)
                                                {
                                                    e.preventDefault();
                                                    $.scrollTo(to, 500, {axis: 'y', offset: -70});
                                                    this.mobile_menu_is_active  =   false;
                                                },
                        show_mobile_menu    :   function(e)
                                                {
                                                    e.preventDefault();
                                                    this.mobile_menu_is_active  =   !this.mobile_menu_is_active;
                                                }
                    }
}
</script>
