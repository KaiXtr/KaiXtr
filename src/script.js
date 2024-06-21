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

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(headerTransition,1000)
});