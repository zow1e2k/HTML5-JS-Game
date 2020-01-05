var ctx = document.getElementById("canvas").getContext("2d"),
x = -30,
y = 320,
load = 0,
needLevel = 1,
varCheck = 0,
player =
{
    imageR: loadImage("objects/playerR.png", 240, 240, 8),
    imageL: loadImage("objects/playerL.png", 240, 240, 8),
    healthIcon: loadImage("hud/health.png", 800, 800, 1),
    ammoIcon: loadImage("hud/ammo.png", 800, 800, 1),
    moneyIcon: loadImage("hud/money.png", 800, 800, 1),
    scoreIcon: loadImage("hud/score.png",800,800,1),
    loading: loadImage("objects/loading.png",100,20,10),
    place: 0,
    money: 100,
    ammo: 50,
    hp: 80,
    name: "",
    score: 0,
    firstKit: 0,
    nextLevel: false,
    direction: "right",
    speed: 1,
    x: x,
    y: y,
    counter: 0,
    counterAmmo: 0,
    idle: false,
    firstTimeRun: true,
    isMove: false,
    mapLoad: function ()
    {
        for (let i = 0; i < level[needLevel].sprites.length; i++)
            drawImageBg(level[needLevel].sprites[i], (-player.place+0), 0);
        for (let i = 0; i < level[needLevel].sprites.length; i++)
            drawImageBg(level[needLevel].sprites[i], (-player.place+540), 0);
        for (let i = 0; i < level[needLevel].sprites.length; i++)
            drawImageBg(level[needLevel].sprites[i], (-player.place+1080), 0);
    }
}
shop =
{
    image: loadImage("hud/shop.png", 400, 300, 1),
    firstKit: loadImage("hud/firstKit.png", 200, 200, 1),
    ammoKit: loadImage("hud/ammo.png", 200, 200, 1)
};
level = [];
level[1] =
{
  sprites: [
    loadImage("map/bg1.png", 213, 142, 1),
    loadImage("map/bg2.png", 272, 104, 1),
    loadImage("map/bg3.png", 272, 150, 1),
    loadImage("map/bg4.png", 213, 142, 1)
  ]
};

level[2] =
{
  sprites: [
    loadImage("map/mount1.png", 272, 160, 1),
    loadImage("map/mount3.png", 272, 160, 1),
    loadImage("map/mount4.png", 544, 160, 1),
    loadImage("map/mount5.png", 544, 160, 1),
    loadImage("map/mount2.png", 544, 190, 1)
  ]
};

level[3] =
{
  sprites: [loadImage("map/mount.png", 430, 336, 1)]
};

