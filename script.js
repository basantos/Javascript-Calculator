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
  return x.toFixed(1)/y.toFixed(1);
}

/* Variables */
var enteredButtons = [];
var lastAnswerOnScreen = false;
var operators = /[\+x\/\-]/;

/* Event Listeners */
$('.display-enabled-value').click(function(){
  var displayText;
  // Don't run if first input is an operator
  if(enteredButtons.length === 0 && operators.test($(this).data('value'))){
    displayText = '';
  } // Continue operations when equels-button already hit
  else if(lastAnswerOnScreen && operators.test($(this).data('value'))){
    displayText = $('#display').text() + $(this).data('value');
    enteredButtons.push($(this).data('value'));
    lastAnswerOnScreen = false;
  } // Deletes last session when new number is pressed
  else if(lastAnswerOnScreen && !operators.test($(this).data('value'))){
    displayText = $(this).data('value');
    lastAnswerOnScreen = false;
    enteredButtons = [];
    enteredButtons.push($(this).data('value'));
  } // Add up the operations as normal
  else {
    displayText = $('#display').text() + $(this).data('value');
    enteredButtons.push($(this).data('value'));
  }

  $('#display').text(displayText);
});

$('#ac').click(function(){
  $('#display').text('');
  lastAnswerOnScreen = false;
  enteredButtons = [];
})

$('#equals-button').click(function(){
  var answer = enteredButtons[0];
  for(var i=1; i<enteredButtons.length; i++){
    if(i%2 !== 0){
      if(enteredButtons[i] === '+'){
        answer = add(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === '-'){
        answer = subtract(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === 'x'){
        answer = multiply(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === '/'){
        answer = divide(answer,enteredButtons[i+1]);
      }
    }
  }

  enteredButtons = [answer];
  lastAnswerOnScreen = true;
  $('#display').text(answer);
});
