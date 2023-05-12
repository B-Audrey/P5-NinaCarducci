//VARIABLES OF THE DOCUMENT
const data = await fetch('./data.json'); //original full data
export const pictures = await data.json() 
export let imgsArrayToDisplay = pictures; //data that can be modified
const modalPlace = document.querySelector('.zoomDisplay');
//----------

//FUNCTIONS OF THE DOCUMENT
export const listenImgForModalNavigation = () => {
    const actualImgs = document.querySelectorAll('.gallery img');
    let imgIndex = 0;

    for (const img of actualImgs) {
        img.addEventListener( 'click', (event) => {
            showModal(true);
            const imgId = event.target.id;
            imgIndex = imgsArrayToDisplay.findIndex( (element) => element.id === imgId);
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        })
    }
    
    document.getElementById('previousModalButton').addEventListener('click', () => {
        if (imgIndex >= 1) {
            imgIndex -= 1;
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        }
        else if (imgIndex === 0) {
            imgIndex = imgsArrayToDisplay.length-1;
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        }     
    })
    
    document.getElementById('nextModalButton').addEventListener('click', () => {
        if (imgIndex < imgsArrayToDisplay.length-1 && imgIndex >= 0) {
            imgIndex += 1;
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        }
        else if (imgIndex === imgsArrayToDisplay.length-1) {
            imgIndex = 0;
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        }
    })
}

const createImgElement = (pictureToDisplay, whereToDisplay) => {
    modalPlace.innerHTML=('');
    const html = `<img class='gallery-item ${pictureToDisplay.category}' src='${pictureToDisplay.url}' alt='${pictureToDisplay.alt}' id='${pictureToDisplay.id} loading='lazy'>`;
    whereToDisplay.innerHTML = html;
}
//-------------

//EXPORT FUNCTIONS FOR MAIN CONTENT
export const displayPicturesInGallery = (pictures) => {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML=('');
    let html = '';
    if(pictures.length === 0){
        const text = document.createElement('p');
        text.innerText = 'Pas d\'images afficher';
    }

    for(let picture of pictures) {
        html += `<img class='gallery-item ${picture.category}' src='${picture.smallUrl}' alt='${picture.alt}' id='${picture.id}' loading='lazy'>`;
    }
    gallery.innerHTML = html;
    listenImgForModalNavigation()
}

export const ListenButtonsToFilterResult = (pictures) =>{
    const buttons = document.querySelectorAll('.gallery_buttons button');
    
    for (let currentButton of buttons) {
        currentButton.addEventListener('click', () => {
            imgsArrayToDisplay = pictures.filter( (picture) => {
                return picture.category === currentButton.className;
            })
            displayPicturesInGallery(imgsArrayToDisplay);
        })
    }

    document.querySelector('.gallery_buttons .tous').addEventListener('click', () => {
        imgsArrayToDisplay = pictures;
        displayPicturesInGallery(imgsArrayToDisplay);

    });
}

export const showModal = (display = true) => {
    document.querySelector('.zoomDisplay').innerHTML=('');
    const modalBackground = document.querySelector('.modalBackground');
    modalBackground.style.display = display ? 'flex' : 'none';
}
//---------------------