level[4] =
{
  sprites: [
    loadImage("map/cyber2.png", 256, 192, 1),
    loadImage("map/cyber1.png", 256, 192, 1),
    loadImage("map/cyber3.png", 352, 192, 1)
  ]
};
window.onload = function()
{
    allPagesLoaded = true;
    checkPages();
}
canvas.onclick = function(event)
{
    var x = event.pageX - canvas.offsetLeft;
    var y = event.pageY - canvas.offsetTop;
    touch(x, y);
    return true;
};
function touch(x, y)
{
    if (isPlayerInBuyMenu)
    {
        if (x >= 180 && x <= 350 && y >= 120 && y <= 245)
        {
            if (player.money >= 50 && player.firstKit != 3)
            {
                player.money -= 50;
                player.firstKit += 1;
            }
            else alert("Not enough money or more than 3 first kits at backpack");
            isPlayerInBuyMenu = false;
        }
        if (x >= 400 && x <= 650 && y >= 120 && y <= 245)
        {
            if (player.money >= 150 && player.ammo <= 1000)
            {
                player.money -= 150;
                player.ammo += 50;
            }
            else alert("Not enough money or more than 1000 ammo in backpack");
            isPlayerInBuyMenu = false;
        }
    }
    if (isGamePaused)
    {
        if (x >= 320 && x <= 850 && y >= 280 && y <= 320)
        {
            localStorage.setItem(player.name+"level", needLevel);
            localStorage.setItem(player.name+"playerMoney", player.money);
            localStorage.setItem(player.name+"playerAmmo", player.ammo);
            localStorage.setItem(player.name+"playerFirstKit", player.firstKit);
            localStorage.setItem(player.name+"nextLevel", player.nextLevel);
            if (parseInt(localStorage.getItem(player.name+"score")) < player.score ||
                localStorage.getItem(player.name+"score") === null)
                localStorage.setItem(player.name+"score", player.score);
            isGamePaused = false;
        }
    }
    return true;
}
function moveMap (x)
{
    if (x <= 0 && player.direction == "left")
    {
        player.speed = 0;
        player.place += 0;
    }
    else if (x < 300 && player.direction == "right")
    {
        player.speed = 15;
        player.place += 0;
    }
    else if (x == 300 && player.direction == "right")
    {
        player.speed = 0;
        player.place += 15;
    }
    if (player.place == 825 && player.direction == "right")
    {
        player.speed = 15;
        player.place += 0;
    }
    if (x >= 600 && player.direction == "right")
    {
        if (player.nextLevel && needLevel != 4)
        {
            needLevel++;
            localStorage.setItem(player.name+"level", parseInt(localStorage.getItem(player.name+"level"))+1);
            zombie.isDead = false;
            zombie.hp = 40 + 20*needLevel;
            zombie.x = 300;
            player.mapLoad();
            player.x = -30;
            player.place = 0;
        }
        else if (needLevel == 4)
        {
            ctx.clearRect (0, 0, 800, 600);
            isGameStarted = false;
            needLevel = 0;
            localStorage.setItem(player.name+"level", needLevel);
            localStorage.setItem(player.name+"playerMoney", player.money);
            localStorage.setItem(player.name+"playerAmmo", player.ammo);
            localStorage.setItem(player.name+"playerFirstKit", player.firstKit);
            localStorage.setItem(player.name+"nextLevel", player.nextLevel);
            if (parseInt(localStorage.getItem(player.name+"score")) < player.score ||
            localStorage.getItem(player.name+"score") === null)
            localStorage.setItem(player.name+"score", player.score);
            document.getElementById("startGame").hidden = false;
            document.getElementById("bestScore").hidden = false;
            document.getElementById("faq").hidden = false;
            document.getElementById("settings").hidden = false;
            alert ("you win this game!");
        }
        else
        {
            player.speed = 0;
            player.place += 0;
        }
    }
    else if (x >= 570 && player.direction == "left")
    {
        player.speed = 15;
        player.place += 0;
    }
    else if (x == 300 && player.place >= 15 && player.direction == "left")
    {
        player.speed = 0;
        player.place -= 15;
    }
    else if (x <= 300 && player.direction == "left" && x >= -30 && player.place == 0)
    {
        player.speed = 15;
        player.place -= 0;
    }
    return true;
}
window.addEventListener("keydown", function(event)
{
    if (isGameStarted)
    {
        if(event.keyCode == 65 || event.keyCode == 68 || event.keyCode == 32)
        {
            // player.counter++;
            isButtonPressed = true;
        }
        if(event.keyCode == 65) isButtonPressedA = true;
        if(event.keyCode == 68) isButtonPressedD = true;
        if(event.keyCode == 32) isButtonPressedSpace = true;
        if(event.keyCode == 66) //B
        {
            if (isPlayerInBuyMenu) isPlayerInBuyMenu = false;
            else
            {
                isPlayerInBuyMenu = true;
                updateHud();
            }
        }
        if(event.keyCode == 27) //ESC
        {
            if (isGamePaused)
            {
                isGamePaused = false;
            }
            else
            {
                isGamePaused = true;
                updateHud();
            }
        }
        if (event.keyCode == 67) //C
        {
            if (player.firstKit > 0)
            {
                player.firstKit--;
                if (player.hp+30 > 100) player.hp = 100;
                else player.hp += 30;
                ctx.strokeStyle = "#FFCC00";
                ctx.font = "bold 30px comic sans ms";
                ctx.clearRect(0, 0, 800, 500);
                player.mapLoad ();
                updateHud();
                isButtonPressed = true;
                player.idle = true;
                if (player.direction == "right") drawImage(player.imageR, player.x, player.y, "running");
                else if (player.direction == "left") drawImageL(player.imageL, player.x, player.y, "running");
                ctx.strokeText("+30 HP", 320, 300);
            }
        }
    }
    return true;
});
window.addEventListener("keyup", function(event)
{
    if (isGameStarted)
    {
        player.isMove = false;
        isButtonPressed = false;
        if (player.counterAmmo != 0) player.counterAmmo = 0;
        if (event.keyCode == 65) isButtonPressedA = false;
        if (event.keyCode == 68) isButtonPressedD = false;
        if (event.keyCode == 32) isButtonPressedSpace = false;
    }
    return true;
});
