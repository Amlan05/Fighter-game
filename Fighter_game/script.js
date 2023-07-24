
const menu = document.querySelector('.menu')
const wwe = document.getElementById('wwe')
const p1img = document.getElementById('p1img')
const p2img = document.getElementById('p2img')
const begin = document.querySelector('.begin')
const beginContainer = document.querySelector('.beginContainer')
const resultContainer = document.querySelector('.resultContainer')
const char1 = document.querySelector('.char1')
const nochar = document.querySelector('.nochar')
const char2 = document.querySelector('.char2')
const Evt = document.querySelector('.Evt')
const toggle1 = document.querySelector('.toggle1')
const toggle2 = document.querySelector('.toggle2')
const toggleMid = document.querySelector('.toggleMid')
const play1 = document.querySelectorAll(".play1")
const play2 = document.querySelectorAll(".play2")
const Evt1 = document.querySelectorAll(".Evt1")
const start = document.getElementById('start')



p1Health = document.getElementById('p1Health')
p2Health = document.getElementById('p2Health')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
const result = document.getElementById('result')



toggle1.addEventListener('click', () => {
    char1.classList.toggle('openMenu1');
})

toggle2.addEventListener('click', () => {
    char2.classList.toggle('openMenu2');
})

toggleMid.addEventListener('click', () => {
    Evt.classList.toggle('openMenuEvt');
})


play1.forEach(element => {
    element.onclick = () => {
        toggle1.value = element.innerText
        console.log(toggle1.value)

        char1.classList.toggle('openMenu1');
    }
})


play2.forEach(element => {
    element.onclick = () => {
        console.log(element.innerText)
        toggle2.value = element.innerText
        char2.classList.toggle('openMenu2');
    }
})

Evt1.forEach(element => {
    element.onclick = () => {
        console.log(element.innerText)
        toggleMid.value = element.innerText
        Evt.classList.toggle('openMenuEvt');
    }
})




const updateValue = (p1, p2) => {

    p1NameDiv.innerText = p1.name
    p2NameDiv.innerText = p2.name
    p1Health.innerText = p1.Health
    p2Health.innerText = p2.Health
    console.log(p1.name)
    p1img.src = `GIF/${p1.name}.gif`
    p2img.src = `GIF/${p2.name}.gif`



    if (p1.Health <= 0) {
        game.isOver = true
        game.checkWinner(game.isOver, p1, p2)
    }

    else if (p2.Health <= 0) {
        game.isOver = true
        game.checkWinner(game.isOver, p1, p2)
    }



}

class player {

    constructor(name, Health) {
        this.name = name
        this.Health = Health
    }

    strike(attacker, enemy) {

        if (attacker == p1) {
            document.getElementById('p1attack').play();
        }

        if (attacker == p2) {
            document.getElementById('p2attack').play();
        }

        if (game.isOver == true) {
            return
        }
        const damageamount = Math.ceil(Math.random() * 15)
        enemy.Health -= damageamount
        updateValue(p1, p2)
        console.log(`${attacker} attacks ${enemy}`)
    }

    heal(healer) {

        if (healer == p1) {
            document.getElementById('p1heal').play();
        }

        if (healer == p2) {
            document.getElementById('p2heal').play();
        }


        if (game.isOver == true) {
            return
        }

        else if (healer.Health >= 95) {
            healer.Health = 100
        }

        else {
            const healamount = Math.ceil(Math.random() * 5)
            healer.Health += healamount
        }
        updateValue(p1, p2)
    }
}

class Game {

    constructor() {
        this.isOver = false
    }

    checkWinner(isOver, p1, p2) {
        if (isOver == true && p1.Health <= 0) {
            document.getElementById('victory').play();
            result.innerHTML = `<p>${p2.name} WINS</p>`

        }

        else if (isOver == true && p2.Health <= 0) {
            document.getElementById('victory').play();
            result.innerHTML = `<p>${p1.name} WINS</p>`
        }
    }

    reset(p1, p2) {
        p1.Health = 100
        p2.Health = 100
        game.isOver = false
        result.innerText = ''
        updateValue(p1, p2)
        begin.style.display = "flex"
        menu.style.display = "none"
        resultContainer.style.display = "none"
        nochar.style.display = "none"
        beginContainer.style.display = "flex"
        wwe.src = "IMG/WWE_Logo.png"

    }

    play(p1, p2) {

        if (game.isOver == true) {
            return
        }


        while (!this.isOver) {
            p1.strike(p1, p2)
            p2.heal(p2)
            p2.strike(p2, p1);
            p1.heal(p1)
        }
        checkWinner(this.isOver, p1, p2)
    }
}



start.onclick = () => {

    if (toggle1.value == 'Choose Character1' || toggle2.value == 'Choose Character2' || toggle1.value == 'Choose Event') {
        nochar.style.display = "flex"
        nochar.innerHTML = '<p>Choose both Characters and Event'
    }

    else {
        menu.style.display = "flex"
        begin.style.display = "none"
        beginContainer.style.display = "none"
        resultContainer.style.display = "flex"
        if (toggleMid.value == 'ROYAL RUMBLE') {
            wwe.src = "IMG/ROYAL_RUMBLE.png"
        }
        else if (toggleMid.value == 'EXTREME RULES') {
            wwe.src = "IMG/EXTREME_RULES.png"
        }
        else if (toggleMid.value == 'SUMMER SLAM') {
            wwe.src = "IMG/SUMMER_SLAM.png"
        }
        player1 = new player(`${toggle1.value}`, 100)
        player2 = new player(`${toggle2.value}`, 100)
        p1 = player1
        p2 = player2
        updateValue(p1, p2)
    }
}

let player1
let player2

let p1
let p2


const game = new Game()

//ADDING SOUND AND KEYBOARD FUNCTIONS

document.addEventListener('keydown', function (e) {
    if (e.key == "q" && p2.Health > 0 && game.isOver == false) {
        p1.strike(p1, p2)
        document.getElementById('p1attack').play();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key == "a" && p2.Health > 0) {
        p1.heal(p1)
        document.getElementById('p1heal').play();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key == "p" && p1.Health > 0 && game.isOver == false) {
        p2.strike(p2, p1)
        document.getElementById('p2attack').play();
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key == "l" && p2.Health > 0) {
        player2.heal(p2)
        document.getElementById('p2heal').play();
    }
});