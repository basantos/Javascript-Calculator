/* Operations */

function add(x,y){
  return x+y;
}

function subtract(x,y){
  return x-y;
}

function multiply(x,y){
  return x*y;
}

function divide(x,y){
  return x/y;
}

var displayHasOperator = false;
$('.display-enabled-value').click(function(){
  var displayText= $('#display').text() + $(this).data('value');
  $('#display').text(displayText);
});

$('#ac').click(function(){
  $('#display').text('');
})
