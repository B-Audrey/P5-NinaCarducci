import { displayPicturesInGallery, listenButtonsToFilterResult, showModal, imgsArrayToDisplay, createImgElement, modal} from './functions.js';
import { navigator } from './class.js';
const modalPlace = document.querySelector('.zoomDisplay');
const previousButton = document.getElementById('previousModalButton');
const nextbutton = document.getElementById('nextModalButton');
let navModalIndex = 1;
//MAIN DISPLAY
displayPicturesInGallery(imgsArrayToDisplay);
//LISTENER ON FILTER
listenButtonsToFilterResult(imgsArrayToDisplay);
// LISTENER ON MODAL
document.querySelector('.modalBackground').addEventListener('click', () => {
    showModal(false);
});
document.getElementById('stopPropagation').addEventListener('click', (event) => event.stopPropagation());

previousButton.addEventListener('click', () => {
    const previous = navigator.goToPreviousIndex();
    createImgElement(previous, modalPlace);
});
nextbutton.addEventListener('click', () => {
    const next = navigator.goToNextIndex();
    createImgElement(next, modalPlace);
});

window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' || e.key === 'Esc') {
        showModal(false);
    }
    if (e.key === 'Tab' && modal) {
        e.preventDefault();
        const modalButtons = Array.from(document.querySelectorAll('.navModalButtons button'));
        if (navModalIndex === 0){
            navModalIndex ++;
        }
        else if (navModalIndex === 1 ){
            navModalIndex --;
        }
        modalButtons[navModalIndex].focus()
    }
});


//--------------