import { buildImgElement } from './dom-manipulator';

import knightSvg from '../assets/icons/knight.svg';
import castleSvg from '../assets/icons/castle.svg';

// Utility function used to control the knight and castle (i.e., start and finish markers)

// Instances of this class contain info helpful for handling placement
export class PlacementInfo {
    constructor(
        board,
        square,
        knightLocation,
        castleLocation,
        knightButton,
        castleButton
    ) {
        this.board = board;
        this.square = square;
        this.knightLocation = knightLocation;
        this.knightButton = knightButton;
        this.castleLocation = castleLocation;
        this.castleButton = castleButton;
    }
}

export function findKnight(board) {
    const squares = [...board.children];
    for (const square of squares) {
        if (square.classList.contains('knight-placed')) {
            return square;
        }
    }
    return null;
}

export function findCastle(board) {
    const squares = [...board.children];
    for (const square of squares) {
        if (square.classList.contains('castle-placed')) {
            return square;
        }
    }
    return null;
}

export function indicateMissingPlacements(placementInfoObj) {
    const { knightButton, castleButton, knightLocation, castleLocation } =
        placementInfoObj;

    if (knightLocation === null) {
        knightButton.classList.add('shake-bottom');
        knightButton.classList.add('missing-placement');
        setTimeout(() => {
            knightButton.classList.remove('shake-bottom');
            knightButton.classList.remove('missing-placement');
        }, 600);
    }

    if (castleLocation === null) {
        castleButton.classList.add('shake-bottom');
        castleButton.classList.add('missing-placement');
        setTimeout(() => {
            castleButton.classList.remove('shake-bottom');
            castleButton.classList.remove('missing-placement');
        }, 600);
    }
}

export function initiateKnightPlacement(placementInfoObj) {
    const { board, knightButton, castleButton } = placementInfoObj;

    // Cancel other placement
    if (board.classList.contains('placing-castle')) {
        board.classList.remove('placing-castle');
        castleButton.textContent = 'Place Castle';
        castleButton.classList.remove('cancel-placement');
    }

    // Allows canceling placement
    if (board.classList.contains('placing-knight')) {
        board.classList.remove('placing-knight');
        knightButton.textContent = 'Place Knight';
        knightButton.classList.remove('cancel-placement');
        return;
    }

    board.classList.remove('placing-castle');
    board.classList.add('placing-knight');

    knightButton.textContent = 'Cancel';
    knightButton.classList.add('cancel-placement');
}

export function initiateCastlePlacement(placementInfoObj) {
    const { board, castleButton, knightButton } = placementInfoObj;

    // Cancel other placement
    if (board.classList.contains('placing-knight')) {
        board.classList.remove('placing-knight');
        knightButton.textContent = 'Place Knight';
        knightButton.classList.remove('cancel-placement');
    }

    // Allows canceling placement
    if (board.classList.contains('placing-castle')) {
        board.classList.remove('placing-castle');
        castleButton.textContent = 'Place Castle';
        castleButton.classList.remove('cancel-placement');
        return;
    }

    board.classList.remove('placing-knight');
    board.classList.add('placing-castle');

    castleButton.textContent = 'Cancel';
    castleButton.classList.add('cancel-placement');
}

export function placeKnight(placementInfoObj) {
    const { board, square, knightButton, knightLocation } = placementInfoObj;

    let removedCastle = false;

    // Switch castle and knight
    if (square.classList.contains('castle-placed')) {
        square.lastChild.remove();
        square.classList.remove('castle-placed');
        removedCastle = true;
    }

    if (knightLocation !== null) {
        knightLocation.lastChild.remove();
        knightLocation.classList.remove('knight-placed');
        if (removedCastle) {
            const castleIcon = buildImgElement(
                castleSvg,
                'Target Location',
                'castle-icon'
            );
            knightLocation.append(castleIcon);
            knightLocation.classList.add('castle-placed');
        }
    }

    const knightIcon = buildImgElement(
        knightSvg,
        'Starting Location',
        'knight-icon'
    );

    square.append(knightIcon);
    square.classList.add('knight-placed');

    board.classList.remove('placing-knight');

    knightButton.textContent = 'Place Knight';
    knightButton.classList.remove('cancel-placement');
}

export function placeCastle(placementInfoObj) {
    const { board, square, castleButton, castleLocation } = placementInfoObj;

    let removedKnight = false;

    // Switch castle and knight
    if (square.classList.contains('knight-placed')) {
        square.lastChild.remove();
        square.classList.remove('knight-placed');
        removedKnight = true;
    }

    if (castleLocation !== null) {
        castleLocation.lastChild.remove();
        castleLocation.classList.remove('castle-placed');
        if (removedKnight) {
            const knightIcon = buildImgElement(
                knightSvg,
                'Starting Location',
                'knight-icon'
            );
            castleLocation.append(knightIcon);
            castleLocation.classList.add('knight-placed');
        }
    }

    const castleIcon = buildImgElement(
        castleSvg,
        'Target Location',
        'castle-icon'
    );

    square.append(castleIcon);
    square.classList.add('castle-placed');

    board.classList.remove('placing-castle');

    castleButton.textContent = 'Place Castle';
    castleButton.classList.remove('cancel-placement');
}
