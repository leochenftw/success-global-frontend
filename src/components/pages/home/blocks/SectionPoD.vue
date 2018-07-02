<template>
    <section id="section-points-of-difference" class="section-points-of-difference jarallax-section">
        <div class="section-about__hero jarallax">
            <img class="jarallax-img" :src="[base_url + hero]" alt="">
            <h2 class="title is-1 is-absolute-centered">{{title}}</h2>
        </div>
        <div class="container">
            <div class="content" v-html="content"></div>
            <div class="columns" v-if="points">
                <div class="column is-3" v-for="(point, i) in points">
                    <p><img :src="[base_url + point.image]" /></p>
                    <br />
                    <div class="content" v-html="rendered_content(point)"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default
{
    name            :   'SectionPoD',
    props           :   [
                            'title',
                            'content',
                            'hero',
                            'points'
                        ],
    data            ()  {
                            return  {
                                        base_url    :   global.base_url
                                    };
                        },
    mounted         ()  {

                        },
    computed        :   {

                        },
    methods         :   {
                            rendered_content        :   function(point)
                                                        {
                                                            return '<h3 class="title is-4">' + point.title + '</h3>' + point.content;
                                                        }
                        },
}
</script>
