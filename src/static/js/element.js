class Element {
    // This class handles all the logic related to the numbers

    constructor () {
        this.element = document.createElement('div');
        this.value = Math.floor(Math.random() * 100);
        this.clicked = false;
        this.set_properties();
        this.set_position();
        this.check_click();
        this.disappear_number();
    };

    set_properties() {
        this.element.textContent = this.value;
        this.element.className = 'floating-number';
    };

    set_position() {
        let xPos = Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1;
        let yPos = window.innerHeight * (1- 0.35);
        this.element.style.left = xPos + 'px';
        this.element.style.top = yPos + 'px';
    };

    check_click() {
        this.element.addEventListener('click', () => {
            if ( !this.clicked ) {
                this.clicked = true;
                this.check_value(); // Updating the score
                this.element.remove(); // Removing the element after being clicked
            };
        });
    };

    check_value() {
        if ( this.value % 3 == 0 && this.value % 5 == 0 ) {
            game.update_score(3);
        } else if ( this.value % 3 == 0 || this.value % 5 == 0 ) {
            game.update_score(1);
        } else {
            game.update_score(-1);
        };
    };

    disappear_number() {
        setTimeout(() => {
            if ( !this.clicked ) {
                this.clicked = true;
                this.element.remove();
            }
        }, 7000);
    };
};
