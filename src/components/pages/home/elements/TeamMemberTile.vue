<template>
    <div :class="['column', 'is-' + this.column_size]">
        <a v-on:click="pop_modal" class="is-block team-member is-relative" :style="get_bg()">
            <div class="team-member__name-role">
                <p class="title is-4">{{title}} <span class="icon"><i class="fas fa-angle-right"></i></span></p>
                <p class="subtitle">{{role}}</p>
            </div>
        </a>
    </div>
</template>

<script>

export default
{
    name        :   'TeamMemberTile',
    props       :   [
                        'title',
                        'content',
                        'role',
                        'portraits'
                    ],
    data        :   function()
                    {
                        return  {
                                    column_size                         :   3
                                };
                    },
    components  :   {  },
    mounted     :   function()
                    {
                        var me                                          =   this;
                        $(window).resize(function(e)
                        {
                            var w                                       =   $(window).width();
                            me.column_size                              =   w < 1024 ? 4 : 3;
                        }).resize();
                    },
    updated     :   function()
                    {

                    },
    methods     :   {
                        pop_modal       :   function(e)
                                            {
                                                e.preventDefault();
                                                team_modal.title        =   this.title;
                                                team_modal.content      =   this.content;
                                                team_modal.role         =   this.role;
                                                team_modal.portrait     =   this.portraits.original;
                                                team_modal.show         =   true;
                                                global.disable_scroll   =   true;

                                                $('html').addClass('is-locked');
                                            },
                        get_bg          :   function()
                                            {
                                                return 'background-image: url(' + this.portraits.thumbnail + ');';
                                            }
                    }
}
</script>
