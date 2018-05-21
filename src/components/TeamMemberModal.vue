<template>
    <transition name="modal">
        <div v-if="show" :class="{'modal': true, 'is-active': true, 'loaded': loaded}">
            <div class="modal-background" v-on:click="close_modal"></div>
            <div class="modal-content">
                <div class="box">
                    <figure><img :src="portrait" /></figure>
                    <h2 class="title is-3">{{title}}</h2>
                    <p class="subtitle is-5">{{role}}</p>
                    <div class="content" v-html="content"></div>
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
                                    portrait    :   null
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
                                console.log('here');
                                $(this.$el).find('img').on('load', function(e)
                                {
                                    me.loaded       =   true;
                                });
                            }
                        }
                    },
    methods     :   {
                        close_modal             :   function(e)
                                                    {
                                                        e.preventDefault();
                                                        this.title              =   null;
                                                        this.content            =   null;
                                                        this.loaded             =   false;
                                                        // team_modal.role         =   null;
                                                        this.portrait           =   null;
                                                        this.show               =   false;
                                                        global.disable_scroll   =   false;
                                                        $('html').removeClass('is-locked');
                                                    }
                    }
}
</script>
