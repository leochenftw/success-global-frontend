<template>
    <div class="team-member__group">
        <h3 class="title is-3">{{title}}</h3>
        <div class="columns team-members is-multiline">
            <TeamMemberTile
                v-for="(item, i) in list"
                :key="i"
                :title="item.fullname"
                :content="item.content"
                :role="item.role"
                :portraits="item.portraits"
            />
        </div>
    </div>
</template>

<script>
import TeamMemberTile from '../elements/TeamMemberTile';
export default
{
    name        :   'TeamList',
    props       :   [
                        'title',
                        'list'
                    ],
    data        :   function()
                    {
                        return  {

                                };
                    },
    components  :   { TeamMemberTile },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {

                    }
}
</script>
