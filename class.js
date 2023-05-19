export class ModalNavigator {
    currentValue = 0;
    elementsToDisplay = [];

    constructor (currentValue, elementsToDisplay) {
        this.currentValue = currentValue;
        this.elementsToDisplay = elementsToDisplay;
    };
    
    goToNextIndex() {
        if (this.currentValue < this.elementsToDisplay.length-1 && this.currentValue >= 0) {
            this.currentValue ++;
        }
        else if (this.currentValue === this.elementsToDisplay.length-1) {
            this.currentValue = 0;
        }
    };

    goToPreviousIndex() {
        if (this.currentValue >= 1) {
            this.currentValue --;
        }
        else if (this.currentValue === 0) {
            this.currentValue = this.elementsToDisplay.length-1;
        }     
    };
}