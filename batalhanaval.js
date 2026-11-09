/**********************************************************
 * Pedro Ribeiro
 * Versão: 1.0
 * Data: 06/11/26
 * Projeto: Batalha Naval em Node.js
 *********************************************************/

const teclado = require("prompt-sync")();
var Fim_jogo = true;

    /***************************************************
     * Variaveis de ambiente
     ***************************************************/
    let Tabuleiro = [];
    let Mapa = [];
    var Tamanho_Mapa;
    var Quant_Barcos;
    var Quant_Tiros;
    var Quant_jogadas;
    var Pontos = 0;
    
console.log("***** Batalha naval *****");

let nivel = teclado("Digite a dificuldade desejada:");

switch(nivel){
    case "facil":
        // dificuldade facil
        Tamanho_Mapa = 5;
        Quant_Barcos = 5;
        Quant_Tiros = 15;
        Quant_jogadas = 15;
        break;
    case "normal":
        // dificuldade normal
        Tamanho_Mapa = 7;
        Quant_Barcos = 10;
        Quant_Tiros = 15;
        Quant_jogadas = 15;
        break;
    case "dificil":
        // dificuldade dificil
        Tamanho_Mapa = 9;
        Quant_Barcos = 8;
        Quant_Tiros = 15;
        Quant_jogadas = 15;
        break;
    default:
        // dificuldade facil
        Tamanho_Mapa = 5;
        Quant_Barcos = 5;
        Quant_Tiros = 15;
        Quant_jogadas = 15;
        break;
}

// configura a saida do jogo
while(Fim_jogo){

    /***************************************************
     * Preenche o mapa com água - 0
     ***************************************************/
    for(let linha = 0; linha < Tamanho_Mapa; linha++){
        Tabuleiro[linha] = [];
        for(let coluna = 0; coluna < Tamanho_Mapa; coluna++){
            Tabuleiro[linha][coluna] = 0;
        }
    }

    for(let x = 0; x < Tamanho_Mapa; x++){
        Mapa[x] = [];
        for(let y = 0; y < Tamanho_Mapa; y++){
            Mapa[x][y] = "~";
        }
    }
    console.table(Mapa);

    /***************************************************
     * Sortea a posicao dos barcos e posiciona
     ***************************************************/
    for(let i = 0; i < Quant_Barcos; i++){
        let PosicaoX;
        let PosicaoY;

        do{
            PosicaoX = Math.floor(Math.random() *5);
            PosicaoY = Math.floor(Math.random() *5);
        }while(Tabuleiro[PosicaoX][PosicaoY] === 1);
        Tabuleiro[PosicaoX][PosicaoY] = 1;
    }

    /***************************************************
     * Faz a jogada do player
     ***************************************************/
    for(let j = 0; j < Quant_jogadas; j++){
        let TiroPosicaoX = parseInt(teclado("Digita a coordenada em x:"));
        let TiroPosicaoY = parseInt(teclado("Digite a coordenada em y:"));

        // verifica se não é numero e os numeros sao validos
        if(isNaN(TiroPosicaoX) || isNaN(TiroPosicaoY) || TiroPosicaoX < 0 || TiroPosicaoX > Tamanho_Mapa || TiroPosicaoY < 0 || TiroPosicaoY > Tamanho_Mapa){
            console.log("COORDENADAS INVALIDAS!");
            console.log("Digite valores entre 0 e 4.");
            TiroPosicaoX = teclado("Digita a coordenada em x:");
            TiroPosicaoY = teclado("Digite a coordenada em y:");
        }

        // verifica se a coordenada ja foi usada
        if(Tabuleiro[TiroPosicaoX][TiroPosicaoY] == 2){
            console.log("\x1b[33m**** VOCÊ JÁ ATIROU NESSE COORDENADA ****\x1b[0m");
            console.table(Mapa);
        }

        // verifica se o tiro acertou um barco
        if(Tabuleiro[TiroPosicaoX][TiroPosicaoY] === 1){
            console.log("\x1b[31m***** BARCO NAUFRAGADO *****\x1b[0m");
            Mapa[TiroPosicaoX][TiroPosicaoY] = "x";
            Pontos += 10;
            console.table(Mapa);

            // remove o barco da posição apos ser acertado - 2
            Tabuleiro[TiroPosicaoX][TiroPosicaoY] = 2;
        }

        // verifica se um tiro acertou na agua
        if(Tabuleiro[TiroPosicaoX][TiroPosicaoY] === 0){
            console.log("\x1b[34m***** TIRO NA ÁGUA *****\x1b[0m");
            console.table(Mapa);
        }

        // reduz a quantidade de tiros
        Quant_Tiros--;

        // quantidade de tiros
        console.log("-> Tiros restantes:", Quant_Tiros);

        // quantidade de pontos
        console.log("-> Potuação:", Pontos);

        // sistema de pontuacao
        if(Quant_Tiros == 0){
            if(Pontos >= 50){
                console.log("********************************");
                console.log("\x1b[32m***** VOCÊ VENCEU ! *****\x1b[0m");
                console.log("********************************");
            }else{
                console.log("********************************");
                console.log("\x1b[33m***** TENTE NOVAMENTE ! *****\x1b[0m");
                console.log("********************************");
            }
        }
    }

    // encerra o jogo ou continua nova partida
    let Continuar = teclado("-> Digite n para jogar novamente:");

    if(Continuar == "n"){
        Fim_jogo = true;
    }else{
        Fim_jogo = false;
    }
}