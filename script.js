
class Calculator {
  constructor ( previusOperandTextElement, currentOperandTextElement ) {
    this.previusOperandTextElement = previusOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.allClear();
  }
  allClear() {
    this.currentOperand = '';
    this.previusOperand = '';
    this.operation = undefined;
  };
  delete() {
    this.currentOperand = this.currentOperand.toString().slice( 0, -1 );
  }

  appendNumber( number ) { //adds numbers
    if ( number === '.' && this.currentOperand.includes( '.' ) ) return;

    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation( operation ) {  //chooses operation
    if ( this.currentOperand === '' ) return;
    if ( this.previusOperand !== '' ) {
      this.compute();
    }
    this.operation = operation;
    this.previusOperand = this.currentOperand;
    this.currentOperand = '';
  }
  compute() { // calculates with given operation
    let computation;
    const prev = parseFloat( this.previusOperand );
    const current = parseFloat( this.currentOperand );
    if ( isNaN( prev ) || isNaN( current ) ) return;

    switch ( this.operation ) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '/':
        computation = prev / current;
        break;
      case '%':
        computation = prev % current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previusOperand = '';

  }
  getDisplayNumber( number ) { //helper function to create correct number(1,200,111)
    const stringNumber = number.toString();
    const integerDigits = parseFloat( stringNumber.split( '.' )[0] );
    const decimalDigits = stringNumber.split( '.' )[1];
    let integerDisplay;
    if ( isNaN( integerDigits ) ) { integerDisplay = ''; } else {
      integerDisplay = integerDigits.toLocaleString( 'en', { maximumFractionDigits: 0 } );
    }

    if ( decimalDigits != null ) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() { // updates display after every action
    this.currentOperandTextElement.innerText = this.getDisplayNumber( this.currentOperand );
    if ( this.operation != null ) {
      this.previusOperandTextElement.innerText =
        `${this.getDisplayNumber( this.previusOperand )} ${this.operation}`;
    } else {
      this.previusOperandTextElement.innerText = '';
    }
    // this.previusOperandTextElement.innerText = getDisplayNumber( this.previusOperand );
  }


};


const currentOperandTextElement = document.querySelector( '.current-operand' );
const previusOperandTextElement = document.querySelector( '.previus-operand' );
const numberButtons = document.querySelectorAll( '[data-number]' );
const operationButtons = document.querySelectorAll( '[data-operation]' );
const equalsButton = document.querySelector( '[data-equals]' );
const allClearButton = document.querySelector( '[data-all-clear]' );
const deleteButton = document.querySelector( '[data-delete]' );


const calculator = new Calculator( previusOperandTextElement, currentOperandTextElement );

numberButtons.forEach( button => {
  button.addEventListener( 'click', () => {
    calculator.appendNumber( button.innerText );
    calculator.updateDisplay();
  } );
} );

operationButtons.forEach( button => {
  button.addEventListener( 'click', () => {
    calculator.chooseOperation( button.innerText );
    calculator.updateDisplay();
  } );
} );



equalsButton.addEventListener( 'click', () => {
  calculator.compute();
  calculator.updateDisplay();
} );

deleteButton.addEventListener( 'click', button => {
  calculator.delete();
  calculator.updateDisplay();
} );

allClearButton.addEventListener( 'click', button => {
  calculator.allClear();
  calculator.updateDisplay();
} );