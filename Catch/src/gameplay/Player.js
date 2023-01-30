class Player {
	constructor(image) {
		this.size = 75;
        this.position = createVector(0, windowHeight - this.size - 50);

        this.sprite = image;
	}

    updatePlayerPos(){
        this.position = createVector(0, windowHeight - this.size - 50);
    }

    // handles drawing character sprite to screen
	draw() {
		push();
		// fill(255);
		// rect(this.position.x, this.position.y, this.size, this.size);
        this.sprite.resize(120, 120);
        image(this.sprite, this.position.x - 25, this.position.y);
		pop();
	}

    // handles movement
    move() {
        // Boundary checking
        let x = (mouseX < this.size / 2 ? 0 : (mouseX > windowWidth - (this.size / 2) ? (windowWidth - this.size) : mouseX - (this.size / 2)));
        
        this.position.set(x, this.position.y);
    }

    // main update function for Player
    onFrameUpdate() {
        this.move();
        this.draw();
    }
}