(function($) {

    $.fn.isAboveViewport    =   function()
    {
        if ($(this).offset().top + $(this).outerHeight() <= $(window).scrollTop()) {
            return true;
        }

        return false;
    };

    $.fn.ajaxSubmit         =   function(cbf)
    {
        let me              =   $(this),
            endpoint        =   $(this).attr('action'),
            method          =   $(this).attr('method'),
            lockdown        =   false,
            callbacks       =   $.extend(
                                {
                                    validate    :   function() { return true; },
                                    onstart     :   function() { },
                                    success     :   function(response) { },
                                    fail        :   function(response) { }
                                }, cbf);

        $(this).submit(function(e)
        {
            e.preventDefault();
            e.stopPropagation();

            if (!callbacks.validate()) {
                return false;
            }

            if (lockdown) {
                return false;
            }

            lockdown        =   true;

            let formData    =   new FormData($(this)[0]);

            callbacks.onstart();

            me.find('input[type="file"]').each(function(i, el)
            {
                console.log(el);
            });

            // axios.post(endpoint, formData).then(callbacks.success).catch(callbacks.fail);
        });
    };
})(jQuery);
