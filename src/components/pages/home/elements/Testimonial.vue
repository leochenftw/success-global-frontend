<template>
    <a href="#" :class="['testimonial column is-narrow', {'is-active': is_active}]" v-on:click="click_handler">
        <div class="columns is-variable is-mobile is-2">
            <div class="avatar-col column is-narrow">
                <div class="testimonial__avatar is-inline-block">
                    <img v-if="portrait" :src="base_url + portrait" :alt="quoter" width="160" height="160" class="is-block">
                    <img v-else src="https://www.gravatar.com/avatar/8a1b5466ce554c9a2bfbf5a407c86018?s=160&amp;d=mm&amp;r=g" :alt="quoter" width="160" height="160" class="is-block">
                </div>
            </div>
            <div class="text-col column is-6">
                <div class="testimonial__profile">
                    <h3 class="title is-6">{{quoter}}</h3>
                    <p class="subtitle testimonial__profile__rating" v-html="star_maker(rating)"></p>
                </div>
            </div>
        </div>
    </a>
</template>

<script>
export default
{
    name        :   'Testimonial',
    props       :   [
                        'index',
                        'quoter',
                        'content',
                        'rating',
                        'portrait'
                    ],
    data        :   function()
                    {
                        return  {
                                    base_url            :   global.base_url,
                                    visible             :   false,
                                    trim_cap            :   32,
                                    show_all_content    :   false,
                                    is_active           :   false
                                };
                    },
    components  :   { },
    mounted     :   function()
                    {
                        if (global.testimonials.length == 0) {
                            this.is_active              =   true;
                        }
                        global.testimonials.push(this);
                    },
    updated     :   function()
                    {

                    },
    methods     :   {
                        click_handler   :   function(e)
                                            {
                                                e.preventDefault();
                                                global.section_testimonials.quote   =   this.content;
                                                global.testimonials.forEach(function(item)
                                                {
                                                    item.is_active                  =   false;
                                                });

                                                this.is_active                      =   true;
                                            },
                        is_visible      :   function()
                                            {
                                                if (this.visible) return;
                                                if ($(this.$el).visible(true)) {
                                                    this.visible            =   true;
                                                }
                                            },
                        star_maker      :   function(rating)
                                            {
                                                var stars   =   '';

                                                for (var i = 0; i < 5; i++)
                                                {
                                                    stars   +=  '<span class="icon"><i class="fa' + ( rating >= 1 ? 's' : 'r') + ' fa-star"></i></span>';
                                                    rating--;
                                                }

                                                return stars;

                                            }

                    },
    computed    :   {
                        oddeven     :   function ()
                                        {
                                            let i                   =   this.index + 1;
                                            if (i % 2 == 0) {
                                                return 'is-even';
                                            }

                                            return 'is-odd';
                                        },
                        trimmed     :   function ()
                                        {
                                            this.content            =   this.content.trim();
                                            let words               =   this.content.split(' '),
                                                trimmed_content     =   '';

                                            for (let i = 0; i < this.trim_cap; i++)
                                            {
                                                trimmed_content     += words[i];
                                                if (i < this.trim_cap) {
                                                    trimmed_content += ' ';
                                                }
                                            }

                                            if (words.length > this.trim_cap) {
                                               trimmed_content      +=  '...';
                                            }


                                            return trimmed_content;
                                        }
                    }
};
</script>
