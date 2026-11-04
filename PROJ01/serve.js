//crônometro no terminal
//-------------------------------------
//Bloco 01: Preparando o terminal 
//-------------------------------------

//require = "Traga paracá um ferramenta prontal"
//readline = " É a ferramentaa do node que sabe conversar com teclado"

const readline = require('readline')

//process.stdin = a Entrada do programa(teclado)
//Esta linha manda o Node AVISAR o programa toda vez que uma tecla for apertada
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true);

//mensagem de boas-vindas
console.log('⏱️crônometro iniciado!')
console.log (' p = pausar/continuar | r = resetar | Ctrl=c = Sair')

//-------------------------------------
//Bloco 02: A memória do crônometro
//-------------------------------------

//tempo guarda quantos segundos ja passaram.
let tempo = 0;

//rodando é um interruptor de luz: True= Contando, False= Pausado
let rodando = true

//--------------------------------------------
//Bloco 03: Deixando o tempo bonito (mm:ss)
//--------------------------------------------

function formatar(total){
    //Math.floor arredonda um número para baixo, sempre retornando um número inteiro.
    //EXMPLO: 65/60 = 1.08... -> Math.floor joga fora os decimais 
    const min = Math.floor(total / 60)

    //O simbolo % dá o RESTO da divisão.
    const seg = total % 60;


    //String (...) trasforma o numero em texto
    //padStart (2,0) = "se tiver menos de 2 caracteres, complete o 0 na frente"
    //Assim "5" vira "05", depois  nós juntamos os pedaços com o ":"
    return String(min).padStart(2, '0') + ':' + String(seg).padStart(2,'0');

}

//-------------------------------------
//Bloco 04: o ❤️ do programa
//-------------------------------------

//sentInterval = "Repita isso a cada x milissegundos"
//1000 milissegundos = 1 segundo (veja o numero no final do bloco)

setInterval(() => {
    //só conta se o interruptor estiver ligado
    if (rodando) {
        //soma 1 em tempo. É o mesmo que: tempo + 1
        tempo ++;
        //Limpa a tela para o numero "mudar no mesmo lugar"
        console.clear();
        console.log('⏱️' + formatar(tempo));

    }

}, 1000);

//-------------------------------------
//Bloco 05: Ouvindo o teclado
//-------------------------------------

process.stdin.on('keypress', (letra, tecla) => {
    // Foi a tecla p? (=== compara se os dois lados são iguais).
    if (tecla.name === 'p') {
        // O ! IVERTE o valor: true vira false, false vira true.
        rodando = !rodando;
        console.log(rodando ? '▶️ continuando': '⏸️ pausado');
        //Senão, foi a tecla R?
        } else if (tecla.name === 'r') {
            tempo = 0;
            console.clear();
            console.log('⏱️' + formatar(tempo));
            console.log('🔄️Resetado')

    } else if (tecla.ctrl && tecla.name === 'c'){
        console.log('/n👋🏼👋🏼 Até mais!');
        process.exit();
    }
})