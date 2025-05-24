import { buildElement } from './dom-manipulator';
import { startDemo } from './start-demo-animations';

// Used to circumvent <main></main> tag not hiding in sync with the title
// Main is returned with "visibility: hidden", ensure to remove it when animating it
export function createDemoIntro() {
    const mainTag = buildElement('main', 'page-main');

    const introCont = buildElement('div', 'intro-cont');

    const introDescription = buildElement('div', 'demo-description');

    const introHeader = buildElement('h2', 'description-header');
    introHeader.textContent =
        'With sufficient moves, a knight on a standard 8×8 chessboard can reach any square from any starting position.';
    const introText = buildElement('p', 'description-text');
    introText.textContent = 'This simulation visually illustrates the concept.';

    introDescription.append(introHeader, introText);

    const demoButton = buildElement('button', 'start-demo');
    demoButton.textContent = 'Start Demo';
    demoButton.addEventListener('click', startDemo);

    introCont.append(introDescription, demoButton);
    mainTag.append(introCont);
    mainTag.style.visibility = 'hidden';

    return mainTag;
}
