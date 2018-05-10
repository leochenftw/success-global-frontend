<template>
    <section id="section-service" class="service-tiles section">
        <div class="container">
            <h2 class="is-hidden">Our services</h2>
            <div class="columns is-multiline">
                <ServiceTile
                    v-for="(item, i) in services"
                    :key="i"
                    :title="item.title"
                    :content="item.abstract"
                    :background="item.background"
                    :link="item.link"
                />
            </div>
        </div>
    </section>
</template>

<script>
import ServiceTile from './ServiceTile';
export default
{
    name        :   'SectionService',
    props       :   [
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
