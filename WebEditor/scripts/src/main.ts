import * as Tools from "./tools/index.js"
import * as Game from "./game/index.js"
import * as Data from "./data/index.js"

var canvas: HTMLCanvasElement = document.getElementById("the-game") as HTMLCanvasElement;
resizeCanvas();

var ctx = canvas.getContext('2d');

let newSpriteScreen = document.getElementById("new-sprite-screen");
createSpriteSelectElements();

const Time = new Tools.Time();
let initialTime = Date.now();

type Pair = {
    sprite: Game.Sprite,
    view: HTMLDivElement
}

enum ChangeDir {
    ToSprite,
    FromSprite,
}

let sprites: Pair[] = new Array<Pair>();
let spriteSelected: Pair;
let selectedSpriteAttr = {
    posX: document.getElementById("pos-x") as HTMLInputElement,
    posY: document.getElementById("pos-y") as HTMLInputElement,
    size: document.getElementById("size") as HTMLInputElement,
    rotation: document.getElementById("rotation") as HTMLInputElement,
};

let mousePos = new Tools.Vec(0, 0, 0, 0);
let mouseButtons = {
    left: false,
    right: false,
    middle: false,
}

function animLoop(): void {
    let currentTime = (new Date()).getTime();

    ctx.clearRect(0, 0, canvas.width, canvas.height); // We always want to clear

    ctx.beginPath();
    let img = new Image(canvas.width, canvas.height);
    img.src = "../../assets/basic.png";
    ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
    )
    ctx.closePath();

    for (let i = 0; i < sprites.length; i++) {
        if (sprites[i].sprite.selected) {
            spriteSelected = sprites[i];
            i = sprites.length;
            continue;
        }
        selectSprite(sprites[i]);
    }
    for (let i = 0; i < sprites.length; i++) {
        sprites[i].sprite.draw();
    }
    if (spriteSelected != null) {
        handleDragAndDrop(spriteSelected);
        changeSpriteAttr(ChangeDir.FromSprite)
    }


    Time.setDT(currentTime - initialTime);
    initialTime = currentTime;
    requestAnimationFrame(animLoop);
}
animLoop();

function changeSpriteAttr(direction: ChangeDir) {
    if (direction === ChangeDir.FromSprite) {
        selectedSpriteAttr.posX.valueAsNumber = spriteSelected.sprite.position.x
        selectedSpriteAttr.posY.valueAsNumber = spriteSelected.sprite.position.y;
        selectedSpriteAttr.size.valueAsNumber = spriteSelected.sprite.size;
        selectedSpriteAttr.rotation.valueAsNumber = spriteSelected.sprite.rotation;
    } else {
        spriteSelected.sprite.position.x = selectedSpriteAttr.posX.valueAsNumber;
        spriteSelected.sprite.position.y = selectedSpriteAttr.posY.valueAsNumber;
        spriteSelected.sprite.size = selectedSpriteAttr.size.valueAsNumber;
        spriteSelected.sprite.rotation = selectedSpriteAttr.rotation.valueAsNumber;
    }
}

function selectSprite(sprite: Pair) {
    if ((sprite.sprite.touching(mousePos) && mouseButtons.left) ||
        sprite.view.getAttribute("selected") === "true") {
        spriteSelected = sprite;
    }
}

function handleDragAndDrop(sprite: Pair) {
    sprite.sprite.selected = true;
    if (!mouseButtons.left) {
        return;
    }
    sprite.sprite.position.add(
        mousePos.z,
        mousePos.w
    );
    sprite.sprite.draw();
}

document.getElementById("new-btn").addEventListener("click", () => {
    newSpriteScreen.style.display = "grid";
});
document.getElementById("close-btn").addEventListener("click", () => {
    newSpriteScreen.style.display = "none";
});

function newViewer(img: string): HTMLDivElement {
    let box = document.createElement("div");
    box.className = "sprite-view";
    box.style.background = `#fff url(${img})`;
    box.style.backgroundSize = "contain";
    box.style.backgroundRepeat = "no-repeat";
    box.style.backgroundPosition = "center";
    box.setAttribute("selected", "false");
    return box;
}

function createSpriteSelectElements() {
    let spriteBox = newSpriteScreen.lastElementChild;
    for (let i = 0; i < Data.DEFAULT_SPRITES.length; i++) {
        let box = newViewer(Data.DEFAULT_SPRITES[i].img);
        spriteBox.appendChild(box);
        box.addEventListener("click", () => {
            newSprite(Data.DEFAULT_SPRITES[i].img);
            newSpriteScreen.style.display = "none";
        })
    }
}

function newSprite(imgurl: string) {
    let spriteBox = document.getElementById("sprite-box");
    let box = newViewer(imgurl);

    let delButton = document.createElement("button");
    delButton.className = "sprite-view-btn";
    let img = document.createElement("img");
    img.src = "/assets/Icons/close.svg";
    img.className = "icon";
    delButton.appendChild(img);
    delButton.addEventListener("click", () => {
        for (let i = 0; i < sprites.length; i++) {
            if (sprites[i].view == box) {
                sprites.splice(i, 1);
                box.remove();
            }
        }
    })
    box.appendChild(delButton);
    spriteBox.appendChild(box);

    let pair: Pair = {
        sprite: new Game.Sprite(ctx, {
            image: imgurl,
            position: new Tools.Vec(250, 250),
            size: 100,
            rotation: 0,
        }), view: box
    }
    sprites.push(pair);

    box.addEventListener("click", () => {
        for (let i = 0; i < sprites.length; i++) {
            box.setAttribute("selected", "false");
        }
        box.setAttribute("selected", "true");
    })
}

let moveStopCheck: number;
document.onmousemove = (e) => {
    let rect = canvas.getBoundingClientRect();
    mousePos.set(
        e.clientX - rect.left,
        e.clientY - rect.top,
        e.movementX,
        e.movementY
    );
    clearTimeout(moveStopCheck);
    moveStopCheck = setTimeout(() => {
        mousePos.set(mousePos.x, mousePos.y, 0, 0)
    }, 1)
}
document.onmousedown = (e) => {
    for (let i = 0; i < sprites.length; i++) {
        sprites[i].view.setAttribute("selected", "false");
        sprites[i].sprite.selected = false;
        spriteSelected = null;
    }

    switch (e.button) {
        case 0: mouseButtons.left = true; break;
        case 1: mouseButtons.middle = true; break;
        case 2: mouseButtons.right = true; break;
    }
}
document.onmouseup = (e) => {
    switch (e.button) {
        case 0: mouseButtons.left = false; break;
        case 1: mouseButtons.middle = false; break;
        case 2: mouseButtons.right = false; break;
    }
}

window.addEventListener('resize', resizeCanvas, true);
function resizeCanvas(): void {
    canvas.style.width = "100%";
    canvas.style.height = "100%"

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}