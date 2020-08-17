function defendvalue(defender) {
    return Math.ceil(Math.random() * defender.DEF);
}

var my = {
    id: 'my',
    name: '와르르엄마',
    HP: 10,
    HPElement: document.getElementById('my-hp'),
    ATK: 3,
    ATKElement: document.getElementById('my-atk'),
    DEF: 3,
    DEFElement: document.getElementById('my-def'),
    character: document.getElementById('me'),
    attackedMotion: document.getElementById('me-attacked'),
    damageValue: document.getElementById('me-damage'),
}

my.ATKElement.textContent = 'ATK : ' + my.ATK;
my.DEFElement.textContent = 'DEF : ' + my.DEF;

var mold = {
    id: 'mold',
    name: '곰팡이',
    HP: 10,
    HPElement: document.getElementById('mold-hp'),
    ATK: 3,
    ATKElement: document.getElementById('mold-atk'),
    DEF: 3,
    DEFElement: document.getElementById('mold-def'),
    character: document.getElementById('mold'),
    attackedMotion: document.getElementById('mold-attacked'),
    damageValue: document.getElementById('mold-damage'),
}

mold.ATKElement.textContent = 'ATK : ' + mold.ATK;
mold.DEFElement.textContent = 'DEF : ' + mold.DEF;


//animation
var attack_block = document.getElementById('attack-block');
var attackbtn = document.getElementById('attack');

//animation-setting
my.attackedMotion.classList.add('display-none');
mold.attackedMotion.classList.add('display-none');

function attack(attacker, defender) {
    defender.defendvalue = defendvalue(defender);
    defender.HP = defender.HP - Math.max(0, attacker.ATK - defender.defendvalue);
}

function reset() {
    my.HP = 10;
    mold.HP = 10;
    my.HPElement.textContent = 'HP : ' + my.HP;
    mold.HPElement.textContent = 'HP : ' + mold.HP;
    attackbtn.disabled = false;
    attack_block.classList.add('display-none');
    attack_block.classList.remove('attack-mold');
    attack_block.classList.remove('attack-my');
    my.character.classList.add('jumping');
    mold.character.classList.remove('jumping');
    my.damageValue.textContent = '';
    mold.damageValue.textContent = '';
}

function gameEnd(winner) {
    alert(String(winner.name) + ' 승!');
    reset();
}

function attackedAnimation(attacker, defender) {
    if (attacker.ATK - defender.defendvalue > 0) {
        defender.attackedMotion.classList.remove('display-none');
        setTimeout(function () {
            defender.attackedMotion.classList.add('display-none');
        }, 500);
    } else { }
}

function turn(attacker, defender) {
    attack(attacker, defender);
    attackedAnimation(attacker, defender);

    attack_block.classList.remove('attack-' + attacker.id);
    attack_block.classList.add('display-none');

    defender.damageValue.textContent = '-' + Math.max(0, attacker.ATK - defender.defendvalue);
    defender.HPElement.textContent = 'HP : ' + defender.HP;
}

function waiting_attack_animation(attacker, defender) {
    setTimeout(function () {
        attacker.damageValue.textContent = ' ';
        defender.character.classList.remove('jumping');
        attacker.character.classList.add('jumping');
    }, 500);
}

function block_attack_animation(attacker) {
    attack_block.classList.remove('display-none');
    attack_block.classList.add('attack-' + attacker.id);
}

reset();



//-------------------------------------------------


attackbtn.addEventListener('click', function (e) {
    e.preventDefault();
    attackbtn.disabled = true;
    block_attack_animation(my);
    setTimeout(function () {
        turn(my, mold);
        if (mold.HP < 1) {
            gameEnd(my);
        } else {
            waiting_attack_animation(mold, my)
            setTimeout(function () {
                block_attack_animation(mold);
                setTimeout(function () {
                    turn(mold, my);
                    if (my.HP < 1) {
                        gameEnd(mold);
                    } else {
                        waiting_attack_animation(my, mold)
                        attackbtn.disabled = false;
                    }
                }, 2000);
            }, 500);
        }
    }, 2000);
});