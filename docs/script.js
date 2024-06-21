const headerStrings = [
    "bacana", "desenvolvedor Front-end", "analista de requisitos",
    "gestor de projetos", "desenvolvedor de jogos", "Desenvolvedor Back-end",
    "educador", "professor particular", "designer UI/UX", "desenvolvedor DevOps",
    "engenheiro de dados", "cientista de dados", "programador Python",
    "programador TypeScript", "programador PHP", "programador R", "programador Ruby",
    "programador C", "baterista de banda de punk rock", "escritor",
    "editor de vídeo"
]

function headerTransition() {
    let headerH1Text = document.getElementById("header-h1-text");
    let oldString = headerH1Text.innerHTML;
    let escolha = oldString;

    while (escolha === oldString){
        escolha = headerStrings[Math.floor(Math.random() * headerStrings.length)];
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
    
    console.log(pos.bottom)
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
    let showElInfo = document.getElementById("project-info").innerHTML = el.innerHTML;
    showEl.style.display = "block";
}

function closeProjectCard(){
    let showEl = document.getElementById("show-project-card");
    showEl.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(headerTransition,1000)
    setTimeout(generateParticle,1000)
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