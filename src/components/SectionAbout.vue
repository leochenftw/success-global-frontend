<template>
    <section id="section-about" class="section-about jarallax-section">
        <div class="section-about__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <h2 class="title is-1 is-absolute-centered">{{title}}</h2>
        </div>
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
                        'right_col'
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
