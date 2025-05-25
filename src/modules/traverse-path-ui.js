import { buildElement, buildImgElement } from './dom-manipulator';
import { getShortestPath } from './handle-move-graph';
import { uiSquareToVertex, vertexToUISquare } from './ui-utilities';

import knightSvg from '../assets/icons/knight.svg';

// Handles generating and animating the path from the start to the finish

// Ensures the simulation should continue (by checking if the board wasn't reset)
function verifyContinuation(board) {
    if (board.classList.contains('ongoing-simulation')) {
        return true;
    }
    return false;
}

function createStepIndication(number) {
    const stepIndicator = buildElement('span', 'step-indicator');
    stepIndicator.textContent = number;

    return stepIndicator;
}

function createKnightIcon() {
    return buildImgElement(knightSvg, 'Starting Location', 'knight-icon');
}

function fadeOutKnight(knightIcon) {
    knightIcon.classList.add('fade-out-up');

    return new Promise((resolve) => {
        setTimeout(resolve, 500);
    })
}

function fadeInKnight(knightIcon) {
    knightIcon.style.visibility = 'visible';
    knightIcon.classList.add('fade-in-down');

    return new Promise((resolve) => {
        setTimeout(resolve, 500);
    })
}

export async function traversePathUI(placementInfoObj) {
    const { board } = placementInfoObj;

    const startSquare = uiSquareToVertex(
        board,
        placementInfoObj.knightLocation
    );
    const finishSquare = uiSquareToVertex(
        board,
        placementInfoObj.castleLocation
    );

    const path = getShortestPath(startSquare, finishSquare).map(
        (stringVertex) => JSON.parse(stringVertex)
    );

    // If the simulation was reset don't proceed
    if (!verifyContinuation(board)) {
        return;
    }

    for (const index in path) {
        // Ensures we are not performing error invoking operations
        if (!verifyContinuation(board)) {
            break;
        }

        const vertex = path[index];
        const uiSquare = [...board.children][vertexToUISquare(vertex)];
        const stepIndicator = createStepIndication(index);

        if (Number(index) === 0) {
            await fadeOutKnight(uiSquare.lastChild);

            if (!verifyContinuation(board)) {
            break;
            }

            uiSquare.lastChild.remove();
            uiSquare.append(stepIndicator);
            continue;
        }

        if (Number(index) === path.length - 1 && verifyContinuation(board)) {
            uiSquare.lastChild.remove();
        }

        const knightIcon = createKnightIcon();
        knightIcon.style.visibility = 'hidden';
        uiSquare.append(knightIcon);
        await fadeInKnight(knightIcon);
        await fadeOutKnight(knightIcon);

        if (!verifyContinuation(board)) {
            break;
        }

        uiSquare.lastChild.remove();
        uiSquare.append(stepIndicator);
    }
}
