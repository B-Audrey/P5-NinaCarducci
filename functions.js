import { ModalNavigator } from './class.js';
//VARIABLES OF THE DOCUMENT
const data = await fetch('./data.json'); //original full data
export const pictures = await data.json() 
export let imgsArrayToDisplay = pictures; //data that can be modified
export let imgIndex = 0;
const modalPlace = document.querySelector('.zoomDisplay');
export let navigator = null;
export let modal = false;
//----------

//FUNCTIONS OF THE DOCUMENT
const listenImgsToOpenModal = () => {
    const actualImgs = document.querySelectorAll('.gallery img');
    for (const img of actualImgs) {
        img.addEventListener( 'click', (event) => {
            openModalwithSelectedImg(event)
        });
        img.addEventListener('keydown', (event) => {
            if(event.key === 'Enter'){
                openModalwithSelectedImg(event);
            }
        });
    }
}

const openModalwithSelectedImg = (event) => {
    const imgId = event.target.id;
    imgIndex = imgsArrayToDisplay.findIndex( (element) => element.id === imgId);
    showModal(true);
    createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
    navigator = new ModalNavigator(imgIndex, imgsArrayToDisplay);
}
//-------------

//EXPORT FUNCTIONS FOR MAIN CONTENT
export const createImgElement = (pictureToDisplay, whereToDisplay) => {
    whereToDisplay.innerHTML=('');
    const html = `<img class='gallery-item ${pictureToDisplay.category}' src='${pictureToDisplay.url}' alt='${pictureToDisplay.alt}' id='${pictureToDisplay.id} loading='lazy'>`;
    whereToDisplay.innerHTML = html;
}

export const displayPicturesInGallery = (pictures) => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML=('');
    let html = '';
    if(pictures.length === 0){
        const text = document.createElement('p');
        text.innerText = 'Pas d\'images afficher';
    }
    for(let picture of pictures) {
        html += `<img class='gallery-item ${picture.category}' src='${picture.smallUrl}' alt='${picture.alt}' id='${picture.id}' loading='lazy' tabindex="0">`;
    }
    gallery.innerHTML = html;
    listenImgsToOpenModal()
}

export const listenButtonsToFilterResult = (pictures) =>{
    const buttons = document.querySelectorAll('.gallery_buttons button');
    for (let currentButton of buttons) {
        currentButton.addEventListener('click', () => {
            if (currentButton.className === 'tous') {
                imgsArrayToDisplay = pictures;
            } else {
                imgsArrayToDisplay = pictures.filter( (picture) => {
                return picture.category === currentButton.className;
                });
            };
            displayPicturesInGallery(imgsArrayToDisplay);
        });
    }; 
}

export const showModal = (display = true) => {
    modal = display ? true : false;
    document.querySelector('.zoomDisplay').innerHTML=('');
    const modalBackground = document.querySelector('.modalBackground');
    modalBackground.style.display = display ? 'flex' : 'none';
    modalBackground.ariaHidden = display ? 'false' : 'true';
}
//---------------------