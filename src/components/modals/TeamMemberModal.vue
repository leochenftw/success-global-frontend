<template>
    <transition name="modal">
        <div v-if="show" :class="{'modal': true, 'is-active': true, 'loaded': loaded}">
            <div class="modal-background" v-on:click="close_modal"></div>
            <div class="modal-content">
                <div class="box">
                    <figure><img :src="portrait" /></figure>
                    <h2 class="title is-3 is-uppercase">{{title}}</h2>
                    <p class="subtitle is-6">{{role}}</p>
                    <div class="content" v-html="content"></div>
                    <div class="contacts" v-if="phone || email || linkedin">
                        <a class="contact" v-if="phone" :href="['tel:' + phone]"><span class="icon"><i class="fas fa-phone"></i></span> {{phone}}</a>
                        <a class="contact" v-if="email" :href="['mailto:' + email]"><span class="icon"><i class="fas fa-envelope"></i></span> {{email}}</a>
                        <a class="contact" v-if="linkedin" :href="linkedin" target="_blank"><span class="icon"><i class="fab fa-linkedin"></i></span> {{linkedin_title}}</a>
                    </div>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" v-on:click="close_modal"></button>
        </div>
    </transition>
</template>

<script>

export default
{
    name        :   'TeamMemberModal',
    props       :   [

                    ],
    data        :   function()
                    {
                        return  {
                                    show        :   false,
                                    loaded      :   false,
                                    title       :   null,
                                    content     :   null,
                                    portrait    :   null,
                                    phone       :   null,
                                    email       :   null,
                                    linkedin    :   null
                                };
                    },
    components  :   {  },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {
                        if (this.portrait) {
                            let me              =   this;
                            if (!me.loaded) {
                                $(this.$el).find('img').on('load', function(e)
                                {
                                    me.loaded       =   true;
                                });
                            }
                        }
                    },
    computed    :   {
                        linkedin_title          :   function()
                                                    {
                                                        if (this.linkedin) {
                                                            this.linkedin       =   this.linkedin.replace(/\/$/, "");
                                                            let segs            =   this.linkedin.split('/');

                                                            return segs[segs.length - 1];
                                                        }

                                                        return this.title;
                                                    }
                    },
    methods     :   {
                        close_modal             :   function(e)
                                                    {
                                                        e.preventDefault();
                                                        this.title              =   null;
                                                        this.content            =   null;
                                                        this.loaded             =   false;
                                                        this.role               =   null;
                                                        this.portrait           =   null;
                                                        this.show               =   false;
                                                        this.phone              =   null;
                                                        this.email              =   null;
                                                        this.linkedin           =   null;
                                                        global.disable_scroll   =   false;
                                                        $('html').removeClass('is-locked');
                                                    }
                    }
}
</script>
