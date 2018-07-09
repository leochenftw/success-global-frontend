<template>
    <p class="subtitle page-content__heading__breadcrumbs is-6 has-text-centered">
    <template v-for="(breadcrumb, i) in breadcrumbs">
        <template v-if="breadcrumbs.length > 1">
            <template v-if="i < breadcrumbs.length - 1">
                <a class="page-content__heading__breadcrumb" :href="[base_prefix + breadcrumb.url]">{{breadcrumb.title}}</a>
                <span class="separator"> › </span>
            </template>
            <span class="page-content__heading__breadcrumb" v-else>{{breadcrumb.title}}</span>
        </template>
        <template v-else>
            <a class="page-content__heading__breadcrumb" :href="[base_prefix + breadcrumb.url]">{{breadcrumb.title}}</a>
            <span class="separator"> › </span>
            <span class="page-content__heading__breadcrumb">{{title}}</span>
        </template>
    </template>
    </p>
</template>

<script>
export default
{
    name            :   'Breadcrumbs',
    props           :   [
                            'breadcrumbs',
                            'title'
                        ],
    data            :   function()
                        {
                            return  {
                                        base_prefix     :   global.base_prefix
                                    };
                        }
}
</script>
