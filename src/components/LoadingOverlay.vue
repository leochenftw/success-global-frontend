<template>
    <div id="loading-overlay" :class="{'is-fade': fade, 'is-active': show}">
        <div class="overlay-core">
            <img src="../assets/logo-big.png" width="384" height="200" />
            <!-- <p class="has-text-right title is-3 is-uppercase">now loading</p> -->
        </div>
    </div>
</template>

<script>

export default
{
    name        :   'LoadingOverlay',
    data        :   function()
                    {
                        return  {
                                    fade        :   false,
                                    show        :   true
                                }
                    },
    components  :   {

                    },
    mounted     :   function()
                    {

                    },
    updated     :   function()
                    {
                        // console.log('header udpated');
                    },
    methods     :   {

                    }
}
</script>
