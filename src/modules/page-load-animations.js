import { buildElement } from './dom-manipulator';

// Animations to run on page load

// Used to circumvent <main></main> tag not hiding in sync with the title
// Main is returned with "visibility: hidden", ensure to remove it when animating it
function createIntroMain() {
    const mainTag = buildElement('main', 'page-main');

    const introCont = buildElement('div', 'intro-cont');

    const introDescription = buildElement('div', 'demo-description');

    const introHeader = buildElement('h2', 'description-header');
    introHeader.textContent =
        'With sufficient moves, a knight on a standard 8×8 chessboard can reach any square from any starting position.';
    const introText = buildElement('p', 'description-text');
    introText.textContent =
        'This simulation visually illustrates the concept.';
    
    introDescription.append(introHeader, introText);

    const demoButton = buildElement('button', 'start-demo');
    demoButton.textContent = 'Start Demo';

    introCont.append(introDescription, demoButton);
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

    const main = createIntroMain();
    document.body.append(main);
    main.classList.add('fade-in-fwd');
    main.style.visibility = 'visible';

    setTimeout(() => {
        pageIcon.classList.add('slide-bottom');
        pageIcon.style.visibility = 'visible';
        setTimeout(() => {
            titleDescription.classList.add('text-focus-in');
            titleDescription.style.visibility = 'visible';
            setTimeout(() => {
                // const main = createIntroMain();
                // document.body.append(main);
                // main.classList.add('fade-in-fwd');
                // main.style.visibility = 'visible';
            }, 1000);
        }, 275);
    }, 950);
}
