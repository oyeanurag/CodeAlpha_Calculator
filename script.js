const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

// helper to update display
function setDisplay(text){
  display.innerText = text;
}

// append value (numbers/operators)
function appendValue(val){
  if(display.innerText === "0" && val !== "."){
    setDisplay(val);
  } else {
    setDisplay(display.innerText + val);
  }
}

// clear
function clearDisplay(){
  setDisplay("0");
}

// backspace
function deleteLast(){
  const s = display.innerText;
  setDisplay(s.length > 1 ? s.slice(0, -1) : "0");
}

// calculate safely (basic)
function calculateResult(){
  try{
    // prevent dangerous chars (very basic check)
    const expr = display.innerText.replace(/×/g,"*").replace(/÷/g,"/");
    if(/[^0-9+\-*/(). ]/.test(expr)) { setDisplay("Error"); return; }
    const result = Function('"use strict";return (' + expr + ')')();
    setDisplay(String(result));
  }catch(e){
    setDisplay("Error");
  }
}

// delegate button clicks
buttons.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if(!btn) return;
  const val = btn.dataset.value;
  const action = btn.dataset.action;

  if(action === "clear") clearDisplay();
  else if(action === "back") deleteLast();
  else if(action === "equal") calculateResult();
  else if(val) appendValue(val);
});

// keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key;
  if(/[0-9]/.test(key) || '+-*/.'.includes(key)){
    appendValue(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculateResult();
  } else if (key === 'Backspace') {
    deleteLast();
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
