<template>
    <NewsList
        v-if="second_param == 'news'"
        :hero="hero"
        :breadcrumbs="breadcrumbs"
        :title="title"
        :content="content"
        :items="items"
        :show_breadcrumbs="show_breadcrumbs"
    />
    <GeneralLayout
        v-else
        :title="title"
        :breadcrumbs="breadcrumbs"
        :hero="hero"
        :abstract="abstract"
        :content="content"
        :show_breadcrumbs="show_breadcrumbs"
     />
</template>

<script>
import GeneralLayout from './GeneralLayout';
import NewsList from './NewsList';
export default
{
    name        :   'GeneralPage',
    props       :   [],
    data        :   function()
                    {
                        return  {
                                    title                   :   null,
                                    breadcrumbs             :   null,
                                    hero                    :   null,
                                    abstract                :   null,
                                    content                 :   null,
                                    items                   :   null,
                                    second_param            :   '',
                                    show_breadcrumbs        :   true
                                };
                    },
    components  :   {
                        GeneralLayout,
                        NewsList
                    },
    mounted     :   function()
                    {
                        this.second_param                   =   this.$route.params.second;
                        // this.show_breadcrumbs               =   this.$route.params.third != undefined;
                        this.fetch();
                    },
    updated     :   function()
                    {
                        $.scrollTo('body', 0, {axis: 'y'});
                    },
    methods     :   {
                        reset                               :   function()
                                                                {
                                                                    this.title                          =   null;
                                                                    this.breadcrumbs                    =   null;
                                                                    this.hero                           =   null;
                                                                    this.abstract                       =   null;
                                                                    this.content                        =   null;
                                                                    this.items                          =   null;
                                                                },
                        fetch                               :   function()
                                                                {
                                                                    let me                              =   this;
                                                                    global.getdata(
                                                                        me.$route.path,
                                                                        function(data)
                                                                        {
                                                                            me.breadcrumbs              =   data.breadcrumbs;
                                                                            me.title                    =   data.title;
                                                                            me.hero                     =   data.hero.indexOf('http') != 0 ?
                                                                                                            global.base_url + data.hero :
                                                                                                            data.hero;

                                                                            me.content                  =   data.content;
                                                                            me.abstract                 =   data.abstract;
                                                                            if (data.newsitems) {
                                                                                me.items                =   data.newsitems;
                                                                            }
                                                                        }
                                                                    );
                                                                }
                    },
    watch       :   {
                        $route (to, from)
                        {
                            this.reset();
                            this.second_param               =   to.params.second;
                            // this.show_breadcrumbs           =   to.params.third != undefined;
                            this.fetch();
                        }
                    }
}
</script>
