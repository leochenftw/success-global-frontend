<template>
    <div id="bottom-overlay" :class="['columns is-marginless is-mobile', {'hide' : hide}]">
        <div class="column"><a :href="['tel:' + phone]">{{phone}}</a></div>
        <div class="column is-narrow"><a href="#" @click="on_click">contact</a></div>
    </div>
</template>

<script>
export default
{
    name            :   'FloatingContact',
    data            :   function()
                        {
                            return  {
                                        hide    :   false,
                                        phone   :   null
                                    };
                        },
    mounted         :   function()
                        {
                            let me              =   this;
                            this.$bus.$on(
                                'DismissFloatingContact',
                                ()      =>  {
                                    me.hide     =   true;
                                }
                            );

                            this.$bus.$on(
                                'SummonFloatingContact',
                                ()      =>  {
                                    me.hide     =   false;
                                }
                            );
                            this.$bus.$on(
                                'DataFed',
                                (data)  =>  {
                                    if (data.length > 0) {
                                        let contact     =   data[0];
                                        if (contact.options && contact.options.length > 0) {
                                            me.phone    =   contact.options[0].phone;
                                        }
                                    }
                                }
                            );

                            this.$bus.$on('Scrolling', (scroll_top) =>
                            {
                                let anchor              =   $('#section-contact').length > 0 ?
                                                            $('#section-contact') :
                                                            $('#footer');

                                if ($(window).scrollTop() > anchor.offset().top - $(window).height()) {
                                    me.hide             =   true;
                                } else {
                                    me.hide             =   false;
                                }
                            });
                        },
    methods         :   {
                            on_click            :   function(e)
                                                    {
                                                        e.preventDefault();
                                                        $('body').scrollTo('#section-contact', 1000, {axis: 'y', offset: -69});
                                                    }
                        }
}
</script>
