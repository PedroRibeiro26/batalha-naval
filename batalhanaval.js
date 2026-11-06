/**********************************************************
 * Pedro Ribeiro
 * Versão: 1.0
 * Data: 06/11/26
 * Projeto: Batalha Naval em Node.js
 *********************************************************/

const teclado = require("prompt-sync")();
var Fim_Jogo = false;

// configura saida do jogo
while(Fim_Jogo == false){
    // variaveis de ambiente
    let Tamanho_Mapa = 5;
    let Quant_Navios = 5; 
    let Quant_jogadas = 5;
    let Quant_Tiros = 5;
    let Pontos = 0;

    // cria uma matriz
    let Tabuleiro = [];

    // preenche o mapa com água
    for(let linha = 0; linha <= Tamanho_Mapa; linha++){
        Tabuleiro[linha] = [];
        for(let coluna = 0; coluna <= Tamanho_Mapa; coluna++){
            Tabuleiro[linha][coluna] = false;
        }
    }
    /****************
     * false = agua
     * true = navios
     ****************/


    // sorteia as posições dos navios na matriz
    for(let i = 0; i <= Quant_Navios; i++){
        let PosicaoX = parseInt(Math.floor(Math.random() *5));
        let PosicaoY = parseInt(Math.floor(Math.random() *5));
        Tabuleiro[PosicaoX][PosicaoY] = true;
    }


    /********************************************************
     * Jogada do player
     ********************************************************/
    console.log("\nTIROS RESTANTES: ", Quant_Tiros);
    console.log("PONTUAÇÃO: ", Pontos);

    for(let j = 1; j <= Quant_jogadas; j++){
        let TiroPosicaoX = parseInt(teclado("Digite a coordenada em X: "));
        let TiroPosicaoY = parseInt(teclado("Digite a coordenada em Y: "));

        // verifica se input não é número vulgo coordenada
        if(isNaN(TiroPosicaoX) || isNaN(TiroPosicaoY)){
            console.log("Digite uma coordenada válida!");
            let TiroPosicaoX = teclado("Digite a coordenada em X: ");
            let TiroPosicaoY = teclado("Digite a coordenada em Y: ");
        }

        // verifica dentro do Tabuleiro se PosicaoTiro escolhida 
        if(Tabuleiro[TiroPosicaoX][TiroPosicaoY] === true){
            // acertou um navio
            Pontos += 10;
            console.log("\n*********************************");
            console.log("******* BARCO NAUFRAGADO ********");
            console.log("********** +10 PONTOS ***********");
            console.log("*********************************\n");
        }

        if(Tabuleiro[TiroPosicaoX][TiroPosicaoY] === false){
            // acertou na agua
            console.log("\n*********************************");
            console.log("********* TIRO NA AGUA **********");
            console.log("*********************************\n");
        }

        // reduz a quantidade de tiros
        Quant_Tiros--;

        // quantidade de tiros e pontos
        console.log("TIROS RESTANTES: ", Quant_Tiros);
        console.log("PONTUAÇÃO: ", Pontos, "\n");

        // determina o vencedor
        if(Quant_Tiros == 0){
            if(Pontos >= 50){
                console.log("**************************");
                console.log("PARABENS VOCÊ VENCEU ! ! !");
                console.log("**************************");
            }
            else{
                console.log("**************************");
                console.log("QUE PENA, TENTE NOVAMENTE!");
                console.log("**************************");
            }

            // encerra o jogo ou inicia nova partida
            // n + enter = continuar
            let Continuar = teclado("** Digite n para jogar novamente **\n");
            if(Continuar == "n"){
                Fim_Jogo = false;
            }else{
                Fim_Jogo = true;
            }
        }
    }
}
