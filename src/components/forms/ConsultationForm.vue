<template>
    <form :class="['consultation-form modal', {'is-active': show}]" method="post" enctype="multipart/form-data">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title is-uppercase">Request a consultation</p>
                <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                <div class="content">
                    <p>Fields marked with an <span class="color-is-red">*</span> are required</p>
                </div>
                <div class="field">
                    <label class="label">Name <span class="color-is-red">*</span></label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="e.g John Doe">
                        <span class="icon is-small is-left"><i class="fas fa-user"></i></span>
                    </div>
                    <p class="help">This is a help text</p>
                </div>

                <div class="field">
                    <label class="label">Phone Number</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="e.g 021 xxx xxxxx">
                        <span class="icon is-small is-left"><i class="fas fa-phone"></i></span>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Email <span class="color-is-red">*</span></label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="email" placeholder="e.g. john_doe@gmail.com">
                        <span class="icon is-small is-left"><i class="fas fa-envelope"></i></span>
                    </div>
                    <p class="help">This is a help text</p>
                </div>

                <div class="field">
                    <label class="label">Preferred Time</label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option>- Pick a time -</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Location</label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option value="Wellington">Wellington</option>
                            </select>
                        </div>
                    </div>
                    <p class="help is-warn">This is a help text</p>
                </div>

                <div class="field">
                    <label class="label">Category <span class="color-is-red">*</span></label>
                    <div class="control">
                        <div class="select">
                            <select>
                                <option>- Choose a category -</option>
                                <option value="Resident Visa">Resident Visa</option>
                                <option value="Work Visa">Work Visa</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label">Message <span class="color-is-red">*</span></label>
                    <div class="control">
                        <textarea class="textarea" placeholder="Textarea"></textarea>
                    </div>
                </div>

            </section>
            <footer class="modal-card-foot">
                <button
                    v-on:click="onclick"
                    :class="['button', 'is-gold', 'g-recaptcha', {'is-loading': is_loading}]"
                    data-sitekey="6Lc8BlgUAAAAACwpqCYajCkQEihsnSui-vcVtgW_"
                    data-callback="recaptcha_callback">
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
                                    show            :   false,
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
                        global.recaptcha_callback   =   this.submit;
                        $('head').append("\<script src='https://www.google.com/recaptcha/api.js'\>\<\/script\>");
                    },
    updated     :   function()
                    {

                    }
}
</script>
