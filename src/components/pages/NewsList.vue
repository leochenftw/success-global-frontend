<template>
    <section class="page-content jarallax-section">
        <div class="page-content__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <h1 class="title is-1 is-absolute-centered">{{title}}</h1>
        </div>
        <div class="container">
            <article class="page-content__content content" v-html="content"></article>
            <div class="news-items">
                <div v-for="(item, i) in items" class="news-item columns" :data-slug="item.slug">
                    <div class="column is-7 news-item__text">
                        <h2 v-if="item.title" class="title is-3">{{item.title}}</h2>
                        <p v-if="item.date" class="subtitle is-6"><em>{{date_posted(item.date)}}</em></p>
                        <div class="content" v-if="item.content" v-html="item.content"></div>
                    </div>
                    <div class="column is-5 news-item__image">
                        <img :alt="[item.title + '\'s visa']" :src="[base_url + item.thumb]" width="470" />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {
    jarallax,
    jarallaxElement,
    jarallaxVideo
} from 'jarallax';
export default
{
    name            :   'NewsList',
    props           :   {},
    data            :   function()
                        {
                            return  {
                                        hero        :   '',
                                        title       :   '',
                                        content     :   '',
                                        items       :   [],
                                        base_url    :   global.base_url
                                    };
                        },
    mounted         :   function()
                        {
                            let me                              =   this;
                            global.getdata(
                                '/news/',
                                function(data)
                                {
                                    me.title                    =   data.title;
                                    me.hero                     =   data.hero.indexOf('http') != 0 ?
                                                                    global.base_url + data.hero :
                                                                    data.hero;
                                    me.content                  =   data.content;
                                    me.items                    =   data.newsitems;
                                }
                            );

                            jarallaxVideo();
                            jarallaxElement();
                            jarallax(document.querySelectorAll('.jarallax'),
                            {
                                speed: 0.2
                            });
                        },
    updated        :   function()
                        {
                            let slug                            =   this.$route.params.slug;
                            this.$nextTick().then(function()
                            {
                                $.scrollTo($('.news-item[data-slug="' + slug + '"]'), 0, {axis: 'y', offset: -80});
                            });
                        },
    methods        :   {
                            date_posted     :   function(d)
                                                {
                                                    return d.nzst(true, false);
                                                }
                        }
}
</script>
