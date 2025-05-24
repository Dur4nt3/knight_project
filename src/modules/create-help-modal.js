import { buildElement, buildImgElement } from './dom-manipulator';

import helpSvg from '../assets/icons/circle-help-dark.svg';

// Creates the "How It Works" modal

function exitModal(modalContent, promise = null) {
    const modal = modalContent.parentNode;
    modalContent.classList.add('slide-out-top');
    setTimeout(() => {
        modal.remove();
        if (promise !== null) {
            promise();
        }
    }, 475);
}

function createHelpModal() {
    const modal = buildElement('div', 'modal');
    modal.tabIndex = 0;

    const modalContent = buildElement('div', 'modal-content', 'demo-help');

    const header = buildElement('h2', 'help-title');
    header.textContent = 'How It Works';

    const text1 = buildElement('p', 'help-text');
    const text2 = buildElement('p', 'help-text');
    const text3 = buildElement('p', 'help-text');
    const text4 = buildElement('p', 'help-text');
    const text5 = buildElement('p', 'help-text');
    const text6 = buildElement('p', 'help-text');
    const text7 = buildElement('p', 'help-text');
    const text8 = buildElement('p', 'help-text', 'important-text');

    text1.textContent =
        'To simulate the shortest path from a starting square to a target square, simply place the knight on your desired starting square, then place the castle on your desired target square.';
    text2.textContent =
        // eslint-disable-next-line quotes
        "As long as you didn't start the simulation, you may change your start and target squares.";
    text3.textContent =
        'After marking your start and finish square, press the "Start" button to start the simulation.';
    text4.textContent =
        'As the knight traverses the board, it will mark its path with numbers.';
    text5.textContent =
        'The simulation ends when the knight has reached the castle.';
    text6.textContent =
        'As you will notice, immediately after pressing the "Start" button, a "Reset" button will appear.';
    text7.textContent =
        'Pressing said button at any point will reset the simulation, allowing you to re-pick a new pair of start and target squares.';

    const text8part1 = document.createTextNode(
        'At any time you may press the '
    );
    const text8part2 = document.createTextNode(
        ' icon in the top left to view this again.'
    );

    const helpIcon = buildImgElement(helpSvg, 'Help Icon', 'inline-icon');

    text8.append(text8part1, helpIcon, text8part2);

    const confirmButton = buildElement('button', 'help-confirm');
    confirmButton.textContent = 'I Understand';

    modalContent.append(
        header,
        text1,
        text2,
        text3,
        text4,
        text5,
        text6,
        text7,
        text8,
        confirmButton
    );

    modal.append(modalContent);

    return modal;
}

// Promise argument can be used to manipulate timing of other animations respective to the exit from the modal
export function displayHelpModal(promise = null) {
    const modal = createHelpModal();
    modal.lastChild.style.visibility = 'hidden';

    document.body.prepend(modal);
    modal.focus();

    modal.lastChild.classList.add('slide-in-top');
    modal.lastChild.style.visibility = 'visible';

    modal.addEventListener('click', (e) => {
        const { target } = e;
        if (target.classList.contains('help-confirm')) {
            exitModal(modal.lastChild, promise);
        }
    });
}
