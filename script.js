import { displayPicturesInGallery, ListenButtonsToFilterResult, showModal, imgsArrayToDisplay, pictures} from './functions.min.js';

//MAIN DISPLAY
displayPicturesInGallery(pictures);

//LISTENER ON FILTER
ListenButtonsToFilterResult(imgsArrayToDisplay);
document.querySelector('.gallery_buttons .tous').focus();

// LISTENER TO CLOSE MODAL WHEN
document.querySelector('.modalBackground').addEventListener('click', () => showModal(false));
document.getElementById('stopPropagation').addEventListener('click', (event) => event.stopPropagation());
//--------------