<template>
    <section id="section-testimonials" class="testimonials jarallax-section">
        <div class="testimonials__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <div class="is-absolute-centered testimonials__hero__highlights__container container">
                <div class="columns is-relative testimonials__hero__highlights">
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
                    v-for="(item, i) in testimonials.list"
                    :key="i"
                    :index="i"
                    :quoter="item.quoter"
                    :content="item.content"
                    :rating="item.rating"
                    :portrait="item.portrait"
                />
            </div>
            <div class="testimonials__actions has-text-centered">
                <button v-if="testimonials.next" v-on:click="load_more" class="button is-gold is-large">Load more</button>
                <p v-else>- That's all -</p>
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
import Testimonial from '../elements/Testimonial';
export default
{
    name        :   'SectionTestimonials',
    props       :   [
                        'title',
                        'hero',
                        'content',
                        'section_url',
                        'testimonials',
                        'highlights'
                    ],
    data        :   function()
                    {
                        return  {

                                };
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
    computed    :   {
                        next_url            :   function()
                                                {
                                                    return  this.testimonials.next ?
                                                            global.base_url + this.section_url + this.testimonials.next :
                                                            null;
                                                }
                    },
    methods     :   {
                        load_more           :   function(e)
                                                {
                                                    e.preventDefault();

                                                    if (!this.next_url) {
                                                        return false;
                                                    }

                                                    let me                      =   this;
                                                    axios.get(this.next_url).then(function(response)
                                                    {
                                                        me.testimonials.next    =   response.data.testimonials.testimonials.next;
                                                        me.testimonials.list    =   me.testimonials.list.concat(response.data.testimonials.testimonials.list);
                                                        setTimeout(function () {
                                                            $(window).scroll();
                                                        }, 10);
                                                    });
                                                }
                    }
}
</script>
