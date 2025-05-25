// Utilities used by the UI

// Takes the UI board and a selected square and converts it into vertex form
export function uiSquareToVertex(board, square) {
    let prefix;
    let row;
    const childNum = [...board.children].indexOf(square);

    if (childNum >= 0 && childNum <= 7) {
        prefix = 0;
        row = 7;
    } else if (childNum >= 8 && childNum <= 15) {
        prefix = 8;
        row = 6;
    } else if (childNum >= 16 && childNum <= 23) {
        prefix = 16;
        row = 5;
    } else if (childNum >= 24 && childNum <= 31) {
        prefix = 24;
        row = 4;
    } else if (childNum >= 32 && childNum <= 39) {
        prefix = 32;
        row = 3;
    } else if (childNum >= 40 && childNum <= 47) {
        prefix = 40;
        row = 2;
    } else if (childNum >= 48 && childNum <= 55) {
        prefix = 48;
        row = 1;
    } else if (childNum >= 56 && childNum <= 63) {
        prefix = 56;
        row = 0;
    }

    return [childNum - prefix, row];
}

// Converts the vertex to the index of the square within board.children
export function vertexToUISquare(vertex) {
    return (8 * (8 - (vertex[1] + 1))) + vertex[0];
}

// Disable demo buttons
export function disableButtons(controlsCont) {
    [...controlsCont.children].forEach((button) => (button.disabled = true));
}

// Only disables placement buttons
export function disablePlacement(controlsCont) {
    [...controlsCont.children].forEach((button) => {
        if (
            button.classList.contains('knight-button') ||
            button.classList.contains('castle-button')
        ) {
            button.disabled = true;
        }
    });
}

// Enable demo button
export function enableButtons(controlsCont) {
    [...controlsCont.children].forEach((button) => (button.disabled = false));
}

// Only enabled placement buttons
export function enablePlacement(controlsCont) {
    [...controlsCont.children].forEach((button) => {
        if (
            button.classList.contains('knight-button') ||
            button.classList.contains('castle-button')
        ) {
            button.disabled = false;
        }
    });
}
