<template>
    <div class="container section">
        <h2 class="title is-2">{{title}}</h2>
        <div class="content">
            {{content}}
        </div>
        <p class="control">
            <a v-if="link.new_tab" target="_blank" :href="link.url" class="button is-gold">{{link.title}}</a>
            <a v-else :href="link.url" class="button is-gold">{{link.title}}</a>
        </p>
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
                        'link'
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
