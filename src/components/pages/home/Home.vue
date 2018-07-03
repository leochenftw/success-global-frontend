<template>
    <div id="content-area">
        <h1 id="page-title" class="title is-1" style="display: none;">{{title}}</h1>
        <div id="carousel-wrapper">
            <div id="carousel" class="owl-carousel owl-theme">
                <CarouselItem
                    v-for="(item, i) in carousel"
                    :key="i"
                    :bg="item.background"
                    :title="item.title"
                    :content="item.content"
                    :link="item.link"
                    :bg_only="true"
                />
            </div>
            <PopForm />
            <!-- <LandingForm
                :title="slogan"
            /> -->
        </div>
        <SectionAbout
            v-if="section_about"
            :title="section_about.title"
            :hero="section_about.hero"
            :intro="section_about.intro"
            :image="section_about.image"
            :left_col="section_about.left_col"
            :right_col="section_about.right_col"
            :highlights="section_testimonials.highlights"
        />
        <SectionService
            v-if="section_services"
            :title="section_services.title"
            :content="section_services.content"
            :hero="section_services.hero"
            :services="section_services.categories"
        />
        <SectionPoD
            v-if="section_pod"
            :title="section_pod.title"
            :hero="section_pod.hero"
            :content="section_pod.content"
            :points="section_pod.points"
        />
        <SectionTestimonials
            v-if="section_testimonials"
            :title="section_testimonials.title"
            :content="section_testimonials.content"
            :hero="section_testimonials.hero"
            :section_url="section_testimonials.section_url"
            :testimonials="section_testimonials.testimonials"
            :highlights="section_testimonials.highlights"
        />
        <SectionTeam
            v-if="section_team"
            :title="section_team.title"
            :hero="section_team.hero"
            :content="section_team.content"
            :branches="section_team.branches"
        />
        <SectionContact
            v-if="section_contact"
            :title="section_contact.title"
            :hero="section_contact.hero"
            :content="section_contact.content"
            :branches="section_contact.branches"
            :csrf="csrf"
        />
    </div>
</template>

<script>
import CarouselItem from './elements/CarouselItem';
import SectionService from './blocks/SectionService';
import SectionAbout from './blocks/SectionAbout';
import SectionTestimonials from './blocks/SectionTestimonials';
import SectionTeam from './blocks/SectionTeam';
import SectionContact from './blocks/SectionContact';
import LandingForm from '@/components/forms/LandingForm';
import SectionPoD from './blocks/SectionPoD';
import PopForm from './blocks/PopForm';
import 'owl.carousel';
export default
{
    name        :   'Home',
    data        :   function()
                    {
                        return  {
                                    title                       :   '',
                                    slogan                      :   '',
                                    carousel                    :   [],
                                    section_services            :   null,
                                    section_about               :   null,
                                    section_testimonials        :   null,
                                    section_pod                 :   null,
                                    section_team                :   null,
                                    section_contact             :   null,
                                    csrf                        :   null
                                };
                    },
    components  :   {
                        CarouselItem,
                        SectionService,
                        SectionAbout,
                        SectionTestimonials,
                        SectionTeam,
                        SectionContact,
                        LandingForm,
                        PopForm,
                        SectionPoD
                    },
    created     :   function()
                    {
                        global.show_form                        =   this.$route.query.state ? true : false;
                    },
    mounted     :   function()
                    {
                        let me                                  =   this;
                        global.getdata(
                            me.$route.path,
                            function(data)
                            {
                                me.title                        =   data.title;
                                me.csrf                         =   data.csrf;
                                me.slogan                       =   data.slogan;
                                me.carousel                     =   data.carousel;
                                me.carousel.forEach(function(o)
                                {
                                    o.background                =   base_url + o.background;
                                    if (o.link && o.link.url) {
                                        o.link.url              =   base_prefix + o.link.url;
                                    }
                                });

                                me.section_services             =   data.services;
                                me.section_services.categories.forEach(function(o)
                                {
                                    if (o.background) {
                                        if (o.background.indexOf('http') != 0) {
                                            o.background            =   base_url + o.background;
                                        }
                                        if (o.link && o.link.url) {
                                            o.link.url          =   (process.env.NODE_ENV == 'development' ? '/#' : '/!/#') + o.link.url;
                                        }
                                    }
                                });

                                if (me.section_services.hero) {
                                    me.section_services.hero    =   base_url + me.section_services.hero;
                                }

                                me.section_about                =   data.about_us;
                                if (me.section_about.hero) {
                                    me.section_about.hero       =   base_url + me.section_about.hero;
                                }

                                if (me.section_about.image) {
                                    me.section_about.image      =   base_url + me.section_about.image;
                                }

                                me.section_testimonials         =   data.testimonials;
                                me.section_testimonials.hero    =   base_url + me.section_testimonials.hero;

                                me.section_team                 =   data.team;
                                me.section_pod                  =   data.points_of_diff;

                                if (me.section_team.hero) {
                                    me.section_team.hero        =   base_url + me.section_team.hero;
                                }

                                var branches                    =   {};
                                me.section_team.team_members.forEach(function(o)
                                {
                                    for (var key in o.portraits)
                                    {
                                        o.portraits[key]        =   base_url + o.portraits[key];
                                    }

                                    if (!branches[o.branch]) {
                                        branches[o.branch]      =   [];
                                    }

                                    branches[o.branch].push(o);
                                });

                                me.section_team.branches        =   [];

                                for (var branch in branches)
                                {
                                    var branch_object           =   {
                                                                        'title'     :   branch,
                                                                        'list'      :   branches[branch]
                                                                    };

                                    me.section_team.branches.push(branch_object);
                                }

                                me.section_contact              =   data.contact;
                                if (me.section_contact.hero) {
                                    me.section_contact.hero     =   base_url + me.section_contact.hero;
                                }

                            }
                        );
                    },
    updated     :   function()
                    {
                        let me      =   this,
                            theowl  =   $('#carousel').owlCarousel(
                                        {
                                            items                       :   1,
                                            lazyLoad                    :   true,
                                            loop                        :   me.carousel.length > 1,
                                            nav                         :   false,
                                            dots                        :   me.carousel.length > 1,
                                            smartSpeed                  :   1000,
                                            autoplay                    :   me.carousel.length > 1,
                                            autoplayTimeout             :   6000,
                                            autoplayHoverPause          :   true
                                        }).on('loaded.owl.lazy', function(e)
                                        {
                                            theowl.trigger('play.owl.autoplay');
                                            var slide           =   $(e.target).find('img[src="' + e.url + '"]').parent().parent();
                                            slide.css('background-image', 'url(' + e.url + ')');
                                        }).on('drag.owl.carousel', function(e)
                                        {
                                            // me.pressed                  =   true;
                                            // document.ontouchmove        =   function(e)
                                            //                                 {
                                            //                                     e.preventDefault();
                                            //                                 }
                                        }).on('dragged.owl.carousel', function(e)
                                        {
                                            // me.pressed                  =   true;
                                            // document.ontouchmove        =   function(e)
                                            //                                 {
                                            //                                     return true;
                                            //                                 }
                                        }).on('translate.owl.carousel', function(e)
                                        {
                                            // me.pressed                  =   true;
                                        }).on('translated.owl.carousel', function(e)
                                        {
                                            // if (!window.fingerdown) {
                                            //     me.pressed              =   false;
                                            // }
                                        }).trigger('drag.owl.carousel').trigger('dragged.owl.carousel').trigger('stop.owl.autoplay');
                    }
}
</script>
