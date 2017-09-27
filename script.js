/* Operations */
function add(x,y){
  return x*1+y*1;
}

function subtract(x,y){
  return x*1-y*1;
}

function multiply(x,y){
  return (x*1)*(y*1);
}

function divide(x,y){
  return (x*1).toFixed(1)/(y*1).toFixed(1);
}

/* Variables */
var enteredButtons = [];
var nextNum = '';
var lastAnswerOnScreen = false;
var operators = /[\+x\/\-]/;

/* Event Listeners */
$('.display-enabled-value').click(function(){
  var displayText;

  // Don't run if first input is an operator
  if(nextNum === '' && operators.test($(this).data('value'))){
    displayText = '';
  } // Continue operations when equels-button already hit
  else if(lastAnswerOnScreen && operators.test($(this).data('value'))){
    displayText = $('#display').text() + $(this).data('value');
    enteredButtons.push($(this).data('value'));
    nextNum = '';
    lastAnswerOnScreen = false;
  } // Deletes last session when new number is pressed
  else if(lastAnswerOnScreen && !operators.test($(this).data('value'))){
    displayText = $(this).data('value');
    lastAnswerOnScreen = false;
    enteredButtons = [];
    nextNum = $(this).data('value');
  } // Input operations
  else if(operators.test($(this).data('value'))){
    displayText = $('#display').text() + $(this).data('value');
    enteredButtons.push(nextNum);
    nextNum = '';
    enteredButtons.push($(this).data('value'));
  } // Input numbers
  else {
    displayText = $('#display').text() + $(this).data('value');
    nextNum += $(this).data('value');
  }

  $('#display').text(displayText);
});

$('#ac').click(function(){
  $('#display').text('');
  nextNum = '';
  lastAnswerOnScreen = false;
  enteredButtons = [];
})

$('#equals-button').click(function(){
  var answer = enteredButtons[0];
  for(var i=1; i<enteredButtons.length; i++){
    if(i%2 !== 0){
      if(enteredButtons[i] === '+'){
        enteredButtons.push(nextNum);
        answer = add(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === '-'){
        enteredButtons.push(nextNum);
        answer = subtract(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === 'x'){
        enteredButtons.push(nextNum);
        answer = multiply(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === '/'){
        enteredButtons.push(nextNum);
        answer = divide(answer,enteredButtons[i+1]);
      }
    }
  }
  enteredButtons = [answer];
  lastAnswerOnScreen = true;
  $('#display').text(answer);
});
