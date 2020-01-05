var zombie = 
{
    imageR: loadImage("objects/banditRun.png", 80, 80, 8),
    imageL: loadImage("objects/banditRunL.png", 80, 80, 8),
    attackL: loadImage("objects/banditAttack.png", 80, 80, 7),
    attackR: loadImage("objects/banditAttackL.png", 80, 80, 7),
    hpBar: loadImage("objects/hpBar.png",100,20,10),
    direction: "",
    speed: 5,
    x: 300,
    y: 120,
    counter: 0,
    idle: true,
    firstTimeRun: true,
    isDead: false,
    hp: 100
};
function randomCords() 
{
    let minX = -30,
    maxX = 800;
    randX = minX + Math.random() * (maxX + 1 - minX);
    randX = Math.floor(randX);
    zombie.x = randX;
    return true;
}