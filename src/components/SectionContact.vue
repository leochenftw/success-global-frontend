<template>
    <section class="section-contact jarallax-section">
        <div class="section-contact__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <h2 class="title is-1 is-absolute-centered">{{title}}</h2>
        </div>
        <div class="container">
            <div class="content" v-html="content"></div>

            <div class="section-contact__branches">
                <Branch
                    v-for="(item, i) in branches"
                    :key="i"
                    :index="i"
                    :title="item.title"
                    :physical="item.physical"
                    :pobox="item.pobox"
                    :email="item.email"
                    :options="item.options"
                    :lat="item.lat"
                    :lng="item.lng"
                />
            </div>
        </div>
    </section>
</template>

<script>
import Branch from './Branch';
export default
{
    name        :   'SectionContact',
    props       :   [
                        'title',
                        'hero',
                        'content',
                        'branches'
                    ],
    data        :   function()
                    {
                        return  {

                                };
                    },
    components  :   { Branch },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {

                    }
}
</script>
