<template>
    <section id="section-contact" class="section-contact jarallax-section">
        <div class="section-contact__hero jarallax">
            <img class="jarallax-img" :src="hero" alt="">
            <h2 class="title is-1 is-absolute-centered">{{title}}</h2>
        </div>
        <div class="container">
            <div class="section-contact__branches">
                <Branch
                    v-for="(item, i) in branches"
                    :key="i"
                    :index="i"
                    :title="item.title"
                    :physical="item.physical"
                    :pobox="item.pobox"
                    :email="item.email"
                    :options="item.options"
                    :lat="item.lat"
                    :lng="item.lng"
                    :url="item.url"
                />
            </div>
            <div class="section-contact__contact-form columns">
                <div class="column is-5">
                    <h3 class="title is-3 is-uppercase">Say hello</h3>
                    <div class="content" v-html="content"></div>
                </div>
                <div class="column">
                    <ContactForm :csrf="csrf" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Branch from '../elements/Branch';
import ContactForm from '@/components/forms/ContactForm';
export default
{
    name        :   'SectionContact',
    props       :   [
                        'title',
                        'hero',
                        'content',
                        'branches',
                        'csrf'
                    ],
    data        :   function()
                    {
                        return  {

                                };
                    },
    components  :   {
                        Branch,
                        ContactForm
                    },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {

                    }
}
</script>
