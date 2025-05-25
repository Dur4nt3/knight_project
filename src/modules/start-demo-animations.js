import { createDemo } from './create-ui-chess-board';
import { displayHelpModal } from './create-help-modal';
import { enableButtons } from './ui-utilities';

// Animations to run once the user has clicked the "Start Demo" button

export async function startDemo() {
    const main = document.querySelector('.page-main');

    const demoInfo = main.lastChild;

    const demoCont = createDemo();
    demoCont.style.visibility = 'hidden';

    const controlsCont = demoCont.querySelector('.controls-cont');

    demoInfo.classList.add('fade-out-bck');
    await new Promise((resolve) => {
        setTimeout(() => {
            demoInfo.remove();
            resolve('removed demo information');
        }, 900);
    });

    main.append(demoCont);
    demoCont.classList.add('fade-in-fwd');
    demoCont.style.visibility = 'visible';

    await new Promise((resolve) => {
        setTimeout(() => {
            resolve('slight timeout before loading modal');
        }, 750);
    });

    await new Promise((resolve) => {
        displayHelpModal(resolve);
    });

    main.lastChild.lastChild.lastChild.classList.add('load-board');

    // Add rotation animation to chess board
    await new Promise((resolve) => {
        setTimeout(() => {
            resolve('cannot start simulation before board loads');
        }, 1750);
    });

    enableButtons(controlsCont);
}
