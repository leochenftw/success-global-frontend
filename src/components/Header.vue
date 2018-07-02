<template>
    <header id="header" :class="{'is-transparent': transparent}">
        <nav class="navbar is-transparent">
            <div class="navbar-brand">
                <a class="navbar-item" :href="[base_prefix + '/']" v-on:click="scroll_to($event,'body')">
                    <img v-if="transparent" src="../assets/logo-white.png" alt="Success Global" width="88" height="50">
                    <img v-else src="../assets/logo.png" alt="Success Global" width="88" height="50">
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
                            <a class="button is-gold" href="#" v-on:click="show_consultation">Book Consultation</a>
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
                                    base_prefix             :   global.base_prefix,
                                    is_home                 :   false,
                                    transparent             :   false,
                                    mobile_menu_is_active   :   false,
                                    navigation              :   []
                                }
                    },
    components  :   {

                    },
    mounted     :   function()
                    {
                        // let me                              =   this;
                        // $(window).scroll(function(e)
                        // {
                        //     if (me.is_home) {
                        //         let top                         =   $(window).scrollTop();
                        //         if (top < 70) {
                        //             me.transparent              =   true;
                        //         } else {
                        //             me.transparent              =   false;
                        //         }
                        //     }
                        // });
                    },
    updated     :   function()
                    {
                        // console.log('header udpated');
                    },
    methods     :   {
                        show_consultation   :   function(e)
                                                {
                                                    e.preventDefault();
                                                    global.consultation_form.show   =   true;
                                                    global.disable_scroll           =   true;
                                                    $('html').addClass('is-locked');
                                                },
                        scroll_to           :   function(e, to)
                                                {
                                                    if ($('body').hasClass('home')) {
                                                        e.preventDefault();
                                                        $.scrollTo(to, 500, {axis: 'y', offset: -69});
                                                        this.mobile_menu_is_active  =   false;
                                                    }
                                                },
                        show_mobile_menu    :   function(e)
                                                {
                                                    e.preventDefault();
                                                    this.mobile_menu_is_active      =   !this.mobile_menu_is_active;
                                                }
                    }
}
</script>
