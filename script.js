const words = [
    { word: "QUIERES", row: 0, col: 0, direction: "horizontal" },
    { word: "IR", row: 1, col: 2, direction: "vertical" },
    // Agrega más palabras aquí
];

const questions = [
    { word: "QUIERES", question: "¿Lo que deseo saber es si ...?", answer: "QUIERES", completed: false },
    { word: "IR", question: "¿Qué verbo significa moverse de un lugar a otro?", answer: "IR", completed: false },
    // Agrega más preguntas y respuestas para las otras palabras
];

let questionIndex = 0;

function createCrossword(questionIndex) {
    const crossword = document.getElementById("crossword");
    const wordInput = document.getElementById("wordInput");
    const submitButton = document.getElementById("submitButton");

    // Muestra la primera pregunta al iniciar
    displayQuestion(questionIndex);

    function displayCrossword(questionIndex) {
        crossword.innerHTML = '';

        for (let row = 0; row < 12; row++) {
            for (let col = 0; col < 11; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");

                let cellContent = '';

                for (const word of words) {
                    if (
                        (word.direction === "horizontal" &&
                            row === word.row &&
                            col >= word.col &&
                            col < word.col + word.word.length) ||
                        (word.direction === "vertical" &&
                            col === word.col &&
                            row >= word.row &&
                            row < word.row + word.word.length)
                    ) {
                        cellContent = word.word.charAt(
                            word.direction === "horizontal"
                                ? col - word.col
                                : row - word.row
                        );
                    }
                }

                // Pintar las palabras completadas de amarillo
                for (const question of questions) {
                    if (question.completed && cellContent === question.word) {
                        cell.classList.add("completed");
                    }
                }

                // Rellenar campos vacíos con letras aleatorias
                if (!cellContent) {
                    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                    cellContent = randomLetter;
                }

                cell.textContent = cellContent;
                crossword.appendChild(cell);
            }
        }
    }

    displayCrossword(questionIndex);

    function displayQuestion(questionIndex) {
        const currentQuestion = questions[questionIndex];
        const questionContainer = document.getElementById("questionContainer");
        questionContainer.innerHTML = `<p>${currentQuestion.question}</p>`;
    }

    submitButton.addEventListener("click", () => {
        const inputText = wordInput.value.toUpperCase();
        const currentQuestion = questions[questionIndex];

        if (inputText === currentQuestion.answer) {
            currentQuestion.completed = true; // Marcar la pregunta como completada
            wordInput.value = '';
            questionIndex++;

            if (questionIndex < questions.length) {
                displayCrossword(questionIndex);
                displayQuestion(questionIndex);
            } else {
                alert("¡Has completado todas las preguntas!");
            }
        } else {
            alert("La respuesta ingresada no es correcta. Inténtalo de nuevo.");
        }
    });
}

createCrossword(questionIndex);
