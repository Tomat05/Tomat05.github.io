import * as Tools from "./tools/index.js";
import * as Game from "./game/index.js";
import * as Data from "./data/index.js";
var canvas = document.getElementById("the-game");
resizeCanvas();
var ctx = canvas.getContext('2d');
var newSpriteScreen = document.getElementById("new-sprite-screen");
createSpriteSelectElements();
var Time = new Tools.Time();
var initialTime = Date.now();
var ChangeDir;
(function (ChangeDir) {
    ChangeDir[ChangeDir["ToSprite"] = 0] = "ToSprite";
    ChangeDir[ChangeDir["FromSprite"] = 1] = "FromSprite";
})(ChangeDir || (ChangeDir = {}));
var sprites = new Array();
var spriteSelected;
var selectedSpriteAttr = {
    posX: document.getElementById("pos-x"),
    posY: document.getElementById("pos-y"),
    size: document.getElementById("size"),
    rotation: document.getElementById("rotation"),
};
var mousePos = new Tools.Vec(0, 0, 0, 0);
var mouseButtons = {
    left: false,
    right: false,
    middle: false,
};
function animLoop() {
    var currentTime = (new Date()).getTime();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    var img = new Image(canvas.width, canvas.height);
    img.src = "../../assets/basic.png";
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
    for (var i = 0; i < sprites.length; i++) {
        if (sprites[i].sprite.selected) {
            spriteSelected = sprites[i];
            i = sprites.length;
            continue;
        }
        selectSprite(sprites[i]);
    }
    for (var i = 0; i < sprites.length; i++) {
        sprites[i].sprite.draw();
    }
    if (spriteSelected != null) {
        handleDragAndDrop(spriteSelected);
        changeSpriteAttr(ChangeDir.FromSprite);
    }
    Time.setDT(currentTime - initialTime);
    initialTime = currentTime;
    requestAnimationFrame(animLoop);
}
animLoop();
function changeSpriteAttr(direction) {
    if (direction === ChangeDir.FromSprite) {
        selectedSpriteAttr.posX.valueAsNumber = spriteSelected.sprite.position.x;
        selectedSpriteAttr.posY.valueAsNumber = spriteSelected.sprite.position.y;
        selectedSpriteAttr.size.valueAsNumber = spriteSelected.sprite.size;
        selectedSpriteAttr.rotation.valueAsNumber = spriteSelected.sprite.rotation;
    }
    else {
        spriteSelected.sprite.position.x = selectedSpriteAttr.posX.valueAsNumber;
        spriteSelected.sprite.position.y = selectedSpriteAttr.posY.valueAsNumber;
        spriteSelected.sprite.size = selectedSpriteAttr.size.valueAsNumber;
        spriteSelected.sprite.rotation = selectedSpriteAttr.rotation.valueAsNumber;
    }
}
function selectSprite(sprite) {
    if ((sprite.sprite.touching(mousePos) && mouseButtons.left) ||
        sprite.view.getAttribute("selected") === "true") {
        spriteSelected = sprite;
    }
}
function handleDragAndDrop(sprite) {
    sprite.sprite.selected = true;
    if (!mouseButtons.left) {
        return;
    }
    sprite.sprite.position.add(mousePos.z, mousePos.w);
    sprite.sprite.draw();
}
document.getElementById("new-btn").addEventListener("click", function () {
    newSpriteScreen.style.display = "grid";
});
document.getElementById("close-btn").addEventListener("click", function () {
    newSpriteScreen.style.display = "none";
});
function newViewer(img) {
    var box = document.createElement("div");
    box.className = "sprite-view";
    box.style.background = "#fff url(".concat(img, ")");
    box.style.backgroundSize = "contain";
    box.style.backgroundRepeat = "no-repeat";
    box.style.backgroundPosition = "center";
    box.setAttribute("selected", "false");
    return box;
}
function createSpriteSelectElements() {
    var spriteBox = newSpriteScreen.lastElementChild;
    var _loop_1 = function (i) {
        var box = newViewer(Data.DEFAULT_SPRITES[i].img);
        spriteBox.appendChild(box);
        box.addEventListener("click", function () {
            newSprite(Data.DEFAULT_SPRITES[i].img);
            newSpriteScreen.style.display = "none";
        });
    };
    for (var i = 0; i < Data.DEFAULT_SPRITES.length; i++) {
        _loop_1(i);
    }
}
function newSprite(imgurl) {
    var spriteBox = document.getElementById("sprite-box");
    var box = newViewer(imgurl);
    var delButton = document.createElement("button");
    delButton.className = "sprite-view-btn";
    var img = document.createElement("img");
    img.src = "/assets/Icons/close.svg";
    img.className = "icon";
    delButton.appendChild(img);
    delButton.addEventListener("click", function () {
        for (var i = 0; i < sprites.length; i++) {
            if (sprites[i].view == box) {
                sprites.splice(i, 1);
                box.remove();
            }
        }
    });
    box.appendChild(delButton);
    spriteBox.appendChild(box);
    var pair = { sprite: new Game.Sprite(ctx, {
            image: imgurl,
            position: new Tools.Vec(250, 250),
            size: 100,
            rotation: 0,
        }), view: box };
    sprites.push(pair);
    box.addEventListener("click", function () {
        for (var i = 0; i < sprites.length; i++) {
            box.setAttribute("selected", "false");
        }
        box.setAttribute("selected", "true");
    });
}
var moveStopCheck;
document.onmousemove = function (e) {
    var rect = canvas.getBoundingClientRect();
    mousePos.set(e.clientX - rect.left, e.clientY - rect.top, e.movementX, e.movementY);
    clearTimeout(moveStopCheck);
    moveStopCheck = setTimeout(function () {
        mousePos.set(mousePos.x, mousePos.y, 0, 0);
    }, 1);
};
document.onmousedown = function (e) {
    for (var i = 0; i < sprites.length; i++) {
        sprites[i].view.setAttribute("selected", "false");
        sprites[i].sprite.selected = false;
        spriteSelected = null;
    }
    switch (e.button) {
        case 0:
            mouseButtons.left = true;
            break;
        case 1:
            mouseButtons.middle = true;
            break;
        case 2:
            mouseButtons.right = true;
            break;
    }
};
document.onmouseup = function (e) {
    switch (e.button) {
        case 0:
            mouseButtons.left = false;
            break;
        case 1:
            mouseButtons.middle = false;
            break;
        case 2:
            mouseButtons.right = false;
            break;
    }
};
window.addEventListener('resize', resizeCanvas, true);
function resizeCanvas() {
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
//# sourceMappingURL=main.js.map