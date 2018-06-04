<template>
    <div class="column is-half">
        <a class="service-tile is-block is-relative" :href="link.url" :style="get_bg()">
            <div class="service-tile__overlay">
                <h3 class="title is-4 has-text-centered is-absolute-centered">{{title}}</h3>
            </div>
        </a>
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
