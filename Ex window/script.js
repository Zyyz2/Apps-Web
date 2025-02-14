// Configuration des niveaux de difficulté
const DIFFICULTY_LEVELS = {
    FACILE: {
        maxAttempts: 10,
        range: 50
    },
    INTERMEDIAIRE: {
        maxAttempts: 7,
        range: 100
    },
    DIFFICILE: {
        maxAttempts: 5,
        range: 200
    }
};

// Variables du jeu
let gameState = {
    targetNumber: 0,
    attemptsLeft: 0,
    range: 0,
    gameOver: false
};

// Éléments du DOM
const difficultySection = document.getElementById('difficulty-selection');
const gameSection = document.getElementById('game-section');
const attemptsDisplay = document.getElementById('attempts');
const rangeDisplay = document.getElementById('range');
const guessInput = document.getElementById('guess-input');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset-btn');

// Démarrer une nouvelle partie
function startGame(difficulty) {
    const level = DIFFICULTY_LEVELS[difficulty];
    
    gameState = {
        targetNumber: Math.floor(Math.random() * level.range) + 1,
        attemptsLeft: level.maxAttempts,
        range: level.range,
        gameOver: false
    };

    // Mise à jour de l'interface
    difficultySection.classList.add('hidden');
    gameSection.classList.remove('hidden');
    resetButton.classList.add('hidden');
    attemptsDisplay.textContent = gameState.attemptsLeft;
    rangeDisplay.textContent = gameState.range;
    guessInput.value = '';
    messageDisplay.className = 'message';
    messageDisplay.textContent = '';

    console.log(`Nombre à deviner: ${gameState.targetNumber}`); // Pour le débogage
}

// Vérifier la tentative du joueur
function makeGuess() {
    if (gameState.gameOver) return;

    const guess = parseInt(guessInput.value);
    
    if (isNaN(guess) || guess < 1 || guess > gameState.range) {
        showMessage('Veuillez entrer un nombre valide !', 'error');
        return;
    }

    gameState.attemptsLeft--;
    attemptsDisplay.textContent = gameState.attemptsLeft;

    if (guess === gameState.targetNumber) {
        gameWon();
    } else {
        const hint = guess < gameState.targetNumber ? 'plus grand' : 'plus petit';
        showMessage(`Le nombre est ${hint} !`, 'info');

        if (gameState.attemptsLeft === 0) {
            gameLost();
        }
    }

    guessInput.value = '';
    guessInput.focus();
}

// Afficher un message
function showMessage(text, type) {
    messageDisplay.textContent = text;
    messageDisplay.className = `message ${type}`;
}

// Gérer la victoire
function gameWon() {
    showMessage('Félicitations ! Vous avez trouvé le nombre !', 'success');
    endGame();
}

// Gérer la défaite
function gameLost() {
    showMessage(`Game Over ! Le nombre était ${gameState.targetNumber}`, 'error');
    endGame();
}

// Terminer la partie
function endGame() {
    gameState.gameOver = true;
    resetButton.classList.remove('hidden');
}

// Réinitialiser le jeu
function resetGame() {
    difficultySection.classList.remove('hidden');
    gameSection.classList.add('hidden');
}

// Écouteur d'événement pour la touche Entrée
guessInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        makeGuess();
    }
});