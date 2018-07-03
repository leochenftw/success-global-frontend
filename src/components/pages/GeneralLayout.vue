<template>
    <section class="page-content jarallax-section">
        <div class="page-content__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <div class="page-content__heading is-absolute-centered">
                <h1 class="title is-1 is-paddingless has-text-centered">{{title}}</h1>
                <p v-if="breadcrumbs && show_breadcrumbs" class="subtitle page-content__heading__breadcrumbs is-6 has-text-centered">
                <template v-for="(breadcrumb, i) in breadcrumbs">
                    <template v-if="breadcrumbs.length > 1">
                        <template v-if="i < breadcrumbs.length - 1">
                            <a class="page-content__heading__breadcrumb" :href="[base_prefix + breadcrumb.url]">{{breadcrumb.title}}</a>
                            <span class="separator"> › </span>
                        </template>
                        <span class="page-content__heading__breadcrumb" v-else>{{breadcrumb.title}}</span>
                    </template>
                    <template v-else>
                        <a class="page-content__heading__breadcrumb" :href="[base_prefix + breadcrumb.url]">{{breadcrumb.title}}</a>
                        <span class="separator"> › </span>
                        <span class="page-content__heading__breadcrumb">{{title}}</span>
                    </template>
                </template>
                </p>
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
    components  :   { },
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
