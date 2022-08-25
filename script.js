const buttons = document.querySelectorAll( '.grid-item' );
const current = document.querySelector( '.current-operand' );
const previus = document.querySelector( '.previus-operand' );


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
    }
  } );

} );