//variables
let xp = 0;
let health = 100;
let gold = 100;
var currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

//button descryption
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const weapons = [
    {
        name: "stick",
        power: 5,
    },
    {
        name: "dagger",
        power: 30,
    },
    {
        name: "claw hammer",
        power: 50,
    },
    {
        name: "sward",
        power: 100,
    }
]


const monsters = [
    {
        name: "slime",
        level: 2,
        health: 15,
    },
    {
        name: "fanged beast",
        level: 8,
        health: 60,
    },
    {
        name: "dragon",
        level: 20,
        health: 300,
    },
]

//button initilization
button1.onclick = goToStore;
button2.onclick = goToCave;
button3.onclick = fightDragon;


const locations = [
    {
        name: "town square",
        "button text": ["Go To Store","Go To Cave","Fight Dragon"],
        "button functions": [goToStore,goToCave,fightDragon],
        "text": "You are in the town square"
    },
    {
        name: "store",
        "button text": ["Buy 10 health(10 Gold)","Buy weapon(30 Gold)","Go to Town Square"],
        "button functions": [buyHealth,buyWeapon,goToTown],
        "text": "You are in the store"
    },
    {
        name: "Cave",
        "button text":["Fight slime","Fight fanged beast","Go To Town Square"],
        "button functions":[fightSlime,fightFangedBeast,goToTown],
        "text": "Choose the monster"
    },
    {
        name: "fight",
        "button text":["Attack","Doge","Run"],
        "button functions":[attack,doge,run],
        "text": "You are fighting a monster"
    },
    {
        name: "kill monster",
        "button text": ["Go To Town Square","Go To Town Square","Go To Town Square"],
        "button functions": [goToTown,goToTown,goToTown],
        "text": "You killed the monster",
    },
    {
        name: "lose",
        "button text": ["Replay","Replay","Replay"],
        "button functions": [restart,restart,restart],
        "text": "You Died. ☠️"
    },
    {
        name: "Win game",
        "button text": ["Replay","Replay","Replay"],
        "button functions": [restart,restart,restart],
        "text": "You Won, 🎉🎊",
    },
];

function update(location){
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location["text"];
}


//Store functions
function buyHealth() {
    console.log("Buy health");
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold;
        healthText.innerText = health;
    }else{
        console.log("Not enough gold");
        text.innerText = "Not Enough Gold";
    }
}

function buyWeapon() {
    if(currentWeapon < weapons.length-1){
        if (gold >= 30) {
            gold -= 30;
            currentWeapon += 1;
            goldText.innerText = gold;
            text.innerText = "You bought a " + weapons[currentWeapon].name;
            inventory.push(weapons[currentWeapon].name);
            text.innerText += "\nInventory: " + inventory;
        }else{
            console.log("Not enough gold");
            text.innerText = "Not Enough Gold";
        }
    }else{
        text.innerText = "You already have the best weapon";
        button2.innerText = "Sell weapon for 15 gold";
        button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
    console.log("wepon sold");
    if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = 'You sold '+currentWeapon+".";
        text.innerText += "\nYou have: "+inventory;
    }else{
        text.innerText = "Don't sell your only weapon!";
    }
}


// Initial Options
function goToTown() {
    update(locations[0]);
}

function goToStore() {
    update(locations[1]);
}

function goToCave() {
    update(locations[2]);
}


//fighting the monsters function


function goFight(){
    update(locations[3]);
    console.log(fighting);
    console.log(monsters[fighting].name);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsters[fighting].health;
}

function fightSlime() {
    console.log("fight slime");
    fighting = 0;
    console.log(fighting);
    goFight();
}

function fightFangedBeast() {
    fighting = 1;
    goFight();
}

function fightDragon() {
    fighting = 2;
    goFight();
}

function getMonsterAttackValue(level){
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit;
}

function isMonsterHit(){
    return Math.random() > .2 || health < 20;
}

function attack() {
    text.innerText = "The "+ monsters[fighting].name + " attacks.";
    text.innerText += "\nYou can Attack with your " + weapons[currentWeapon].name;
    if (isMonsterHit()){
        health -= getMonsterAttackValue(monsters[fighting].level);
    }else{
        text.innerText += "You Miss";
    }
    monsterHealth -= (weapons[currentWeapon].power + Math.floor(Math.random() * xp)+1);
    if (health <=0){
        lose();
    }else if(monsterHealth <= 0){
        fighting === 2 ? winGame() : defeteMonster();
    }
    if(Math.random() <= .1 && inventory.length !== 1){
        text.innerText += "\nYour " + inventory.pop() + "breaks.";
        currentWeapon--;  
    }
}

function doge(){
    text.innerText = "You doged the attack from " + monsters[fighting].name;
}
function run(){}

function lose(){
    update(locations[5]);
}

function winGame(){
    update(locations[6]);
}

function defeteMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7)
    xp = monsters[fighting].level;
    text.innerText = "You defeted the " + monsters[fighting].name;
    text.innerText += "\nYou got " + xp + " xp and " + gold + " gold";
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 100;
    currentWeapon = 0;
    inventory = ["stick"];
    healthText.innerText = health;
    goldText.innerText = gold;
    xpText.innerText = xp;
    goToTown();
}
