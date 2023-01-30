class startMenu{


    constructor(){
        this.rectSize = windowWidth/6;
        this.eachIncrease = (348 / totalLevels - 2);
    }

    updateWindow(){
        this.rectSize = windowWidth/6;     //for when window is resized
    }

    display(){     //updates in draw
        textSize(50);
        textAlign(CENTER);
        fill(255);
        text("Catch Game!",windowWidth/2, 100);
        this.instructions();
        fill(255);
        rect(((windowWidth/4) - (this.rectSize/2)), ((windowHeight/2)- (this.rectSize/4)), this.rectSize,this.rectSize/2); //the button
        textSize(30);
        fill(0);
        text("Start Game",windowWidth/4,windowHeight/2+10);
        fill(255)
        text("Level: "+level,windowWidth/2,(windowHeight/14) * 12);
        text("Use arrow keys to change level",windowWidth/2,(windowHeight/14) * 13);
        // this.difficultyBar();
        textAlign("left", "top");
	    text("Best Score: "+scores[level - 1],windowWidth + 30, 20)
    }

    
    
    
    doesGameStart(){
        let lowX = (windowWidth/4) - (this.rectSize/2);      //bounds of the button
        let hiX = (windowWidth/4) - (this.rectSize/2) + this.rectSize;
        let lowY = (windowHeight/2)- (this.rectSize/4);
        let hiY = (windowHeight/2)- (this.rectSize/4) + this.rectSize/2;
        if (((mouseX > lowX) && (mouseX < hiX)) && ((mouseY > lowY) && (mouseY < hiY))){     //supposed to check if mouse is within box
            return true;     //update if game is playing
        }else{
            return false;
        }
    }

    instructions(){    //displayes the instructions
        textSize(30);
        textAlign(CENTER);
        fill(255);
        text ("Block the viruses",(windowWidth/4)*3,((windowHeight/2)-(windowHeight/10)));
        text ("Miss 5 viruses and you loose",(windowWidth/4)*3,(windowHeight/2));
        text ("Block 3 emails and also loose",(windowWidth/4)*3,((windowHeight/2)+(windowHeight/10)));
    }

    // difficultyBar(){
    //     let lowX = (windowWidth/10);         //bounds on the outer bar
    //     let highX = (windowWidth/10) * 9;
    //     let lowY = (windowHeight/14) * 12;
    //     let highY = (windowHeight/14) * 13;
    //     fill(255);
    //     rect(lowX ,lowY ,highX - lowX ,highY - lowY);
    //     //colour of the bar
    //     let changeAmount = (this.eachIncrease * level - 1);
    //     changeAmount = int(changeAmount)
    //     let red;
    //     let green;
    //     if (changeAmount > 174){
    //         green = 17;
    //         red = 17 + (changeAmount - 174);
    //     } else{
    //         red = 17;
    //         green = 191 - changeAmount;
    //     }
    //     // The bar itself
    //     let progress = (highX - lowX) * (level/this.totalLevels);
    //     fill(red, green, 17);
    //     rect (lowX ,lowY, lowX + progress ,highY - lowY);
    // }
}