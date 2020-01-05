var isGameStarted = false,
isPlayerInBuyMenu = false,
isButtonPressed = false,
isButtonPressedA = false,
isButtonPressedD = false,
isButtonPressedSpace = false,
isGamePaused = false,
gameOver = false,
godMode = false,
allPagesLoaded = false,
hv = false;

function checkPages()
{
    if (!allPagesLoaded)
    {
        document.getElementById("startGame").hidden = true;
        document.getElementById("bestScore").hidden = true;
        document.getElementById("faq").hidden = true;
        document.getElementById("settings").hidden = true;
        document.getElementById("returnToMenu").hidden = true;
        document.getElementById("clearLocalStorage").hidden = true;
        document.getElementById("godMode").hidden = true;
        document.getElementById("name").hidden = true;
    }
    else
    {
        document.getElementById("startGame").hidden = false;
        document.getElementById("bestScore").hidden = false;
        document.getElementById("faq").hidden = false;
        document.getElementById("settings").hidden = false;
        document.getElementById("returnToMenu").hidden = true;
        document.getElementById("clearLocalStorage").hidden = true;
        document.getElementById("godMode").hidden = true;
        document.getElementById("name").hidden = true;
    }
    return true;
}

function startGame()
{
    let nameS = document.getElementById("name").value;
    document.getElementById("startGame").hidden = false;
    document.getElementById("bestScore").hidden = true;
    document.getElementById("faq").hidden = true;
    document.getElementById("settings").hidden = true;
    document.getElementById("name").hidden = false;
    ctx.clearRect(0,0,800,600);
    ctx.strokeStyle = "#FFFFFF";
    ctx.font = "bold 30px sans-serif";
    if (nameS.length < 4) return ctx.strokeText("Your name must have atleast 4 characters", 50, 400);
    else if (nameS.length > 12) return ctx.strokeText("Your name must have no more than 12 characters", 50, 400);
    else
    {
        isGameStarted = true;
        gameOver = false;
        player.hp = godMode == true?9999:80;
        player.name = nameS;
        if (localStorage.getItem(player.name+"playerMoney") === null)
        {
            //localStorage.clear();
            player.x = -30;
            player.money = 100;
            player.ammo = 50;
            player.firstKit = 0;
            player.direction = "right";
            player.counter = 0;
            player.counterAmmo = 0;
            player.place = 0;
            player.idle = false;
            player.firstTimeRun = true;
            player.isMove = false;
            player.nextLevel = false;
            player.score = 0;
            needLevel = 1;
            zombie.hp = 40;
            zombie.x = 300;
            zombie.isDead = false;
            zombie.firstTimeRun = true;
            zombie.idle = true;
            zombie.counter = 0;
        }
        else //if (!gameOver)
        {
            player.x = -30;
            player.money = parseInt(localStorage.getItem(player.name+"playerMoney"));
            player.ammo = parseInt(localStorage.getItem(player.name+"playerAmmo"));
            player.firstKit = parseInt(localStorage.getItem(player.name+"playerFirstKit"));
            player.direction = "right";
            player.counter = 0;
            player.counterAmmo = 0;
            player.place = 0;
            player.idle = false;
            player.firstTimeRun = true;
            player.isMove = false;
            player.nextLevel = parseInt(localStorage.getItem(player.name+"nextLevel"));
            player.score = 0;
            needLevel = 1;
            zombie.hp = 40;
            zombie.x = 300;
            zombie.isDead = false;
            zombie.firstTimeRun = true;
            zombie.idle = true;
            zombie.counter = 0;
        }
        for (let i = 0; i < localStorage.length; i++)
        {   
            if (localStorage.getItem(localStorage.key(i)) == "nickname")
            {
                if (player.name === localStorage.key(i)) hv = true;
            }
        }
        if (!hv) localStorage.setItem(player.name+"score",0);
        localStorage.setItem(player.name, "nickname");
        hv = false;
        console.log(parseInt(localStorage.getItem(player.name+"score")));
        document.getElementById("startGame").hidden = true;
        document.getElementById("name").hidden = true;
        loading();
    }
    return true;
}
function bestScore()
{
    document.getElementById("bestScore").hidden = true;
    document.getElementById("startGame").hidden = false;
    document.getElementById("faq").hidden = false;
    document.getElementById("settings").hidden = false;
    document.getElementById("name").hidden = true;
    let top = [];
    for (let i = 0, k = 0; i < localStorage.length; i++)   
        if (localStorage.getItem(localStorage.key(i)) == "nickname")
            top[k++] = localStorage.key(i);
    for (let i = 0; i < top.length; i++)
        localStorage.setItem(top[i],parseInt(localStorage.getItem(top[i]+"score")));
    let tmpName = "";
    for (let i = 0, endi = top.length - 1; i < endi; i++)
    {
        for (let j = 0, endj = endi - i; j < endj; j++)
        {
            if (parseInt(localStorage.getItem(top[j])) > parseInt(localStorage.getItem(top[j+1])))
            {
                tmpName = top[j];
                top[j] = top[j+1];
                top[j+1] = tmpName;
            }
        }
    }
    ctx.clearRect(0,0,800,600);
    ctx.strokeStyle = "#FFFFFF";
    ctx.font = "bold 30px sans-serif";
    ctx.strokeText("TOP 5: ", 20, 50);
    ctx.strokeText(top[top.length-1]+"  ---  "+localStorage.getItem(top[top.length-1]), 130, 100);
    ctx.strokeText(top[top.length-2]+"  ---  "+localStorage.getItem(top[top.length-2]), 130, 150);
    ctx.strokeText(top[top.length-3]+"  ---  "+localStorage.getItem(top[top.length-3]), 130, 200);
    ctx.strokeText(top[top.length-4]+"  ---  "+localStorage.getItem(top[top.length-4]), 130, 250);
    ctx.strokeText(top[top.length-5]+"  ---  "+localStorage.getItem(top[top.length-5]), 130, 300);
    for (let i = 0; i < top.length; i++)
        localStorage.setItem(top[i],"nickname");
    return true;
}
function faq()
{
    document.getElementById("faq").hidden = true;
    document.getElementById("startGame").hidden = false;
    document.getElementById("bestScore").hidden = false;
    document.getElementById("settings").hidden = false;
    document.getElementById("name").hidden = true;
    ctx.clearRect(0,0,800,600);
    ctx.strokeStyle = "#FFFFFF";
    ctx.font = "bold 30px sans-serif";
    ctx.strokeText("To begin play you need to click \"Start Game\"", 20, 100);
    ctx.strokeText("Then you need to move by \"A\" and \"D\" keys", 20, 150);
    ctx.strokeText("Moving on, you should to kill zombie by \"Space\" key..", 20, 200);
    ctx.strokeText("..to find a clef to transfer on a new level", 20, 250);
    ctx.strokeText("You can also buy first kit aids or ammo for your gun..", 20, 300);
    ctx.strokeText("..using an ingame buy menu by \"B\" key", 20, 350);
    ctx.strokeText("If you have almost done use the first kit by \"C\" key", 20, 400);
    ctx.strokeText("If you are afraid to loose your money, score and etc..", 20, 450);
    ctx.strokeText("..press \"Escape\" key to save your loot", 20, 500);
    return true;
}
function settings()
{
    document.getElementById("settings").hidden = true;
    document.getElementById("faq").hidden = true;
    document.getElementById("bestScore").hidden = true;
    document.getElementById("startGame").hidden = true;
    document.getElementById("returnToMenu").hidden = false;
    document.getElementById("clearLocalStorage").hidden = false;
    document.getElementById("godMode").hidden = false;
    document.getElementById("name").hidden = true;
    return true;
}
function returnToMenu()
{
    document.getElementById("settings").hidden = false;
    document.getElementById("faq").hidden = false;
    document.getElementById("bestScore").hidden = false;
    document.getElementById("startGame").hidden = false;
    document.getElementById("returnToMenu").hidden = true;
    document.getElementById("clearLocalStorage").hidden = true;
    document.getElementById("godMode").hidden = true;
    document.getElementById("name").hidden = true;
    return true;
}
function godModeActivate()
{
    godMode = godMode == true?false:true;
    ctx.clearRect(0,0,800,600);
    ctx.strokeStyle = "#FFFFFF";
    ctx.font = "bold 30px sans-serif";
    if (godMode) ctx.strokeText("God Mode successfuly activated", 150, 400);
    else ctx.strokeText("God Mode successfuly inactivated", 150, 400);
}
function clearLocalStorage()
{
    ctx.clearRect(0,0,800,600);
    ctx.strokeStyle = "#FFFFFF";
    ctx.font = "bold 30px sans-serif";
    ctx.strokeText("Storage successfuly cleared", 150, 400);
    return localStorage.clear();
}
