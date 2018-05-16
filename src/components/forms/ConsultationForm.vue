<template>
    <form :class="['consultation-form modal', {'is-active': show}]" method="post" enctype="multipart/form-data">
        <div class="modal-background" v-on:click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title is-uppercase">Book Your Consultation</p>
                <button class="delete" aria-label="close" v-on:click="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <p>Please provide as much relevant information about your inquiry as possible to better utilise your booking.</p>
                    <p><em>Fields marked with an <span class="color-is-red">*</span> are required</em></p>
                </div>
                <div class="columns field">
                    <div class="column">
                        <label class="label"><span class="color-is-red">*</span> First name</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" name="first_name" placeholder="e.g John">
                            <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                        </div>
                        <p class="help" v-if="errors.fullname">This is a help text</p>
                    </div>
                    <div class="column">
                        <label class="label"><span class="color-is-red">*</span> Surname</label>
                        <div class="control has-icons-left has-icons-right">
                            <input class="input" type="text" name="surname" placeholder="e.g Doe">
                            <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                        </div>
                        <p class="help" v-if="errors.surname">This is a help text</p>
                    </div>
                </div>

                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> Contact Number</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" name="contact_number" placeholder="e.g 021 xxx xxxxx">
                        <span class="icon is-small is-left"><i class="fas fa-phone"></i></span>
                    </div>
                    <p class="help" v-if="errors.contact">This is a help text</p>
                </div>

                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="email" name="email" placeholder="e.g. john_doe@gmail.com">
                        <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                    </div>
                    <p class="help" v-if="errors.email">This is a help text</p>
                </div>
                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> What VISA do you currently hold?</label>
                    <div class="control">
                        <div class="select">
                            <select v-on:change="show_specify" name="visa_current">
                                <option>- Choose VISA category -</option>
                                <template v-for="category in visa_categories">
                                    <optgroup v-if="category.subs" :label="category.title">
                                        <option v-for="sub_category in category.subs" :value="[category.title + ' - ' + sub_category.title]">{{sub_category.title}}</option>
                                    </optgroup>
                                    <option v-else :value="category.title">{{category.title}}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                    <div class="control" v-if="other_visa.current">
                        <input class="input" type="text" name="other_current_visa" placeholder="Please specify">
                    </div>
                    <p class="help" v-if="other_visa.current && errors.visa_current">This is a help text</p>
                </div>
                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> What VISA are you intend to apply?</label>
                    <div class="control">
                        <div class="select">
                            <select v-on:change="show_specify" name="visa_intend">
                                <option>- Choose VISA category -</option>
                                <template v-for="category in visa_categories">
                                    <optgroup v-if="category.subs" :label="category.title">
                                        <option v-for="sub_category in category.subs" :value="[category.title + ' - ' + sub_category.title]">{{sub_category.title}}</option>
                                    </optgroup>
                                    <option v-else :value="category.title">{{category.title}}</option>
                                </template>
                            </select>
                        </div>
                    </div>
                    <div class="control" v-if="other_visa.intend">
                        <input class="input" type="text" name="other_intend_visa" placeholder="Please specify">
                    </div>
                    <p class="help" v-if="other_visa.intend && errors.visa_intend">This is a help text</p>
                </div>

                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> What's your current situation?</label>
                    <div class="control">
                        <textarea class="textarea" name="current_situation" placeholder="Textarea"></textarea>
                    </div>
                    <p class="help" v-if="errors.situation">This is a help text</p>
                </div>

                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> Additional information</label>
                    <div class="control">
                        <textarea class="textarea" name="additional_info" placeholder="Textarea"></textarea>
                    </div>
                    <p class="help" v-if="errors.additional_info">This is a help text</p>
                </div>

                <div class="field">
                    <label class="label">Passport Bio Page</label>
                    <div class="control">
                        <div class="file has-name">
                            <label class="file-label">
                                <input class="file-input" type="file" name="passport_bio" accept="image/*,application/pdf">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                                <span class="file-name">
                                    Please choose to upload your copy
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Current Visa Label/eVisa</label>
                    <div class="control">
                        <div class="file has-name">
                            <label class="file-label">
                                <input class="file-input" type="file" name="visa_label" accept="image/*,application/pdf">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                                <span class="file-name">
                                    Please choose to upload your copy
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> Date/time of the Appointment</label>
                    <div class="control">
                        <div class="select">
                            <select name="appointment_date_time" v-on:change="appointment_time_change">
                                <option value="-1">- Pick a time slot -</option>
                                <option v-for="session in sessions" :value="session.id">{{session.dt}}</option>
                                <option value="0">Arrange for me</option>
                            </select>
                        </div>
                    </div>
                    <p class="help">{{date_help}}</p>
                </div>
            </section>
            <footer class="modal-card-foot">
                <input type="hidden" name="csrf" :value="csrf" />
                <button
                    v-on:click="onclick"
                    :class="['button', 'is-gold', 'g-recaptcha', {'is-loading': is_loading}]"
                    data-sitekey="6Lc8BlgUAAAAACwpqCYajCkQEihsnSui-vcVtgW_"
                    data-callback="fire_consultation">
                    Submit
                </button>
                <button class="button">Cancel</button>
            </footer>
        </div>
    </form>
