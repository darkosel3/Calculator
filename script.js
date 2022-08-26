const buttons = document.querySelectorAll( '.grid-item' );
const current = document.querySelector( '.current-operand' );
const previus = document.querySelector( '.previus-operand' );
const reg = new RegExp( '^[0-9]$' );
const regOp = new RegExp( '/[()+-*/.]/' );
let calcPressed = false;


const calculate = function () {

};

const allClear = function () {
  current.innerText = '0';
  previus.innerText = '0';
};













buttons.forEach( button => {
  button.addEventListener( 'click', function () {
    if ( this.innerText === 'AC' ) {
      allClear();
    } else if ( reg.test( this.innerText ) ) {
      if ( current.innerText === '0' ) {
        current.innerText = '';
        current.innerText += this.innerText;
      } else {
        current.innerText += this.innerText;
      }
    } else if ( regOp.test( this.innerText ) ) {
      console.log( this.innerText );
    }
  } );

} );