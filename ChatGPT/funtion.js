const gameBoard = document.getElementById('game-board');
const colorButtons = document.querySelectorAll('.color-button');
const submitButton = document.getElementById('submit-guess');
var contador = 0;

let selectedColor = 'red';
let currentGuess = ['', '', '', ''];
let currentRowIndex = 0;

const code = generateCode();
console.log('Secret Code:', code);

//? Esta función genera un código secreto de 4 colores aleatorios
function generateCode() {
    const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple'];
    let code = [];
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * colors.length);
        code.push(colors[randomIndex]);
    }
    return code;
}

//? Esta función crea una fila de adivinación en caso de que el usuario no haya adivinado el código secreto
function createGuessRow() {
    const row = document.createElement('div');
    row.classList.add('guess-row');

    for (let i = 0; i < 4; i++) {
        const hole = document.createElement('div');
        hole.classList.add('guess-hole');
        hole.addEventListener('click', () => {
            hole.style.backgroundColor = selectedColor;
            currentGuess[i] = selectedColor;
        });
        row.appendChild(hole);
    }

    gameBoard.appendChild(row);
}

//? Esta función verifica sí el usuario adivinó el código secreto
function checkGuess() {
    let correctColorAndPosition = 0;
    let correctColor = 0;
    let codeCopy = code.slice();
    let guessCopy = currentGuess.slice();

    for (let i = 0; i < 4; i++) {
        if (guessCopy[i] === codeCopy[i]) {
            correctColorAndPosition++;
            codeCopy[i] = null;
            guessCopy[i] = null;
        }
    }

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

//? Esta función reinicia el juego
function resetGame() {
    gameBoard.innerHTML = '';
    currentRowIndex = 0;
    currentGuess = ['', '', '', ''];
    createGuessRow();
}

colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedColor = button.getAttribute('data-color');
    });
});

submitButton.addEventListener('click', () => {
    if (currentGuess.includes('')) {
        alert('Please fill in all colors.');
    } else {
        checkGuess();
    }
});

createGuessRow();
