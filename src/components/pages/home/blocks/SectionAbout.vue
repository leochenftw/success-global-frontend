<template>
    <section id="section-about" class="section-about jarallax-section">
        <!-- <div class="section-about__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <h2 class="title is-1 is-absolute-centered">{{title}}</h2>
        </div> -->
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
            <div class="columns is-multiline">
                <div class="column is-half content" v-html="intro" ></div>
                <div class="column is-half">
                    <img :src="image" />
                </div>
                <div class="column is-half content" v-html="left_col"></div>
                <div class="column is-half content" v-html="right_col"></div>
            </div>
        </div>
    </section>
</template>

<script>

export default
{
    name        :   'SectionAbout',
    props       :   [
                        'title',
                        'intro',
                        'hero',
                        'image',
                        'left_col',
                        'right_col',
                        'highlights'
                    ],
    data        :   function()
                    {
                        return  {

                                };
                    },
    components  :   { },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {

                    }
}
</script>
