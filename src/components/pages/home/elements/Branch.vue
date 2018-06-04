<template>
    <div class="section-contact__branch columns">
        <div class="column is-5">
            <h3 class="title is-3 is-uppercase">{{title}}</h3>
            <div class="content">
                <p class="is-size-5" v-if="physical" v-html="physical"></p>
                <p class="is-size-5" v-if="pobox" v-html="pobox"></p>
                <p v-if="email"><span class="icon"><i class="fas fa-envelope"></i></span> <a :href="['mailto:' + email]">{{email}}</a></p>
                <p v-for="option in options">
                    <span v-if="option.icon" class="icon"><i :class="option.icon"></i></span>
                    <strong v-else>{{option.title}} :</strong>
                    <a :href="make_phone(option.phone, option.protocol, option.params)">{{option.phone}}</a>
                </p>
            </div>
        </div>
        <div class="column">
            <div
                :id="make_id()"
                class="gmap-holder"
                data-api="AIzaSyAg9k1JbmuWUZKevrQGRrdwBn0rdeMPVHA"
                :data-lat="lat"
                :data-lng="lng"
                :data-url="url"
                data-zoom="13"
            >
            </div>
        </div>
    </div>
</template>

<script>
require('@/plugins/utilities');
require('@/plugins/gmap');
export default
{
    name        :   'Branch',
    props       :   [
                        'title',
                        'index',
                        'physical',
                        'pobox',
                        'email',
                        'options',
                        'lat',
                        'lng',
                        'url'
                    ],
    data        :   function()
                    {
                        return  {

                                };
                    },
    components  :   {  },
    methods     :   {
                        make_phone      :   function(number, protocol, params)
                                            {
                                                return protocol + number + (params ? ('?' + params) : '');
                                            },
                        make_id         :   function()
                                            {
                                                return 'gmap-' + this.index;
                                            }
                    },
    mounted     :   function()
                    {
                        $(this.$el).find('.gmap-holder').gmap();
                    },
    updated     :   function()
                    {

                    }
}
</script>
