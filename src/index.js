const player1 = {
    name: 'Mario',
    speed: 4,
    maneuverability: 3,
    power: 3,
    score: 0 
};

const player2 = {
    name: 'Peach',
    speed: 3,
    maneuverability: 4,
    power: 2,
    score: 0 
};

const player3 = {
    name: 'Yoshi',
    speed: 2,
    maneuverability: 4,
    power: 3,
    score: 0  
};

const player4 = {
    name: 'Bowser',
    speed: 5,
    maneuverability: 2,
    power: 5,
    score: 0  
};

const player5 = {
    name: 'Luigi',
    speed: 3,
    maneuverability: 4,
    power: 4,
    score: 0  
};

const player6 = {
    name: 'Donkey Kong',
    speed: 2,
    maneuverability: 2,
    power: 5,
    score: 0  
};

async function rollTheDice() {
    const dice = Math.floor(Math.random() * 6 + 1);
    return dice;
};

async function getRandomBlock() {
    let random = Math.random(), result;
    
    switch(true) {
        case random < 0.33:
            result = 'straight';
            break;
        case random < 0.66:
            result = 'curve';
            break;
        default:
            result = 'battle';
            break;
    } 
         
return result;
        
}

async function logRollResult() {
    
}

async function diceRolled(player, block, diceValue, skill, totalScore) {
    console.log(`${player} rolou o dado 🎲 para ${block} e caiu o valor ${diceValue} + o valor da sua skill ${skill} = ${diceValue + skill}`);
    console.log(`O jogador ${player} marcou ${totalScore} pontos!`);
}


async function playRaceEngine(char1, char2) {
    for(let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}...`);

        let block = await getRandomBlock();
        console.log(`Bloco ${block} sorteado...`);

        let diceRoll1 = await rollTheDice();
        let diceRoll2 = await rollTheDice();

        let totalScore1 = 0;
        let totalScore2 = 0;

        if(block === 'straight') {
            totalScore1 = diceRoll1 + char1.speed;
            totalScore2 = diceRoll2 + char2.speed;
        
            await diceRolled(player1.name, block, diceRoll1, player1.speed, totalScore1);
            await diceRolled(player2.name, block, diceRoll2, player2.speed, totalScore2);
        }
        if(block === 'curve') {
            totalScore1 = diceRoll1 + char1.maneuverability;
            totalScore2 = diceRoll2 + char2.maneuverability;
        
            await diceRolled(player1.name, block, diceRoll1, player1.maneuverability, totalScore1);
            await diceRolled(player2.name, block, diceRoll2, player2.maneuverability, totalScore2);
        }
        if(block === 'battle') {
            let scoreBattle1 = diceRoll1 + char1.power;
            let scoreBattle2 = diceRoll2 + char2.power;
        
            if(scoreBattle1 > scoreBattle2) {
                scoreBattle2 > 0 ? scoreBattle2-- : null;
            } else if(scoreBattle2 > scoreBattle1) {
                scoreBattle1 > 0 ? scoreBattle1-- : null;
            } else {
                console.log('Confronto empatado! Ninguem perdeu ponto!');
            }

            totalScore1 = scoreBattle1;
            totalScore2 = scoreBattle2;
        
            await diceRolled(player1.name, block, diceRoll1, player1.power, totalScore1);
            await diceRolled(player2.name, block, diceRoll2, player2.power, totalScore2);
        }

        if(totalScore1 > totalScore2) {
            console.log(`${player1.name} marcou 1 ponto!`);
        } else if(totalScore2 > totalScore1) {
            console.log(`${player2.name} marcou 1 ponto!`);
        }


        console.log('--------------------------------------------------------')
    }

    

}

(async function main() {
    console.log(`🚨🏁 Iniciando disputa entre ${player1.name} e ${player2.name}...`);

    await playRaceEngine(player1, player2);
})();
