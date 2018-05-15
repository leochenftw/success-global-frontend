<template>
    <form v-if="!has_sent" class="contact-form" method="post" enctype="multipart/form-data">
        <div class="field columns">
            <div class="column">
                <input required class="input is-medium" type="text" name="first_name" placeholder="First Name">
            </div>
            <div class="column">
                <input required class="input is-medium" type="text" name="last_name" placeholder="Last Name">
            </div>
        </div>
        <div class="field columns">
            <div class="control column">
                <input required class="input is-medium" type="email" name="email" placeholder="Email">
            </div>
        </div>
        <div class="field columns">
            <div class="control column">
                <textarea required class="textarea is-medium" row="10" name="message" placeholder="Message"></textarea>
            </div>
        </div>
        <div class="field action">
            <input type="hidden" name="csrf" :value="csrf" />
            <button
                type="submit"
                v-on:click="onclick"
                :class="['button', 'is-medium', 'is-gold', 'g-recaptcha', {'is-loading': is_loading}]"
                data-sitekey="6Lc8BlgUAAAAACwpqCYajCkQEihsnSui-vcVtgW_"
                data-callback="fire_contactform">
                Submit
            </button>
        </div>
    </form>
    <div class="contact-form-acknowledgement" v-else>
        <h3 class="title is-3 is-uppercase">Thanks for your enquiry</h3>
        <div class="content">
            <p>One of your dedicated team members will be in touch very shortly. If your enquiry is urgent then please call us on Toll Free <a class="color-is-gold" href="tel:0508 4 VISAS">0508 4 VISAS</a> (in New Zealand only) or <a class="color-is-gold" href="tel:+64 4 499 3776">+64 4 499 3776</a> (if calling from overseas).</p>
        </div>
    </div>
</template>

<script>

export default
{
    name        :   'ContactForm',
    props       :   [
                        'csrf'
                    ],
    data        :   function()
                    {
                        return  {
                                    endpoint        :   global.base_url + '/api/form/contact-us',
                                    is_loading      :   false,
                                    has_sent        :   false
                                };
                    },
    components  :   {  },
    methods     :   {
                        onclick                     :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            this.is_loading     =   true;
                                                        },
                        submit                      :   function(e)
                                                        {
                                                            if (e && e.preventDefault) {
                                                                e.preventDefault();
                                                            }

                                                            let data            =   new FormData(this.$el),
                                                                me              =   this;
                                                            axios.post(this.endpoint, data).then(function(response)
                                                            {
                                                                me.is_loading   =   false;
                                                                me.has_sent     =   true;
                                                            });
                                                        }
                    },
    mounted     :   function()
                    {
                        global.fire_contactform     =   this.submit;

                        if (!global.recaptcha_placed) {
                            $('head').append("\<script src='https://www.google.com/recaptcha/api.js'\>\<\/script\>");
                        }
                    },
    updated     :   function()
                    {

                    }
}
</script>
