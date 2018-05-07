<template>
    <main id="app">
        <h1 id="page-title" class="title is-1" style="display: none;">{{title}}</h1>
        <router-view />
    </main>
</template>

<script>
// import Hero from './components/Hero';
export default
{
    name        :   'app',
    data        :   function()
                    {
                        return  {
                                    title       :   null,
                                    content     :   null,
                                    hero_text   :   null,
                                    hero        :   null
                                };
                    },
    components  :   {
                        // Hero
                    }
}
</script>

<style>
@import 'css/styles.css';
</style>
