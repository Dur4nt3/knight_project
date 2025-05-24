import './assets/stylesheets/reset.css';
import './styles.css';

import { pageLoad } from './modules/page-load';
import { displayHelpModal } from './modules/create-help-modal';

window.onload = pageLoad;

const helpIcon = document.querySelector('.get-help');

// Ensure event handler isn't given as an argument
helpIcon.addEventListener('click', () => (displayHelpModal()));