const prompt = require('prompt-sync')();

const players = {
    player1: {
        name: 'Mario',
        speed: 4,
        maneuverability: 3,
        power: 3,
        score: 0 
    },
    
    player2: {
        name: 'Peach',
        speed: 3,
        maneuverability: 4,
        power: 2,
        score: 0 
    },
    
    player3: {
        name: 'Yoshi',
        speed: 2,
        maneuverability: 4,
        power: 3,
        score: 0  
    },

    player4: {
        name: 'Bowser',
        speed: 5,
        maneuverability: 2,
        power: 5,
        score: 0  
    },

    player5: {
        name: 'Luigi',
        speed: 3,
        maneuverability: 4,
        power: 4,
        score: 0  
    },

    player6: {
        name: 'Donkey Kong',
        speed: 2,
        maneuverability: 2,
        power: 5,
        score: 0  
    }
}


async function rollTheDice() {
    const dice = Math.floor(Math.random() * 6 + 1);
    return dice;
};

async function getRandomBlock() {
    let random = Math.random(), result;
    
    switch(true) {
        case random < 0.33:
            result = 'reta';
            break;
        case random < 0.66:
            result = 'curva';
            break;
        default:
            result = 'confronto';
            break;
    } 
         
return result;
        
}

async function logResult(player1, player2) {
    if(player1.score > player2.score) {
        console.log(`Jogador ${player1.name} venceu o jogo com o placar de ${player1.score} x ${player2.score}!\n`);
    } else if(player2.score > player1.score) {
        console.log(`Jogador ${player2.name} venceu o jogo com o placar de ${player2.score} x ${player1.score}!\n`);
    } else {
        console.log(`Não houve vencedor, o jogo terminou empatado com o placar de ${player1.score} x ${player2.score}!\n`);
    }
}

async function rollingDice(player, block, diceValue, skillValue) {
    let skillName = {
        reta: 'velocidade',
        curva: 'manobrabilidade',
        confronto: 'poder'
    }
    console.log(`${player} rolou o dado 🎲 para ${block} e caiu o valor ${diceValue} + o valor da sua skill ${skillName[block]} ${skillValue} = ${diceValue + skillValue}`);
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

        if(block === 'reta') {
            totalScore1 = diceRoll1 + char1.speed;
            totalScore2 = diceRoll2 + char2.speed;
        
            await rollingDice(char1.name, block, diceRoll1, char1.speed);
            await rollingDice(char2.name, block, diceRoll2, char2.speed);
        }
        if(block === 'curva') {
            totalScore1 = diceRoll1 + char1.maneuverability;
            totalScore2 = diceRoll2 + char2.maneuverability;
        
            await rollingDice(char1.name, block, diceRoll1, char1.maneuverability);
            await rollingDice(char2.name, block, diceRoll2, char2.maneuverability);
        }
        if(block === 'confronto') {
            let scoreBattle1 = diceRoll1 + char1.power;
            let scoreBattle2 = diceRoll2 + char2.power;

            console.log(`${char1.name} confrontou ${char2.name}! 🥊`);

            await rollingDice(char1.name, block, diceRoll1, char1.power);
            await rollingDice(char2.name, block, diceRoll2, char2.power);

            if(scoreBattle2 > scoreBattle1) {
                if(char1.score > 0) {
                    char1.score--;
                    console.log(`${char2.name} venceu o confronto! O jogador ${char1.name} perdeu 1 ponto! 🐢`);
                } else {
                    console.log(`${char2.name} venceu o confronto, mas o jogador ${char1.name} não perdeu ponto por que já estava zerado!`);
                }     
            } else if(scoreBattle1 > scoreBattle2) {
                if(char2.score > 0) {
                    char2.score--;
                    console.log(`${char1.name} venceu o confronto! O jogador ${char2.name} perdeu 1 ponto! 🐢`);
                } else {
                    console.log(`${char1.name} venceu o confronto, mas o jogador ${char2.name} não perdeu ponto por que já estava zerado!`);
                }
            } else {
            console.log('Confronto empatado! Nenhum jogador perdeu ponto!');
            }   
        }

        if(totalScore1 > totalScore2) {
            char1.score++;
            console.log(`${char1.name} marcou 1 ponto!`);
        } else if(totalScore2 > totalScore1) {
            char2.score++;
            console.log(`${char2.name} marcou 1 ponto!`);
        } else if(totalScore1 === totalScore2 && block != 'confronto') {
            console.log('Ninguém marcou ponto, a rodada terminou empatada!');
        }

        console.log('--------------------------------------------------------\n')
    } 
    
    await logResult(char1, char2);

}

async function choosePlayer(nth) {
    console.log(`\n Escolha o ${nth} jogador: 
        1 - Mario
        2 - Peach
        3 - Yoshi
        4 - Bowser
        5 - Luigi
        6 - Donkey Kong \n`);

    const player = 'player' + prompt(`Digite uma opção de 1 a 6: `); 
       
    return player;
}

(async function main() {
    const playerOne = await choosePlayer('primeiro');
    const playerTwo = await choosePlayer('segundo');
    console.log(`🚨🏁 Iniciando disputa entre ${players[playerOne].name} e ${players[playerTwo].name}...`);

    await playRaceEngine(players[playerOne], players[playerTwo]);
})();




