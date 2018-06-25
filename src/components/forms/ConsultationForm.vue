<template>
    <div v-if="expired" :class="['modal', {'is-active': show}]">
        <div class="modal-background" v-on:click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title is-uppercase">Booking expired</p>
            </header>
            <section class="modal-card-body has-text-centered">
                <p>Sorry, it seems your last booking has expired. Please click the <strong>OK</strong> button to re-apply.</p><p><br />Thanks!</p>
            </section>
            <footer class="modal-card-foot has-text-centered">
                <button v-on:click="reset" class="button is-medium is-gold">OK</button>
            </footer>
        </div>
    </div>
    <div v-else-if="ref && paid" :class="['modal', {'is-active': show}]">
        <div class="modal-background" v-on:click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title is-uppercase">Your Booking Reference</p>
            </header>
            <section class="modal-card-body has-text-centered">
                <p class="title is-1 is-bold">{{ref}}</p>
                <p class="subtitle is-7">The <strong>reference number</strong> has been emailed to you too.<br />Please check your inbox.</p>
            </section>
            <footer class="modal-card-foot has-text-centered">
                <button v-on:click="reset" class="button is-medium is-gold">Book another</button>
                <button v-on:click="close" class="button is-medium">Close</button>
            </footer>
        </div>
    </div>
    <div v-else-if="ref && !paid" :class="['modal', {'is-active': show}]">
        <div class="modal-background" v-on:click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title is-uppercase"><template v-if="pay_link">Payment</template><template v-else>Retrieving details</template></p>
            </header>
            <section class="modal-card-body has-text-centered">
                <template v-if="pay_link">
                <p class="subtitle is-5">REF: <a href="#" class="colour-is-gold">{{ref}}</a></p>
                <p class="title is-1 is-bold">{{amount}}</p>
                <p class="subtitle is-7">You will be taken to the payment page after clicking the <strong class="colour-is-gold">Pay</strong> button</p>
                </template>
                <template v-else>
                    <p>Just a moment...</p>
                </template>
            </section>
            <footer class="modal-card-foot has-text-centered">
                <button v-on:click="pay" :class="['button is-medium', {'is-gold': pay_link}, {'is-loading': !pay_link}]">Pay</button>
            </footer>
        </div>
    </div>
    <div v-else-if="!ref && sessions && sessions.length == 0 && !paid" :class="['modal', {'is-active': show}]">
        <div class="modal-background" v-on:click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title is-uppercase">No session available</p>
            </header>
            <section class="modal-card-body has-text-centered">
                <div class="content">
                    <p>Sorry, it seems that we do not have any available session at this stage.</p>
                    <p>You can either check back later, or <a href="#" v-on:click="goto_contact">contact us</a> to discuss.</p>
                </div>
            </section>
            <footer class="modal-card-foot has-text-centered">
                <button v-on:click="close" class="button is-medium is-gold">OK</button>
            </footer>
        </div>
    </div>
    <form v-else-if="!ref && sessions && sessions.length > 0 && !paid" :class="['consultation-form modal', {'is-active': show}]" method="post" enctype="multipart/form-data">
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
                        <div class="control has-icons-left">
                            <input v-model="first_name" class="input" type="text" name="first_name" placeholder="e.g John">
                            <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                        </div>
                        <p class="help" v-if="errors.first_name">This is a help text</p>
                    </div>
                    <div class="column">
                        <label class="label"><span class="color-is-red">*</span> Surname</label>
                        <div class="control has-icons-left">
                            <input v-model="surname" class="input" type="text" name="surname" placeholder="e.g Doe">
                            <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                        </div>
                        <p class="help" v-if="errors.surname">This is a help text</p>
                    </div>
                </div>

                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> Contact Number</label>
                    <div class="control has-icons-left">
                        <input v-model="phone" class="input" type="text" name="contact_number" placeholder="e.g 021 xxx xxxxx">
                        <span class="icon is-small is-left"><i class="fas fa-phone"></i></span>
                    </div>
                    <p class="help" v-if="errors.contact">This is a help text</p>
                </div>

                <div class="field">
                    <label class="label"><span class="color-is-red">*</span> Email</label>
                    <div class="control has-icons-left">
                        <input v-model="email" class="input" type="email" name="email" placeholder="e.g. john_doe@gmail.com">
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
                    <label class="label"><span class="color-is-red">*</span> Date/time of the Appointment</label>
                    <div class="control">
                        <div class="select">
                            <select name="appointment_date_time" v-on:change="appointment_time_change">
                                <option value="-1">- Pick a session -</option>
                                <option v-for="session in sessions" :data-amount="session.amount" :value="session.id">{{session.dt}}, {{session.duration}} minutes , ${{session.amount}}</option>
                            </select>
                        </div>
                    </div>
                    <p class="help">{{date_help}}</p>
                </div>

                <div class="columns">
                    <div class="field column is-half">
                        <label class="label">Passport Bio Page</label>
                        <div class="control">
                            <div class="file has-name is-boxed">
                                <label class="file-label">
                                    <input v-on:change="on_file_change" class="file-input" type="file" name="passport_bio" accept="image/*,application/pdf">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label has-text-centered">
                                            Choose a file…
                                        </span>
                                    </span>
                                    <span class="file-name has-text-centered">{{pass_fn}}</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div class="field column is-half">
                        <label class="label">Current Visa Label/eVisa</label>
                        <div class="control">
                            <div class="file has-name is-boxed">
                                <label class="file-label">
                                    <input v-on:change="on_file_change" class="file-input" type="file" name="visa_label" accept="image/*,application/pdf">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label has-text-centered">
                                            Choose a file…
                                        </span>
                                    </span>
                                    <span class="file-name has-text-centered">{{visa_fn}}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer class="modal-card-foot">
                <input type="hidden" name="csrf" :value="csrf" />
                <span class="is-block amount-due is-bold">
                    {{amount}}
                </span>
                <div class="modal-card-foot__buttons">
                    <!-- <button
                        v-if="!is_dev"
                        v-on:click="onclick"
                        :class="['button is-medium', 'is-gold', {'is-loading': is_loading}]">
                        Submit
                    </button> -->
                    <button
                        v-on:click="onclick"
                        :class="['button is-medium', 'is-gold', 'g-recaptcha', {'is-loading': is_loading}]"
                        data-sitekey="6Lc8BlgUAAAAACwpqCYajCkQEihsnSui-vcVtgW_"
                        data-callback="fire_consultation">
                        Submit
                    </button>
                    <button v-on:click="close" class="button is-medium">Cancel</button>
                </div>
            </footer>
        </div>
    </form>
    <div v-else-if="sessions && ref && paid" :class="['modal', {'is-active': show}]">
        <div class="modal-background" v-on:click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title is-uppercase">Your Booking Reference</p>
            </header>
            <section class="modal-card-body has-text-centered">
                <p class="title is-1 is-bold">{{ref}}</p>
                <p class="subtitle is-7">The <strong>reference number</strong> has been emailed to you too.<br />Please check your inbox.</p>
            </section>
            <footer class="modal-card-foot has-text-centered">
                <button v-on:click="close" class="button is-medium">Close</button>
            </footer>
        </div>
    </div>
    <div v-else :class="['modal', {'is-active': show}]">
        <div class="modal-background" v-on:click="close"></div>
        <div class="modal-card">
            <header class="modal-card-head has-text-centered">
                <p class="modal-card-title is-uppercase">Checking our schedule</p>
            </header>
            <section class="modal-card-body has-text-centered">
                <p>Just a moment...</p>
            </section>
            <footer class="modal-card-foot has-text-centered">
                <button class="button is-loading">Close</button>
            </footer>
        </div>
    </div>
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
                                    ref             :   null,
                                    pay_link        :   null,
                                    expires_at      :   null,
                                    expiring_in     :   null,
                                    expired         :   false,
                                    show            :   false,
                                    endpoint        :   global.base_url + '/api/form/book-consultation',
                                    is_loading      :   false,
                                    is_dev          :   process.env.NODE_ENV == 'development',
                                    paid            :   false,
                                    csrf            :   null,
                                    first_name      :   '',
                                    surname         :   '',
                                    phone           :   '',
                                    email           :   '',
                                    sessions        :   null,
                                    pass_fn         :   'Please choose to upload your copy',
                                    visa_fn         :   'Please choose to upload your copy',
                                    amount          :   '$0.00',
                                    other_visa      :   {
                                                            current         :   false,
                                                            intend          :   false
                                                        },
                                    date_help       :   'We only display the next 10 coming up sessions. If none of the available sessions suits your schedule, please choose "Arrange for me"',
                                    errors          :   {
                                                            first_name      :   false,
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
    components  :   {},
    watch       :   {
                        show                        :   function(newVal, oldVal)
                                                        {
                                                            if (this.show) {
                                                                this.get_sessions();
                                                                $('head').append("\<script src='https://www.google.com/recaptcha/api.js'\>\<\/script\>");
                                                                if (this.ref && !this.pay_link) {
                                                                    this.retrieve_booking();
                                                                }
                                                            }
                                                        }
                    },
    methods     :   {
                        goto_contact                :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            this.close();
                                                            global.contact_form.first_name  =   this.first_name;
                                                            global.contact_form.last_name   =   this.surname;
                                                            global.contact_form.email       =   this.email;
                                                            $('body').scrollTo($('#section-contact .section-contact__contact-form'), 500, {axis: 'y', offset: -109});
                                                        },
                        reset                       :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            this.ref                    =   null;
                                                            this.pay_link               =   null;
                                                            this.expires_at             =   null;
                                                            this.expiring_in            =   null;
                                                            this.expired                =   false;
                                                            this.is_loading             =   false;
                                                            this.paid                   =   false;
                                                            delete window.localStorage.booking_ref;
                                                            this.get_sessions();
                                                        },
                        expirechk                   :   function()
                                                        {
                                                            if (this.expires_at) {
                                                                this.expiring_in        =   0.001 * (this.expires_at - Date.now());
                                                                if (this.expiring_in <= 0) {
                                                                    this.expiry_handler();
                                                                }
                                                            }
                                                        },
                        read_ref                    :   function()
                                                        {
                                                            let ref                     =   window.localStorage ? window.localStorage.booking_ref : null;
                                                            if (ref) {
                                                                this.ref                =   ref;
                                                            }
                                                        },
                        retrieve_booking            :   function()
                                                        {
                                                            let me                      =   this;
                                                            if (this.ref) {
                                                                axios.get(base_url + '/api/booking/' + this.ref)
                                                                .then(function(response)
                                                                {
                                                                    if (response.data) {
                                                                        me.pay_link     =   response.data.pay_link;
                                                                        me.amount       =   response.data.amount.toDollar();
                                                                        me.expires_at   =   response.data.expires_at.toDate();
                                                                        me.paid         =   response.data.paid;
                                                                        if (!me.paid) {
                                                                            me.expirechk();
                                                                        }
                                                                    } else {
                                                                        me.expiry_handler();
                                                                    }
                                                                });
                                                            }
                                                        },
                        expiry_handler              :   function()
                                                        {
                                                            let me                      =   this;
                                                            me.expired                  =   true;
                                                            if (window.localStorage) {
                                                                delete window.localStorage.booking_ref;
                                                            }

                                                            me.ref                      =   null;
                                                            me.pay_link                 =   null;
                                                            me.expires_at               =   null;
                                                        },
                        save_ref                    :   function()
                                                        {
                                                            if (window.localStorage) {
                                                                window.localStorage.booking_ref =   this.ref;
                                                            }
                                                        },
                        get_sessions                :   function()
                                                        {
                                                            let me                      =   this;
                                                            this.sessions               =   null;
                                                            axios.get(base_url + '/api/form/book-consultation')
                                                            .then((response) => {
                                                                me.sessions             =   response.data;
                                                                me.sessions.forEach(function(o)
                                                                {
                                                                    let d               =   new Date(o.dt);
                                                                    o.dt                =   d.nzst(true);
                                                                });
                                                            });
                                                        },
                        on_file_change              :   function(e)
                                                        {
                                                            if (e.target.files.length > 0) {
                                                                let fn              =   e.target.files[0].name;
                                                                if (e.target.name == 'passport_bio') {
                                                                    this.pass_fn    =   fn;
                                                                } else {
                                                                    this.visa_fn    =   fn;
                                                                }
                                                            }
                                                        },
                        appointment_time_change     :   function(e)
                                                        {
                                                            let selected            =   $(e.target).find('option:selected'),
                                                                me                  =   this,
                                                                val                 =   selected.val().toFloat(),
                                                                amount              =   selected.data('amount') ? selected.data('amount') : 0;

                                                            me.date_help            =   'We only display the next 10 coming up sessions. If none of the available sessions suits your schedule, please choose "Arrange for me"';

                                                            this.amount             =   amount.toDollar();

                                                            if (val > 0) {
                                                                me.date_help        =   'We will try to book you in your desired session, but we might contact you for rearrangement in some occasions.';
                                                            } else if (val == 0) {
                                                                me.date_help        =   'We will contact you to arrange a suitable time.';
                                                                this.amount         =   '* Price to be discussed *';
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
                                                            if (e) {
                                                                e.preventDefault();
                                                            }
                                                            this.show               =   false;
                                                            $('html').removeClass('is-locked');
                                                            global.disable_scroll   =   false;
                                                        },
                        onclick                     :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            if (!this.is_loading) {
                                                                this.is_loading     =   true;
                                                            }
                                                        },
                        submit                      :   function(e)
                                                        {
                                                            if (e && e.preventDefault) {
                                                                e.preventDefault();
                                                            }

                                                            if (!this.is_loading) {
                                                                this.is_loading     =   true;
                                                            }

                                                            let data                =   new FormData(this.$el),
                                                                me                  =   this;

                                                            $(me.$el).find('input[type="file"]').each(function(i, el)
                                                            {
                                                                if (el.files.length == 0) {
                                                                    data.delete(el.name);
                                                                }
                                                            });

                                                            axios.post(this.endpoint, data)
                                                            .then(function(response)
                                                            {
                                                                me.is_loading       =   false;
                                                                me.ref              =   response.data.reference;
                                                                me.pay_link         =   response.data.pay_link;
                                                                me.expires_at       =   response.data.expires_at.toDate();
                                                                me.save_ref();
                                                                me.expirechk();
                                                            });
                                                        },
                        pay                         :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            window.location.replace(this.pay_link);
                                                        },
                    },
    mounted     :   function()
                    {
                        global.fire_consultation    =   this.submit;
                        this.read_ref();

                        if (global.show_form) {
                            this.show               =   true;
                            window.history.replaceState(window.history.state, null, this.is_dev ? "/#/" : '/!/#/');
                        }
                    },
    updated     :   function()
                    {
                        if (!this.ref && this.sessions && !this.paid) {
                            $('head').append("\<script src='https://www.google.com/recaptcha/api.js'\>\<\/script\>");
                        }
                    }
}
</script>
