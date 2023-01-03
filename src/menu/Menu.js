class Menu {
    constructor(img) {
        this.background = img;
        this.sceneToLoad = 1;
    }

    draw() {
        background(0);
        push();
        image(this.background, 0, 0, 1920, 1080);
        if (mouseX > 656 && mouseX < 1175 &&
            mouseY > 675 && mouseY < 875) {
            fill(0, 150);
            if (mouseIsPressed) {
                this.sceneToLoad = 2;
            }
        } else {
            fill(0, 0);
        }
        rect(656, 675, 500, 200);
        return this.sceneToLoad;
        pop();
    }
}