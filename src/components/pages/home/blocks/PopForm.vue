<template>
    <div class="pop-form">
        <div class="content">
            <h2 class="title is-2">Reach us to reach your success!</h2>
            <p>No matter how simple or complicate your visa cases are, the Success Global team is here to help you to reach your goal.<br /><br />We will take time to listen, support and work with you.</p>
        </div>
        <div class="field is-grouped">
            <p class="control">
                <a @click="scroll_to_contact" class="button is-gold is-medium">Get in touch</a>
            </p>
            <p class="control">
                <a @click="open_booking_form" class="button is-gold is-medium">Book consultation</a>
            </p>
        </div>
    </div>
</template>

<script>
export default
{
    name                :   'PopForm',
    methods             :   {
                                scroll_to_contact   :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            $('body').scrollTo($('#section-contact'), 500, {axis: 'y', offset: -69});
                                                        },
                                open_booking_form   :   function(e)
                                                        {
                                                            e.preventDefault();
                                                            global.consultation_form.show   =   true;
                                                        }
                            }
}
</script>
