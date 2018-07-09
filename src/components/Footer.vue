<template>
    <footer id="footer" :class="['footer', {'is-loading': is_loading}]">
        <div class="footer__misc container">
            <div class="columns">
                <div class="column">
                    <h2 class="title is-6 is-uppercase">
                        <img src="../assets/logo-white.png" alt="Sucess Global" width="88" height="50">
                    </h2>
                    <div class="content">
                        <p v-if="slogan">{{slogan}}</p>
                    </div>
                    <a href="#" v-on:click="show_consultation" class="button is-gold">Request Consultation</a>
                </div>
                <div class="column">
                    <h2 class="title is-6 is-uppercase">
                        Quick links
                    </h2>
                    <div class="columns">
                        <div class="column">
                            <ul>
                                <li><a href="#">Link</a></li>
                            </ul>
                        </div>
                        <div class="column">
                            <ul>
                                <li><a href="#">Link</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="column footer__misc__menu">
                    <h2 class="title is-6 is-uppercase">
                        Contact us
                    </h2>
                    <ul v-if="contact">
                        <li v-for="option in contact[0].options" class="is-relative">
                            <span v-if="option.icon" class="icon"><i :class="option.icon"></i></span>
                            <strong v-else>{{option.title}} :</strong>
                            <p>
                                <a :href="make_phone(option.phone, option.protocol, option.params)">{{option.phone}}</a>
                            </p>
                        </li>
                        <li class="is-relative">
                            <span class="icon"><i class="fas fa-envelope"></i></span>
                            <p><a :href="['mailto:' + contact[0].email]">{{contact[0].email}}</a></p>
                        </li>
                        <li class="is-relative">
                            <span class="icon"><i class="fas fa-map-marker"></i></span>
                            <p><a :href="contact[0].url" target="_blank" v-html="contact[0].physical"></a></p>
                        </li>
                    </ul>
                </div>
                <div class="column footer__misc__news-list">
                    <h2 class="title is-6 is-uppercase">
                        Latest updates
                    </h2>
                    <ul v-if="news">
                        <li v-for="item in news">
                            <a class="columns footer__misc__news is-mobile" :href="[base_prefix + item.url]">
                                <div class="footer__misc__news__thumb column is-narrow">
                                    <img :src="[base_url + item.thumb]" width="50" height="50" />
                                </div>
                                <div class="footer__misc__news__content column">
                                    <h3 class="title is-6">{{item.title}}</h3>
                                    <p class="subtitle is-6">{{nzst(item.date)}}</p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="footer__closure container">
            <div class="columns">
                <div class="column copyright-social-links">
                    <a class="social-link" href="https://www.facebook.com/successglobalnewzealand" target="_blank">
                        <span class="icon"><i class="fab fa-facebook-f"></i></span>
                    </a>
                    <a class="social-link" href="https://twitter.com/SuccessGlobalNZ" target="_blank">
                        <span class="icon"><i class="fab fa-twitter"></i></span>
                    </a>
                    <span class="copyright">{{get_year()}} © {{sitename}}.</span>
                </div>
                <div class="column recaptcha has-text-right">
                    protected by <a href="#">reCAPTCHA</a></a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

export default
{
    name        :   'Footer',
    props       :   [

                    ],
    data        :   function()
                    {
                        return  {
                                    base_url        :   global.base_url,
                                    base_prefix     :   global.base_prefix,
                                    slogan          :   null,
                                    contact         :   null,
                                    social_medias   :   [],
                                    news            :   [],
                                    sitename        :   null,
                                    is_loading      :   false
                                };
                    },
    components  :   {  },
    watch       :   {
                        contact             :   function(newVal, oldVal)
                                                {
                                                    this.$bus.$emit('DataFed', newVal);
                                                }
                    },
    methods     :   {
                        show_consultation   :   function(e)
                                                {
                                                    e.preventDefault();
                                                    global.consultation_form.show   =   true;
                                                    global.disable_scroll           =   true;
                                                    $('html').addClass('is-locked');
                                                },
                        make_phone          :   function(number, protocol, params)
                                                {
                                                    return protocol + number + (params ? ('?' + params) : '');
                                                },
                        get_year            :   function()
                                                {
                                                    var d           =   new Date();

                                                    return d.getFullYear();
                                                },
                        nzst                :   function(raw)
                                                {
                                                    var d           =   new Date(raw);
                                                    return d.nzst();
                                                }
                    },
    computed    :   {},
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {

                    }
}
</script>
