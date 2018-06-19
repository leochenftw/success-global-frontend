<template>
    <section id="section-testimonials" class="testimonials jarallax-section">
        <!-- <div class="testimonials__hero jarallax">
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
        </div> -->
        <div class="container">
            <p class="has-text-centered title is-1"><span class="icon"><i class="fas fa-quote-left"></i></span></p>
            <div class="content has-text-centered" v-html="quote"></div>
            <div class="testimonials columns" v-if="testimonials">
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
                                    quote   :   ''
                                };
                    },
    components  :   { Testimonial },
    mounted     :   function()
                    {
                        global.section_testimonials =   this;
                        jarallaxVideo();
                        jarallaxElement();
                        jarallax(document.querySelectorAll('.jarallax'),
                        {
                            speed: 0.2
                        });

                        this.quote          =   this.testimonials.list.length > 0 ? this.testimonials.list[0].content : '';
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
