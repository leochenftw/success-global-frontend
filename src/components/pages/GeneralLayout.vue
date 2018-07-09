<template>
    <section class="page-content jarallax-section">
        <div class="page-content__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <div class="page-content__heading is-absolute-centered">
                <h1 class="title is-1 is-paddingless has-text-centered">{{title}}</h1>
                <Breadcrumbs
                    v-if="breadcrumbs && show_breadcrumbs"
                    :breadcrumbs="breadcrumbs"
                    :title="title"
                />
            </div>
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
import Breadcrumbs from '@/components/elements/Breadcrumbs';
export default
{
    name        :   'GeneralLayout',
    props       :   [
                        'title',
                        'breadcrumbs',
                        'show_breadcrumbs',
                        'hero',
                        'abstract',
                        'content'
                    ],
    data        :   function()
                    {
                        return  {
                                    base_prefix             :   global.base_prefix
                                    // title                   :   null,
                                    // breadcrumbs             :   null,
                                    // intro                   :   null,
                                    // hero                    :   null,
                                    // abstract                :   null,
                                    // content                 :   null
                                };
                    },
    components  :   {
                        Breadcrumbs
                    },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {
                        console.log(this.breadcrumbs);
                    },
    methods     :   {

                    }
}
</script>
