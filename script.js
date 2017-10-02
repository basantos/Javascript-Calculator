const SCREEN_LIMIT = 14;

/* Operations */
function add(x,y){
  return x*1+y*1;
}

function subtract(x,y){
  return x*1-y*1;
}

function multiply(x,y){
  debugger;
  return (x*1)*(y*1);
}

function divide(x,y){
  return (x*1).toFixed(15)/(y*1).toFixed(15);
}

// function formatNum(num){
//   debugger;
//   num = num.toFixed(15).toString().split('');
//   for(var i=num.length-1; i>0; i--){
//     if(num[i] === '0'){
//       num.pop();
//     } else {
//       // Take off decimal when number is an integer
//       if(num[num.length-1]==='.'){
//         num.pop();
//       }
//
//       return num.join('')*1;
//     }
//   }
// }

/* Variables */
var displayText = '';
var enteredButtons = [];
var nextNum = '';
var lastAnswerOnScreen = false;
var alreadyDecimal = false;
var previousIsOperator = false;
var errorOnScreen = false;

/* Event Listeners */
$('.number-button').click(function(){
  debugger;

  if(errorOnScreen){
    enteredButtons = [];
    nextNum = '';
    lastAnswerOnScreen = true;
    alreadyDecimal = false;
    previousIsOperator = false;
    displayText = '';
    errorOnScreen = false;
  }

  if(SCREEN_LIMIT < displayText.toString().trim().length){
    displayText = 'Limit reached.';
    errorOnScreen = true;
  } // Deletes last session when new number is pressed
  else if(lastAnswerOnScreen){
    previousIsOperator = false;
    displayText = $(this).data('value');
    lastAnswerOnScreen = false;
    enteredButtons = [];
    nextNum = $(this).data('value');
  } else {
    previousIsOperator = false;
    displayText = $('#display').text() + $(this).data('value');
    nextNum += $(this).data('value');
  }

  $('#display').text(displayText);
});

$('.operator-button').click(function(){
  // if(errorOnScreen){
  //   enteredButtons = [];
  //   nextNum = '';
  //   lastAnswerOnScreen = true;
  //   alreadyDecimal = false;
  //   previousIsOperator = false;
  //   displayText = '';
  //   errorOnScreen = false;
  // } // Don't run if first input is an operator
  if(nextNum === '' && enteredButtons.length === 0){
    displayText = '';
  } // Makes sure there's only one operator per pair of numbers
  // Allows the changing of current operator
  else if(previousIsOperator){
    enteredButtons.pop();
    enteredButtons.push($(this).data('value'));
    displayText = displayText.slice(0,displayText.length-1) + $(this).data('value');
  } // Continue operations when equals-button already pressed at least once in a session
  // when last answer on screen as long as the screen limit
  else if(lastAnswerOnScreen && displayText.length >= SCREEN_LIMIT){
    displayText = $(this).data('value');
    enteredButtons.push($(this).data('value'));
    nextNum = '';
    lastAnswerOnScreen = false;
    alreadyDecimal = false;
    previousIsOperator = true;
  } // Continue operations when equals-button already pressed at least once in a session
  else if(lastAnswerOnScreen){
    displayText = $('#display').text() + $(this).data('value');
    enteredButtons.push($(this).data('value'));
    nextNum = '';
    lastAnswerOnScreen = false;
    alreadyDecimal = false;
    previousIsOperator = true;
  } else {
    displayText = $('#display').text() + $(this).data('value');
    enteredButtons.push(nextNum);
    nextNum = '';
    enteredButtons.push($(this).data('value'));
    alreadyDecimal = false;
    previousIsOperator = true;
  }

  $('#display').text(displayText);
});

$('#decimal-button').click(function(){
  debugger;
  if(errorOnScreen){
    enteredButtons = [];
    nextNum = '';
    lastAnswerOnScreen = true;
    alreadyDecimal = false;
    previousIsOperator = false;
    displayText = '';
    errorOnScreen = false;
  }

  if(lastAnswerOnScreen){
    nextNum = '.';
    lastAnswerOnScreen = false;
    alreadyDecimal = true;
    displayText = '.';
    enteredButtons = [];
  } else if(alreadyDecimal === false && nextNum === ''){
    alreadyDecimal = true;
    nextNum = $(this).data('value');
    displayText = $('#display').text() + $(this).data('value');
  } else if(alreadyDecimal === false){
    alreadyDecimal = true;
    nextNum += $(this).data('value');
    displayText = $('#display').text() + $(this).data('value');
  }

  $('#display').text(displayText);
});

$('#ac').click(function(){
  $('#display').text('');
  nextNum = '';
  lastAnswerOnScreen = false;
  enteredButtons = [];
  alreadyDecimal = false;
});

$('#equals-button').click(function(){
  debugger;
  var answer = enteredButtons[0];
  var initialEnteredButtonsLength = enteredButtons.length;
  for(var i=1; i<initialEnteredButtonsLength; i++){
    if(i%2 !== 0){
      // add last number in input last
      if(i===initialEnteredButtonsLength-1){
        enteredButtons.push(nextNum);
      }

      if(enteredButtons[i] === '+'){
        answer = add(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === '-'){
        answer = subtract(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === '*'){
        answer = multiply(answer,enteredButtons[i+1]);
      }
      else if(enteredButtons[i] === '/'){
        answer = divide(answer,enteredButtons[i+1]);
      }
    }
  }
  if(SCREEN_LIMIT < answer.toString().trim().length){
    answer = (answer*1).toPrecision(SCREEN_LIMIT-1);
  }

  alreadyDecimal = false;
  previousIsOperator = false;
  displayText = answer;
  nextNum = answer;
  enteredButtons = [answer];
  lastAnswerOnScreen = true;
  $('#display').text(displayText);
});
