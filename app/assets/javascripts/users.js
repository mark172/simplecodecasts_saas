$(document).ready(function() {
    Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
    
    // watch for form submission
    $("#form-submit-btn").click(function(event) {
        event.preventDefault();                              // prevent default behaviour so that it doesn't yet submit
        $('input[type=submit]').prop('disabled', true);     //  disable button to prevent multiple clicks
        var error = false;
        var ccNum = $('#card_number').val(),    // assign variable values from text fields
            cvcNum = $('#card_code').val(),
            expMonth = $('#card_month').val(),
            expYear = $('#card_year').val();
            
            if (!error) {
                // get the Stripe token
                Stripe.createToken({        // if no errors, send information to Stripe
                    number: ccNum,
                    cvc: cvcNum,
                    exp_month: expMonth,
                    exp_year: expYear
                }, stripeResponseHandler); // once Stripe returns a token, run this function
            }
            return false;
    }); // form submission
    
    function stripeResponseHandler(status, response) {
        // get a reference to the form
        var f = $("#new_user");
        
        // get the token from the response
        var token = response.id;
        
        // add the token to the form
        f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
        
        //submit this form
        
        f.get(0).submit(); // get(0) to grab first form
    }
    
})