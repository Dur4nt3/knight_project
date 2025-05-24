import { buildElement } from './dom-manipulator';

// Creates the chess board and the demo controls

function createDemoControls() {
    const controlsCont = buildElement('div', 'controls-cont');

    const knightButton = buildElement('button', 'demo-control', 'knight-button');
    const castleButton = buildElement('button', 'demo-control', 'castle-button');
    const simulateButton = buildElement('button', 'demo-control', 'simulate-button');

    knightButton.textContent = 'Place Knight';
    castleButton.textContent = 'Place Castle';
    simulateButton.textContent = 'Start';

    controlsCont.append(knightButton, castleButton, simulateButton);

    return controlsCont;
}

function createBoard() {
    const boardCont = buildElement('div', 'board-cont');
    const board = buildElement('div', 'board');

    let firstAssignment = 'white';
    let secondAssignment = 'blue';

    for (let i = 1; i <= 64; i += 1) {
        const square = buildElement('div');

        // Ensure the squares have the right coloring
        if (i === 9 || i === 25 || i === 41 || i === 57) {
            firstAssignment = 'blue';
            secondAssignment = 'white';
        } else if (i === 1 || i === 17 || i === 33 || i === 49) {
            firstAssignment = 'white';
            secondAssignment = 'blue';
        }
        if (i % 2 !== 0) {
            square.classList.add(firstAssignment);
        } else {
            square.classList.add(secondAssignment);
        }

        // Marking the squares that will have the letter part of the algebraic notation (top and bottom rows)
        if (i >= 1 && i <= 8) {
            square.classList.add('first-row-square');
        } else if (i >= 57 && i <= 64) {
            square.classList.add('last-row-square');
        }

        // Marking the squares that will have the numerical part of the algebraic notation (first and last column)
        if (
            i === 1 ||
            i === 9 ||
            i === 17 ||
            i === 25 ||
            i === 33 ||
            i === 41 ||
            i === 49 ||
            i === 57
        ) {
            square.classList.add('row-start');
        } else if (
            i === 8 ||
            i === 16 ||
            i === 24 ||
            i === 32 ||
            i === 40 ||
            i === 48 ||
            i === 56 ||
            i === 64
        ) {
            square.classList.add('row-end');
        }
        board.append(square);
    }

    boardCont.append(board);
    return boardCont;
}

export function createDemo() {
    const demoCont = buildElement('div', 'demo-cont');
    demoCont.append(createDemoControls());
    demoCont.append(createBoard());

    return demoCont;
}
