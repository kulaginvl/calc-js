const allButtonField = document.querySelector(".btns");


let buttons = [
  {
    key: "AC",
  }, {
    key: "+/-",
  }, {
    key: "%",
  }, {
    key: "/",
  }, {
    key: 7,
  }, {
    key: 8,
  }, {
    key: 9,
  }, {
    key: "*",
  }, {
    key: 4,
  }, {
    key: 5,
  }, {
    key: 6,
  }, {
    key: "-",
  }, {
    key: 1,
  }, {
    key: 2,
  }, {
    key: 3,
  }, {
    key: "+",
  }, {
    key: 0,
  }, {
    key: ".",
  }, {
    key: "=",
  }
];

const addButtons = () => {
  buttons.forEach((button, index) => {
    if (index === 16) {
      allButtonField.innerHTML += `<button class="btn two-block">${button.key}</button>`;
    } else {
      allButtonField.innerHTML += `<button class="btn">${button.key}</button>`;
    }
  });
};
addButtons();


let x = '';
let y = '';
let action = '';
let result = '';


let arrSign = ['+', '-', '/', '*', '=', 'AC', '%', '+/-'];


const info = document.getElementById('inf');

const calculate = () => {
  x = +x;
  y = +y;

  switch (action) {
    case "+":
      result = (+x) + (+y);
      break;
    case "-":
      result = (+x) - (+y);
      break;
    case "*":
      result = (+x) * (+y);
      break;
    case "/":
      if (y === 0) {
        clearAll();
        result = '∞';
        info.textContent = result;
        return;
      }
      result = x / y;
      break;
  }

  info.textContent = result;

  x = result;
  y = '';
};

const clearAll = () => {
  x = '';
  y = '';
  action = '';
  result = '';
};


document.querySelector('.btns').onclick = (e) => {

  if (!e.target.classList.contains('btn')) return;


  const click = e.target.textContent;
  const signName = arrSign.includes(click);

  if (click !== '=') info.textContent += click;


  if (result && !signName) {
    clearAll();
    x = click;
    return info.textContent = click;
  } else if (result === '∞') {
    clearAll();
    x = click;
    return info.textContent = click;
  } else if (result && signName) {
    x = result;
    action = click;
    result = '';
  }

  if (click === 'AC') {
    clearAll();
    return info.textContent = '';
  }

  if (click === '+/-') {
    if (action === '-') {
      action = '+';
      return info.textContent = action;
    } else if (action === '+') {
      action = '-';
      return info.textContent = action;
    } else if (x.split('').includes('-')) {
      x = `+${x.slice(1)}`
      return info.textContent = x;
    }else if (x.split('').includes('+')) {
      x = `-${x.slice(1)}`
      return info.textContent = x;
    } else {
      x = `-${x}`
      return info.textContent = x;
    }
  }

  if (click === '%' && y === '') {
    x = x / 100;
    result = x;
    return info.textContent = result;
  } else if (click === '%' && x !== '' && y !== '') {
    y = x / 100 * y;
    return info.textContent = y;
  }

  if (!y && click === '=') {
    return null;
  }

  if (x && signName) {
    y && calculate();
    action = click;
  } else if (!action) x += click;
  else if (action) y += click;

  console.log('x', x[0]);
  console.log('y', y);
  console.log('action', action);
};

