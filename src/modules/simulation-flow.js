import {
    placeKnight,
    findKnight,
    findCastle,
    initiateKnightPlacement,
    initiateCastlePlacement,
    placeCastle,
    PlacementInfo,
    indicateMissingPlacements,
} from './handle-knight-castle';
import { traversePathUI } from './traverse-path-ui';
import {
    resetSimulation,
    resetToStart,
    startToReset,
} from './reset-simulation';
import { disablePlacement, enablePlacement } from './ui-utilities';

// Handle the entire flow of the simulation: selecting start and finish, starting the simulation, resetting it, etc.

export function startOrResetSimulation(placementInfoObj, action) {
    const controlsCont = document.querySelector('.controls-cont');
    if (action === 'start') {
        disablePlacement(controlsCont);
        placementInfoObj.board.classList.add('ongoing-simulation');
        startToReset(controlsCont);
        traversePathUI(placementInfoObj);
    } else if (action === 'reset') {
        resetSimulation(placementInfoObj.board);
        resetToStart(document.querySelector('.controls-cont'));
        enablePlacement(controlsCont);
    }
}

// Handles the entire flow of the simulation
export function simulationFlow(e) {
    const { target } = e;
    const board = document.querySelector('.board');

    const knightLocation = findKnight(board);
    const castleLocation = findCastle(board);

    const knightButton = document.querySelector('.knight-button');
    const castleButton = document.querySelector('.castle-button');

    const placementInfoObj = new PlacementInfo(
        board,
        null,
        knightLocation,
        castleLocation,
        knightButton,
        castleButton
    );

    if (target.classList.contains('reset-demo')) {
        startOrResetSimulation(placementInfoObj, 'reset');
        return;
    }

    // If the simulation is ongoing only allow resetting it
    if (board.classList.contains('ongoing-simulation')) {
        return;
    }

    if (target.classList.contains('knight-button')) {
        initiateKnightPlacement(placementInfoObj);
        return;
    }

    if (target.classList.contains('castle-button')) {
        initiateCastlePlacement(placementInfoObj);
        return;
    }

    if (target.parentNode === board || target.parentNode.parentNode === board) {
        target.parentNode === board
            ? (placementInfoObj.square = target)
            : (placementInfoObj.square = target.parentNode);

        if (board.classList.contains('placing-knight')) {
            placeKnight(placementInfoObj);
        } else if (board.classList.contains('placing-castle')) {
            placeCastle(placementInfoObj);
        }

        return;
    }

    if (target.classList.contains('simulate-button')) {
        if (knightLocation === null || castleLocation === null) {
            indicateMissingPlacements(placementInfoObj);
            return;
        }
        startOrResetSimulation(placementInfoObj, 'start');
        return;
    }
}
