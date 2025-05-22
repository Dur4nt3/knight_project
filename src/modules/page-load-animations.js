import { buildElement } from './dom-manipulator';

// Animations to run on page load

// Used to circumvent <main></main> tag not hiding in sync with the title
// Main is returned with "visibility: hidden", ensure to remove it when animating it
function createIntroMain() {
    const mainTag = buildElement('main', 'page-main');

    const introCont = buildElement('div', 'intro-cont');

    const introHeader = buildElement('h2', 'demo-description');
    introHeader.textContent =
        'Given enough turns, a knight on a standard 8x8 chess board can move from any square to any other square.';

    const demoButton = buildElement('button', 'start-demo');
    demoButton.textContent = 'Start Demo';

    introCont.append(introHeader, demoButton);
    mainTag.append(introCont);
    mainTag.style.visibility = 'hidden';

    return mainTag;
}

export function pageLoadAnimations() {
    const titleText = [...document.querySelectorAll('.title-text')];
    const pageIcon = document.querySelector('.page-icon');
    const titleDescription = document.querySelector('.page-description');

    // Hide the description until ready to animate
    titleDescription.style.visibility = 'hidden';

    // Circumvents the <a></a> tag not hiding in sync with the rest of the description
    const gitHubLink = buildElement('a', 'github-link');
    gitHubLink.target = '_blank';
    gitHubLink.rel = 'noopener noreferrer';
    gitHubLink.href = 'https://github.com/Dur4nt3/knight_project';
    gitHubLink.textContent = 'Durante';

    titleDescription.append(gitHubLink);

    titleText.forEach((text) => text.classList.add('tracking-in-expand'));

    setTimeout(() => {
        pageIcon.classList.add('slide-bottom');
        pageIcon.style.visibility = 'visible';
        setTimeout(() => {
            titleDescription.classList.add('text-focus-in');
            titleDescription.style.visibility = 'visible';
            setTimeout(() => {
                const main = createIntroMain();
                document.body.append(main);
                main.classList.add('fade-in-fwd');
                main.style.visibility = 'visible';
            }, 1000);
        }, 275);
    }, 950);
}
