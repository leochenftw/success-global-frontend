<template>
    <div class="column is-one-third">
        <div class="service-tile is-block is-relative" :style="get_bg()">
            <div class="service-tile__overlay">
                <div class="is-absolute-centered" style="width:100%;">
                    <h3 class="title is-4 has-text-centered">{{title}}</h3>
                    <p v-if="content" class="subtitle has-text-centered">{{content}}</p>
                    <p class="has-text-centered is-6">
                    <template v-for="(item, i) in services">
                        <a :href="[base_prefix + item.link]">{{item.title}}</a>
                        <template v-if="i < services.length -1"> | </template>
                    </template>
                    </p>
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
                        'services'
                    ],
    data        :   function()
                    {
                        return  {
                                    base_prefix     :   global.base_prefix
                                };
                    },
    components  :   { },
    methods     :   {
                        get_bg  :   function()
                                    {
                                        return 'padding-top: 75%; background-image: url(' + this.background + ');';
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
