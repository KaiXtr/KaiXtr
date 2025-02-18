let headerStrings = [
    "bacana", "desenvolvedor Front-end", "analista de requisitos",
    "gestor de projetos", "desenvolvedor de jogos", "desenvolvedor Back-end",
    "educador", "professor particular", "designer UI/UX", "desenvolvedor DevOps",
    "engenheiro de dados", "cientista de dados", "programador Python",
    "programador TypeScript", "programador PHP", "programador R", "programador Ruby",
    "programador C", "baterista de banda de punk rock", "escritor", "paraense",
    "editor de vídeo", "pesquisador", "desenvolvedor Full-stack", "monitor",
    "estudante de federal", "freelancer", "proativo", "prestativo", "paciente", "compreensivo",
    "curioso", "autodidata", "motion designer", "ilustrador", "operador de sistemas",
    "voluntário", "concurseiro", "poeta", "pisciano", "bem humorado", "mente aberta",
    "programador Rust", "usuário Linux", "usuário Fedora", "moderador da Wikipedia",
    "fã de Pink Floyd", "empreendedor", "simpatizante do Open Source", "hacker"
]

let newHeader = []

const skillRate = ["Aprendendo", "Competente", "Bom", "Excelente", "Especialidade"]
const langRate = ["Aprendendo", "Lê bem", "Lê e escreve bem", "Avançado", "Fluente"]

let hardSkills = {};
let softSkills = {};
let langSkills = {};

