// -----BONUS -> FECHAR MENU-------

let opaco;
let menuAberto;
let menuFechado;

function fecharMenu(){
    menuFechado = document.getElementById("menu").style.display="none";
    opaco = document.getElementById("opaco").style.display="none";
    document.documentElement.style.overflow = "none";
}

function abrirMenu() {
    menuAberto = document.getElementById("menu").style.display="flex";
    opaco = document.getElementById("opaco").style.display="flex";
    document.documentElement.style.overflow = 'hidden';
}

// ----------ENTRADA NA SALA ----------
let nome;
let mensagem;
let promessaRequisicao;
let entrarNaSala;

function coletarNome(){
    nome = document.querySelector(".nome").value;
    if(nome){
        document.getElementById("entrar").style.display="none";
        document.getElementById("todapagina").style.display="block";
        entrarNoChat();
    }
}

function entrarNoChat(){
    entrar = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", 
    {
        name: nome
    }
    ).then(resposta => {console.log(resposta)}).catch(deuRuim);
    manterConexao()
    mensagensDoChat()
}

function manterConexao(){
    setInterval(() => {
        entrarNaSala = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",
        {
            name: nome
        }
        ).then(resposta => {console.log(resposta)}).catch(deuRuim);
    },5000);
}
    
function enviarMensagem() {
    mensagem = document.querySelector(".enviarmsg").value;
    if(mensagem){
        enviarMsgServidor();
    }
}

function enviarMsgServidor(){
    promessaRequisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",
    {
        from: nome,
        to: 'Todos',
        text: mensagem,
        type: 'message'
    }).then(resposta => {
        promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
        promessa.then(enviarResposta);
        document.getElementById("enviarmsg").value='';}).catch(meterOPe);
}
    
document.addEventListener("keypress", function(e) {
    if(e.key === 'Enter') {
        let botaoUm = document.querySelector("#submetermsg");
        botaoUm.click();  
    }
});

function meterOPe() {
    window.location.reload();
}
        
function deuRuim(){ 
    alert("DEU RUIM")
}
        
// --------- CARREGAR MSGS NO CHAT ---------

let promessaChat;
let mensagens;

function mensagensDoChat() {
    promessaChat = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promessaChat.then(enviarResposta);
}

function enviarResposta(resposta) {
    mensagens.innerHTML="";
    let informacoes = resposta.data;
    mensagens = document.getElementById("chat");
    for(let i = 0 ; i < informacoes.length ; i++){
        if(informacoes[i].type == "status"){
            mensagens.insertAdjacentHTML("beforeend",
            `<div class="mensagensrecebidasstatus mensagem${[i]}" >
                <div class="tamanhodamsg">
                    <p class="tempo">(${informacoes[i].time})</p>
                    <p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p>
                    <p class="texto"> ${informacoes[i].text}</p>
                </div>
            </div>
            <div class="espaco"></div>`);
        }else if(informacoes[i].type == "message"){
            mensagens.insertAdjacentHTML("beforeend",
            `<div class="mensagensrecebidasmessage mensagem${[i]}">
                <div class="tamanhodamsg">
                    <p class="tempo">(${informacoes[i].time})</p>
                    <p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p>
                    <p class="texto"> ${informacoes[i].text}</p>
                </div>
            </div>
            <div class="espaco"></div>`);
        }else if (informacoes[i].to == nome){
            mensagens.insertAdjacentHTML("beforeend",`
            <div class="mensagensrecebidasreservada mensagem${[i]}">
                <div class="tamanhodamsg">
                    <p class="tempo">(${informacoes[i].time})</p>
                    <p class="para"><b>${informacoes[i].from}</b> to <b>${informacoes[i].to}:</b> </p>
                    <p class="texto"> ${informacoes[i].text}</p>
                </div>
            </div>
            <div class="espaco"></div>`);
        }
    }
    let tamanhodoArray = informacoes.length -1
    let elementoQueQueroQueApareca = document.querySelector(`.mensagem${tamanhodoArray}`);
    elementoQueQueroQueApareca.scrollIntoView();
}

setInterval(() => {
    mensagens = document.querySelector(".chat")
    promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promessa.then(enviarResposta);
},3000);
console.log(enviarResposta);

        // -----BONUS -> LISTA DE PARTICIPANTES ONLINE -------

let promessaEntrar;
let pessoasOn;
let icones;
let icone;

promessaEntrar = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
promessaEntrar.then(pessoasOnline);

function pessoasOnline(nomes) {
    pessoasOn = nomes.data;
    for(let x=0; x < pessoasOn.length; x++){
        icones = document.querySelector(".pessoason");
        icones.innerHTML +=`
        <div class="todos" onclick="addCheck(this)">
            <div class="esquerdadomenu">
            <ion-icon class="person-circle-icon" name="person-circle"></ion-icon>
            <div class="nomesmenu">${pessoasOn[x].name}</div>
            </div>
        </div>`;
    }
}

setInterval(() => {
    icones.innerHTML=`
    <div class="todos" onclick="addCheck(this)">
        <div class="esquerdadomenu">
        <ion-icon class="people-icon" name="people"></ion-icon>
        <div class="nomesmenu">Todos</div>
        </div>
        <ion-icon class="checkmark-outline-icon" name="checkmark-outline" id="icon"></ion-icon>
    </div>`;
    promessaentrar = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
    promessaentrar.then(pessoasOnline);
},10000);

