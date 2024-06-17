let color1 = document.getElementById('color1');
let color2 = document.getElementById('color2');
let color3 = document.getElementById('color3');
let color4 = document.getElementById('color4');
let attempts = document.getElementById('attempts');
const gameBoard = document.getElementById('game-board');
const colorButtons = document.querySelectorAll('.color-button');
const submitButton = document.getElementById('submit-guess');
var contador = 0;

//todo - Crear función para guardar la configuración
function saveSettings() {
    if(color1.value && color2.value && color3.value && color4.value && attempts.value) {
        localStorage.setItem('color1', color1.value);
        localStorage.setItem('color2', color2.value);
        localStorage.setItem('color3', color3.value);
        localStorage.setItem('color4', color4.value);
        localStorage.setItem('attempts', attempts.value);

        const coloresUsers = [color1.value, color2.value, color3.value, color4.value];
        console.log('Colores de usuario:', coloresUsers);

        alert('Configuración guardada exitosamente');
    } else {
        alert('Por favor, completa todos los campos');
    }
    
}
//? Creamos una funcion que aplique los cambios que hemos hecho en configuración
function applyUserColors() {
    const color1 = localStorage.getItem('color1');
    const color2 = localStorage.getItem('color2');
    const color3 = localStorage.getItem('color3');
    const color4 = localStorage.getItem('color4');
    const buttons = document.querySelectorAll('.color-button');

    //? Creamos un array con los colores de los botones
    let colors = [color1, color2, color3, color4];

    //? Recorremos el array de botones y les asignamos el color correspondiente
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i]) {
            buttons[i].style.backgroundColor = buttons[i].dataset.color = colors[i];
        }
    }
}

//? Esto permite aplicar la funición applyUserColors cuando la página se cargue
window.onload = applyUserColors;

let selectedColor = color1;

//? Creamos una variable para almacenar la adivinación actual y el índice de la fila actual
let currentGuess = ['', '', '', ''];
let currentRowIndex = 0;

//? Esto incializa el código secreto
const code = generateCode();
console.log('Secret Code:', code);

//todo - Crear una función que genere un código secreto de 4 colores aleatorios
//? Esta función genera un código secreto de 4 colores aleatorios
function generateCode() {
    const color1 = localStorage.getItem('color1');
    const color2 = localStorage.getItem('color2');
    const color3 = localStorage.getItem('color3');
    const color4 = localStorage.getItem('color4');

    const colors = [color1, color2, color3, color4];
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
    const attempts = localStorage.getItem('attempts');

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

    alert(`Color y posición correcta: ${correctColorAndPosition}, Colores correctos: ${correctColor}`);

    if (correctColorAndPosition === 4) {
        alert('Has adivinado el código!');
        resetGame();
    } else {
        currentRowIndex++;
        if (currentRowIndex < attempts) {
            createGuessRow();
        } else {
            alert('Game Over! The code was ' + code.join(', '));
            resetGame();
        }
    }
}

//todo - Crear una función que reinicie el juego
function resetGame() {
    gameBoard.innerHTML = '';
    currentRowIndex = 0;
    currentGuess = ['', '', '', ''];
    createGuessRow();
}


//todo - Crear un evento de clic para ir actualizando el color seleccionado
colorButtons.forEach(button => {
    button.addEventListener('click', () => {
        selectedColor = button.getAttribute('data-color');
    });
});

//todo - Crear un evento de clic que verifique si se ha ingresado un color
submitButton.addEventListener('click', () => {
    if (currentGuess.includes('')) {
        alert('Please fill in all colors.');
    } else {
        checkGuess();
    }
});

createGuessRow();

// -----------------------------------------------------------------------------------------------------------------------------------------