function setIdadeAtualValor() {
    let data = new Date();
    let element = document.getElementById('idadeAtualValor');
    element.innerHTML = data.getFullYear() - 2003;
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function loadJsonData() {
    readTextFile("data.json", function(data) {
        let jsonFile = JSON.parse(data)

        hardSkills = jsonFile.hardSkills;
        softSkills = jsonFile.softSkills;
        langSkills = jsonFile.langSkills;
    
        setUpSkillBars();
    })
}

function headerTransition() {
    let headerH1Text = document.getElementById("header-h1-text");
    let oldString = headerH1Text.innerHTML;
    let escolha = headerStrings[Math.floor(Math.random() * headerStrings.length)];
    newHeader.push(escolha);
    headerStrings.splice(headerStrings.indexOf(escolha),1);

    if (headerStrings.length === 0) {
        headerStrings = newHeader;
        newHeader = [];
    }

    headerH1Text.innerHTML = escolha;
    headerH1Text.style.visibility = "hidden";

    let childEl1 = document.createElement("div");
    childEl1.innerHTML = escolha;
    childEl1.style.top = "0px";
    childEl1.style.left = "0px";
    childEl1.style.position = "absolute";
    childEl1.classList.add("header-h1-text-onchange1");
    headerH1Text.appendChild(childEl1)

    let childEl2 = document.createElement("div");
    childEl2.innerHTML = oldString;
    childEl2.style.top = "0px";
    childEl2.style.left = "0px";
    childEl2.style.position = "absolute";
    childEl2.classList.add("header-h1-text-onchange2");
    headerH1Text.appendChild(childEl2)

    setTimeout(changeNames,1000);
}

function changeNames() {
    let headerH1Text = document.getElementById("header-h1-text");
    headerH1Text.removeChild(headerH1Text.lastChild);
    headerH1Text.removeChild(headerH1Text.lastChild);
    headerH1Text.style.visibility = "visible";
    setTimeout(headerTransition,1000);
}

function generateParticle() {
    let body = document.getElementsByTagName("body")[0];

    let particles = document.getElementsByClassName("particula");
    for (let i=0;i<particles.length;i++){
        if (particles[i].style.opacity == "0%") {
            particles[i].remove();
            i--;
        }
    }

    if (particles.length < 100) {
        let particula = document.createElement("div");
        particula.classList.add("particula");
        particula.style.top = Math.floor(Math.random() * this.innerHeight) + "px";

        let posX = Math.floor(Math.random() * Math.floor(this.innerWidth/6));
        if (Math.floor(Math.random() * 2) < 1) {
            posX = this.innerWidth - posX;
        }
        particula.style.left = posX + "px";

        particula.style.position = "fixed";
        particula.style.zIndex = -1;

        let aniTemp = Math.floor(Math.random() * 20) + 5;
        particula.style.animation = "particula-animacao " + aniTemp + "s linear forwards";

        let symb = [".","!","@","?","&","#","$","*"];
        particula.innerHTML = symb[Math.floor(Math.random() * symb.length)];

        body.appendChild(particula);
    }
    setTimeout(generateParticle,1000);
}

function checkMenuBar() {
    let menuBar = document.getElementsByClassName("menu-bar")[0];
    let pos = menuBar.getBoundingClientRect().height + 80;
    
    if (menuBar.classList.contains("menu-bar-float")) {
        if (this.scrollY < pos) {
            menuBar.classList.remove("menu-bar-float");
        }
    }
    else if (!menuBar.classList.contains("menu-bar-float")) {
        if (this.scrollY > pos) {
            menuBar.classList.add("menu-bar-float");
        }
    }
}

function showProjectCard(el){
    let showEl = document.getElementById("show-project-card");
    document.getElementById("project-info").innerHTML = el.innerHTML;
    showEl.style.display = "block";
    showEl.style.animation = "showProjectIn .5s forwards";
}

function closeProjectCard(){
    let showEl = document.getElementById("show-project-card");
    showEl.style.display = "none";
    showEl.style.animation = "showProjectOut .5s forwards";
}

function setUpSkillBars(){
    let list;
    let coluna;
    let skills;
    let skillsDiv;
    let skillsKeys;

    for (let y=0; y<3; y++){
        if (y == 0){
            skills = hardSkills;
            skillsDiv = document.getElementById("hard-skills-container");
            skillsKeys = Object.keys(hardSkills);
        }
        if (y == 1){
            skills = softSkills;
            skillsDiv = document.getElementById("soft-skills-container");
            skillsKeys = Object.keys(softSkills);
        }
        if (y == 2){
            skills = langSkills;
            skillsDiv = document.getElementById("lang-skills-container");
            skillsKeys = Object.keys(langSkills);
        }
        
        for (let i=0; i<skillsKeys.length + 1; i++) {
            if (i % Math.floor(skillsKeys.length/3) === 0){
                if (i > 0)
                    skillsDiv.appendChild(coluna);
                if (i == skillsKeys.length)
                    break
                coluna = document.createElement("div");
                coluna.classList.add("coluna");
                coluna.classList.add("skill-coluna");
                list = document.createElement("ul");
                coluna.appendChild(list);
            }
            let listItem = document.createElement("li");

            let barraTexto = document.createElement("strong");
            barraTexto.innerHTML = skillsKeys[i] + ":";
            listItem.appendChild(barraTexto);

            let barra = document.createElement("div");
            barra.classList.add("skill-bar");

            let meter = document.createElement("div");
            meter.classList.add("skill-bar-meter");

            if (this.innerWidth < 800)
                meter.style.width = (skills[skillsKeys[i]] * 6.5) + "vw";
            else
                meter.style.width = skills[skillsKeys[i]] + "vw";

            let hint = document.createElement("div");
            hint.classList.add("skill-bar-hint");
            if (y  == 2)
                hint.innerHTML = langRate[Math.ceil(skills[skillsKeys[i]]/2) - 1]
            else
                hint.innerHTML = skillRate[Math.ceil(skills[skillsKeys[i]]/2) - 1]

            barra.appendChild(meter);
            barra.appendChild(hint);
            listItem.appendChild(barra);
            list.appendChild(listItem);
        };
    }
}

function setUpProjectsSlide() {
    let imgs = [
        "bashsays.gif", "NAE1.gif", "imgmani.png", "cobracoral.gif", "hiko.gif",
        "moira-database.png", "primateria.gif", "projetopoliteia1.png", "sdds-bb-s2.gif",
        "calendario.png", "casa-das-maquinas.gif", "bashsays.gif", "NAE1.gif"
    ]
    let slide = document.getElementById("projects-slide");

    for (let i=0; i<imgs.length; i++) {
        let imgEL = document.createElement("img");
        imgEL.src = "img/" + imgs[i];
        imgEL.classList.add("projects-slide-img");
        slide.appendChild(imgEL);
    }
    setTimeout(moveSlide,10);
}

function moveSlide() {
    let slide = document.getElementById("projects-slide");
    if (slide.scrollLeft >= slide.scrollWidth - window.innerWidth) {
        slide.scroll(0,0);
    }
    slide.scrollBy(slide.getBoundingClientRect().left + 1,0);
    setTimeout(moveSlide,20);
}

var contatoFlipped = false;

function contatoFlip() {
    let frente = document.getElementById("contato-frente");
    let verso = document.getElementById("contato-verso");

    contatoFlipped = !contatoFlipped;
    
    if (contatoFlipped){
        frente.style.animation = "flipOut .2s forwards";
        verso.style.animation = "flipIn .2s forwards";
    }else {
        frente.style.animation = "flipIn .2s forwards";
        verso.style.animation = "flipOut .2s forwards";
    }
}

function imprimirSite() {
    let headerH1Text = document.getElementById("header-h1-text");
    headerH1Text.innerHTML = "analista e educador"

    let elementos = document.getElementsByTagName("nav");

    for (let i=0;i<elementos.length;i++) {
        elementos[i].classList.add("p-mostrando");
        elementos[i].classList.remove("p-escondendo");
    };
    setTimeout(window.print,500);
}

document.addEventListener("DOMContentLoaded", function() {
    setIdadeAtualValor();
    loadJsonData();
    setTimeout(headerTransition,1000)
    setTimeout(generateParticle,1000)
    setUpProjectsSlide();
});

window.addEventListener("scroll", function(event) {
    checkMenuBar();

    let elementos = document.getElementsByTagName("nav");

    for (let i=0;i<elementos.length;i++) {
        let posY = Math.floor(elementos[i].getBoundingClientRect().bottom);

        if (posY < Math.floor(this.innerHeight/2)) {
            elementos[i].classList.add("p-escondendo");
            elementos[i].classList.remove("p-mostrando");
        }else {
            elementos[i].classList.add("p-mostrando");
            elementos[i].classList.remove("p-escondendo");
        }
    };
}, false);