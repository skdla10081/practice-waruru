var my = {
    ATK: 3,
    DEF: 3,
    HP: 10
}

var mold = {
    ATK: 3,
    DEF: 3,
    HP: 10,
}

function attack(attacker, defender) {
    defender.HP = defender.HP - (attacker.ATK - defender.DEF);
    defender.HPElement.textContent = 'HP : ' + defender.HP;
}


///my
//my.HPElement = document.getElementById('my-hp');
var myHP = document.getElementById('my-hp');

var myATK = document.getElementById('my-atk');
myATK.textContent = 'ATK : ' + my.ATK;

var myDEF = document.getElementById('my-def');
myDEF.textContent = 'DEF : ' + my.DEF;


///mold
var moldHP = document.getElementById('mold-hp');

var moldATK = document.getElementById('mold-atk');
moldATK.textContent = 'ATK : ' + mold.ATK;

var moldDEF = document.getElementById('mold-def');
moldDEF.textContent = 'DEF : ' + mold.DEF;


//def
var mold_def = Math.ceil(Math.random() * mold.DEF);
var my_def = Math.ceil(Math.random() * my.DEF);


var attack_block = document.getElementById('attack-block');
attack_block.classList.add('display-none')

var attackbtn = document.getElementById('attack');

var moldcharacter = document.getElementById('mold');
var mycharacter = document.getElementById('me');

var me_attacked = document.getElementById('me-attacked')
var mold_attacked = document.getElementById('mold-attacked')
me_attacked.classList.add('display-none')
mold_attacked.classList.add('display-none')

var mold_damage = document.getElementById('mold-damage')
var me_damage = document.getElementById('me-damage')

function reset() {
    my.HP = 10;
    mold.HP = 10;
    myHP.textContent = 'HP : ' + my.HP;
    moldHP.textContent = 'HP : ' + mold.HP;
}

reset();



//-------------------------------------------------



mycharacter.classList.add('jumping');

attackbtn.addEventListener('click', function (e) {
    e.preventDefault();
    
    //내 턴!-----------
    attackbtn.disabled = true;
    attack_block.classList.remove('display-none');
    attack_block.classList.add('attack-me')
    setTimeout(function () {
        attack_block.classList.add('display-none');

        //공격
        mold.HP = mold.HP - (my.ATK - mold_def);
        if (my.ATK - mold_def > 0) {
            mold_attacked.classList.remove('display-none');
            setTimeout(function () {
                mold_attacked.classList.add('display-none');
            }, 500)
        } else {
        }
        attack_block.classList.remove('attack-me')
        mold_damage.textContent = '-' + (my.ATK - mold_def);
        setTimeout(function () {
            mold_damage.textContent = ' ';
        }, 500)
        //남은 HP 반영
        moldHP.textContent = 'HP : ' + mold.HP;

        setTimeout(function () {
            //곰팡이 공격 애니메이션
            mold_def = Math.floor(Math.random() * 3) + 1;
            mycharacter.classList.remove('jumping');
            moldcharacter.classList.add('jumping');
            attack_block.classList.remove('display-none');
            attack_block.classList.add('attack-mold')

            if (mold.HP < 1) {
                alert('와르르 엄마 승!')
                reset()
                attackbtn.disabled = false;
            } else {
                setTimeout(function () {
                    // 내가 맞았을때 애니메이션
                    if (mold.ATK - my_def > 0) {
                        me_attacked.classList.remove('display-none');
                        setTimeout(function () {
                            me_attacked.classList.add('display-none');
                            attack_block.classList.remove('attack-mold');
                        }, 500)
                    } else {
                    }

                    // 곰팡이 공격 정산-----------
                    attack_block.classList.remove('attack-mold')
                    attack_block.classList.add('display-none');

                    attackbtn.disabled = false;
                    my.HP = my.HP - (mold.ATK - my_def);
                    myHP.textContent = 'HP : ' + my.HP;
                    me_damage.textContent = '-' + (mold.ATK - my_def);
                    my_def = Math.floor(Math.random() * my.DEF) + 1;

                    setTimeout(function () {
                        me_damage.textContent = '';
                        moldcharacter.classList.remove('jumping');
                        mycharacter.classList.add('jumping');
                        if (my.HP < 1) {
                            alert('곰팡이 승!')
                            reset()
                        }
                    }, 500)
                }, 2000)
            }
        }, 500)
    }, 2000)
})