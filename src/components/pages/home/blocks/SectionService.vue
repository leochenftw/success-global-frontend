<template>
    <section id="section-service" class="section-service service-tiles jarallax-section">
        <div class="section-service__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <h2 class="title is-1 is-absolute-centered">{{title}}</h2>
        </div>
        <div class="container">
            <div class="columns is-multiline is-variable is-1">
                <ServiceTile
                    v-for="(item, i) in services"
                    :key="i"
                    :title="item.title"
                    :content="item.subtitle"
                    :background="item.background"
                    :services="item.services"
                />
            </div>
        </div>
    </section>
</template>

<script>
import ServiceTile from '../elements/ServiceTile';
export default
{
    name        :   'SectionService',
    props       :   [
                        'title',
                        'hero',
                        'content',
                        'services'
                    ],
    data        :   function()
                    {
                        return  {

                                };
                    },
    components  :   { ServiceTile },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {

                    }
}
</script>
