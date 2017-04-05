/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
 
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  
  //when user clicks form submit btn.
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    
  //Collect the credit card fields.
  var ccNum = $('#card_number').val(),
      cvcNum = $('card_code').val(),
      expMonth = $('card_month').val(),
      expYear = $('card_year').val();
      
  var error = false;
  
  //validate card number
  if(!Stripe.card.validateCardNumber(ccNum)) {
    error = true;
    alert('The credit card number appears to be invalid')
  }
  
  //validate CVC Number
  if(!Stripe.card.validateCVC(cvcNum)) {
    error = true;
    alert('The CVC number appears to be invalid')
  }
  
  //validate Expiration date
  if(!Stripe.card.validateExpiry(expMonth,expYear)) {
    error = true;
    alert('The Expiration date appears to be invalid')
  }
    submitBtn.prop('disabled', false).val("Sign Up")
  if (error) {
    //if there are card errors don't send to stripe
  }
    else {
      //Send the card info to stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
  }
  
    return false;
  });
  
  //Stripe will return a card token.
  function stripeResponseHandler(status, response) {
    var token = response.id
    
    //Inject card token as hidden field into form
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
  
    //submit form to our rails app
    theForm.get(0).submit();
    
  }
});