<template>
    <div :class="['testimonial', 'is-mobile', 'columns', oddeven, {'already-visible': already_visible, 'come-in': visible}]">
        <div :class="{'avatar-col': true, 'column': true, 'is-narrow': true}">
            <div class="testimonial__avatar is-inline-block">
                <img v-if="portrait" :src="portrait" :alt="quoter" width="160" height="160" class="is-block">
                <img v-else src="https://www.gravatar.com/avatar/8a1b5466ce554c9a2bfbf5a407c86018?s=160&amp;d=mm&amp;r=g" :alt="quoter" width="160" height="160" class="is-block">
            </div>
        </div>
        <div class="text-col column is-6">
            <div class="testimonial__spoke">
                <div class="testimonial__spoke__rating" v-html="star_maker(rating)"></div>
                <div class="testimonial__spoke__text content">
                    <span class="icon"><i class="fas fa-quote-left"></i></span>
                    <p v-html="trimmed"></p>
                </div>
                <div class="testimonial__spoke__person">
                    {{quoter}}
                </div>
            </div>
        </div>
    </div>
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
                                    already_visible     :   false,
                                    visible             :   false,
                                    trim_cap            :   32,
                                    show_all_content    :   false
                                };
                    },
    components  :   { },
    mounted     :   function()
                    {
                        this.animated();
                        if (!this.already_visible) {
                            global.testimonials.push(this);
                        }
                    },
    updated     :   function()
                    {
                        this.animated();
                    },
    methods     :   {
                        animated    :   function()
                                        {
                                            this.already_visible        =   $(this.$el).isAboveViewport();
                                        },
                        is_visible  :   function()
                                        {
                                            if (this.visible) return;
                                            if ($(this.$el).visible(true)) {
                                                this.visible            =   true;
                                            }
                                        },
                        star_maker  :   function(rating)
                                        {
                                            var stars   =   '';

                                            for (var i = 0; i < 5; i++)
                                            {
                                                stars   +=  '<span class="icon"><i class="fa' + ( rating >= 1 ? 's' : 'r') + ' fa-star"></i></span>';
                                                rating--;
                                            }

                                            return stars;

                                        },

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
                    },
    watch       :   {
                        content     :   function(new_val, old_val)
                                        {
                                            console.log(new_val + ' vs ' + old_val);
                                        }
                    }
};
</script>
