<template>
    <transition name="modal">
        <div v-if="show" class="modal is-active">
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

                    },
    methods     :   {
                        close_modal             :   function(e)
                                                    {
                                                        e.preventDefault();
                                                        team_modal.title        =   null;
                                                        team_modal.content      =   null;
                                                        team_modal.role         =   null;
                                                        team_modal.portrait     =   null;
                                                        team_modal.show         =   false;
                                                        $('html').removeClass('is-locked');
                                                    }
                    }
}
</script>
