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
var displayText = '';
var enteredButtons = [];
var nextNum = '';
var lastAnswerOnScreen = false;
var alreadyDecimal = false;

/* Event Listeners */
$('.number-button').click(function(){
  // Deletes last session when new number is pressed
  if(lastAnswerOnScreen){
    displayText = $(this).data('value');
    lastAnswerOnScreen = false;
    enteredButtons = [];
    nextNum = $(this).data('value');
  } else {
    displayText = $('#display').text() + $(this).data('value');
    nextNum += $(this).data('value');
  }

  $('#display').text(displayText);
});

$('.operator-button').click(function(){
  // Don't run if first input is an operator
  if(nextNum === '' && enteredButtons.length === 0){
    displayText = '';
  } // Continue operations when equals-button already pressed at least once in a session
  else if(lastAnswerOnScreen){
    displayText = $('#display').text() + $(this).data('value');
    enteredButtons.push($(this).data('value'));
    nextNum = '';
    lastAnswerOnScreen = false;
    alreadyDecimal = false;
  } else {
    displayText = $('#display').text() + $(this).data('value');
    enteredButtons.push(nextNum);
    nextNum = '';
    enteredButtons.push($(this).data('value'));
    alreadyDecimal = false;
  }

  $('#display').text(displayText);
});

$('#decimal-button').click(function(){
  if(!alreadyDecimal){
    alreadyDecimal = true;
    nextNum += $(this).data('value');
    $('#display').text($('#display').text() + $(this).data('value'));
  }
});

$('#ac').click(function(){
  $('#display').text('');
  nextNum = '';
  lastAnswerOnScreen = false;
  enteredButtons = [];
  alreadyDecimal = false;
});

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
