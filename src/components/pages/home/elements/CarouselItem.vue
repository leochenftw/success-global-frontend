<template>
    <div class="container section">
        <template v-if="!bg_only">
        <h2 class="title is-2">{{title}}</h2>
        <div class="content">
            {{content}}
        </div>
        <p class="control">
            <a v-if="link.new_tab" target="_blank" :href="link.url" class="button is-gold">{{link.title}}</a>
            <a v-else-if="link.title && link.title.length > 0" :href="link.url" class="button is-gold">{{link.title}}</a>
        </p>
        </template>
        <img :data-src="bg" class="owl-lazy" />
    </div>
</template>

<script>

export default
{
    name        :   'CarouselItem',
    props       :   [
                        'bg',
                        'title',
                        'content',
                        'link',
                        'bg_only'
                    ],
    components  :   { },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {
                        // console.log('header udpated');
                    },
    methods     :   { }
}
</script>
