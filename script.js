
// -----BONUS -> FECHAR MENU-------

function fecharMenu(){
    let menufechado = document.getElementById("menu").style.display="none";
    let opaco = document.getElementById("opaco").style.display="none";
    document.documentElement.style.overflow = '';
}

function abrirMenu() {
    let menuaberto = document.getElementById("menu").style.display="flex";
    let opaco = document.getElementById("opaco").style.display="flex";
    document.documentElement.style.overflow = 'hidden';
}

// --------- CARREGAR MSGS NO CHAT ---------

let nome = prompt("Digite seu nome para entrar no chat:");
let promessa;

while(nome == ""){
    nome = prompt("Digite seu nome para entrar no chat:");
}

promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promessa.then(enviarResposta);
promessa.catch(deuRuim);

function enviarResposta(resposta) {
    let informacoes = resposta.data;
    console.log(informacoes);
    for(let i = 0 ; i < informacoes.length ; i++){
        console.log(i)
        let mensagens = document.querySelector(".chat")
        mensagens.innerHTML += `<div class="mensagensrecebidasstatus"><div class="tamanhodamsg"><p class="tempo">(${informacoes[i].time})</p><p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p><p class="texto"> ${informacoes[i].text}</p></div></div><div class="espaco"></div>`
    }
    recarregarChat()
}

function recarregarChat(){ //Se as cartas são diferentes 
    setTimeout(() => {
        promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
        promessa.then(enviarResposta);
    },3000);
    console.log(enviarResposta)
}

function deuRuim(){
    alert("ERRO" + erro.response.status )
}

