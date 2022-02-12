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

let nome = prompt("Digite seu nome para entrar no chat:");
let mensagem;
let promessarequisicao;
let entrarnasala;

entrarnasala = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants", 
{
    name: nome
}
).then( respostaDoServidor => {
    console.log(respostaDoServidor)
}).catch(deuRuim)

function deuRuim(){ 
    nome = prompt("Digite seu nome para entrar no chat:");
}

while(!nome){
    nome = prompt("Digite seu nome para entrar no chat:");
}

setInterval(() => {  //Envia o nome para o servidor a cada 5s
    entrarnasala = axios.post("https://mock-api.driven.com.br/api/v4/uol/status",
    {
        name: nome
    }
    ).then(resposta => {console.log(resposta)}).catch(deuRuim)
    },5000);


function enviarMensagem() {
    mensagem = document.querySelector(".enviarmsg").value;
    console.log(mensagem)
    promessarequisicao = axios.post("https://mock-api.driven.com.br/api/v4/uol/messages",
    {
        from: nome,
        to: 'Todos',
        text: mensagem,
        type: 'message'
    }).then(resposta => {
        promessa = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
        promessa.then(enviarResposta);
        console.log(resposta)})
    .catch(deuRuim)
        console.log(promessarequisicao)
}

// --------- CARREGAR MSGS NO CHAT ---------

let promessa;
let mensagens;

promessachat = axios.get("https://mock-api.driven.com.br/api/v4/uol/messages");
promessachat.then(enviarResposta);

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
        }else if (nome == informacoes.name){
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
    const elementoQueQueroQueApareca = document.querySelector('.mensagem99');
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
