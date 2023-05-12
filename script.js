import { listenPicturesInGallery, displayFilterButtons, ListenButtonsToFilterResult, showModal, imgsArrayToDisplay, pictures} from './functions.js';

//MAIN DISPLAY
displayFilterButtons();
listenPicturesInGallery(pictures);

//LISTENER ON FILTER
ListenButtonsToFilterResult(imgsArrayToDisplay);

// LISTENER TO CLOSE MODAL WHEN
document.querySelector('.modalBackground').addEventListener('click', () => showModal(false));
document.getElementById('stopPropagation').addEventListener('click', (event) => event.stopPropagation());
//--------------