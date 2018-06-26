<template>
    <section class="page-content jarallax-section">
        <div class="page-content__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <h2 class="title is-1 is-absolute-centered">{{title}}</h2>
        </div>
        <div class="container">
            <div v-if="abstract" class="page-content__abstract content">
                <blockquote v-html="abstract"></blockquote>
            </div>
            <article class="page-content__content content" v-html="content"></article>
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
    name        :   'GeneralPage',
    props       :   [],
    data        :   function()
                    {
                        return  {
                                    title                   :   null,
                                    intro                   :   null,
                                    hero                    :   null,
                                    abstract                :   null,
                                    content                 :   null
                                };
                    },
    components  :   { },
    mounted     :   function()
                    {
                        let me                              =   this;
                        global.getdata(
                            me.$route.path,
                            function(data)
                            {
                                me.title                    =   data.title;
                                me.hero                     =   data.hero.indexOf('http') != 0 ? global.base_url + data.hero : data.hero;
                                me.content                  =   data.content;
                                me.abstract                 =   data.abstract;
                            }
                        );

                        jarallaxVideo();
                        jarallaxElement();
                        jarallax(document.querySelectorAll('.jarallax'),
                        {
                            speed: 0.2
                        });
                    },
    updated     :   function()
                    {
                        $.scrollTo('body', 0, {axis: 'y'});
                    }
}
</script>
