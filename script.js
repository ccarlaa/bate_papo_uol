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

// ----------ENTRADA NA SALA ----------
let nome
let mensagem;
let promessarequisicao;
let entrarnasala;

function coletarNome(){
    nome = document.querySelector(".nome").value;
    console.log(nome)
    if(nome){
        document.getElementById("entrar").style.display="none"
        document.getElementById("todapagina").style.display="block"
        console.log(nome)
        entrarNoChat()
    }
}

function entrarNoChat(){
    entrar = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", 
    {
        name: nome
    }
    ).then(resposta => {console.log(resposta)}).catch(deuRuim)
    console.log(entrar)
    manterConexao()
    mensagensDoChat()
}

function manterConexao(){
    setInterval(() => {
        entrarnasala = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",
        {
            name: nome
        }
        ).then(resposta => {console.log(resposta)}).catch(deuRuim)
    },5000);
        console.log(entrarnasala)
    }
    
    function enviarMensagem() {
        mensagem = document.querySelector(".enviarmsg").value;
        console.log(mensagem)
        if(mensagem){
            enviarMsgServidor()
        }
    }
function enviarMsgServidor(){
    promessarequisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",
    {
        from: nome,
        to: 'Todos',
        text: mensagem,
        type: 'message'
    }).then(resposta => {
        promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
        promessa.then(enviarResposta);
        document.getElementById("enviarmsg").value=''})
        .catch(meterOPe)
    }
    
    document.addEventListener("keypress", function(e) {
        if(e.key === 'Enter') {
            
            let botaoum = document.querySelector("#submetermsg");
            
            botaoum.click();
            
        }
    });

function meterOPe() {
    window.location.reload();
}
        
function deuRuim(){ 
    alert("DEU RUIM")
}
        
// --------- CARREGAR MSGS NO CHAT ---------

let promessachat;
let mensagens;

function mensagensDoChat() {
    promessachat = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promessachat.then(enviarResposta);
}

function enviarResposta(resposta) {
    mensagens.innerHTML=""
    let informacoes = resposta.data;
    mensagens = document.getElementById("chat")
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
    let tamanhodoarray = informacoes.length -1
    let elementoQueQueroQueApareca = document.querySelector(`.mensagem${tamanhodoarray}`);
    elementoQueQueroQueApareca.scrollIntoView();
}

setInterval(() => {
    mensagens = document.querySelector(".chat")
    promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
    promessa.then(enviarResposta);
},3000);
console.log(enviarResposta);

        // -----BONUS -> LISTA DE PARTICIPANTES ONLINE -------

let promessaentrar;
let pessoason;
let icones;
let pessoamarcada;
let icone;
let primeiroicone;

promessaentrar = axios.get("https://mock-api.driven.com.br/api/v4/uol/participants");
promessaentrar.then(pessoasOnline);

function pessoasOnline(nomes) {
    pessoason = nomes.data;
    for(let x=0; x < pessoason.length; x++){
        icones = document.querySelector(".pessoason");
        icones.innerHTML +=`
        <div class="todos" onclick="addCheck(this)">
            <div class="esquerdadomenu">
            <ion-icon class="person-circle-icon" name="person-circle"></ion-icon>
            <div class="nomesmenu">${pessoason[x].name}</div>
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

