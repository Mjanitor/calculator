const container = document.getElementById("container");
const results = document.getElementById("results");

let output = document.createElement('p');

// Working Data
let symbols = ['+', '-', '*', '/'];
let oldNum = "";      // Old Piece of Data
let currentNumber = "";     // New Piece of Data
let currentSymbol = "";
let equalsPressed = false;


for (let i = 9; i >= -6; i--) { 
    // Creating the buttons
    let numeral = document.createElement("BUTTON");

    if (i <= 9 && i > 6) {
        numeral.textContent = i;
    } else {
        switch (i) {
            case 6:
                numeral.textContent = '+';
                numeral.classList = "+";
                break;
            
            case 2:
                numeral.textContent = '-';
                numeral.classList = "-";
                break;

            case -2:
                numeral.textContent = '*';
                numeral.classList = "*";
                break;   

            case -6:
                numeral.textContent = '/';
                numeral.classList = "/";
                break;

            case -5:
                numeral.textContent = "=";
                numeral.classList = "finish";
                break;

            default:
                switch (i) {
                    case 5:
                    case 4:
                    case 3:
                        numeral.textContent = i+1;
                        break;
                    
                    case 1: 
                    case 0: 
                    case -1:
                        numeral.textContent = i+2;
                        break;

                    case -3:
                        numeral.textContent = 0;
                        break;
                    
                    case -4:
                        numeral.textContent = "C";
                }
        }
    }

    // Creating the Clear functionality
    if (numeral.textContent == "C") {
        numeral.addEventListener("click", function(){  
            clearAll();
        });
    } 
        
    // Appending the buttonclicks to the output box for manipulation
    else if (numeral.textContent.match(/^\d+$/)) {     
        numeral.addEventListener("click", function(){  
            if (equalsPressed) {
                currentNumber = numeral.textContent;
            } else {
                currentNumber += numeral.textContent;
            }
            output.textContent = currentNumber;
            console.log("old: " + oldNum);
            console.log("cur: " + currentNumber);
        });
    }

    // Functionality if an operator is pressed
    else {
        if (symbols.includes(numeral.textContent)) {
            numeral.addEventListener("click", function(){  
                switch (numeral.textContent) {
                    case '+':
                        if (currentSymbol === "") {
                            currentSymbol = "+";
                            oldNum = currentNumber;
                        } else {
                            oldNum = operate(currentSymbol, oldNum, currentNumber);
                        }
                        currentNumber = "";
                        output.textContent = "";
                        console.log("old: " + oldNum);
                        console.log("cur: " + currentNumber);
                        break;

                    case '-':
                        if (currentSymbol === "") {
                            currentSymbol = "-";
                            oldNum = currentNumber;
                        } else {
                            oldNum = operate(currentSymbol, oldNum, currentNumber);
                        }
                        currentSymbol = "-";
                        currentNumber = "";
                        output.textContent = "";
                        console.log("old: " + oldNum);
                        console.log("cur: " + currentNumber);
                        break;

                    case '*':
                        if (currentSymbol === "") {
                            currentSymbol = "*";
                            oldNum = currentNumber;
                        } else {
                            oldNum = operate(currentSymbol, oldNum, currentNumber);
                        }
                        currentSymbol = "*";
                        currentNumber = "";
                        output.textContent = "";
                        console.log("old: " + oldNum);
                        console.log("cur: " + currentNumber);
                        break;

                    case '/':
                        if (currentSymbol === "") {
                            currentSymbol = "/";
                            oldNum = currentNumber;
                        } else {
                            oldNum = operate(currentSymbol, oldNum, currentNumber);
                        }
                        currentSymbol = "/";
                        currentNumber = "";
                        output.textContent = "";
                        console.log("old: " + oldNum);
                        console.log("cur: " + currentNumber);
                        break;
                }
            });
        }
    }
    container.appendChild(numeral);
};

const equals = document.querySelector('.finish');

// Evaluation for the Equals operator
equals.addEventListener("click", function(){
    if (oldNum === "") {
        currentNumber = output.textContent;
    } else {
        currentNumber = operate(currentSymbol, oldNum, currentNumber);
    }
    oldNum = "";
    equalsPressed = true;
    console.log("old: " + oldNum);
    console.log("cur: " + currentNumber);
});

results.appendChild(output);



// ******************************FUNCTIONS****************************** //

function appendToString(n) {
    currentNumber += n;
}

function add(a, b) {
   result = Number(a) + Number(b);
    output.textContent = result;
    return result;
}

function subtract(a, b) {
    result = Number(a) - Number(b);
    output.textContent = result;
    return result;
}

function multiply(a, b) {
    result = Number(a) * Number(b);
    output.textContent = result;
    return result;
}

function divide(a, b) {
    if (b === 0) {
        return "You can't divide by 0 ya goofy";
    }
    result = Number(a) / Number(b);
    output.textContent = result;
    return result;
}

function clearAll() {
    oldNum = "";
    currentNumber = "";
    currentSymbol = "";
    equalsPressed = false;
    output.textContent = oldNum;
}

function operate(operator, a, b) {
    let result;
    switch (operator) {
        case '+':
           result = add(a, b);
            return result;

        case '-':
           result = subtract(a, b);
            return result;

        case '*':
           result = multiply(a, b);
            return result;

        case '/':
           result = divide(a, b);
            return result;
    }
}