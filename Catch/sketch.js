let player;
let scene = 0;
let menu;
let level = 1;
let difficulty = (level * 0.05) + 0.95;
let totalLevels = 5;
let caught = 0;
let missed = 0;
let badCaught = 0;
let deathReason = "";
let scores = [];

let backgroundImg;
let badImg;
let goodImg;
let fireWall;

function preload() {
	backgroundImg = loadImage('src/resources/traces.png');
	catchImg = loadImage('src/resources/virussy.png');
	missImg = loadImage('src/resources/mail.png')
	bsod = loadImage('src/resources/blue_screen_of_death.png')
	missImg = loadImage('src/resources/mail.png');
	fireWall = loadImage('src/resources/firewall.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  
  	menu = new startMenu();
	endScreen = new endMenu();
	player = new Player(fireWall);
  
  	spawner = new ObjectSpawner([catchImg, missImg]);
	spawner.setup();

	for (let i = 0; i < scores.length ; i++){
		scores[i]=0;
	}
}

function windowResized(){
  	resizeCanvas(windowWidth, windowHeight);
  	player.updatePlayerPos();
}

function keyPressed() {
	if (keyCode === LEFT_ARROW || keyCode === DOWN_ARROW) {
	  if (level > 1){
		level--;
		difficulty = (level * 0.1) + 1;
	  }
	} else if (keyCode === RIGHT_ARROW || keyCode === UP_ARROW) {
	  if (level < 5){
		level++;
		difficulty = (level * 0.1) + 1;
	  }
	}
	if (keyCode === TAB && scene == 2){
		endScreen.reset();
	}
}


function draw() {
	background(220);
	backgroundImg.resize(1920, 1080);
	bsod.resize(1920, 1080);
	if (scene === 2){
		image(bsod, 0, 0);
	}else{
		image(backgroundImg, 0, 0);
	}
	switch (scene) {
    	case 0:
      		menu.display();
			break;

		case 1:
			spawner.onFrameUpdate();
			player.onFrameUpdate();
			break;
		case 2:
			endScreen.display();
			break;
    	default:
    		break;
  	}

	if (missed >= 5 || badCaught >= 3) {
		scene = 2;
	}

	push();
	textSize(30);
	fill(255);
	textAlign("right", "top");
	text("Caught: " + caught + "\nMissed: " + missed + "\nBad: " + badCaught + "\nLevel: " + level, windowWidth - 30, 20);
	pop();

}

function mousePressed(){
	if (scene == 0 && menu.doesGameStart()){
	  	scene = 1;
	}
}