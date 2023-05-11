//FUNCTIONS OF THE DOCUMENT
const getData = async () => {
    const response = await fetch('./scipts/data.json');
    return await response.json();
}

const listenImgForModalOpening = () => {
    const actualImgs = document.querySelectorAll('.gallery img');
    const modalPlace = document.querySelector('.zoomDisplay');
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
            console.log(imgsArrayToDisplay[imgIndex])
            modalPlace.innerHTML=('');
            imgIndex -= 1;
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        }
        else if (imgIndex === 0) {
            imgIndex = imgsArrayToDisplay.length-1;
            modalPlace.innerHTML=('');
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        }     
    })
    
    document.getElementById('nextModalButton').addEventListener('click', () => {
        if (imgIndex < imgsArrayToDisplay.length-1 && imgIndex >= 0) {
            console.log(imgsArrayToDisplay[imgIndex])
            modalPlace.innerHTML=('');
            imgIndex += 1;
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        }
        else if (imgIndex === imgsArrayToDisplay.length-1) {
            imgIndex = 0;
            modalPlace.innerHTML=('');
            createImgElement(imgsArrayToDisplay[imgIndex], modalPlace);
        }
    })
}

const createImgElement = (pictureToDisplay, whereToDisplay) => {
    const img = document.createElement('img');
    img.src = pictureToDisplay.url;
    img.alt = pictureToDisplay.alt;
    img.id = pictureToDisplay.id; //
    img.className = 'gallery-item ' + pictureToDisplay.category;
    whereToDisplay.appendChild(img);
}
//-------------

//VARIABLES OF THE DOCUMENT
const pictures = await getData(); //original full data
export let imgsArrayToDisplay = pictures; //data that can be modified
const categories = ['Tous', 'Concert', 'Entreprise', 'Mariage', 'Portrait'];
//----------


//EXPORT FUNCTIONS FOR MAIN CONTENT
export const displayInGallery = (pictures) => {
    document.querySelector('.gallery').innerHTML=('');
    if(pictures.length === 0){
        const text = document.createElement('p');
        text.innerText = 'Pas d\'images afficher';
    }

    for(let picture of pictures) {
        const img = document.createElement('img');
        img.src = picture.url;
        img.alt = picture.alt;
        img.id = picture.id;
        img.className = 'gallery-item ' + picture.category;
        document.querySelector('.gallery').appendChild(img);
    };
    console.log(imgsArrayToDisplay)
    listenImgForModalOpening();
}

export const displayFilterButtons = () => {
    for (let currentCategory of categories) {
        const button = document.createElement('button');
        button.className = currentCategory.toLowerCase()
        button.type = 'button';
        button.innerText = currentCategory;
        document.querySelector('.gallery_buttons').appendChild(button);
    }
    document.querySelector('.gallery_buttons .tous').focus();
}

export const filterResult = (pictures) =>{
    const buttons = document.querySelectorAll('.gallery_buttons button');
    
    for (let currentButton of buttons) {
        currentButton.addEventListener('click', () => {
            imgsArrayToDisplay = pictures.filter( (picture) => {
                return picture.category === currentButton.className;
            })
            displayInGallery(imgsArrayToDisplay);
        })
    }

    document.querySelector('.gallery_buttons .tous').addEventListener('click', () => {
        imgsArrayToDisplay = pictures;
        displayInGallery(imgsArrayToDisplay);
    });
}

export const showModal = (display = true) => {
    document.querySelector('.zoomDisplay').innerHTML=('');
    const modalBackground = document.querySelector('.modalBackground');
    modalBackground.style.display = display ? 'flex' : 'none';
}
//---------------------