</template>

<script>

export default
{
    name        :   'ConsultationForm',
    props       :   [

                    ],
    data        :   function()
                    {
                        return  {
                                    show            :   true,
                                    endpoint        :   global.base_url + '/api/form/book-consultation',
                                    is_loading      :   false,
                                    has_sent        :   false,
                                    csrf            :   null,
                                    sessions        :   [],
                                    other_visa      :   {
                                                            current         :   false,
                                                            intend          :   false
                                                        },
                                    date_help       :   'We only display the next 10 coming up sessions',
                                    errors          :   {
                                                            fullname        :   false,
                                                            surname         :   false,
                                                            contact         :   false,
                                                            email           :   false,
                                                            visa_current    :   false,
                                                            visa_intend     :   false,
                                                            situation       :   false,
                                                            additional_info :   false
                                                        },
                                    visa_categories :   null
                                };
                    },
    components  :   {  },
    methods     :   {
                        appointment_time_change     :   function(e)
                                                        {
                                                            let selected            =   $(e.target).find('option:selected'),
                                                                me                  =   this,
                                                                val                 =   selected.val().toFloat();

                                                            me.date_help            =   'If none of the available sessions suits your schedule, please choose "Arrange for me"';

                                                            if (val > 0) {
                                                                me.date_help        =   'We will try to book you in yoru desired session, but we might contact you for rearrangement in some occasions.';
                                                            } else if (val < 0) {
                                                                me.date_help        =   'We will contact you to arrange a suitable time.';
                                                            }

                                                        },
                        show_specify                :   function(e)
                                                        {
                                                            let selected            =   $(e.target).find('option:selected'),
                                                                key                 =   e.target.name.replace(/visa_/gi, ''),
                                                                me                  =   this;

                                                            me.other_visa[key]      =   false;
                                                            if (selected.val() == 'other') {
                                                                me.other_visa[key]  =   true;
                                                            }
                                                        },
                        close                       :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            this.show               =   false;
                                                            $('html').removeClass('is-locked');
                                                        },
                        onclick                     :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            this.is_loading         =   true;
                                                        },
                        submit                      :   function(e)
                                                        {
                                                            if (e && e.preventDefault) {
                                                                e.preventDefault();
                                                            }

                                                            let data                =   new FormData(this.$el),
                                                                me                  =   this;
                                                            axios.post(this.endpoint, data).then(function(response)
                                                            {
                                                                me.is_loading       =   false;
                                                                me.has_sent         =   true;
                                                            });
                                                        }
                    },
    mounted     :   function()
                    {
                        global.fire_consultation    =   this.submit;
                        if (!global.recaptcha_placed) {
                            $('head').append("\<script src='https://www.google.com/recaptcha/api.js'\>\<\/script\>");
                        }
                    },
    updated     :   function()
                    {

                    }
}
</script>
