import { clearChildren } from './dom-manipulator';

// Replaces the reset button with the start button
export function resetToStart() {
    const resetButton = document.querySelector('.reset-demo');
    resetButton.textContent = 'Start';
    resetButton.classList.remove('reset-demo');
    resetButton.classList.add('simulate-button');
}

// Replaces the start button with the replace button
export function startToReset() {
    const startButton = document.querySelector('.simulate-button');
    startButton.textContent = 'Reset';
    startButton.classList.remove('simulate-button');
    startButton.classList.add('reset-demo');
}

function clearBoard(board) {
    const squares = [...board.children];
    for (const square of squares) {
        clearChildren(square);
        square.classList.remove('knight-placed');
        square.classList.remove('castle-placed');
    }
}

export function resetSimulation(board) {
    clearBoard(board);
    board.classList.remove('ongoing-simulation');
}
