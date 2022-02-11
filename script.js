// -----BONUS -> FECHAR MENU-------

let opaco
let menuaberto
let menufechado

function fecharMenu(){
    menufechado = document.getElementById("menu").style.display="none";
    opaco = document.getElementById("opaco").style.display="none";
    document.documentElement.style.overflow = "none";
}

function abrirMenu() {
    menuaberto = document.getElementById("menu").style.display="flex";
    opaco = document.getElementById("opaco").style.display="flex";
    document.documentElement.style.overflow = 'hidden';
}


// --------- CARREGAR MSGS NO CHAT ---------

let promessa;
let mensagens;

promessachat = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promessachat.then(enviarResposta);

function enviarResposta(resposta) {
    let informacoes = resposta.data;
    for(let i = 0 ; i < informacoes.length ; i++){
        if(informacoes[i].type == "status"){
        mensagens = document.querySelector(".chat");
        mensagens.innerHTML += `<div class="mensagensrecebidasstatus"><div class="tamanhodamsg"><p class="tempo">(${informacoes[i].time})</p><p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p><p class="texto"> ${informacoes[i].text}</p></div></div><div class="espaco"></div>`;
    }else if(informacoes[i].type == "message"){
        mensagens = document.querySelector(".chat");
        mensagens.innerHTML += `<div class="mensagensrecebidasmessage"><div class="tamanhodamsg"><p class="tempo">(${informacoes[i].time})</p><p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p><p class="texto"> ${informacoes[i].text}</p></div></div><div class="espaco"></div>`;
        }else{
        mensagens = document.querySelector(".chat");
        mensagens.innerHTML += `
        <div class="mensagensrecebidasreservada">
            <div class="tamanhodamsg">
            <p class="tempo">(${informacoes[i].time})</p>
                <p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p>
                <p class="texto"> ${informacoes[i].text}</p>
            </div>
        </div><div class="espaco"></div>`;
        }
    }
    recarregarChat();
}

function recarregarChat(){
    // setTimeout(() => {
    //     mensagens.innerHTML="";
    //     promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    //     promessa.then(enviarResposta);
    // },3000);
    console.log(enviarResposta);
}

// ----------ENTRADA NA SALA ----------

let nome = prompt("Digite seu nome para entrar no chat:");
let mensagem;
let promessarequisicao;
let entrarnasala;

entrarnasala = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", 
{
    name: "nome"
}
)

entrarnasala.catch(deuRuim)

function deuRuim(){ 
    nome = prompt("Digite seu nome para entrar no chat:");
}

setTimeout(() => {  //Envia o nome para o servidor a cada 5s
    entrarnasala = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",
    {
        name: "nome"
    }
    )},5000);

function enviarMensagem() {
    mensagem = document.querySelector(".enviarmsg").value;
    promessarequisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",
    {
        from: "nome",
        to: "Todos",
        text: "mensagem",
        type: "message"
    })
    console.log(promessarequisicao)
}
        // -----BONUS -> LISTA DE PARTICIPANTES ONLINE -------

let promessaentrar;
let pessoason;
let icones;

promessaentrar = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
promessaentrar.then(pessoasOnline);

function pessoasOnline(nomes) {
    pessoason = nomes.data;
    for(let x=0; x < pessoason.length; x++){
        icones = document.querySelector(".pessoason");
        icones.innerHTML +=`
        <div class="todos">
            <div class="esquerdadomenu">
            <ion-icon class="person-circle-icon" name="person-circle"></ion-icon>
            <div class="nomesmenu">${pessoason[x].name}</div>
            </div>
            <ion-icon class="checkmark-outline-icon" name="checkmark-outline"></ion-icon>
        </div>`;
    }
    recarregarPessoasOn();
}

function recarregarPessoasOn(){  
    setTimeout(() => {
        icones.innerHTML="";
        promessaentrar = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
        promessaentrar.then(pessoasOnline);
    },10000);
}