// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Header from './components/Header';
import Footer from './components/Footer';
import router from './router';
import TeamMemberModal from './components/modals/TeamMemberModal';
import ConsultationForm from './components/forms/ConsultationForm';
import LoadingOverlay from './components/LoadingOverlay';
import axios from 'axios';
require('lightbox2');
require('jquery-visible');
require('jquery.scrollto');
require('./plugins/jplugins');

axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};

Vue.config.productionTip    =   false;
global.axios                =   axios;
global.header               =   null;
global.main                 =   null;
global.testimonials         =   [];
global.footer               =   null;
global.base_url             =   location.hostname == 'localhost' ? 'https://sgl.leochen.co.nz' : '';
global.base_prefix          =   '/#';
global.recaptcha_placed     =   false;
global.fire_contactform     =   null;
global.fire_consultation    =   null;
global.consultation_form    =   null;
global.overlay              =   null;
global.disable_scroll       =   false;
global.getdata              =   function(path, onDone, onFail)
                                {
                                    axios.get(global.base_url + path)
                                    .then(function (response)
                                    {
                                        let data                                    =   response.data;
                                        if (onDone) {
                                            onDone(data);
                                        }

                                        global.header.navigation                    =   data.navigation.map(function(o)
                                        {
                                            o.url                                   =   '/#' + o.url;
                                            return o;
                                        });
                                        global.main.title                           =   data.title;
                                        global.main.hero                            =   data.hero;
                                        global.main.hero_text                       =   data.hero_text;
                                        global.footer.sitename                      =   data.sitename;
                                        global.footer.contact                       =   data.contact.branches;
                                        global.footer.news                          =   data.news;
                                        global.footer.slogan                        =   data.footer_slogan;
                                        global.consultation_form.csrf               =   data.csrf;
                                        global.consultation_form.visa_categories    =   data.visa_categories;
                                    })
                                    .catch(function (error)
                                    {
                                        if (onFail) {
                                            onFail(error);
                                        }
                                    }).then(function (data)
                                    {
                                        let get_last_segment        =   function(path)
                                                                        {
                                                                            let sg      =   path.split('/'),
                                                                                classes =   '';

                                                                            sg.forEach(function(o)
                                                                            {
                                                                                if (o.trim().length > 0) {
                                                                                    classes += o.trim() + ' ';
                                                                                }
                                                                            });

                                                                            return 'section-' + classes.trim();
                                                                        },
                                            body_class              =   path == '/' ? 'home' : get_last_segment(path);

                                        $('body').removeAttr('class').addClass(body_class);

                                        if (body_class == 'home') {
                                            global.header.is_home   =   true;
                                        } else {
                                            global.header.is_home   =   false;
                                        }

                                        setTimeout(function()
                                        {
                                            global.overlay.fade     =   true;
                                            setTimeout(function()
                                            {
                                                global.overlay.show =   false;
                                            }, 300);
                                        }, 100);
                                    });
                                };
/* eslint-disable no-new */
let header      =   new Vue(
                    {
                        el          :   '#header',
                        router,
                        template    :   '<Header />',
                        components  :   { Header },
                        methods     :   {
                                            getHeader                   :   function()
                                                                            {
                                                                                return this.$children[0];
                                                                            }
                                        },
                        mounted     :   function()
                                        {
                                            global.header               =   this.$children[0];
                                        }
                    }),

    main        =   new Vue(
                    {
                        el          :   '#app',
                        router,
                        template    :   '<App />',
                        components  :   { App },
                        mounted     :   function()
                                        {
                                            global.main                 =   this.$children[0];
                                        }
                    }),
    footer      =   new Vue(
                    {
                        el          :   '#footer',
                        router,
                        template    :   '<Footer />',
                        components  :   { Footer },
                        mounted     :   function()
                                        {
                                            global.footer               =   this.$children[0];
                                        }
                    }),
    team_modal  =   new Vue(
                    {
                        el          :   '#team-member-modal',
                        template    :   '<TeamMemberModal />',
                        components  :   { TeamMemberModal },
                        mounted     :   function()
                                        {
                                            global.team_modal           =   this.$children[0];
                                        }
                    }),
    consul_form =   new Vue(
                    {
                        el          :   '#consultation-form',
                        template    :   '<ConsultationForm />',
                        components  :   { ConsultationForm },
                        mounted     :   function()
                                        {
                                            global.consultation_form    =   this.$children[0];
                                        }
                    }),
    overlay     =   new Vue(
                    {
                        el          :   '#loading-overlay',
                        template    :   '<LoadingOverlay />',
                        components  :   { LoadingOverlay },
                        mounted     :   function()
                                        {
                                            global.overlay              =   this.$children[0];
                                        }
                    });

$(window).scroll(function(e)
{
    global.testimonials.forEach(function(t)
    {
        t.is_visible();
    });
}).scroll();
