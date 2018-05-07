<template>
    <section class="team-members jarallax-section">
        <div class="team-members__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <h2 class="title is-1 is-absolute-centered">{{title}}</h2>
        </div>
        <div class="container">
            <div class="content" v-html="content"></div>
            <TeamList
                v-for="(item, i) in branches"
                :key="i"
                :title="item.title"
                :list="item.list"
            />
        </div>
    </section>
</template>

<script>
import TeamList from './TeamList';
export default
{
    name        :   'SectionTeam',
    props       :   [
                        'title',
                        'hero',
                        'content',
                        'branches'
                    ],
    data        :   function()
                    {
                        return  {

                                };
                    },
    components  :   { TeamList },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {

                    }
}
</script>
