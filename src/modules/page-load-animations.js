import { buildElement } from './dom-manipulator';
import { createDemoIntro } from './create-demo-intro';

// Animations to run on page load

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
                const main = createDemoIntro();
                document.body.append(main);
                main.classList.add('fade-in-fwd');
                main.style.visibility = 'visible';
            }, 1000);
        }, 275);
    }, 950);
}
