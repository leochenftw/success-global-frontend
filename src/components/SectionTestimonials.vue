<template>
    <section class="testimonials jarallax-section">
        <div class="testimonials__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <div class="is-absolute-centered testimonials__hero__highlights__container container">
                <div class="columns is-mobile is-relative testimonials__hero__highlights">
                    <div class="column testimonials__hero__highlight has-text-centered" v-for="item in highlights">
                        <span class="testimonials__hero__highlight__icon icon is-block"><i :class="item.icon"></i></span>
                        <span class="testimonials__hero__highlight__figure is-block">{{item.figure}}<sup v-if="item.percent">%</sup></span>
                        <span class="testimonials__hero__highlight__title is-block">{{item.title}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <h2 :class="['title', 'is-1', 'has-text-centered', 'is-uppercase', {'is-contentless': !content}]">{{title}}</h2>
            <div class="has-text-centered content" v-if="content" v-html="content"></div>
            <div class="testimonials" v-if="testimonials">
                <Testimonial
                    v-for="(item, i) in testimonials"
                    :key="i"
                    :index="i"
                    :quoter="item.quoter"
                    :content="item.content"
                    :rating="item.rating"
                    :portrait="item.portrait"
                />
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
import Testimonial from './Testimonial';
export default
{
    name        :   'SectionTestimonials',
    props       :   [
                        'title',
                        'hero',
                        'content',
                        'testimonials',
                        'highlights'
                    ],
    data        :   function()
                    {
                        return  {};
                    },
    components  :   { Testimonial },
    mounted     :   function()
                    {
                        jarallaxVideo();
                        jarallaxElement();
                        jarallax(document.querySelectorAll('.jarallax'),
                        {
                            speed: 0.2
                        });
                    },
    updated     :   function()
                    {

                    }
}
</script>
