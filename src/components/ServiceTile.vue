<template>
    <div class="column is-4">
        <a class="service-tile is-block is-relative" :href="link.url" :style="get_bg()">
            <div class="service-tile__overlay">
                <h3 class="title is-6">{{title}}</h3>
                <p class="content" v-html="content"></p>
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
                                        return 'padding-top: 100%; background-image: url(' + this.background + ');';
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
