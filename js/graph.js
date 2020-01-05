function onGameUpdate()
{
    if (!isGameStarted) return true;
    if (gameOver)
    {
        isGameStarted = false;
        document.getElementById("startGame").hidden = false;
        document.getElementById("bestScore").hidden = false;
        document.getElementById("faq").hidden = false;
        document.getElementById("settings").hidden = false;
        ctx.clearRect(0,0,800,600);
        return true;
    }
    varCheck++;
    if (varCheck >= 10 && !isPlayerInBuyMenu && !isGamePaused)
    {
        varCheck = 0;
        player.mapLoad ();
        updateHud();
        if (!isButtonPressed && !player.isMove)
        {
            player.idle = true;
            if (player.direction == "right") drawImage(player.imageR, player.x, player.y, "running");
            else if (player.direction == "left") drawImageL(player.imageL, player.x, player.y, "running");
        }
        else if (isButtonPressedSpace)
        {
            player.counter++;
            if (player.counter >= 1) player.counter = 1;
            if (player.ammo > 0)
            {
                if (player.direction == "right")
                {
                    player.counterAmmo++;
                    drawImage(player.imageR, player.x, player.y, "fire");
                    if (player.counterAmmo >= 7)
                    {
                        player.ammo--;
                        player.counterAmmo = 0;
                        if (player.x - 135 <= zombie.x) zombie.hp -= 10;
                        if (zombie.hp <= 0 && !zombie.isDead)
                        {
                            player.score += 30;
                            player.money += 50;
                            zombie.isDead = true;
                            zombie.hp = 0;
                        }
                    }
                }
                else if (player.direction == "left")
                {
                    drawImageL(player.imageL, player.x, player.y, "fire");
                    player.counterAmmo++;
                    if (player.counterAmmo >= 7)
                    {
                        player.ammo--;
                        player.counterAmmo = 0;
                        if (player.x - 135 <= zombie.x) zombie.hp -= 10;
                        if (zombie.hp <= 0 && !zombie.isDead)
                        {
                            player.score += 30;
                            player.money += 50;
                            zombie.isDead = true;
                            zombie.hp = 0;
                        }
                    }
                }
            }
            else player.counter = 0;
        }
        else if (isButtonPressedD)
        {
            player.counter++;
            player.isMove = true;
            player.direction = "right";
            moveMap(player.x);
            player.x += player.speed;
            drawImage(player.imageR, player.x, player.y, "running");
        }
        else if (isButtonPressedA)
        {
            player.counter++;
            player.isMove = true;
            player.direction = "left";
            moveMap(player.x);
            player.x -= player.speed;
            drawImageL(player.imageL, player.x, player.y, "running");
        }
        if (!zombie.isDead)
        {
            if (player.direction == "right" && player.x < zombie.x)
            {
                drawImageL(zombie.imageL, zombie.x, zombie.y, "runningZombie");
                drawImage(zombie.hpBar, zombie.x+200, zombie.y+150, "hpBar");
                zombie.counter++;
                zombie.x -= zombie.speed;
            }
            else if (player.direction == "left" && player.x > zombie.x)
            {
                drawImage(zombie.imageR, zombie.x, zombie.y, "runningZombie");
                drawImage(zombie.hpBar, zombie.x+200, zombie.y+150, "hpBar");
                zombie.counter++;
                zombie.x += zombie.speed;
            }
            else if (player.x + 10 >= zombie.x)
            {
                drawImage(zombie.attackR, zombie.x, zombie.y, "attackZombie");
                drawImage(zombie.hpBar, zombie.x+200, zombie.y+150, "hpBar");
                if (player.hp > 0) player.hp--;
                else
                {
                    localStorage.setItem(player.name+"level", needLevel);
                    localStorage.setItem(player.name+"playerMoney", player.money);
                    localStorage.setItem(player.name+"playerAmmo", player.ammo);
                    localStorage.setItem(player.name+"playerFirstKit", player.firstKit);
                    localStorage.setItem(player.name+"nextLevel", player.nextLevel);
                    if (parseInt(localStorage.getItem(player.name+"score")) < player.score ||
                        localStorage.getItem(player.name+"score") === null)
                        localStorage.setItem(player.name+"score", player.score);
                    gameOver = true;
                }
            }
            else if (player.x - 10 <= zombie.x)
            {
                drawImageL(zombie.attackL, zombie.x, zombie.y, "attackZombie");
                drawImage(zombie.hpBar, zombie.x+200, zombie.y+150, "hpBar");
                if (player.hp > 0) player.hp--;
                else
                {
                    localStorage.setItem(player.name+"level", needLevel);
                    localStorage.setItem(player.name+"playerMoney", player.money);
                    localStorage.setItem(player.name+"playerAmmo", player.ammo);
                    localStorage.setItem(player.name+"playerFirstKit", player.firstKit);
                    localStorage.setItem(player.name+"nextLevel", player.nextLevel);
                    if (parseInt(localStorage.getItem(player.name+"score")) < player.score ||
                        localStorage.getItem(player.name+"score") === null)
                        localStorage.setItem(player.name+"score", player.score);
                    gameOver = true;
                }
            }
        }
        else player.nextLevel = true;
    }
    window.requestAnimationFrame(onGameUpdate);
    return true;
}
function loading()
{
    if (load == 400) return onGameUpdate();
    load++;
    if (load % 40 == 0)
    {
        ctx.clearRect(0,0,800,600);
        ctx.strokeStyle = "#FFFFFF";
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Loading..", 300, 400);
        drawImage(player.loading, 320, 450, "loading");
    }
    window.requestAnimationFrame(loading);
    return true;
}
function drawImage(img, x, y, param)
{
    if (!img.loaded) return;
    switch (param)
    {
        case 'running':
        {
            if (img.num >= img.count) img.num = 1;
            else if (player.counter >= 1) img.num ++;
            if (player.idle)
            {
                img.num = 1;
                player.idle = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 180, 180);
            }
            if (player.firstTimeRun)
            {
                img.num = 1;
                player.firstTimeRun = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 180, 180);
            }
            if (player.counter >= 1)
            {
                ctx.drawImage (img.dom, img.width*(img.num - 1), 480, img.width, img.height, x, y, 180, 180);
                player.counter = 0;
            }
            break;
        }
        case 'runningZombie':
        {
            if (img.num >= img.count) img.num = 1;
            else if (zombie.counter == 1) img.num ++;
            if (zombie.idle)
            {
                img.num = 1;
                zombie.idle = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 500, 500);
            }
            if (zombie.firstTimeRun)
            {
                img.num = 1;
                zombie.firstTimeRun = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 500, 500);
            }
            if (zombie.counter == 1)
            {
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 500, 500);
                zombie.counter = 0;
            }
            break;
        }
        case 'attackZombie':
        {
            if (img.num >= img.count) img.num = 1;
            else img.num ++;
            ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 500, 500);
            break;
        }
        case 'fire':
        {
            if (img.num >= img.count) img.num = 1;
            else if (player.counter == 1) img.num ++;
            if (player.idle)
            {
                img.num = 1;
                player.idle = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 180, 180);
            }
            if (player.counter == 1)
            {
                ctx.drawImage (img.dom, img.width*(img.num - 1), 240, img.width, img.height, x, y, 180, 180);
                player.counter = 0;
            }
            break;
        }
        case 'hpBar':
        {
            if (zombie.hp >= 90) img.num = 1;
            else if (zombie.hp >= 80 && zombie.hp < 90) img.num = 2;
            else if (zombie.hp >= 70 && zombie.hp < 80) img.num = 3;
            else if (zombie.hp >= 60 && zombie.hp < 70) img.num = 4;
            else if (zombie.hp >= 50 && zombie.hp < 60) img.num = 5;
            else if (zombie.hp >= 40 && zombie.hp < 50) img.num = 6;
            else if (zombie.hp >= 30 && zombie.hp < 40) img.num = 7;
            else if (zombie.hp >= 20 && zombie.hp < 30) img.num = 8;
            else if (zombie.hp >= 10 && zombie.hp < 20) img.num = 9;
            else if (zombie.hp > 0 && zombie.hp < 10) img.num = 10;
            ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 100, 20);
            break;
        }
        case 'loading':
        {
            if (img.num >= img.count) img.num = 1;
            else img.num ++;
            ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 100, 20);
            break;
        }
    }
    return true;
}
function drawImageL(img, x, y, param)
{
    if (!img.loaded) return;
    switch (param)
    {
        case 'running':
        {
            if (img.num >= img.count) img.num = 1;
            else if (player.counter >= 1) img.num ++;
            if (player.idle)
            {
                img.num = 3;
                player.idle = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 180, 180);
            }
            if (player.firstTimeRun)
            {
                img.num = 1;
                player.firstTimeRun = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 180, 180);
            }
            if (player.counter >= 1)
            {
                ctx.drawImage (img.dom, img.width*(img.num - 1), 480, img.width, img.height, x, y, 180, 180);
                player.counter = 0;
            }
            break;
        }
        case 'runningZombie':
        {
            if (img.num >= img.count) img.num = 1;
            else if (zombie.counter == 1) img.num ++;
            if (zombie.idle)
            {
                img.num = 3;
                zombie.idle = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 500, 500);
            }
            if (zombie.firstTimeRun)
            {
                img.num = 1;
                zombie.firstTimeRun = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 500, 500);
            }
            if (zombie.counter == 1)
            {
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 500, 500);
                zombie.counter = 0;
            }
            break;
        }
        case 'attackZombie':
        {
            if (img.num >= img.count) img.num = 1;
            else img.num ++;
            ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 500, 500);
            break;
        }
        case 'fire':
        {
            if (img.num >= img.count) img.num = 1;
            else if (player.counter == 1) img.num ++;
            if (player.idle)
            {
                img.num = 1;
                player.idle = false;
                ctx.drawImage (img.dom, img.width*(img.num - 1), 0, img.width, img.height, x, y, 180, 180);
            }
            if (player.counter == 1)
            {
                ctx.drawImage (img.dom, img.width*(img.num - 1), 240, img.width, img.height, x, y, 180, 180);
                player.counter = 0;
            }
            break;
        }
    }
    return true;
}
function drawImageBg(img, x, y)
{
    if (!img.loaded) return;
    ctx.drawImage(img.dom, 0, 0, img.width, img.height, x,y, 540, 540);
    return true;
}
function updateHud()
{
    drawHud(player.healthIcon, 60, 500, "healthIcon");
    drawHud(player.ammoIcon, 180, 500, "ammoIcon");
    drawHud(player.ammoIcon, 120, 530, "ammo");
    drawHud(player.healthIcon, 0, 530, "hp");
    if (player.money >= 0 && player.money <= 100)
        drawHud(player.moneyIcon, 300, 500, "moneyIcon");
    else if (player.money > 100 && player.money <= 1000)
        drawHud(player.moneyIcon, 320, 500, "moneyIcon");
    else if (player.money > 1000 && player.money <= 10000)
        drawHud(player.moneyIcon, 340, 500, "moneyIcon");
    else if (player.money > 10000 && player.money <= 100000)
        drawHud(player.moneyIcon, 360, 500, "moneyIcon");
    drawHud(player.moneyIcon, 220, 530, "money");
    if (player.score >= 0 && player.score <= 100)
        drawHud(player.scoreIcon, 430, 495, "scoreIcon");
    else if (player.score > 100 && player.score <= 1000)
        drawHud(player.scoreIcon, 450, 495, "scoreIcon");
    else if (player.score > 1000 && player.score <= 10000)
        drawHud(player.scoreIcon, 480, 495, "scoreIcon");
    else if (player.score > 10000 && player.score <= 100000)
        drawHud(player.scoreIcon, 650, 495, "scoreIcon");
    drawHud(player.scoreIcon, 300, 530, "score");
    if (isPlayerInBuyMenu)
    {
        drawHud(shop.image, 125, 100, "shop");
        drawHud(shop.firstKit, 135, 110, "firstKit");
        drawHud(shop.ammoKit, 320, 110, "ammoKit");
        ctx.strokeStyle = "#000000";
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("$50 [x1]", 135, 300);
        ctx.strokeText("$150 [x50]", 320, 300);
        ctx.strokeText("Press \"B\" to continue", 220, 400);
    }
    if (isGamePaused)
    {
        drawHud(shop.image, 125, 100, "shop");
        ctx.strokeStyle = "#000000";
        ctx.font = "bold 30px sans-serif";
        ctx.strokeText("Click right here to save", 220, 300);
        ctx.strokeText("Press \"ESC\" to continue", 220, 400);
    }
    return true;
}
function drawHud(img, x, y, param)
{
    if (!img.loaded) return;
    switch (param)
    {
        case 'healthIcon': ctx.drawImage(img.dom, 0, 0, img.width, img.height, x,y, 540, 540); break;
        case 'ammoIcon': ctx.drawImage(img.dom, 0, 0, img.width, img.height, x,y, 540, 540); break;
        case 'moneyIcon': ctx.drawImage(img.dom, 0, 0, img.width, img.height, x,y, 540, 540); break;
        case 'hp':
        {
            ctx.strokeStyle = "#FF4500";
            ctx.font = "bold 30px sans-serif";
            ctx.strokeText(player.hp, 15, 530);
            break;
        }
        case 'ammo':
        {
            ctx.strokeStyle = "#FF4500";
            ctx.font = "bold 30px sans-serif";
            ctx.strokeText(player.ammo, 140, 530);
            break;
        }
        case 'money':
        {
            ctx.strokeStyle = "#FF4500";
            ctx.font = "bold 30px sans-serif";
            ctx.strokeText(player.money, 240, 530);
            break;
        }
        case 'score':
        {
            ctx.strokeStyle = "#FF4500";
            ctx.font = "bold 30px sans-serif";
            ctx.strokeText(player.score, 380, 530);
            break;
        }
        case 'shop': ctx.drawImage(img.dom, 0, 0, img.width, img.height, x,y, 540, 540); break;
        case 'firstKit': ctx.drawImage(img.dom, 0, 0, img.width, img.height, x,y, 540, 540); break;
        case 'ammoKit': ctx.drawImage(img.dom, 0, 0, img.width, img.height, x,y, 540, 540); break;
        case 'scoreIcon': ctx.drawImage(img.dom, 0, 0, img.width, img.height, x,y, 540, 540); break;
    }
    return true;
}
function loadImage (path, width, height, count)
{
    var image = document.createElement("img");
    var result = {
        dom: image,
        width: width,
        height: height,
        count: count,
        loaded: false,
        num: 1
    }
    image.onload = function ()
    {
        result.loaded = true;
    };
    image.src = path;
    return result;
}
