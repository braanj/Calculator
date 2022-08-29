let buttons, userInput, output, result = 0, reset = false, bracket = false;

let init = () => {
  console.log('DOM is ready!');
  buttons = document.querySelectorAll('.btn');
  userInput = document.querySelector('.input');
  output = document.querySelector('.result');

  Run();
}

// Listen to click events
let Run = () => {
  buttons.forEach(button => {
    button.addEventListener('click', () => {

      if (button.value === '=') {
        showResult(result);
        return;
      }

      if (reset || button.value === 'AC') {
        Reset();
      }

      if (button.value === 'Del') {
        Delete();
      }

      if (button.value === '( )') {
        // AddBracket ();
      }

      if (!['AC', 'Del', '( )'].includes(button.value)) {
        HandleInputText(button.value);
      }

    })
  });
}

let showResult = (result) => {
  result = Solve(userInput.value);
  output.value = result;
  reset = true;
}

let HandleInputText = (input) => {
  userInput.value += input;
}

let Reset = () => {
  userInput.value = '';
  reset = false;
}

let Delete = () => {
  userInput.value = userInput.value.substring(0, userInput.value.length - 1)
}

let AddBracket = () => {
  if (!bracket) {
    userInput.value = '(' + userInput.value;
    bracket = true;
    return;
  }

  userInput.value = userInput.value + ')';
  bracket = false;
}

let Solve = (equation) => {
  try {

    patch = equation.split("(")[0];

    if (eval("'" + equation + "'") == patch) {
      return eval(patch);
    }

    patch += "*" + eval(equation.split("(")[1].split(")")[0]);
    other = equation.substring(equation.indexOf(')') + 1);
    patch += other;
    return Solve(patch);

  } catch (error) {
    console.log("An error has occured: [" + error + "]");
  }
}


window.onload = init;
