<template>
    <form class="landing-form" v-on:submit="submit">
        <h2 class="is-1 title">{{title}}</h2>
        <div class="fields">
            <div class="columns field">
                <div class="column">
                    <label class="label">First name</label>
                    <div class="control has-icons-left">
                        <input v-model="first_name" class="input is-large" type="text" name="first_name" placeholder="e.g John">
                        <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Surname</label>
                    <div class="control has-icons-left">
                        <input v-model="surname" class="input is-large" type="text" name="surname" placeholder="e.g Doe">
                        <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                    </div>
                </div>
            </div>
            <div class="columns field">
                <div class="column">
                    <label class="label">Contact number</label>
                    <div class="control has-icons-left">
                        <input v-model="phone" class="input is-large" type="text" name="contact_number" placeholder="e.g 021 xxx xxxxx">
                        <span class="icon is-small is-left"><i class="fas fa-phone"></i></span>
                    </div>
                </div>
                <div class="column">
                    <label class="label">Email</label>
                    <div class="control has-icons-left">
                        <input v-model="email" class="input is-large" type="email" name="email" placeholder="e.g. john_doe@gmail.com">
                        <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="actions field">
            <button class="button is-gold is-large">Book Now</button>
        </div>
    </form>
</template>
<script>
export default
{
    name        :   'LandingForm',
    data        ()  {
                        return  {
                                    first_name  :   'Leo',
                                    surname     :   'Chen',
                                    phone       :   '0800 838383',
                                    email       :   'leochenftw@gmail.com'
                                };
                    },
    props       :   [
                        'title'
                    ],
    // propsData: {},
    // computed: {},
    methods     :   {
                        submit      (e) {
                                            e.preventDefault();
                                            global.consultation_form.first_name =   this.first_name;
                                            global.consultation_form.surname    =   this.surname;
                                            global.consultation_form.phone      =   this.phone;
                                            global.consultation_form.email      =   this.email;
                                            global.consultation_form.show       =   true;
                                        }
                    },
    // watch: {},
    // Options / DOM
    // el () {},
    // template: '',
    // render () {},
    // Options / Lifecycle Hooks
    // beforeCreate () {},
    // created () {},
    // beforeMount () {},
    // mounted () {},
    // beforeUpdate () {},
    // updated () {},
    // activated () {},
    // deactivated () {},
    // beforeDestroy () {},
    // destroyed () {},
    // Options / Assets
    // directives: {},
    // filters: {},
    // components: {},
    // Options / Misc
    // parent: null,
    // mixins: [],
    // name: '',
    // extends: {},
    // delimiters: [ '{{', '}}' ],
    // functional: false
}
</script>
