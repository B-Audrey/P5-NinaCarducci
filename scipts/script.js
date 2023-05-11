import { displayInGallery, displayFilterButtons, filterResult, showModal, imgsArrayToDisplay} from './functions.js';

const getData = async () => {
    const response = await fetch('./scipts/data.json');
    return await response.json()
}
const pictures = await getData();

displayFilterButtons();
displayInGallery(pictures);
filterResult(imgsArrayToDisplay);

// CLOSE MODAL
const modalBackground = document.querySelector('.modalBackground');
modalBackground.addEventListener('click', () => showModal(false));
document.getElementById('stopPropagation').addEventListener('click', (event) => event.stopPropagation());
//--------------


