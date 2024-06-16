const gameBoard = document.getElementById('game-board');
const colorButtons = document.querySelectorAll('.color-button');
const submitButton = document.getElementById('submit-guess');
var contador = 0;

//? Creamos una variable con el color rojo ya que será el color seleccionado por defecto
let selectedColor = 'red';

//? Creamos una variable para almacenar la adivinación actual y el índice de la fila actual
let currentGuess = ['', '', '', ''];
let currentRowIndex = 0;

//? Esto incializa el código secreto
const code = generateCode();
console.log('Secret Code:', code);

//todo - Crear una función que genere un código secreto de 4 colores aleatorios
//? Esta función genera un código secreto de 4 colores aleatorios
function generateCode() {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    let code = [];
    for (let i = 0; i < 4; i++) {

        //? Math.floor redondea hacia abajo el número decimal
        const randomIndex = Math.floor(Math.random() * colors.length);
        code.push(colors[randomIndex]);
    }
    return code;
}

//todo - Crear una función que vaya creando las filas
//? Esta función crea una fila de adivinación en caso de que el usuario no haya adivinado el código secreto
function createGuessRow() {
    const row = document.createElement('div');
    row.classList.add('guess-row');

    for (let i = 0; i < 4; i++) {
        //* Creamos un div para cada agujero de adivinación
        const hole = document.createElement('div');
        hole.classList.add('guess-hole');

        //* Agregamos un evento de clic a cada agujero de adivinación para cambiar el color
        hole.addEventListener('click', () => {
            hole.style.backgroundColor = selectedColor;
            currentGuess[i] = selectedColor;
        });

        row.appendChild(hole);
    }

    gameBoard.appendChild(row);
}

//todo - Crear una función que verifique si el usuario adivinó el código secreto
//? Esta función verifica sí el usuario adivinó el código secreto
function checkGuess() {
    let correctColorAndPosition = 0;
    let correctColor = 0;
    let codeCopy = code.slice();
    let guessCopy = currentGuess.slice();

    //? Verificamos si el color y la posición son correctos y los eliminamos de las copias del código y la adivinación actual
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] === codeCopy[i]) {
            correctColorAndPosition++;
            codeCopy[i] = null;
            guessCopy[i] = null;
        }
    }

    //? Verificamos si el color es correcto y lo eliminamos de las copias del código y la adivinación actual
    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] !== null) {
            const index = codeCopy.indexOf(guessCopy[i]);
            if (index !== -1) {
                correctColor++;
                codeCopy[index] = null;
            }
        }
    }

    alert(`Correct color and position: ${correctColorAndPosition}, Correct color only: ${correctColor}`);

    if (correctColorAndPosition === 4) {
        alert('You guessed the code!');
        resetGame();
    } else {
        currentRowIndex++;
        if (currentRowIndex < 10) {
            createGuessRow();
        } else {
            alert('Game Over! The code was ' + code.join(', '));
            resetGame();
        }
    }
}

//todo - Crear una función que reinicie el juego
//? Esta función reinicia el juego
function resetGame() {
    gameBoard.innerHTML = '';
    currentRowIndex = 0;
    currentGuess = ['', '', '', ''];
    createGuessRow();
}


//todo - Crear un evento de clic para cada botón de color
//? Este evento de clic cambia el color seleccionado
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedColor = button.getAttribute('data-color');
    });
});

//todo - Crear un evento de clic para el botón de envío
//? Este evento de clic verifica si el usuario ha adivinado el código secreto
submitButton.addEventListener('click', () => {
    if (currentGuess.includes('')) {
        alert('Please fill in all colors.');
    } else {
        checkGuess();
    }
});

createGuessRow();

//todo - Crear ua función que devuelva un alert con el color seleccionado
