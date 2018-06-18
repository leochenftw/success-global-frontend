<template>
    <div class="column is-one-third">
        <div class="service-tile is-block is-relative" :href="link.url" :style="get_bg()">
            <div class="service-tile__overlay">
                <div class="is-absolute-centered" style="width:100%;">
                    <h3 class="title is-4 has-text-centered">{{title}}</h3>
                    <!-- <p class="subtitle has-text-centered"><a href="#" class="button is-gold">Book Consultation</a></p> -->
                    <p class="has-text-centered is-6"><a style="color: #E6C04C;">New Zealand</a> | <a style="color: #E6C04C;">Australia</a></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default
{
    name        :   'ServiceTile',
    props       :   [
                        'title',
                        'content',
                        'background',
                        'link'
                    ],
    data        :   function()
                    {
                        return  {

                                };
                    },
    components  :   { },
    methods     :   {
                        get_bg  :   function()
                                    {
                                        return 'padding-top: 56.25%; background-image: url(' + this.background + ');';
                                    }
                    },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {

                    }
}
</script>
